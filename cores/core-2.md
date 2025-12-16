---
toc: false
layout: post
title: "Core 2 — Module 2: Why Parallel/Distributed?"
description: "Module 2: Motivation for parallel and distributed computing"
permalink: /cores/core-2
breadcrumbs: false
---

<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script src="{{site.baseurl}}/assets/js/mandelbrot.js"></script>

# Module 2 — Why Parallel / Distributed?

## Introduction 
*Concurrency* is a way of structuring a program so that it can handle multiple tasks seemingly *at the same time* by interleaving their execution.

> Imagine a single chef (the processor core) juggling cooking different dishes (tasks), pausing one to stir another, and then going back to the first. It's about **managing** multiple tasks that are in progress to make progress on all of them, which is crucial for high performance systems like web servers that handle many user requests simultaneously.

## Concurrency vs. Parallelism

While often used interchangeably, concurrency and parallelism have a key distinction:
- **Concurrency** is about *dealing with many things at once (composition)* by interleaving execution. 
- **Parallelism** is about *doing many things at once (execution)* by physically executing multiple tasks simultaneously on multiple processor cores or machines.


<style>
  .mandelbrot-container {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .mandelbrot-container h2 {
    margin-top: 0;
  }
  
  .mandelbrot-controls {
    margin-bottom: 15px;
  }
  
  .mandelbrot-controls button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .mandelbrot-controls button:hover {
    background-color: #45a049;
  }
  
  .mandelbrot-controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  canvas {
    border: 1px solid #333;
    display: block;
  }
  
  .info-display {
    margin-top: 10px;
    font-family: monospace;
    padding: 10px;
    border-radius: 4px;
  }
</style>


## Sequential Computing

To demonstrate this difference, we'll run two computations with the same time limit (500 ms).

Sequential computing is just as it sounds, we execute each task one by one, in sequence:
```js
task1 --> task2 --> task3 --> task4 --> task5
```

Here, we're generating Mandelbrot sets which require a bit of computationally intensive tasks. The code, written in Rust, effectively boils down to:
```rs
pub fn sequential(width: usize, height: usize, tile_w: usize, tile_h: usize) {
    // Iterating over every tile
    for ty in (0..height).step_by(tile_h) {
        for tx in (0..width).step_by(tile_w) {
            // The code here is computing sequentially
            // We cannot proceed to render the next tile until the one we are currently computing is completed
            render_tile(width, height, tx, ty, tile_w, tile_h);
        }
    }
}
```

<!-- Sequential Mode --->
<div class="mandelbrot-container">
  <h2>Sequential Mode</h2>
  <div class="mandelbrot-controls">
    <button id="run-sequential-btn">Run Sequential Simulation</button>
    <button id="stop-sequential-btn" disabled>Stop</button>
  </div>
  <canvas id="sequential-mandelbrot"></canvas>
  <div id="sequential-mandelbrot-info" class="info-display">Click "Run Sequential Simulation" to start</div>
</div>

## Concurrency

Concurrent computing means that multiple tasks are active and making progress over the same period. Since the Mandelbrot tiles are independent, we can process many of them simultaneously on different CPU cores (threads).
```js
task1 --\
task2 ---> finish in parallel
task3 --/
```
The code, in essence, looks like this:
```rs
pub fn concurrent(width: usize, height: usize, tile_w: usize, tile_h: usize, num_threads: usize) {
    // Collect all independent tasks (tiles) first
    let mut tiles = Vec::new();
    for ty in (0..height).step_by(tile_h) {
        for tx in (0..width).step_by(tile_w) {
            // Each tuple (tx, ty) represents a completely independent task
            tiles.push((tx, ty));
        }
    }
    
    // Next, we use a thread scope to manage concurrency
    // This is key: we are no longer computing sequentially
    std::thread::scope(|s| {
        // Divide the list fo independent tasks into chunks
        // so each thread handles its own batch of work
        let chunk_size = (tiles.len() + num_threads - 1) / num_threads;
        
        // For each chunk of work, spawn a new thread
        for (worker_id, tile_chunk) in tiles.chunks(chunk_size).enumerate() {
            // Spawn a thread to process this specific chunk CONCURRENTLY with others
            s.spawn(move || {
                for &(tx, ty) in tile_chunk {
                    // This task (tile rendering) is now running at the same time
                    // along side the other tasks of the other spawned threads
                    render_tile(width, height, tx, ty, tile_w, tile_h);
                }
            });
        }
        
        // Program waits here until ALL spawned threads finish
        // (or until the time limit hits)
    });
}
```

<!-- Concurrent Mode -->
<div class="mandelbrot-container">
  <h2>Concurrent Mode</h2>
  <div class="mandelbrot-controls">
    <button id="run-concurrent-btn">Run Concurrent Simulation</button>
    <button id="stop-concurrent-btn" disabled>Stop</button>
    <label for="num-threads">Threads:</label>
    <input type="number" id="num-threads" value="4" min="1" max="16" style="width: 60px; padding: 5px;">
  </div>
  <canvas id="concurrent-mandelbrot"></canvas>
  <div id="concurrent-mandelbrot-info" class="info-display">Click "Run Concurrent Simulation" to start</div>
</div>

<script>
let sequentialSocket = null;
let concurrentSocket = null;

function initMandelbrotSim() {
  const runSequentialBtn = document.getElementById("run-sequential-btn");
  const stopSequentialBtn = document.getElementById("stop-sequential-btn");
  const runConcurrentBtn = document.getElementById("run-concurrent-btn");
  const stopConcurrentBtn = document.getElementById("stop-concurrent-btn");
  const numThreadsInput = document.getElementById("num-threads");

  // Sequential simulation
  runSequentialBtn.addEventListener("click", () => {
    // Disconnect existing socket if any
    if (sequentialSocket) {
      sequentialSocket.disconnect();
    }

    // Clear canvas
    const canvas = document.getElementById("sequential-mandelbrot");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update info
    const infoDiv = document.getElementById("sequential-mandelbrot-info");
    infoDiv.textContent = "Running sequential simulation...";
    infoDiv.style.color = "blue";

    // Disable run button, enable stop button
    runSequentialBtn.disabled = true;
    stopSequentialBtn.disabled = false;

    // Initialize Mandelbrot
    sequentialSocket = initMandelbrot({
      canvasId: "sequential-mandelbrot",
      serverUrl: "http://localhost:8500",
      width: 800,
      height: 600,
      tile_w: 64,
      tile_h: 64,
      max_iter: 1000,
      time_limit_ms: 500,
      mode: "sequential",
    });

    // Re-enable button on completion or error
    sequentialSocket.on("compute_sequential_complete", () => {
      runSequentialBtn.disabled = false;
      stopSequentialBtn.disabled = true;
    });

    sequentialSocket.on("compute_sequential_error", () => {
      runSequentialBtn.disabled = false;
      stopSequentialBtn.disabled = true;
    });
  });

  stopSequentialBtn.addEventListener("click", () => {
    if (sequentialSocket) {
      sequentialSocket.disconnect();
      sequentialSocket = null;
    }
    const infoDiv = document.getElementById("sequential-mandelbrot-info");
    infoDiv.textContent = "Simulation stopped";
    infoDiv.style.color = "red";
    runSequentialBtn.disabled = false;
    stopSequentialBtn.disabled = true;
  });

  // Concurrent simulation
  runConcurrentBtn.addEventListener("click", () => {
    // Disconnect existing socket if any
    if (concurrentSocket) {
      concurrentSocket.disconnect();
    }

    // Clear canvas
    const canvas = document.getElementById("concurrent-mandelbrot");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update info
    const infoDiv = document.getElementById("concurrent-mandelbrot-info");
    infoDiv.textContent = "Running concurrent simulation...";
    infoDiv.style.color = "blue";

    // Disable run button, enable stop button
    runConcurrentBtn.disabled = true;
    stopConcurrentBtn.disabled = false;

    // Get number of threads
    const numThreads = parseInt(numThreadsInput.value) || 4;

    // Initialize Mandelbrot
    concurrentSocket = initMandelbrot({
      canvasId: "concurrent-mandelbrot",
      serverUrl: "http://localhost:8500",
      width: 800,
      height: 600,
      tile_w: 64,
      tile_h: 64,
      max_iter: 1000,
      time_limit_ms: 500,
      mode: "concurrent",
      num_threads: numThreads,
    });

    // Re-enable button on completion or error
    concurrentSocket.on("compute_concurrent_complete", () => {
      runConcurrentBtn.disabled = false;
      stopConcurrentBtn.disabled = true;
    });

    concurrentSocket.on("compute_concurrent_error", () => {
      runConcurrentBtn.disabled = false;
      stopConcurrentBtn.disabled = true;
    });
  });

  stopConcurrentBtn.addEventListener("click", () => {
    if (concurrentSocket) {
      concurrentSocket.disconnect();
      concurrentSocket = null;
    }
    const infoDiv = document.getElementById("concurrent-mandelbrot-info");
    infoDiv.textContent = "Simulation stopped";
    infoDiv.style.color = "red";
    runConcurrentBtn.disabled = false;
    stopConcurrentBtn.disabled = true;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMandelbrotSim);
} else {
  initMandelbrotSim();
}
</script>
