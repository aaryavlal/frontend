---
toc: true
layout: post
title: "Core 5 — Module 5: Performance & Scaling"
description: "Module 5: Measuring performance though speedup"
permalink: /cores/core-5
breadcrumbs: true
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Speedup Formula - Interactive Learning</title>
<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
    font-family: 'Segoe UI', system-ui, sans-serif;
    padding: 20px;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: auto;
}

h1 {
    color: #38bdf8;
    text-align: center;
    margin-bottom: 10px;
    font-size: 2.5em;
}

.subtitle {
    text-align: center;
    color: #94a3b8;
    margin-bottom: 30px;
    font-size: 1.1em;
}

/* Educational Section */
.section {
    background: #1e293b;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 25px;
    border: 2px solid #334155;
}

.section h2 {
    color: #38bdf8;
    margin-bottom: 15px;
    font-size: 1.8em;
}

.formula-box {
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    margin: 15px 0;
    border-left: 4px solid #38bdf8;
}

.formula {
    font-size: 1.5em;
    text-align: center;
    color: #fbbf24;
    font-family: 'Courier New', monospace;
    margin: 15px 0;
}

.interactive-formula {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 20px 0;
    flex-wrap: wrap;
}

.formula-part {
    padding: 12px 20px;
    background: #334155;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    border: 2px solid transparent;
}

.formula-part:hover {
    background: #475569;
    border-color: #38bdf8;
    transform: scale(1.05);
}

.formula-part.active {
    background: #38bdf8;
    color: #0f172a;
    font-weight: bold;
}

.explanation {
    background: #334155;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    display: none;
}

.explanation.visible {
    display: block;
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Help Section */
.help-toggle {
    background: #8b5cf6;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 600;
    margin-bottom: 20px;
    display: block;
    width: 100%;
    transition: background 0.3s;
}

.help-toggle:hover {
    background: #7c3aed;
}

.help-content {
    display: none;
    background: #312e81;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.help-content.visible {
    display: block;
}

.step {
    background: #1e293b;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    border-left: 4px solid #8b5cf6;
}

.step-number {
    color: #a78bfa;
    font-weight: bold;
    font-size: 1.2em;
}

/* Game Section */

.game-card {
    background: linear-gradient(180deg, rgba(30,41,59,0.98), rgba(17,24,39,0.95));
    padding: 28px;
    border-radius: 14px;
    border: 2px solid rgba(51,65,85,0.6);
    box-shadow: 0 8px 24px rgba(2,6,23,0.6);
    transition: transform 220ms ease, box-shadow 220ms ease;
}

.game-card.featured {
    border: 3px solid #fbbf24;
    box-shadow: 0 18px 40px rgba(251,191,36,0.12);
    transform: translateY(-6px);
}

/* Make the interactive activity pop visually */
.game-card.highlight {
    border: 3px solid #fbbf24;
    box-shadow: 0 10px 30px rgba(251,191,36,0.12);
    transform: translateY(-4px);
}

/* live visual speedup panel */
.live-panel {
    margin-top: 16px;
    padding: 12px;
    background: linear-gradient(90deg, rgba(59,130,246,0.06), rgba(249,115,22,0.03));
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1px solid rgba(255,255,255,0.04);
}
.speed-big {
    font-family: 'Courier New', monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #fbbf24;
    min-width: 96px;
    text-align: center;
}
.speed-bar {
    flex: 1;
    height: 18px;
    background: rgba(255,255,255,0.06);
    border-radius: 999px;
    overflow: hidden;
}
.speed-bar-inner {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg,#10b981,#38bdf8,#fbbf24);
    transition: width 450ms ease;
}
.speed-label {
    font-size: 0.9rem;
    color: #94a3b8;
    min-width: 140px;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: center;
}

.controls input {
    padding: 10px;
    border: 2px solid #475569;
    border-radius: 6px;
    background: #0f172a;
    color: #e2e8f0;
    font-size: 1em;
    width: 150px;
}

.controls button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1em;
}

