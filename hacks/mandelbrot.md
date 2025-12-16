---
layout: post
title: Mandelbrot Test
permalink: /mandelbrot
---

<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script src="{{site.baseurl}}/assets/js/mandelbrot.js"></script>

<canvas id="sequential-mandelbrot"></canvas>
<div id="sequential-mandelbrot-info" style="margin-top: 10px; font-family: monospace;"></div>

<script>
document.addEventListener("DOMContentLoaded", () => {
    initMandelbrot({
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
});
</script>

<canvas id="sequential-mandelbrot"></canvas>
<div id="sequential-mandelbrot-info" style="margin-top: 10px; font-family: monospace;"></div>

<script>
document.addEventListener("DOMContentLoaded", () => {
    initMandelbrot({
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
});
</script>
