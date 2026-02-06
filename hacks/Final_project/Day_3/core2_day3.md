---
title: "Core 2 - PPR"
permalink: /core2/day3
layout: post
---

# Core 2 PPR

## Procedure
Code for reference:
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

## 3a: Description

The main function of this procedure is to compute, concurrently, a bunch of tiles for a Mandelbrot set and store the performance metrics for playback.

## 3b: Sequencing, Selection, Iteration

### Sequencing

The first few lines handle the sequencing (and iteration) of tiles to line up task IDs.
```rs
for ty in (0..height).step_by(tile_h) {
    for tx in (0..width).step_by(tile_w) {
        tiles.push((task_id, tx, ty));
        task_id += 1;
    }
}
```

### Iteration

Ibid.

### Selection

The function performs two time checks to know when to terminate the process:
```rs
// Check if time limit exceeded (TLE) and stop processing if so
if time_exceeded.load(Ordering::Relaxed) {
    break;
}

// Check if overall computation time has exceeded the specified time limit
if overall_start.elapsed() > time_limit {
    time_exceeded.store(true, Ordering::Relaxed);
    break;
}
```
