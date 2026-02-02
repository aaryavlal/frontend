---
title: "Core 2 - Rustism Program Reference"
permalink: /core2/day2
layout: post
---

## Input

To initiate the concurrent computation process, an API request is sent to the server with specific parameters. Here's an example of how that request looks:
```bash
curl -X GET https://hardwarehavoc.opencodingsociety.com/api/compute/concurrent\?width\=96\&height\=96\&tile_w\=32\&tile_h\=32\&max_iter\=128\&time_limit_ms\=500\&num_threads\=2
```

## Output

Once the server receives the request, it executes a multi-threaded concurrency simulation that divides the computational work across multiple threads. After all tiles are processed, the server returns a detailed JSON object containing performance metrics for each tile, including which thread handled it, how long it took, and its position in the grid:

```json
{
  "success": true,
  "data": [
    {
      "task_id": 0,
      "thread_id": 0,
      "tile_x": 0,
      "tile_y": 0,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 1,
      "thread_id": 0,
      "tile_x": 32,
      "tile_y": 0,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 5,
      "thread_id": 1,
      "tile_x": 64,
      "tile_y": 32,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 2,
      "thread_id": 0,
      "tile_x": 64,
      "tile_y": 0,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 6,
      "thread_id": 1,
      "tile_x": 0,
      "tile_y": 64,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 3,
      "thread_id": 0,
      "tile_x": 0,
      "tile_y": 32,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 7,
      "thread_id": 1,
      "tile_x": 32,
      "tile_y": 64,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 8,
      "thread_id": 1,
      "tile_x": 64,
      "tile_y": 64,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    },
    {
      "task_id": 4,
      "thread_id": 0,
      "tile_x": 32,
      "tile_y": 32,
      "tile_w": 32,
      "tile_h": 32,
      "start_time_ms": 0,
      "duration_ms": 0,
      "pixels_computed": 1024
    }
  ],
  "params": {
    "width": 96,
    "height": 96,
    "tile_w": 32,
    "tile_h": 32,
    "max_iter": 128,
    "time_limit_ms": 500,
    "num_threads": 2,
    "mode": "concurrent"
  },
  "message": "Concurrent tasks executed successfully"
}
```

The frontend website receives this performance data and uses it to create an animated visualization of how the work was distributed and executed across the different threads, allowing you to see the concurrent execution in action.


## Procedure

The core algorithm that manages multi-threaded concurrency is implemented in Rust and compiled to work with Python. This approach combines Rust's performance and thread-safety with Python's ease of use. Here's how the concurrent computation process works:

```rs
use crate::model::{TaskRecord, TileUpdate, render_tile};
use pyo3::prelude::*;
use std::{
    sync::{
        Arc, Mutex,
        atomic::{AtomicBool, Ordering},
    },
    time::{Duration, Instant},
};

#[pyfunction]
pub fn concurrent(
    py: Python<'_>,
    width: usize,
    height: usize,
    tile_w: usize,
    tile_h: usize,
    max_iter: u16,
    emit_tile: PyObject,
    time_limit_ms: u64,
    num_threads: usize,
) -> PyResult<Vec<TaskRecord>> {
    // Collect all tile coordinates with their task_ids first
    let mut tiles = Vec::new();
    let mut task_id = 0;
    for ty in (0..height).step_by(tile_h) {
        for tx in (0..width).step_by(tile_w) {
            tiles.push((task_id, tx, ty));
            task_id += 1;
        }
    }

    let overall_start = Instant::now();
    let time_limit = Duration::from_millis(time_limit_ms);

    // Shared state for time limit checking
    let time_exceeded = Arc::new(AtomicBool::new(false));
    // Shared state for collecting results
    let records = Arc::new(Mutex::new(Vec::new()));

    // Scoped threads to share references during computations
    std::thread::scope(|s| {
        // Divide work among threads
        let chunk_size = (tiles.len() + num_threads - 1) / num_threads;

        for (thread_id, tile_chunk) in tiles.chunks(chunk_size).enumerate() {
            let time_exceeded = Arc::clone(&time_exceeded);
            let records = Arc::clone(&records);
            let overall_start = overall_start; // Copy for thread

            // Spawn a thread for this chunk of tiles
            s.spawn(move || {
                for &(task_id, tx, ty) in tile_chunk {
                    // Check if time limit exceeded (TLE) and stop processing if so
                    if time_exceeded.load(Ordering::Relaxed) {
                        break;
                    }

                    // Check if overall computation time has exceeded the specified time limit
                    if overall_start.elapsed() > time_limit {
                        time_exceeded.store(true, Ordering::Relaxed);
                        break;
                    }

                    let start = Instant::now();
                    let start_time_ms = overall_start.elapsed().as_millis();

                    let data = render_tile(width, height, tx, ty, tile_w, tile_h, max_iter);
                    let duration_ms = start.elapsed().as_millis();

                    // Store the result
                    let record = TaskRecord {
                        task_id: task_id as u32,
                        thread_id: thread_id as u32,
                        tile_x: tx as u32,
                        tile_y: ty as u32,
                        tile_w: tile_w as u32,
                        tile_h: tile_h as u32,
                        start_time_ms,
                        duration_ms,
                        pixels_computed: (tile_w * tile_h) as u32,
                    };

                    // Lock and push to shared records
                    records.lock().unwrap().push((
                        record,
                        data,
                        start_time_ms,
                        duration_ms,
                        tx,
                        ty,
                        thread_id,
                    ));
                }
            });
        }
    });

    // Now emit all tiles to Python (via main thread)
    let mut results = Arc::try_unwrap(records)
        .expect("Failed to unwrap Arc")
        .into_inner()
        .unwrap();

    // Sort results by their start time to visualize the actual execution order
    // This reveals the true parallelism—showing which tasks ran simultaneously on different threads
    results.sort_by_key(|(record, _, start_time_ms, _, _, _, _)| *start_time_ms);

    let mut final_records = Vec::new();
    for (record, data, start_time_ms, duration_ms, tx, ty, thread_id) in results {
        emit_tile.call1(
            py,
            (TileUpdate {
                task_id: record.task_id,
                thread_id: thread_id as u32,
                tile_x: tx as u32,
                tile_y: ty as u32,
                tile_w: tile_w as u32,
                tile_h: tile_h as u32,
                data,
                start_time_ms,
                duration_ms,
            },),
        )?;
        final_records.push(record);
    }

    Ok(final_records)
}
```

This Rust implementation demonstrates key Computer Science Principles (CSP) concepts: thread management, synchronization with mutexes and atomic operations, time limit enforcement, and task scheduling across multiple processing threads.
