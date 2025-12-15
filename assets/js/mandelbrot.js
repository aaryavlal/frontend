/**
 * Mandelbrot Set Renderer using Socket.IO
 *
 * Usage:
 * 1. Add a canvas element with a unique ID
 * 2. Optionally add an info div with id="{canvasId}-info"
 * 3. Call initMandelbrot() with configuration
 *
 * Example:
 *   initMandelbrot({
 *     canvasId: "mandelbrot",
 *     serverUrl: "http://localhost:8500",
 *     width: 800,
 *     height: 600,
 *     tile_w: 64,
 *     tile_h: 64,
 *     max_iter: 1000,
 *     time_limit_ms: 500
 *   });
 */

function initMandelbrot(config) {
  // Default config
  const defaults = {
    canvasId: "mandelbrot",
    serverUrl: "http://localhost:8500",
    width: 800,
    height: 600,
    tile_w: 64,
    tile_h: 64,
    max_iter: 1000,
    time_limit_ms: 500,
    infoId: null // Auto generated if not provided
  };

  // Merge config with defaults
  const settings = { ...defaults, ...config };

  // Auto generate info div ID if not provided
  if (!settings.infoId) {
    settings.infoId = `${settings.canvasId}-info`;
  }

  const canvas = document.getElementById(settings.canvasId);
  if (!canvas) {
    console.error(`Canvas with id '${settings.canvasId}' not found`);
    return;
  }

  const ctx = canvas.getContext("2d");
  const infoDiv = document.getElementById(settings.infoId);

  // Set canvas dimensions
  canvas.width = settings.width;
  canvas.height = settings.height;

  const imageData = ctx.createImageData(settings.width, settings.height);
  const pixelBuffer = imageData.data;

  // Fill canvas with gray to show incomplete areas
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, settings.width, settings.height);

  // Grayscale color mapping
  function color(iter, maxIter = 256) {
    const v = iter === maxIter ? 0 : 255 - Math.floor(255 * iter / maxIter);
    return [v, v, v, 255];
  }

  // Connect to Flask SocketIO
  const socket = io(settings.serverUrl);

  socket.on("connect", () => {
    console.log("Connected to Mandelbrot server!");

    // Trigger computation after connection
    socket.emit("compute_sequential_stream", {
      width: settings.width,
      height: settings.height,
      tile_w: settings.tile_w,
      tile_h: settings.tile_h,
      max_iter: settings.max_iter,
      time_limit_ms: settings.time_limit_ms,
    });
  });

  // Listen for tile updates
  socket.on("compute_task_update", (msg) => {
    const tile = msg.task;
    const { tile_x, tile_y, tile_w, tile_h, data } = tile;

    console.log(`Received tile at (${tile_x}, ${tile_y}) size ${tile_w}x${tile_h}`);

    let i = 0;
    for (let dy = 0; dy < tile_h; dy++) {
      for (let dx = 0; dx < tile_w; dx++) {
        const px = tile_x + dx;
        const py = tile_y + dy;

        // Bounds check
        if (px >= settings.width || py >= settings.height) continue;

        const idx = (py * settings.width + px) * 4;
        const [r, g, b, a] = color(data[i++]);
        pixelBuffer[idx] = r;
        pixelBuffer[idx + 1] = g;
        pixelBuffer[idx + 2] = b;
        pixelBuffer[idx + 3] = a;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  });

  // Completion event
  socket.on("compute_sequential_complete", (msg) => {
    console.log("Completed:", msg);
    if (infoDiv) {
      infoDiv.textContent = `${msg.message} - Completed ${msg.completed_tasks}/${msg.total_tasks} tiles\n`;
      if (msg.was_time_limited) {
        infoDiv.textContent += "Incomplete due to time limit";
        infoDiv.style.color = "orange";
      } else {
        infoDiv.style.color = "green";
      }
    }
  });

  socket.on("compute_sequential_error", (msg) => {
    console.error("Error:", msg);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from Mandelbrot server");
  });

  return socket;
}
