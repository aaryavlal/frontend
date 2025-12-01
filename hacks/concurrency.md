---
toc: true
layout: post
title: Intro to Concurrency
description: A (ferrous) intro to concurrency in programming
permalink: /concurrency
breadcrumbs: true
---

## Introduction 
*Concurrency* is a way of structuring a program so that it can handle multiple tasks seemingly *at the same time* by interleaving their execution.

> Imagine a single chef (the processor core) juggling cooking different dishes (tasks), pausing one to stir another, and then going back to the first. It's about **managing** multiple tasks that are in progress to make progress on all of them, which is crucial for high performance systems like web servers that handle many user requests simultaneously.

## Concurrency vs. Parallelism

While often used interchangeably, concurrency and parallelism have a key distinction:
- **Concurrency** is about *dealing with many things at once (composition)* by interleaving execution. 
- **Parallelism** is about *doing many things at once (execution)* by physically executing multiple tasks simultaneously on multiple processor cores or machines.

<html>
<head>
<title>Concurrency vs Parallelism Demo</title>
<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .scenario {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
    }
    .task-bar {
        height: 25px;
        border-radius: 3px;
        margin-top: 5px;
        position: relative;
        background-color: #f0f0f0;
    }
    .progress {
        position: absolute;
        height: 100%;
        width: 0%;
        transition: width 0.3s linear;
        border-radius: 3px;
    }
    .task-A { background-color: #4CAF50; } /* Green */
    .task-B { background-color: #2196F3; } /* Blue */
</style>
</head>
<body>
<div class="container">
    <p>Click a scenario to see how Task A (Green) and Task B (Blue) are executed.</p>
    <div class="scenario" onclick="runSequential()">
        <h3>1. Sequential (No Concurrency/Parallelism) - 1 Core</h3>
        <div class="task-bar"><div id="seq-A" class="progress task-A"></div></div>
        <div class="task-bar"><div id="seq-B" class="progress task-B"></div></div>
    </div>
    <div class="scenario" onclick="runConcurrent()">
        <h3>2. Concurrent (Time-Slicing) - 1 Core</h3>
        <div class="task-bar"><div id="conc-A" class="progress task-A"></div></div>
        <div class="task-bar"><div id="conc-B" class="progress task-B"></div></div>
    </div>
    <div class="scenario" onclick="runParallel()">
        <h3>3. Parallel - 2 Cores</h3>
        <div class="task-bar"><div id="par-A" class="progress task-A"></div></div>
        <div class="task-bar"><div id="par-B" class="progress task-B"></div></div>
    </div>
</div>

<script>
    const totalTime = 3000; // Total time for both tasks to complete in ms

    function resetBars(prefix) {
        document.getElementById(prefix + '-A').style.width = '0%';
        document.getElementById(prefix + '-B').style.width = '0%';
    }

    // Scenario 1: Sequential Execution (Task A finishes, then Task B starts)
    function runSequential() {
        resetBars('seq');
        let barA = document.getElementById('seq-A');
        let barB = document.getElementById('seq-B');
        
        // Task A runs for half the total time
        barA.style.transitionDuration = (totalTime / 2) + 'ms';
        barA.style.width = '100%';

        // Task B starts after Task A is visually complete
        setTimeout(() => {
            barB.style.transitionDuration = (totalTime / 2) + 'ms';
            barB.style.width = '100%';
        }, totalTime / 2 + 50); // Add small delay
    }

    // Scenario 2: Concurrent Execution (Tasks switch back and forth on one core)
    function runConcurrent() {
        resetBars('conc');
        let barA = document.getElementById('conc-A');
        let barB = document.getElementById('conc-B');
        let progressA = 0;
        let progressB = 0;
        let switchCount = 0;
        const totalSwitches = 10;
        const timeSlice = totalTime / totalSwitches;

        function step() {
            if (switchCount < totalSwitches) {
                if (switchCount % 2 === 0) {
                    // Task A runs for a slice
                    progressA += 100 / totalSwitches;
                    barA.style.width = progressA + '%';
                } else {
                    // Task B runs for a slice
                    progressB += 100 / totalSwitches;
                    barB.style.width = progressB + '%';
                }
                switchCount++;
                setTimeout(step, timeSlice);
            }
        }
        step();
    }

    // Scenario 3: Parallel Execution (Tasks run truly simultaneously on two cores)
    function runParallel() {
        resetBars('par');
        let barA = document.getElementById('par-A');
        let barB = document.getElementById('par-B');

        // Both tasks run for the same duration, completing at the same time
        barA.style.transitionDuration = (totalTime / 2) + 'ms';
        barB.style.transitionDuration = (totalTime / 2) + 'ms';

        barA.style.width = '100%';
        barB.style.width = '100%';
    }
</script>
</body>
</html>
