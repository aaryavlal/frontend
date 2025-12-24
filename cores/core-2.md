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
    border: 3px solid rgba(0,255,170,0.28);
    border-left: 6px solid #00ffaa;
    border-radius: 2px;
    background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
    box-shadow: 0 0 20px rgba(0,255,170,0.15);
    position: relative;
  }

  .mandelbrot-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffaa, transparent);
    opacity: 0.5;
  }

  .mandelbrot-container h2 {
    margin-top: 0;
    color: #00ffaa;
    font-family: 'Courier New', 'Consolas', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0,255,170,0.5);
    font-size: 1.2rem;
  }

  .mandelbrot-controls {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .mandelbrot-controls button {
    padding: 10px 20px;
    font-size: 0.85rem;
    background: rgba(0,255,170,0.15);
    color: #00ffaa;
    border: 2px solid #00ffaa;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 0;
    font-family: 'Courier New', 'Consolas', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    transition: all 0.2s ease;
    box-shadow: 0 0 10px rgba(0,255,170,0.3);
  }

  .mandelbrot-controls button:hover {
    background: rgba(0,255,170,0.25);
    box-shadow: 0 0 10px rgba(0,255,170,0.6), 0 0 20px rgba(0,255,170,0.4);
    text-shadow: 0 0 8px #00ffaa;
  }

  .mandelbrot-controls button:disabled {
    background: rgba(107,118,132,0.15);
    color: #6b7684;
    border-color: #6b7684;
    cursor: not-allowed;
    box-shadow: none;
    text-shadow: none;
  }

  .mandelbrot-controls input {
    padding: 8px 12px;
    background: rgba(10,14,20,0.80);
    border: 2px solid rgba(0,255,170,0.28);
    border-left: 3px solid #00ffaa;
    border-radius: 2px;
    color: #00ffaa;
    font-family: 'Courier New', 'Consolas', monospace;
    font-size: 0.9rem;
  }

  .mandelbrot-controls input:focus {
    outline: none;
    border-color: #00ffaa;
    box-shadow: 0 0 15px rgba(0,255,170,0.3);
  }

  .mandelbrot-controls label {
    color: #8b95a5;
    font-family: 'Courier New', 'Consolas', monospace;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  canvas {
    border: 2px solid #00ffaa;
    display: block;
    box-shadow: 0 0 20px rgba(0,255,170,0.2);
  }

  .info-display {
    margin-top: 10px;
    font-family: 'Courier New', 'Consolas', monospace;
    padding: 10px;
    border-radius: 2px;
    background: rgba(10,14,20,0.60);
    border-left: 3px solid #00ffaa;
    color: #00ffaa;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
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

## So Why Go Concurrent/Parallel?

As we've demonstrated here, parallelization can definitely speed up processes by distributing work. Yet, there's also times where you don't need parallelization, and as we'll see, it gives diminishing returns the more resources you throw at it.

Nonetheless, it is an incredibly important concept for any computer system you'll be building.

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
