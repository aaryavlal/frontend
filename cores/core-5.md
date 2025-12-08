---
toc: true
layout: post
title: "Core 5 — Module 5: Performance & Scaling"
description: "Module 5: Measuring performance, scalability and trade-offs"
permalink: /cores/core-5
breadcrumbs: true
---

<html lang="en">
<head>
<meta charset="UTF-8">
<title>Speedup Drag & Drop Game</title>
<style>
body {
    background: #0f172a;
    color: #e2e8f0;
    font-family: system-ui, sans-serif;
    padding: 20px;
}
h1 { color: #38bdf8; }
.card {
    max-width: 650px;
    margin: auto;
    background: #1e293b;
    padding: 20px;
    border-radius: 10px;
}
.block {
    padding: 8px 12px;
    margin: 5px;
    background: #4caf50;
    color: white;
    border-radius: 6px;
    display: inline-block;
    cursor: grab;
    user-select: none;
}
.row {
    min-height: 50px;
    background: #334155;
    border-radius: 8px;
    margin: 10px 0;
    padding: 10px;
}
.row-title {
    font-weight: bold;
    margin-bottom: 5px;
}
button {
    margin: 5px;
    padding: 8px 12px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    font-weight: 600;
}
#computeBtn { background: #38bdf8; color: #0f172a; }
#saveRunBtn { background: #4CAF50; color: white; }
#savedRunsBtn { background: #2196F3; color: white; }
#results, #savedRuns { margin-top: 10px; white-space: pre-wrap; }
</style>
</head>
<body>
<div class="card">
<h1>⚡ Speedup Drag & Drop Game</h1>

<div>
    <label>New Task Time: </label>
    <input id="newTaskTime" type="number" min="1" placeholder="e.g. 5">
    <button onclick="addTask()">Add Task</button>
</div>

<div class="row" id="taskPool">
    <div class="row-title">Task Pool (Drag tasks below)</div>
</div>

<div class="row" id="seriesRow" ondrop="drop(event)" ondragover="allowDrop(event)">
    <div class="row-title">Series Row</div>
</div>

<div class="row" id="parallelRow" ondrop="drop(event)" ondragover="allowDrop(event)">
    <div class="row-title">Parallel Row</div>
</div>

<button id="computeBtn" onclick="computeSpeedup()">Compute Speedup</button>
<button id="saveRunBtn" onclick="saveRun()">Save Run</button>
<button id="savedRunsBtn" onclick="showSavedRuns()">Show Saved Runs </button>  <!-- calling studenty devolped producure through button triggers--->


<pre id="results">Results will appear here</pre>
<pre id="savedRuns">No runs saved yet</pre>
</div>

<script>
// ------------------- Core Logic -------------------
let leaderboard = [];
let savedRuns = [];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let elem = document.getElementById(data);
    ev.target.appendChild(elem);
}

function addTask() {
    const val = parseInt(document.getElementById('newTaskTime').value); // This is the user input into the system by adding task time
    if(isNaN(val) || val < 1) { alert("Enter valid task time"); return; }

    const block = document.createElement("div");
    block.className = "block";
    block.id = "task" + Date.now();
    block.draggable = true; // further user input to drag and order the task timing
    block.ondragstart = drag;
    block.textContent = val;
    document.getElementById("taskPool").appendChild(block);
    document.getElementById('newTaskTime').value = "";
}

function computeSpeedup() {
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children) // List of task times per row
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));

    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    const speedup = serialTime / parallelTime; // all of these are functions that are used to compute the speed up time

    document.getElementById("results").textContent =
        `Series Tasks: ${seriesBlocks}\nParallel Tasks: ${parallelBlocks}\nSerial Time: ${serialTime}\nParallel Time: ${parallelTime}\nSpeedup: ${speedup.toFixed(3)}`; // Displays task arrangement, serial/parallel runtime, speedup. Showing output to user based on computations. 

    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}

// ------------------- Save Run -------------------
function saveRun() {
    if(!window.currentScore) { alert("Compute speedup first!"); return; }
    const name = prompt("Enter a name for this run:");
    if(!name) return;

    savedRuns.push({name, ...window.currentScore});
    alert("Run saved!");
}

function showSavedRuns() {
    if(savedRuns.length === 0) {
        document.getElementById("savedRuns").textContent = "No runs saved yet";
        return;
    }

    let text = "Saved Runs:\n"; // Saved runs are stored as a list
    savedRuns.forEach((run,i)=>{
        text += `${i+1}. ${run.name} - Speedup ${run.speedup.toFixed(3)} (S=${run.serialTime}, P=${run.parallelTime})\n`;
        text += `   Series: [${run.seriesBlocks}], Parallel: [${run.parallelBlocks}]\n`;
    });
    document.getElementById("savedRuns").textContent = text;
}
</script>
</body>
</html>



[Back to Prototype Room](/prototyperoomcode)