.add-btn {
    background: #10b981;
    color: white;
}

.add-btn:hover {
    background: #059669;
    transform: translateY(-2px);
}

.block {
    padding: 12px 18px;
    margin: 5px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-radius: 8px;
    display: inline-block;
    cursor: grab;
    user-select: none;
    font-weight: bold;
    font-size: 1.1em;
    transition: all 0.3s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.block:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0,0,0,0.4);
}

.block:active {
    cursor: grabbing;
}

.block.dragging {
    opacity: 0.5;
}

.row {
    min-height: 80px;
    background: #334155;
    border-radius: 10px;
    margin: 15px 0;
    padding: 15px;
    border: 3px dashed transparent;
    transition: all 0.3s;
}

.row.drag-over {
    border-color: #38bdf8;
    background: #475569;
}

.row.highlight-target {
    border-color: #fbbf24;
    background: #475569;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.row-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #38bdf8;
    font-size: 1.2em;
}

.row-hint {
    font-size: 0.9em;
    color: #94a3b8;
    font-style: italic;
}

.action-buttons {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
}

.action-buttons button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1em;
    transition: all 0.3s;
}

.compute-btn {
    background: #38bdf8;
    color: #0f172a;
    flex: 1;
}

.compute-btn:hover {
    background: #0ea5e9;
    transform: translateY(-2px);
}

.save-btn {
    background: #10b981;
    color: white;
}

.save-btn:hover {
    background: #059669;
}

.show-btn {
    background: #2196F3;
    color: white;
}

.show-btn:hover {
    background: #1976D2;
}

.results {
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    border: 2px solid #334155;
    min-height: 100px;
}

.results.has-results {
    border-color: #10b981;
}

.saved-runs {
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    max-height: 300px;
    overflow-y: auto;
}

.tip {
    background: #1e40af;
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    border-left: 4px solid #3b82f6;
}

