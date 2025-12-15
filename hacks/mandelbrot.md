---
layout: post
title: Mandelbrot Test
permalink: /mandelbrot
---

<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script src="{{site.baseurl}}/assets/js/mandelbrot.js"></script>

<canvas id="naive-mandelbrot"></canvas>
<div id="naive-mandelbrot-info" style="margin-top: 10px; font-family: monospace;"></div>

<script>
document.addEventListener("DOMContentLoaded", () => {
    initMandelbrot({
        canvasId: "naive-mandelbrot",
        serverUrl: "http://localhost:8500",
        width: 800,
        height: 600,
        tile_w: 64,
        tile_h: 64,
        max_iter: 1000,
        time_limit_ms: 500
    });
});
</script>
