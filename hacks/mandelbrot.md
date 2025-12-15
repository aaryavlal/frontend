---
layout: post
title: Mandelbrot Test
permalink: /mandelbrot
---

<canvas id="mandelbrot" width="800" height="600"></canvas>
<div id="info" style="margin-top: 10px; font-family: monospace;"></div>

<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mandelbrot");
    const ctx = canvas.getContext("2d");
    const infoDiv = document.getElementById("info");
    const width = canvas.width;
    const height = canvas.height;
    
    const imageData = ctx.createImageData(width, height);
    const pixelBuffer = imageData.data;
    
    // Fill canvas with gray to show incomplete areas
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, width, height);
    
    // Grayscale color mapping
    function color(iter, maxIter=256) {
        const v = iter === maxIter ? 0 : 255 - Math.floor(255 * iter / maxIter);
        return [v, v, v, 255];
    }
    
    // Connect to Flask SocketIO
    // Will have to update condition checks in the future
    // Also, note that we'll need both app.py and socket_server.py to be running
    const socket = io("http://localhost:8500");
    
    socket.on("connect", () => {
        console.log("Connected to server!");
        
        // Trigger computation after connection
        socket.emit("compute_sequential_stream", {
            width: width,
            height: height,
            tile_w: 64,
            tile_h: 64,
            max_iter: 1000,
            time_limit_ms: 500,
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
                if (px >= width || py >= height) continue;
                
                const idx = (py * width + px) * 4;
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
        infoDiv.textContent = `${msg.message} - Completed ${msg.completed_tasks}/${msg.total_tasks} tiles\n`;
            if (msg.was_time_limited) {
                infoDiv.textContent += "Incomplete due to time limit";
                infoDiv.style.color = "orange";
            } else {
                infoDiv.style.color = "green";
            }
    });
    
    socket.on("compute_sequential_error", (msg) => {
        console.error("Error:", msg);
    });
    
    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });
});
</script>