.tip-icon {
    color: #60a5fa;
    font-weight: bold;
    margin-right: 8px;
}
</style>
</head>
<body>
<div class="container">
    <h1>⚡ Speedup Formula</h1>
    <p class="subtitle">Interactive Learning Module: Understanding Parallel Computing Performance</p>

    <!-- Educational Content collapsed so the activity leads learning -->
    <div class="section">
        <h2>Quick idea</h2>
        <p>Speedup compares a fully sequential run to a parallel arrangement — try the activity below and watch the live visual feedback.</p>

        <details style="margin-top:12px; background:#0f172a; padding:12px; border-radius:8px;">
            <summary style="color:#94a3b8; cursor:pointer;">More about speedup (click to expand)</summary>
            <div style="margin-top:10px; color:#cbd5e1;">
                <p><strong>T<sub>serial</sub> (Serial Time):</strong> The total time when all tasks run one after another, sequentially. This is your baseline.</p>
                <p><strong>T<sub>parallel</sub> (Parallel Time):</strong> The time when some tasks run simultaneously — equals the series time plus the longest parallel task.</p>
                <p><strong>Speedup:</strong> Speedup = T<sub>serial</sub> / T<sub>parallel</sub>. A value &gt;1 means your parallel arrangement is faster.</p>
            </div>
        </details>

        <div class="formula-box" style="margin-top:12px;">
            <p style="text-align: center; color: #94a3b8; margin-bottom: 6px;">Formula</p>
            <div class="formula">Speedup = T<sub>serial</sub> / T<sub>parallel</sub></div>
        </div>
    </div>

    <!-- Technical Details -->
    <div class="section">
        <h2>How Parallel vs Serial Execution Works</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div style="background: #0f172a; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                <h3 style="color: #10b981; margin-bottom: 10px;">Parallel Execution</h3>
                <p><strong>How it works:</strong> Multiple CPU cores execute tasks simultaneously.</p>
                <p style="margin-top: 10px;"><strong>Advantages:</strong></p>
                <ul style="margin-left: 20px;">
                    <li>Dramatically reduces execution time</li>
                    <li>Uses multiple CPU cores efficiently</li>
                    <li>Ideal for independent tasks</li>
                </ul>
                <p style="margin-top: 10px;"><strong>Disadvantages:</strong></p>
                <ul style="margin-left: 20px;">
                    <li>Communication overhead between cores</li>
                    <li>Synchronization costs for coordination</li>
                    <li>Requires task independence</li>
                    <li>Diminishing returns with more cores</li>
                </ul>
            </div>

            <div style="background: #0f172a; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <h3 style="color: #f59e0b; margin-bottom: 10px;">Serial Execution</h3>
                <p><strong>How it works:</strong> Tasks execute one after another on a single CPU core.</p>
                <p style="margin-top: 10px;"><strong>Advantages:</strong></p>
                <ul style="margin-left: 20px;">
                    <li>No communication overhead</li>
                    <li>Simpler to implement and debug</li>
                    <li>Faster for small tasks</li>
                </ul>
                <p style="margin-top: 10px;"><strong>Disadvantages:</strong></p>
                <ul style="margin-left: 20px;">
                    <li>Uses only one CPU core</li>
                    <li>Total time is sum of all tasks</li>
                    <li>Wastes multi-core potential</li>
                </ul>
            </div>
        </div>

        <div class="tip">
            <strong>Key Insight:</strong> Parallel isn't always faster. For small tasks, coordination overhead can exceed time saved. Serial execution is often more efficient when tasks are quick or dependent on each other.
        </div>

        <div style="background: #0f172a; padding: 20px; border-radius: 8px; margin-top: 15px;">
            <h3 style="color: #38bdf8; margin-bottom: 10px;">Amdahl's Law: The Parallel Computing Reality Check</h3>
            <p>Even with infinite processors, you can't achieve infinite speedup. Why? Because some parts of your program must run serially. If 10% of your code must be serial, your maximum possible speedup is 10×, no matter how many cores you have.</p>
            <div class="formula" style="font-size: 1.2em; margin: 15px 0;">
                Maximum Speedup = 1 / (serial_fraction + parallel_fraction / num_processors)
            </div>
            <p style="color: #94a3b8; font-style: italic;">This is why identifying which tasks can truly run in parallel is crucial for performance optimization.</p>
        </div>
    </div>

    <!-- Help content will be moved inside the interactive game so learners see the activity first -->

    <!-- Interactive Game (featured) -->
    <div class="section">
        <h2>Interactive Speedup Game</h2>
        
        <div class="game-card featured" id="mainGameCard">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:10px;">
                <div style="display:flex; gap:12px; align-items:center;">
                    <label style="color: #94a3b8;">Task Time:</label>
                    <input id="newTaskTime" type="number" min="1" placeholder="e.g. 5, 10, 15">
                    <button class="add-btn" onclick="addTask()">Add Task</button>
                </div>
                <div style="text-align:right; color:#9ca3af; font-size:0.95em;">Tip: Drag tasks into rows to model dependencies and test arrangements.</div>
            </div>

            <div style="display:flex; gap:12px; margin-bottom:12px;">
                <div class="row" id="taskPool" style="flex:1;">
                    <div class="row-title">Task Pool</div>
                    <div class="row-hint">Drag tasks from here into the rows below</div>
                </div>
            </div>

            <div class="row" id="seriesRow" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div class="row-title">Series Row</div>
                <div class="row-hint">Run sequentially (dependent tasks)</div>
            </div>

            <div class="row" id="parallelRow" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div class="row-title">Parallel Row</div>
                <div class="row-hint">Run concurrently (independent tasks)</div>
            </div>

            <div class="action-buttons">
                <button class="compute-btn" onclick="computeSpeedup()">Compute Speedup</button>
                <button class="save-btn" onclick="saveRun()">Save Run</button>
                <button class="show-btn" onclick="showSavedRuns()">Show Saved Runs</button>
            </div>

            <div style="display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
                <div class="live-panel" id="livePanel" aria-live="polite" style="flex:1; min-width:280px;">
                    <div class="speed-big" id="speedBig">—</div>
                    <div class="speed-bar" aria-hidden="true" style="margin:0 12px; flex:1;"><div class="speed-bar-inner" id="speedBarInner"></div></div>
                    <div class="speed-label" id="speedLabel">No data yet — compute speedup</div>
                </div>
                <div style="width:280px;">
                    <button class="help-toggle" onclick="toggleHelp()" style="width:100%;">How to Use</button>
                    <div id="helpContent" class="help-content" style="margin-top:10px;">
                        <div class="step"><span class="step-number">1.</span> Add tasks with times and drag them into rows.</div>
                        <div class="step"><span class="step-number">2.</span> Series = sequential; Parallel = independent.</div>
                        <div class="step"><span class="step-number">3.</span> Click Compute to see speedup and save runs for comparison.</div>
                    </div>
                </div>
            </div>

            <div id="results" class="results" style="margin-top:14px;">Results will appear here after you compute speedup...</div>
            <div id="savedRuns" class="saved-runs" style="display:none;">No runs saved yet</div>
        </div>
    </div>

    <!-- Technical Details moved below the interactive game and collapsed -->
    <div class="section">
        <details open style="background:#0f172a; padding:16px; border-radius:8px;">
            <summary style="color:#94a3b8; cursor:pointer; font-size:1.1em;">How Parallel vs Serial Execution Works (details)</summary>
            <div style="margin-top:12px; color:#cbd5e1;">
                <p><strong>Parallel Execution:</strong> Multiple CPU cores execute tasks simultaneously. Advantages: reduces time, uses cores efficiently. Disadvantages: communication and synchronization overhead.</p>
                <p><strong>Serial Execution:</strong> Tasks run one after another. Advantages: simpler, no coordination cost. Disadvantages: uses only one core and can be slower overall.</p>
                <p style="margin-top:10px;"><strong>Amdahl's Law:</strong> Theoretical limit on speedup due to serial portions of a program. Identify parallelizable parts to maximize gains.</p>
            </div>
        </details>
    </div>
