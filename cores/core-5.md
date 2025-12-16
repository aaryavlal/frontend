---
toc: false
layout: post
title: "Core 5 — Module 5: Performance & Scaling"
description: "Module 5: Measuring performance through speedup"
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
    background: linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%);
    color: #e2e8f0;
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
}

.page-wrapper {
    display: flex;
    min-height: 100vh;
    max-width: 100vw;
}

/* LEFT SIDEBAR - Information Panels */
.info-sidebar {
    width: 220px;
    background: #0f1419;
    border-right: 2px solid #1e293b;
    overflow-y: auto;
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
}

.sidebar-header {
    padding: 24px 20px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-bottom: 2px solid #38bdf8;
}

.sidebar-header h2 {
    color: #38bdf8;
    font-size: 1.3rem;
    margin-bottom: 6px;
    font-weight: 700;
}

.sidebar-header p {
    color: #94a3b8;
    font-size: 0.85rem;
}

.info-panel {
    border-bottom: 1px solid #1e293b;
    overflow: hidden;
}

.panel-header {
    padding: 16px 20px;
    background: #0f172a;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
    border-left: 3px solid transparent;
}

.panel-header:hover {
    background: #1a2332;
    border-left-color: #38bdf8;
}

.panel-header h3 {
    color: #cbd5e1;
    font-size: 0.95rem;
    font-weight: 600;
}

.panel-arrow {
    color: #38bdf8;
    font-size: 1.2rem;
    transition: transform 0.3s;
}

.info-panel.expanded .panel-arrow {
    transform: rotate(180deg);
}

.panel-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    background: #0a0e1a;
}

.info-panel.expanded .panel-content {
    max-height: 600px;
    overflow-y: auto;
}

.panel-body {
    padding: 16px 20px;
}

.panel-body h4 {
    color: #38bdf8;
    font-size: 0.9rem;
    margin: 12px 0 8px 0;
    font-weight: 600;
}

.panel-body p {
    color: #cbd5e1;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-bottom: 10px;
}

.panel-body ul {
    margin: 8px 0 12px 20px;
}

.panel-body li {
    color: #94a3b8;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 6px;
}

.panel-body strong {
    color: #e2e8f0;
}

.highlight-box {
    background: rgba(56, 189, 248, 0.1);
    border-left: 3px solid #38bdf8;
    padding: 12px;
    margin: 12px 0;
    border-radius: 4px;
}

.formula-display {
    background: #1e293b;
    padding: 16px;
    border-radius: 6px;
    text-align: center;
    margin: 12px 0;
    border: 1px solid #334155;
}

.formula-display .formula-text {
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
    color: #fbbf24;
    font-weight: 600;
}

/* MAIN CONTENT AREA */
.main-content {
    flex: 1;
    padding: 20px 8px;
    overflow-y: auto;
    max-width: calc(100vw - 220px);
}

.content-header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 2px solid #1e293b;
}

.content-header h1 {
    color: #38bdf8;
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 800;
    text-shadow: 0 2px 20px rgba(56, 189, 248, 0.3);
}

.content-header .subtitle {
    color: #94a3b8;
    font-size: 1.1rem;
    font-weight: 500;
}

/* ACTIVITY CARD - Main Focus */
.activity-card {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 2px solid #38bdf8;
    border-radius: 16px;
    padding: 20px 8px;
    margin-bottom: 24px;
    box-shadow: 0 8px 32px rgba(56, 189, 248, 0.2);
}

.activity-title {
    color: #38bdf8;
    font-size: 1.6rem;
    margin-bottom: 20px;
    font-weight: 700;
    text-align: center;
}

.activity-intro {
    background: rgba(56, 189, 248, 0.05);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    border-left: 4px solid #38bdf8;
}

.activity-intro p {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.7;
}

