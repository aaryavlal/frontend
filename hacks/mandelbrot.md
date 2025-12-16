---
layout: post
title: Mandelbrot Test
permalink: /mandelbrot
---

<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script src="{{site.baseurl}}/assets/js/mandelbrot.js"></script>

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
    background-color: #f5f5f5;
    border-radius: 4px;
  }
</style>

<!-- Sequential Mode -->
<div class="mandelbrot-container">
  <h2>Sequential Mode</h2>
  <div class="mandelbrot-controls">
    <button id="run-sequential-btn">Run Sequential Simulation</button>
    <button id="stop-sequential-btn" disabled>Stop</button>
  </div>
  <canvas id="sequential-mandelbrot"></canvas>
  <div id="sequential-mandelbrot-info" class="info-display">Click "Run Sequential Simulation" to start</div>
</div>

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

document.addEventListener("DOMContentLoaded", () => {
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
});
</script>