</div>

<script>
let savedRuns = [];
let currentlyDragging = null;

function toggleExplanation(type) {
    const explanations = ['serial', 'parallel', 'speedup'];
    explanations.forEach(exp => {
        const elem = document.getElementById(`exp-${exp}`);
        const part = document.querySelector(`.formula-part[onclick="toggleExplanation('${exp}')"]`);
        if (exp === type) {
            elem.classList.toggle('visible');
            part.classList.toggle('active');
        } else {
            elem.classList.remove('visible');
            part.classList.remove('active');
        }
    });
}

function toggleHelp() {
    const helpContent = document.getElementById('helpContent');
    helpContent.classList.toggle('visible');
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('drag-over');
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add('dragging');
    currentlyDragging = ev.target;
    
    // Highlight valid drop zones
    document.getElementById('seriesRow').classList.add('highlight-target');
    document.getElementById('parallelRow').classList.add('highlight-target');
}

function drop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('drag-over');
    
    let data = ev.dataTransfer.getData("text");
    let elem = document.getElementById(data);
    
    // Only append if dropping on a row, not on another block
    if (ev.target.classList.contains('row') || ev.target.classList.contains('row-title') || ev.target.classList.contains('row-hint')) {
        let targetRow = ev.target.closest('.row');
        if (targetRow) {
            targetRow.appendChild(elem);
        }
    }
    
    elem.classList.remove('dragging');
    removeHighlights();
}

function removeHighlights() {
    document.querySelectorAll('.row').forEach(row => {
        row.classList.remove('drag-over', 'highlight-target');
    });
}

