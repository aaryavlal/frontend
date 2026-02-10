---
toc: false
layout: post
title: "Core 2 — Module 2: Why Parallel/Distributed?"
description: "Module 2: Motivation for parallel and distributed computing"
permalink: /cores/core-2
breadcrumbs: false
---

<script type="module" src="{{site.baseurl}}/assets/js/mandelbrot.js"></script>

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
    max-width: 100%;
    height: auto;
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
  
  .thread-container {
    margin: 20px 0;
    padding: 15px;
    background: black;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .thread-bar {
    margin: 12px 0;
    padding: 12px;
    background: gray;
    border-radius: 6px;
    border-left: 4px solid #666;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  
  .thread-label {
    font-weight: bold;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: white;
  }
  
  .thread-stats {
    font-size: 13px;
    color: white;
    font-weight: normal;
  }
  
  .progress-bar {
    width: 100%;
    height: 24px;
    background: #e8e8e8;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    border: 1px solid #d0d0d0;
  }
  
  .progress-fill {
    height: 100%;
    background: #666;
    transition: width 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 12px;
  }
  
  .replay-controls {
    margin: 15px 0;
    padding: 12px;
    background: black;
    border-radius: 6px;
    border-left: 4px solid #888;
    border: 1px solid #ddd;
  }
  
  .replay-controls button {
    margin-right: 10px;
    background: #555;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .replay-controls button:hover {
    background: #333;
  }
  
  .replay-controls button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .replay-speed {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .replay-speed input[type="range"] {
    flex: 1;
    max-width: 300px;
  }
  
  .replay-speed label {
    margin: 0;
    font-weight: normal;
    color: #555;
  }
  
  .thread-container h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    font-size: 18px;
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

  <!-- Sequential Progress Visualization -->
  <div class="thread-container" id="sequential-progress-container" style="display: none;">
    <h3>Progress</h3>
    <div id="sequential-progress-bar"></div>
  </div>
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

  <!-- Thread Progress Visualization -->
  <div class="thread-container" id="thread-progress-container" style="display: none;">
    <h3>Thread Progress Visualization</h3>
    <div class="replay-controls" id="replay-controls" style="display: none;">
      <button id="replay-btn">Replay Progress</button>
      <div class="replay-speed">
        <label for="replay-speed">Replay Speed:</label>
        <input type="range" id="replay-speed" min="1" max="100" value="10">
        <span id="speed-value">10ms/tile</span>
      </div>
    </div>
    <div id="thread-bars-container"></div>
  </div>
</div>

## So Why Go Concurrent/Parallel?

As we've demonstrated here, parallelization can definitely speed up processes by distributing work. Yet, there's also times where you don't need parallelization, and as we'll see, it gives diminishing returns the more resources you throw at it.

Nonetheless, it is an incredibly important concept for any computer system you'll be building.

<script>
let sequentialAPI = null;
let concurrentAPI = null;

// Thread visualization state
let tileData = [];
let threadStats = {};
let isReplaying = false;

// Sequential progress state
let sequentialTileData = [];
let sequentialProgress = { completed: 0, total: 0 };

// Thread colors for visual distinction
const threadColors = [
  '#2a2a2a', '#3d3d3d', '#505050', '#636363',
  '#767676', '#898989', '#9c9c9c', '#afafaf',
  '#404040', '#555555', '#6a6a6a', '#7f7f7f',
  '#333333', '#4d4d4d', '#666666', '#808080'
];

function createThreadProgressBar(threadId) {
  const container = document.getElementById('thread-bars-container');
  const color = threadStats[threadId].color;
  
  const threadDiv = document.createElement('div');
  threadDiv.className = 'thread-bar';
  threadDiv.id = `thread-${threadId}`;
  threadDiv.style.borderLeftColor = color;
  
  threadDiv.innerHTML = `
    <div class="thread-label">
      <span>Thread ${threadId}</span>
      <span class="thread-stats" id="thread-stats-${threadId}">0 / 0 tiles</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" id="progress-${threadId}" style="width: 0%; background: ${color}">
        <span id="progress-text-${threadId}">0%</span>
      </div>
    </div>
  `;
  
  container.appendChild(threadDiv);
}

function createSequentialProgressBar() {
  const container = document.getElementById('sequential-progress-bar');
  const color = '#4a4a4a';
  
  container.innerHTML = `
    <div class="thread-bar" style="border-left-color: ${color}">
      <div class="thread-label">
        <span>Sequential Progress</span>
        <span class="thread-stats" id="sequential-stats">0 / 0 tiles</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" id="sequential-progress-fill" style="width: 0%; background: ${color}">
          <span id="sequential-progress-text">0%</span>
        </div>
      </div>
    </div>
  `;
}

function updateSequentialProgressBar() {
  const percentage = sequentialProgress.total > 0 
    ? (sequentialProgress.completed / sequentialProgress.total * 100) 
    : 0;
  
  const progressFill = document.getElementById('sequential-progress-fill');
  const progressText = document.getElementById('sequential-progress-text');
  const statsText = document.getElementById('sequential-stats');
  
  if (progressFill && progressText && statsText) {
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}%`;
    statsText.textContent = `${sequentialProgress.completed} / ${sequentialProgress.total} tiles`;
  }
}

function updateThreadProgressBar(threadId) {
  const stats = threadStats[threadId];
  const percentage = stats.total > 0 ? (stats.completed / stats.total * 100) : 0;
  
  const progressFill = document.getElementById(`progress-${threadId}`);
  const progressText = document.getElementById(`progress-text-${threadId}`);
  const statsText = document.getElementById(`thread-stats-${threadId}`);
  
  if (progressFill && progressText && statsText) {
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}%`;
    statsText.textContent = `${stats.completed} / ${stats.total} tiles`;
  }
}

async function startReplay() {
  if (tileData.length === 0) {
    alert('No data to replay!');
    return;
  }
  
  isReplaying = true;
  const replayBtn = document.getElementById('replay-btn');
  replayBtn.disabled = true;
  replayBtn.textContent = 'Replaying...';
  
  // Reset all progress bars
  for (let threadId in threadStats) {
    threadStats[threadId].completed = 0;
    updateThreadProgressBar(threadId);
  }
  
  const infoDiv = document.getElementById("concurrent-mandelbrot-info");
  infoDiv.textContent = "Replaying actual parallel execution...";
  infoDiv.style.color = "purple";
  
  // Replay tiles in chronological order (by start_time)
  const sortedTiles = [...tileData].sort((a, b) => a.startTime - b.startTime);
  
  const replaySpeedMultiplier = parseInt(document.getElementById('replay-speed').value) / 10;
  const firstStartTime = sortedTiles[0].startTime;
  
  for (let i = 0; i < sortedTiles.length; i++) {
    const data = sortedTiles[i];
    const threadId = data.threadId;
    
    // Calculate delay based on actual timing
    const relativeStartTime = data.startTime - firstStartTime;
    
    // Wait until this tile's actual start time (scaled)
    if (i > 0) {
      const prevTile = sortedTiles[i - 1];
      const prevRelativeTime = prevTile.startTime - firstStartTime;
      const timeDiff = relativeStartTime - prevRelativeTime;
      await new Promise(resolve => setTimeout(resolve, timeDiff * replaySpeedMultiplier));
    }
    
    threadStats[threadId].completed++;
    updateThreadProgressBar(threadId);
    
    infoDiv.textContent = `Replaying: ${i + 1}/${sortedTiles.length} tiles (at t=${Math.round(relativeStartTime)}ms)`;
  }
  
  infoDiv.textContent = "Replay complete! Notice how threads work simultaneously.";
  infoDiv.style.color = "green";
  isReplaying = false;
  replayBtn.disabled = false;
  replayBtn.textContent = 'Replay Progress';
}

function initMandelbrotSim() {
  const runSequentialBtn = document.getElementById("run-sequential-btn");
  const stopSequentialBtn = document.getElementById("stop-sequential-btn");
  const runConcurrentBtn = document.getElementById("run-concurrent-btn");
  const stopConcurrentBtn = document.getElementById("stop-concurrent-btn");
  const numThreadsInput = document.getElementById("num-threads");
  const replayBtn = document.getElementById("replay-btn");
  const replaySpeedInput = document.getElementById("replay-speed");

  // Replay button handler
  replayBtn.addEventListener("click", startReplay);
  
  // Update replay speed display
  replaySpeedInput.addEventListener('input', (e) => {
    document.getElementById('speed-value').textContent = `${e.target.value}ms/tile`;
  });

  // Sequential simulation
  runSequentialBtn.addEventListener("click", async () => {
    // Stop existing API if any
    if (sequentialAPI) {
      sequentialAPI.stop();
    }

    // Reset sequential progress state
    sequentialTileData = [];
    sequentialProgress = { completed: 0, total: 0 };

    // Clear canvas
    const canvas = document.getElementById("sequential-mandelbrot");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Show and create progress bar
    document.getElementById('sequential-progress-container').style.display = 'block';
    createSequentialProgressBar();

    // Update info
    const infoDiv = document.getElementById("sequential-mandelbrot-info");
    infoDiv.textContent = "Running sequential simulation...";
    infoDiv.style.color = "blue";

    // Disable run button, enable stop button
    runSequentialBtn.disabled = true;
    stopSequentialBtn.disabled = false;

    // Initialize Mandelbrot API
    sequentialAPI = new MandelbrotAPI({
      canvasId: "sequential-mandelbrot",
      width: 800,
      height: 600,
      tile_w: 50,
      tile_h: 50,
      max_iter: 1000,
      time_limit_ms: 500,
      mode: "sequential",
    });

    // Listen for progress updates
    sequentialAPI.on('progress', (data) => {
      sequentialProgress.completed = data.current;
      sequentialProgress.total = data.total;
      
      updateSequentialProgressBar();
      
      infoDiv.textContent = `Processing: ${data.current}/${data.total} tiles`;
    });

    // Listen for completion
    sequentialAPI.on('complete', (data) => {
      runSequentialBtn.disabled = false;
      stopSequentialBtn.disabled = true;
      
      infoDiv.textContent = `Completed: ${data.completed_tasks}/${data.total_tasks} tiles`;
      infoDiv.style.color = "green";
    });

    // Listen for errors
    sequentialAPI.on('error', (data) => {
      runSequentialBtn.disabled = false;
      stopSequentialBtn.disabled = true;
      
      infoDiv.textContent = `Error: ${data.message}`;
      infoDiv.style.color = "red";
    });

    // Start the computation
    try {
      await sequentialAPI.start();
    } catch (error) {
      console.error('Failed to start sequential simulation:', error);
      runSequentialBtn.disabled = false;
      stopSequentialBtn.disabled = true;
      infoDiv.textContent = `Error: ${error.message}`;
      infoDiv.style.color = "red";
    }
  });

  stopSequentialBtn.addEventListener("click", () => {
    if (sequentialAPI) {
      sequentialAPI.stop();
      sequentialAPI = null;
    }
    const infoDiv = document.getElementById("sequential-mandelbrot-info");
    infoDiv.textContent = "Simulation stopped";
    infoDiv.style.color = "red";
    runSequentialBtn.disabled = false;
    stopSequentialBtn.disabled = true;
    
    // Hide progress container
    document.getElementById('sequential-progress-container').style.display = 'none';
  });

  // Concurrent simulation
  runConcurrentBtn.addEventListener("click", async () => {
    // Stop existing API if any
    if (concurrentAPI) {
      concurrentAPI.stop();
    }

    // Get number of threads
    const numThreads = parseInt(numThreadsInput.value) || 4;

    // Reset thread visualization state
    tileData = [];
    threadStats = {};
    isReplaying = false;
    
    // Clear previous progress bars
    document.getElementById('thread-bars-container').innerHTML = '';
    document.getElementById('thread-progress-container').style.display = 'block';
    document.getElementById('replay-controls').style.display = 'none';

    // Preload all thread progress bars in order (0 to numThreads-1)
    for (let i = 0; i < numThreads; i++) {
      threadStats[i] = {
        completed: 0,
        total: 0,
        color: threadColors[i % threadColors.length]
      };
      createThreadProgressBar(i);
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

    // Initialize Mandelbrot API
    concurrentAPI = new MandelbrotAPI({
      canvasId: "concurrent-mandelbrot",
      width: 800,
      height: 600,
      tile_w: 50,
      tile_h: 50,
      max_iter: 1000,
      time_limit_ms: 500,
      mode: "concurrent",
      num_threads: numThreads,
    });

    // Listen for progress updates to track per thread progress
    concurrentAPI.on('progress', (data) => {
      if (isReplaying) return; // Don't update during replay
      
      const task = data.task;
      const threadId = task.thread_id;
      
      // Store tile data for replay
      tileData.push({
        tile: task,
        threadId: threadId,
        startTime: task.start_time_ms,
        duration: task.duration_ms
      });
      
      // Update thread stats (thread already exists from preload)
      threadStats[threadId].completed++;
      updateThreadProgressBar(threadId);
      
      // Update info
      infoDiv.textContent = `Processing: ${data.current}/${data.total} tiles (Thread ${threadId} active)`;
    });

    // Listen for completion
    concurrentAPI.on('complete', (data) => {
      runConcurrentBtn.disabled = false;
      stopConcurrentBtn.disabled = true;
      
      // Calculate totals for each thread
      for (let threadId in threadStats) {
        threadStats[threadId].total = threadStats[threadId].completed;
        updateThreadProgressBar(threadId);
      }
      
      // Show replay controls
      document.getElementById('replay-controls').style.display = 'block';
      
      // Update info
      const timeLimit = data.was_time_limited ? ' (time limit reached)' : '';
      infoDiv.textContent = `Completed: ${data.completed_tasks}/${data.total_tasks} tiles using ${data.num_threads} threads${timeLimit}. Click Replay to visualize thread progress`;
      infoDiv.style.color = "green";
    });

    // Listen for errors
    concurrentAPI.on('error', (data) => {
      runConcurrentBtn.disabled = false;
      stopConcurrentBtn.disabled = true;
      
      infoDiv.textContent = `Error: ${data.message}`;
      infoDiv.style.color = "red";
    });

    // Start the computation
    try {
      await concurrentAPI.start();
    } catch (error) {
      console.error('Failed to start concurrent simulation:', error);
      runConcurrentBtn.disabled = false;
      stopConcurrentBtn.disabled = true;
      infoDiv.textContent = `Error: ${error.message}`;
      infoDiv.style.color = "red";
    }
  });

  stopConcurrentBtn.addEventListener("click", () => {
    if (concurrentAPI) {
      concurrentAPI.stop();
      concurrentAPI = null;
    }
    const infoDiv = document.getElementById("concurrent-mandelbrot-info");
    infoDiv.textContent = "Simulation stopped";
    infoDiv.style.color = "red";
    runConcurrentBtn.disabled = false;
    stopConcurrentBtn.disabled = true;
    
    // Hide thread progress container
    document.getElementById('thread-progress-container').style.display = 'none';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMandelbrotSim);
} else {
  initMandelbrotSim();
}
</script>

***

<div style="text-align: center; width: 100%; height: 100px;">
    <a href="{{site.baseurl}}/cores/core-2/mutexes">Next Up: What if you want shared data?</a>
</div>
