---
title: "Core 2 Day 1"
description: "API spec for the Rustism concurrency endpoint"
permalink: /core-2/day1
---

General endpoint spec (taken from doc comment):
```py
"""
uery Parameters:
    width (int): Image width in pixels (default: 800)
    height (int): Image height in pixels (default: 600)
    tile_w (int): Tile width (default: 64)
    tile_h (int): Tile height (default: 64)
    max_iter (int): Maximum iterations for Mandelbrot (default: 256)
    time_limit_ms (int): Time limit in milliseconds (default: 2000)
    num_threads (int): Number of threads to use (default: 4)

Returns:
    JSON with task records and performance metrics

Example:
    GET /api/compute/concurrent?num_threads=8&max_iter=128
"""
```