// Remove highlights when drag ends
document.addEventListener('dragend', function(ev) {
    if (ev.target.classList.contains('block')) {
        ev.target.classList.remove('dragging');
        removeHighlights();
    }
});

function addTask() {
    const val = parseInt(document.getElementById('newTaskTime').value);
    if(isNaN(val) || val < 1) {
        alert("Please enter a valid task time (positive number)");
        return;
    }

    const block = document.createElement("div");
    block.className = "block";
    block.id = "task" + Date.now();
    block.draggable = true;
    block.ondragstart = drag;
    block.textContent = val;
    document.getElementById("taskPool").appendChild(block);
    document.getElementById('newTaskTime').value = "";
}

function computeSpeedup() {
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));

    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    const resultsElem = document.getElementById("results");
    resultsElem.className = "results has-results";
    resultsElem.textContent = 
        `RESULTS\n` +
        `${'='.repeat(50)}\n\n` +
        `Series Tasks: [${seriesBlocks.join(', ') || 'none'}]\n` +
        `Parallel Tasks: [${parallelBlocks.join(', ') || 'none'}]\n\n` +
        `Serial Time (all sequential): ${serialTime} units\n` +
        `Parallel Time (with parallelism): ${parallelTime} units\n\n` +
        `Speedup: ${speedup.toFixed(3)}×\n\n` +
        `${speedup > 1 ? 'Success! You achieved speedup through parallelization.' : 'No speedup gained - try moving more tasks to parallel row.'}`; 

    // update live visual panel
    const speedBig = document.getElementById('speedBig');
    const speedBarInner = document.getElementById('speedBarInner');
    const speedLabel = document.getElementById('speedLabel');
    const pct = Math.min(200, Math.max(0, Math.round(speedup * 50))); // scale factor for bar (50% per 1x)
    speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
    speedBarInner.style.width = pct + '%';
    speedLabel.textContent = speedup > 1 ? 'Nice — parallelism helped!' : 'No speedup yet — try moving tasks to parallel.';

    // lightly highlight the game card to show result
    const gameCard = document.querySelector('.game-card');
    gameCard.classList.add('highlight');
    setTimeout(()=> gameCard.classList.remove('highlight'), 900);

    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}

function saveRun() {
    if(!window.currentScore) {
        alert("Please compute speedup first");
        return;
    }
    const name = prompt("Enter a name for this run:");
    if(!name) return;

    savedRuns.push({name, ...window.currentScore, timestamp: new Date().toLocaleString()});
    alert("Run saved successfully");
}

function showSavedRuns() {
    const savedRunsElem = document.getElementById("savedRuns");
    
    if(savedRuns.length === 0) {
        savedRunsElem.textContent = "No runs saved yet. Compute a speedup and save it.";
        savedRunsElem.style.display = "block";
        return;
    }

    let text = `SAVED RUNS (${savedRuns.length} total)\n${'='.repeat(60)}\n\n`;
    savedRuns.forEach((run,i)=>{
        text += `${i+1}. ${run.name} - ${run.timestamp}\n`;
        text += `   Speedup: ${run.speedup.toFixed(3)}× (Serial: ${run.serialTime}, Parallel: ${run.parallelTime})\n`;
        text += `   Series: [${run.seriesBlocks.join(', ') || 'none'}]\n`;
        text += `   Parallel: [${run.parallelBlocks.join(', ') || 'none'}]\n\n`;
    });
    
    savedRunsElem.textContent = text;
    savedRunsElem.style.display = "block";
}

// Add some initial example tasks
window.addEventListener('load', function() {
    const examples = [10, 5, 8, 3];
    examples.forEach(val => {
        const block = document.createElement("div");
        block.className = "block";
        block.id = "task" + Date.now() + Math.random();
        block.draggable = true;
        block.ondragstart = drag;
        block.textContent = val;
        document.getElementById("taskPool").appendChild(block);
    });
});
</script>
</body>
</html>