/* Live Speedup Panel */
.live-panel {
    background: linear-gradient(135deg, #1e293b, #0f172a);
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 20px;
    border: 2px solid #10b981;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
}

.live-panel-title {
    color: #10b981;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.speed-display {
    padding: 16px;
    background: rgba(16, 185, 129, 0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.speed-big {
    font-family: 'Courier New', monospace;
    font-size: 3rem;
    font-weight: 800;
    color: #fbbf24;
    min-width: 120px;
    text-align: center;
    text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}

.speed-bar {
    flex: 1;
    height: 28px;
    background: rgba(255,255,255,0.08);
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid rgba(255,255,255,0.1);
}

.speed-bar-inner {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #10b981, #38bdf8, #fbbf24);
    transition: width 500ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

.speed-label {
    font-size: 1rem;
    color: #cbd5e1;
    min-width: 180px;
    font-weight: 500;
}

/* Game Area */
.game-area {
    background: #0a0e1a;
    padding: 28px;
    border-radius: 12px;
    border: 1px solid #1e293b;
}

.game-section-title {
    color: #38bdf8;
    font-size: 1.2rem;
    margin-bottom: 16px;
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 2px solid #1e293b;
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
    padding: 20px 12px;
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

.drag-area.highlight-target {
    border-color: #10b981;
    border-style: solid;
    background: rgba(16, 185, 129, 0.1);
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
    gap: 8px;
    margin: 16px 0;
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

/* Additional Styles */
.controls {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    align-items: center;
}

.controls input {
    padding: 12px 16px;
    border: 2px solid #334155;
    border-radius: 8px;
    background: #1e293b;
    color: #e2e8f0;
    font-size: 1rem;
    width: 160px;
    transition: all 0.3s;
}

.controls input:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}

.controls button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.add-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.compute-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.compute-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.save-btn {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
}

.save-btn:hover {
    transform: translateY(-2px);
}

.show-btn {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
}

.show-btn:hover {
    transform: translateY(-2px);
}

/* Task Blocks */
.block {
    padding: 14px 20px;
    margin: 6px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-radius: 10px;
    display: inline-block;
    cursor: grab;
    user-select: none;
    font-weight: 700;
    font-size: 1.2rem;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.block:hover {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

.block:active {
    cursor: grabbing;
    transform: scale(0.95);
}

.block.dragging {
    opacity: 0.4;
    transform: rotate(5deg);
}

/* Drag & Drop Areas */
.drag-area {
    background: rgba(30, 41, 59, 0.5);
    padding: 24px;
    border-radius: 12px;
    min-height: 140px;
    margin-bottom: 20px;
    border: 2px dashed #334155;
    transition: all 0.3s;
}

.drag-area:hover {
    background: rgba(30, 41, 59, 0.7);
    border-color: #475569;
}

.drag-area.drag-over {
    background: rgba(56, 189, 248, 0.1);
    border-color: #38bdf8;
    border-style: solid;
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
}

.area-label {
    display: block;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

#taskPool .area-label {
    color: #10b981;
}

#seriesRow .area-label {
    color: #f59e0b;
}

#parallelRow .area-label {
    color: #10b981;
}

.area-hint {
    color: #64748b;
    font-size: 0.85rem;
    display: block;
    margin-top: 8px;
    font-style: italic;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .info-sidebar {
        width: 200px;
    }
    
    .main-content {
        max-width: calc(100vw - 200px);
        padding: 20px 8px;
    }
}

@media (max-width: 968px) {
    .page-wrapper {
        flex-direction: column;
    }
    
    .info-sidebar {
        width: 100%;
        height: auto;
        position: static;
        border-right: none;
        border-bottom: 2px solid #1e293b;
    }
    
    .main-content {
        max-width: 100%;
        padding: 16px 12px;
    }
    
    .content-header h1 {
        font-size: 2.2rem;
    }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: #0a0e1a;
}

::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: #475569;
}
</style>
</head>
<body>

<div class="page-wrapper">
    <!-- LEFT SIDEBAR with Information Panels -->
    <div class="info-sidebar">
        <div class="sidebar-header">
            <h2>📚 Learning Guide</h2>
            <p>Essential Concepts</p>
        </div>

        <!-- Panel 1: What is Speedup? -->
        <div class="info-panel expanded">
            <div class="panel-header" onclick="togglePanel(this)">
                <h3>⚡ What is Speedup?</h3>
                <span class="panel-arrow">▼</span>
            </div>
            <div class="panel-content">
                <div class="panel-body">
                    <p><strong>Speedup</strong> measures how much faster a parallel implementation runs compared to a sequential one.</p>
                    
                    <div class="formula-display">
                        <div class="formula-text">Speedup = T<sub>serial</sub> / T<sub>parallel</sub></div>
                    </div>
                    
                    <h4>Key Terms</h4>
                    <ul>
                        <li><strong>T<sub>serial</sub></strong>: Total time if all tasks run sequentially (one after another)</li>
                        <li><strong>T<sub>parallel</sub></strong>: Time with parallelization (some tasks run simultaneously)</li>
                        <li><strong>Speedup > 1</strong>: Parallel is faster!</li>
                        <li><strong>Speedup = 1</strong>: No improvement</li>
                        <li><strong>Speedup < 1</strong>: Parallel is slower (overhead costs)</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Panel 2: How It Works -->
        <div class="info-panel">
            <div class="panel-header" onclick="togglePanel(this)">
                <h3>🔧 How It Works</h3>
                <span class="panel-arrow">▼</span>
            </div>
            <div class="panel-content">
                <div class="panel-body">
                    <h4>Serial Execution</h4>
                    <p>All tasks execute one after another on a single processor. Total time = sum of all task times.</p>
                    
                    <div class="highlight-box">
                        <p><strong>Example:</strong> Tasks [10, 5, 8, 3]<br>
                        Serial Time = 10 + 5 + 8 + 3 = 26 units</p>
                    </div>
                    
                    <h4>Parallel Execution</h4>
                    <p>Some tasks can run simultaneously on multiple processors. Series tasks still run sequentially, but parallel tasks overlap.</p>
                    
                    <div class="highlight-box">
                        <p><strong>Example:</strong> Series [10] + Parallel [5, 8, 3]<br>
                        Parallel Time = 10 + max(5, 8, 3) = 10 + 8 = 18 units<br>
                        <strong>Speedup = 26 / 18 = 1.44×</strong></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Panel 3: Parallel vs Serial -->
        <div class="info-panel">
            <div class="panel-header" onclick="togglePanel(this)">
                <h3>⚙️ Parallel vs Serial</h3>
                <span class="panel-arrow">▼</span>
            </div>
            <div class="panel-content">
                <div class="panel-body">
                    <h4>Parallel Computing</h4>
                    <p><strong>Advantages:</strong></p>
                    <ul>
                        <li>Faster execution for large tasks</li>
                        <li>Utilizes multiple CPU cores</li>
                        <li>Ideal for independent operations</li>
                    </ul>
                    <p><strong>Disadvantages:</strong></p>
                    <ul>
                        <li>Communication overhead</li>
                        <li>Synchronization costs</li>
                        <li>Not all tasks can parallelize</li>
                    </ul>

                    <h4>Serial Computing</h4>
                    <p><strong>Advantages:</strong></p>
                    <ul>
                        <li>Simple to implement</li>
                        <li>No coordination overhead</li>
                        <li>Faster for small tasks</li>
                    </ul>
                    <p><strong>Disadvantages:</strong></p>
                    <ul>
                        <li>Uses only one processor</li>
                        <li>Slow for large workloads</li>
                        <li>Wastes available cores</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Panel 4: Amdahl's Law -->
        <div class="info-panel">
            <div class="panel-header" onclick="togglePanel(this)">
                <h3>📊 Amdahl's Law</h3>
                <span class="panel-arrow">▼</span>
            </div>
            <div class="panel-content">
                <div class="panel-body">
                    <p><strong>Amdahl's Law</strong> shows the theoretical speedup limit based on the portion of code that can be parallelized.</p>
                    
                    <div class="formula-display">
                        <div class="formula-text" style="font-size: 0.9rem;">Speedup = 1 / [(1 - P) + (P / N)]</div>
                    </div>
                    
                    <p><strong>Where:</strong></p>
                    <ul>
                        <li><strong>P</strong> = Fraction that can be parallelized (0 to 1)</li>
                        <li><strong>N</strong> = Number of processors</li>
                    </ul>
                    
                    <div class="highlight-box">
                        <p><strong>Key Insight:</strong> If only 50% of your program can be parallelized, even with infinite processors, max speedup is only 2×!</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Panel 5: Real-World Examples -->
        <div class="info-panel">
            <div class="panel-header" onclick="togglePanel(this)">
                <h3>🌍 Real-World Use</h3>
                <span class="panel-arrow">▼</span>
            </div>
            <div class="panel-content">
                <div class="panel-body">
                    <h4>Where Parallel Computing Shines</h4>
                    <ul>
                        <li><strong>Video Rendering:</strong> Process each frame independently</li>
                        <li><strong>Scientific Simulations:</strong> Run calculations simultaneously</li>
                        <li><strong>Web Servers:</strong> Handle multiple requests at once</li>
                        <li><strong>Machine Learning:</strong> Train models with parallel processing</li>
                        <li><strong>Graphics (GPUs):</strong> Thousands of cores rendering pixels</li>
                    </ul>
                    
                    <h4>When Serial is Better</h4>
                    <ul>
                        <li>Small, quick tasks (overhead > benefit)</li>
                        <li>Sequential dependencies (step 2 needs step 1 result)</li>
                        <li>Simple programs on single-core systems</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- MAIN CONTENT AREA -->
    <div class="main-content">
        <div class="content-header">
            <h1>⚡ Interactive Speedup Calculator</h1>
            <p class="subtitle">Explore parallel computing performance through hands-on experimentation</p>
        </div>

        <!-- Main Activity Card -->
        <div class="activity-card">
            <h2 class="activity-title">🎮 Drag & Drop Activity</h2>
            
            <div class="activity-intro">
                <p><strong>How to use:</strong> Create tasks by entering a time value and clicking "Add Task". Then drag tasks from the Task Pool into either the Series Row (sequential) or Parallel Row (simultaneous). Click "Compute Speedup" to see the performance improvement!</p>
            </div>

            <!-- Live Speedup Display -->
            <div class="live-panel">
                <div class="live-panel-title">🔴 LIVE SPEEDUP MONITOR</div>
                <div class="speed-display">
                    <div class="speed-big" id="speedBig">—</div>
                    <div class="speed-bar">
                        <div class="speed-bar-inner" id="speedBarInner"></div>
                    </div>
                    <div class="speed-label" id="speedLabel">Ready to compute</div>
                </div>
            </div>

            <!-- Game Area -->
            <div class="game-area">
                <div class="controls">
                    <input type="number" id="newTaskTime" placeholder="Task time" min="1" value="10">
                    <button class="add-btn" onclick="addTask()">➕ Add Task</button>
                    <button class="compute-btn" onclick="computeSpeedup()">⚡ Compute Speedup</button>
                    <button class="save-btn" onclick="saveRun()">💾 Save Run</button>
                    <button class="show-btn" onclick="showSavedRuns()">📊 Show Saved</button>
                </div>

                <h3 class="game-section-title">📦 Task Pool</h3>
                <div class="drag-area" id="taskPool" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <span class="area-label">Available Tasks</span>
                    <span class="area-hint">Drag tasks from here to series or parallel rows below</span>
                </div>

                <h3 class="game-section-title">🔄 Series Row (Sequential)</h3>
                <div class="drag-area" id="seriesRow" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <span class="area-label">Series Tasks (Run One After Another)</span>
                    <span class="area-hint">These tasks execute sequentially - total time = sum of all</span>
                </div>

                <h3 class="game-section-title">⚡ Parallel Row (Simultaneous)</h3>
                <div class="drag-area" id="parallelRow" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <span class="area-label">Parallel Tasks (Run At Same Time)</span>
                    <span class="area-hint">These tasks execute simultaneously - time = longest task</span>
                </div>

                <div id="results" class="results"></div>
                <div id="savedRuns" class="saved-runs"></div>
            </div>
        </div>
    </div>
</div>

<script>
// Panel toggle function for sidebar
function togglePanel(header) {
    const panel = header.parentElement;
    panel.classList.toggle('expanded');
}

// Drag and Drop Functionality
let savedRuns = [];
let currentlyDragging = null;

function allowDrop(ev) {
    ev.preventDefault();
    // Find the closest drag-area container and add drag-over class
    let targetArea = ev.target.closest('.drag-area');
    if (targetArea) {
        targetArea.classList.add('drag-over');
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add('dragging');
    currentlyDragging = ev.target;
    
    // Highlight valid drop zones
    document.getElementById('seriesRow').classList.add('highlight-target');
    document.getElementById('parallelRow').classList.add('highlight-target');
    document.getElementById('taskPool').classList.add('highlight-target');
}

function drop(ev) {
    ev.preventDefault();
    
    let data = ev.dataTransfer.getData("text");
    let elem = document.getElementById(data);
    
    // Find the closest drag-area container
    let targetArea = ev.target.closest('.drag-area');
    
    // If we found a drag area, append the element to it
    if (targetArea && elem) {
        targetArea.appendChild(elem);
        elem.classList.remove('dragging');
    }
    
    removeHighlights();
}

function removeHighlights() {
    document.querySelectorAll('.drag-area').forEach(area => {
        area.classList.remove('drag-over', 'highlight-target');
    });
}

// Remove highlights when drag ends
document.addEventListener('dragend', function(ev) {
    if (ev.target.classList.contains('block')) {
        ev.target.classList.remove('dragging');
        removeHighlights();
    }
});

// Remove drag-over when leaving a drop zone
document.addEventListener('dragleave', function(ev) {
    let targetArea = ev.target.closest('.drag-area');
    if (targetArea) {
        targetArea.classList.remove('drag-over');
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