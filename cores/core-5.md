---
toc: false
layout: post
title: "Core 5 — Module 5: Performance & Scaling"
description: "Module 5: Measuring performance through speedup"
permalink: /cores/core-5
breadcrumbs: false
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
    transition: transform 0.3s ease, width 0.3s ease;
}

.info-sidebar.collapsed {
    width: 0;
    transform: translateX(-100%);
    border-right: none;
}

.sidebar-toggle {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 100;
    background: rgba(56, 189, 248, 0.08);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.25);
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s;
    font-weight: 600;
}

.sidebar-toggle:hover {
    background: rgba(56, 189, 248, 0.15);
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
    transform: translateY(-2px);
}

.hamburger-icon {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.hamburger-icon span {
    display: block;
    width: 18px;
    height: 2px;
    background: #38bdf8;
    transition: all 0.3s;
    border-radius: 2px;
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
    gap: 8px;
}

.panel-header:hover {
    background: #1a2332;
    border-left-color: #38bdf8;
}

.panel-header h3 {
    color: #cbd5e1;
    font-size: 0.95rem;
    margin: 0;
    font-weight: 600;
    flex: 1;
    cursor: pointer;
}

.panel-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
    font-weight: 600;
    flex: 1;
}

.panel-actions {
    display: flex;
    gap: 8px;
    align-items: center;
}

.view-more-btn {
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    border: 1px solid #38bdf8;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.view-more-btn:hover {
    background: rgba(56, 189, 248, 0.3);
    transform: translateY(-1px);
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
    padding: 20px 20px;
    overflow-y: auto;
    max-width: calc(100vw - 220px);
    transition: max-width 0.3s ease, padding 0.3s ease;
    position: relative;
}

.page-wrapper:has(.info-sidebar.collapsed) .main-content {
    max-width: 100vw;
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
    padding: 24px;
    padding-top: 90px; /* More space at top for button */
    margin-bottom: 24px;
    box-shadow: 0 8px 32px rgba(56, 189, 248, 0.2);
    position: relative;
}

.activity-title {
    color: #38bdf8;
    font-size: 1.6rem;
    margin-bottom: 20px;
    margin-top: 16px; /* Extra space from button */
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
    background: rgba(168, 85, 247, 0.1);
    color: #c4b5fd;
    border: 1px solid rgba(168, 85, 247, 0.3);
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 600;
    margin-bottom: 20px;
    display: block;
    width: 100%;
    transition: all 0.3s;
}

.help-toggle:hover {
    background: rgba(168, 85, 247, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.25);
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
    padding: 24px;
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
    background: rgba(16, 185, 129, 0.1);
    color: #6ee7b7;
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.add-btn:hover {
    background: rgba(16, 185, 129, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.block {
    padding: 12px 18px;
    margin: 5px;
    background: rgba(56, 189, 248, 0.1);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 8px;
    display: inline-block;
    cursor: grab;
    user-select: none;
    font-weight: bold;
    font-size: 1.1em;
    transition: all 0.3s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.block:hover {
    transform: scale(1.05);
    background: rgba(56, 189, 248, 0.18);
    box-shadow: 0 6px 12px rgba(56, 189, 248, 0.3);
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
    background: rgba(56, 189, 248, 0.1);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.3);
    flex: 1;
}

.compute-btn:hover {
    background: rgba(56, 189, 248, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25);
}

.save-btn {
    background: rgba(16, 185, 129, 0.1);
    color: #6ee7b7;
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.save-btn:hover {
    background: rgba(16, 185, 129, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.show-btn {
    background: rgba(168, 85, 247, 0.1);
    color: #c4b5fd;
    border: 1px solid rgba(168, 85, 247, 0.3);
}

.show-btn:hover {
    background: rgba(168, 85, 247, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.25);
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

/* Modal/Popup Styles */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease;
}

.modal-overlay.active {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal-content {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 2px solid #38bdf8;
    border-radius: 16px;
    max-width: 900px;
    max-height: 85vh;
    width: 100%;
    overflow-y: auto;
    padding: 32px;
    box-shadow: 0 20px 60px rgba(56, 189, 248, 0.3);
    animation: slideUp 0.3s ease;
    position: relative;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translateY(50px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 2px solid #ef4444;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.modal-close:hover {
    background: rgba(239, 68, 68, 0.3);
    transform: rotate(90deg);
}

.modal-title {
    color: #38bdf8;
    font-size: 2rem;
    margin-bottom: 24px;
    padding-right: 50px;
}

.modal-body h4 {
    color: #38bdf8;
    font-size: 1.2rem;
    margin: 20px 0 12px 0;
}

.modal-body p {
    color: #cbd5e1;
    line-height: 1.8;
    margin-bottom: 16px;
}

.modal-body ul {
    color: #cbd5e1;
    margin: 12px 0 12px 20px;
}

.modal-body li {
    margin-bottom: 8px;
    line-height: 1.6;
}

.modal-highlight {
    background: rgba(56, 189, 248, 0.1);
    border-left: 3px solid #38bdf8;
    padding: 16px;
    margin: 16px 0;
    border-radius: 6px;
}

.comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
}

.comparison-card {
    background: rgba(30, 41, 59, 0.5);
    padding: 20px;
    border-radius: 12px;
    border: 2px solid;
}

.comparison-card.parallel {
    border-color: #10b981;
}

.comparison-card.serial {
    border-color: #f59e0b;
}

.comparison-card h5 {
    font-size: 1.3rem;
    margin-bottom: 12px;
}

.comparison-card.parallel h5 {
    color: #10b981;
}

.comparison-card.serial h5 {
    color: #f59e0b;
}

.view-more-btn {
    background: rgba(56, 189, 248, 0.08);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s;
    margin-left: 10px;
}

.view-more-btn:hover {
    background: rgba(56, 189, 248, 0.15);
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.2);
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

/* Modal/Popup Styles */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s;
}

.modal-overlay.active {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.modal-content {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 2px solid #38bdf8;
    border-radius: 16px;
    max-width: 900px;
    max-height: 85vh;
    width: 100%;
    overflow-y: auto;
    padding: 32px;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #334155;
}

.modal-header h2 {
    color: #38bdf8;
    font-size: 2rem;
    margin: 0;
}

.modal-close {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 2px solid #ef4444;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.modal-close:hover {
    background: rgba(239, 68, 68, 0.3);
    transform: rotate(90deg);
}

.modal-body {
    color: #cbd5e1;
    line-height: 1.8;
}

.modal-body h3 {
    color: #38bdf8;
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 1.4rem;
}

.modal-body h4 {
    color: #10b981;
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: 1.1rem;
}

.modal-body ul {
    margin-left: 24px;
    margin-top: 8px;
}

.modal-body li {
    margin-bottom: 8px;
}

.modal-body .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
}

.modal-body .comparison-card {
    background: rgba(30, 41, 59, 0.5);
    padding: 20px;
    border-radius: 12px;
    border: 2px solid;
}

.modal-body .comparison-card.parallel {
    border-color: #10b981;
}

.modal-body .comparison-card.serial {
    border-color: #f59e0b;
}

.modal-body .comparison-card h4 {
    margin-top: 0;
}

</style>
</head>
<body>

<div class="page-wrapper">
    <!-- LEFT SIDEBAR with Information Panels -->
    <div class="info-sidebar collapsed">
        <div class="sidebar-header">
            <h2>📚 Learning Guide</h2>
            <p>Essential Concepts</p>
        </div>

        <!-- Panel 1: What is Speedup? -->
        <div class="info-panel expanded">
            <div class="panel-header">
                <h3 onclick="togglePanel(this.parentElement)">⚡ What is Speedup?</h3>
                <div class="panel-actions">
                    <button class="view-more-btn" onclick="openModal('speedup'); event.stopPropagation();">View More</button>
                    <span class="panel-arrow" onclick="togglePanel(this.parentElement)">▼</span>
                </div>
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
            <div class="panel-header">
                <h3 onclick="togglePanel(this.parentElement)">🔧 How It Works</h3>
                <div class="panel-actions">
                    <button class="view-more-btn" onclick="openModal('howitworks'); event.stopPropagation();">View More</button>
                    <span class="panel-arrow" onclick="togglePanel(this.parentElement)">▼</span>
                </div>
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
            <div class="panel-header">
                <h3 onclick="togglePanel(this.parentElement)">⚙️ Parallel vs Serial</h3>
                <div class="panel-actions">
                    <button class="view-more-btn" onclick="openModal('comparison'); event.stopPropagation();">View More</button>
                    <span class="panel-arrow" onclick="togglePanel(this.parentElement)">▼</span>
                </div>
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
            <div class="panel-header">
                <h3 onclick="togglePanel(this.parentElement)">📊 Amdahl's Law</h3>
                <div class="panel-actions">
                    <button class="view-more-btn" onclick="openModal('amdahl'); event.stopPropagation();">View More</button>
                    <span class="panel-arrow" onclick="togglePanel(this.parentElement)">▼</span>
                </div>
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
            <div class="panel-header">
                <h3 onclick="togglePanel(this.parentElement)">🌍 Real-World Use</h3>
                <div class="panel-actions">
                    <button class="view-more-btn" onclick="openModal('realworld'); event.stopPropagation();">View More</button>
                    <span class="panel-arrow" onclick="togglePanel(this.parentElement)">▼</span>
                </div>
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
        <!-- Sidebar Toggle Button -->
        <button class="sidebar-toggle" onclick="toggleSidebar()">
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span class="toggle-text">Learning Guide</span>
        </button>

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

<!-- Modal Overlay for Detailed Information -->
<div class="modal-overlay" id="modalOverlay" onclick="closeModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
            <h2 id="modalTitle">Title</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" id="modalBody">
            <!-- Content will be dynamically inserted -->
        </div>
    </div>
</div>

<!-- Modal for expanded panel content -->
<div class="modal-overlay" id="modalOverlay" onclick="closeModal()">
    <div class="modal-content" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeModal()">×</button>
        <div id="modalBody"></div>
    </div>
</div>

<script>
// Initialize global variables
window.currentScore = null;

// Initialize default tasks
function initializeDefaultTasks() {
    const taskPool = document.getElementById("taskPool");
    const defaultTasks = [3, 5, 2, 8, 4, 6, 1, 7];
    
    defaultTasks.forEach((time, index) => {
        const block = document.createElement("div");
        block.className = "block";
        block.id = "task-default-" + index;
        block.draggable = true;
        block.ondragstart = drag;
        block.textContent = time;
        taskPool.appendChild(block);
    });
}

// Sidebar toggle function
function toggleSidebar() {
    const sidebar = document.querySelector('.info-sidebar');
    sidebar.classList.toggle('collapsed');
}

// Panel toggle function for sidebar
function togglePanel(header) {
    const panel = header.parentElement;
    panel.classList.toggle('expanded');
}

// Modal functions
function openModal(panelId) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    
    const content = getModalContent(panelId);
    modalBody.innerHTML = content;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function getModalContent(panelId) {
    const contents = {
        'speedup': `
            <h2 class="modal-title">⚡ What is Speedup?</h2>
            <div class="modal-body">
                <p><strong>Speedup</strong> is a fundamental metric in parallel computing that quantifies performance improvement. It measures how much faster a parallel implementation executes compared to a sequential version of the same program.</p>
                
                <div class="modal-highlight">
                    <h4>The Speedup Formula</h4>
                    <div class="formula-display">
                        <div class="formula-text" style="font-size: 1.4rem;">Speedup = T<sub>serial</sub> / T<sub>parallel</sub></div>
                    </div>
                </div>
                
                <h4>Understanding the Terms</h4>
                <ul>
                    <li><strong>T<sub>serial</sub> (Serial Time):</strong> The total execution time when all tasks run sequentially, one after another on a single processor. This is your baseline measurement.</li>
                    <li><strong>T<sub>parallel</sub> (Parallel Time):</strong> The execution time when tasks are distributed across multiple processors and some run simultaneously. This equals the serial portion plus the longest parallel task.</li>
                </ul>
                
                <h4>Interpreting Speedup Values</h4>
                <ul>
                    <li><strong>Speedup > 1:</strong> Success! Your parallel implementation is faster than serial. For example, 2× speedup means the program runs twice as fast.</li>
                    <li><strong>Speedup = 1:</strong> No performance gain. The parallel and serial versions take the same time.</li>
                    <li><strong>Speedup < 1:</strong> Parallel is actually slower due to coordination overhead, communication costs, or poorly parallelizable code.</li>
                </ul>
                
                <div class="modal-highlight">
                    <h4>Real-World Example</h4>
                    <p>Imagine processing 100 images:</p>
                    <ul>
                        <li><strong>Serial:</strong> One processor takes 100 seconds (1 second per image)</li>
                        <li><strong>Parallel (4 cores):</strong> Four processors take 25 seconds</li>
                        <li><strong>Speedup = 100 / 25 = 4×</strong> — You achieved near-perfect scaling!</li>
                    </ul>
                </div>
                
                <h4>Why It Matters</h4>
                <p>Speedup helps you evaluate whether parallelization is worth the effort. High speedup justifies the complexity of parallel programming, while low speedup suggests you might need a different approach or that your problem isn't well-suited for parallelization.</p>
            </div>
        `,
        'howitworks': `
            <h2 class="modal-title">🔧 How It Works</h2>
            <div class="modal-body">
                <p>Understanding how to calculate speedup is essential for evaluating parallel performance. Let's break down the calculation process step by step.</p>
                
                <h4>Step 1: Calculate Serial Time</h4>
                <p>Add up the execution time of ALL tasks as if they ran sequentially:</p>
                <div class="modal-highlight">
                    <code style="font-size: 1.1rem;">T<sub>serial</sub> = task1 + task2 + task3 + ... + taskN</code>
                </div>
                <p><strong>Example:</strong> If you have tasks taking 5, 10, 8, and 12 units:</p>
                <p><code>T<sub>serial</sub> = 5 + 10 + 8 + 12 = 35 units</code></p>
                
                <h4>Step 2: Calculate Parallel Time</h4>
                <p>Parallel time consists of two parts:</p>
                <ul>
                    <li><strong>Serial portion:</strong> Tasks that MUST run sequentially (dependencies, critical sections)</li>
                    <li><strong>Parallel portion:</strong> Tasks that CAN run simultaneously on different processors</li>
                </ul>
                
                <div class="modal-highlight">
                    <code style="font-size: 1.1rem;">T<sub>parallel</sub> = T<sub>serial_portion</sub> + max(T<sub>parallel_tasks</sub>)</code>
                </div>
                
                <p><strong>Example:</strong> From our tasks above:</p>
                <ul>
                    <li>Series tasks: 5, 10 (must run sequentially) = 15 units</li>
                    <li>Parallel tasks: 8, 12 (run simultaneously) = max(8, 12) = 12 units</li>
                    <li><code>T<sub>parallel</sub> = 15 + 12 = 27 units</code></li>
                </ul>
                
                <h4>Step 3: Calculate Speedup</h4>
                <div class="modal-highlight">
                    <code style="font-size: 1.1rem;">Speedup = T<sub>serial</sub> / T<sub>parallel</sub> = 35 / 27 = 1.30×</code>
                </div>
                <p>This means the parallel version is 1.30 times faster — a 30% performance improvement!</p>
                
                <h4>Key Insight: The Parallel Bottleneck</h4>
                <p>When tasks run in parallel, the execution time is determined by the <strong>slowest (longest) task</strong>. Even if you have 10 parallel tasks, if one takes 20 units and the others take 5 units each, you still wait 20 units for the parallel portion to complete.</p>
                
                <div class="modal-highlight">
                    <p><strong>💡 Pro Tip:</strong> To maximize speedup, try to balance parallel tasks so they take similar amounts of time. Unbalanced loads waste processor time!</p>
                </div>
            </div>
        `,
        'comparison': `
            <h2 class="modal-title">⚖️ Parallel vs Serial</h2>
            <div class="modal-body">
                <p>Let's dive deep into the fundamental differences between parallel and serial execution, including their advantages, disadvantages, and when to use each approach.</p>
                
                <div class="comparison-grid">
                    <div class="comparison-card parallel">
                        <h5>⚡ Parallel Execution</h5>
                        <p><strong>Definition:</strong> Multiple tasks execute simultaneously across multiple CPU cores or processors.</p>
                        
                        <h4>How It Works</h4>
                        <p>Tasks are distributed to different processing units that work concurrently. When one core processes Task A, another core simultaneously processes Task B.</p>
                        
                        <h4>✅ Advantages</h4>
                        <ul>
                            <li><strong>Speed:</strong> Dramatically reduces execution time for large workloads</li>
                            <li><strong>Efficiency:</strong> Utilizes all available CPU cores instead of leaving them idle</li>
                            <li><strong>Scalability:</strong> Performance improves as you add more processors</li>
                            <li><strong>Throughput:</strong> Can process more work in the same amount of time</li>
                            <li><strong>Real-time responsiveness:</strong> Background tasks don't block UI</li>
                        </ul>
                        
                        <h4>❌ Disadvantages</h4>
                        <ul>
                            <li><strong>Complexity:</strong> Harder to write, debug, and maintain parallel code</li>
                            <li><strong>Communication overhead:</strong> Cores must coordinate and share data</li>
                            <li><strong>Synchronization costs:</strong> Locks, barriers, and thread management add overhead</li>
                            <li><strong>Race conditions:</strong> Bugs from simultaneous access to shared resources</li>
                            <li><strong>Load balancing:</strong> Uneven work distribution wastes resources</li>
                            <li><strong>Not always faster:</strong> For small tasks, overhead exceeds benefits</li>
                        </ul>
                        
                        <h4>Best For</h4>
                        <ul>
                            <li>Large datasets (image/video processing, data analysis)</li>
                            <li>Independent tasks (web scraping, batch processing)</li>
                            <li>CPU-intensive computations (simulations, rendering)</li>
                            <li>Real-time systems requiring responsiveness</li>
                        </ul>
                    </div>
                    
                    <div class="comparison-card serial">
                        <h5>🔄 Serial Execution</h5>
                        <p><strong>Definition:</strong> Tasks execute one after another in sequence on a single CPU core.</p>
                        
                        <h4>How It Works</h4>
                        <p>Each task must complete before the next one begins. The processor focuses entirely on one task at a time, following a linear execution path.</p>
                        
                        <h4>✅ Advantages</h4>
                        <ul>
                            <li><strong>Simplicity:</strong> Easy to write, understand, and debug</li>
                            <li><strong>No overhead:</strong> No synchronization or communication costs</li>
                            <li><strong>Predictable:</strong> Deterministic execution order and timing</li>
                            <li><strong>No race conditions:</strong> No concurrency bugs to worry about</li>
                            <li><strong>Better for small tasks:</strong> Faster when overhead would dominate</li>
                            <li><strong>Sequential dependencies:</strong> Natural fit for dependent operations</li>
                        </ul>
                        
                        <h4>❌ Disadvantages</h4>
                        <ul>
                            <li><strong>Slow:</strong> Total time is sum of all task times</li>
                            <li><strong>Underutilization:</strong> Wastes available CPU cores</li>
                            <li><strong>No scalability:</strong> Can't benefit from additional processors</li>
                            <li><strong>Blocking:</strong> Long tasks prevent other work from starting</li>
                            <li><strong>Poor responsiveness:</strong> UI freezes during heavy computation</li>
                        </ul>
                        
                        <h4>Best For</h4>
                        <ul>
                            <li>Small, quick tasks where overhead matters</li>
                            <li>Operations with dependencies (must run in order)</li>
                            <li>Simple scripts and prototypes</li>
                            <li>I/O-bound operations (disk, network)</li>
                        </ul>
                    </div>
                </div>
                
                <div class="modal-highlight">
                    <h4>🎯 Choosing the Right Approach</h4>
                    <p><strong>Use Parallel When:</strong></p>
                    <ul>
                        <li>Tasks are independent (no dependencies)</li>
                        <li>Tasks are large enough that overhead is negligible</li>
                        <li>You have multiple cores available</li>
                        <li>Performance is critical</li>
                    </ul>
                    <p><strong>Use Serial When:</strong></p>
                    <ul>
                        <li>Tasks have dependencies (must run in order)</li>
                        <li>Tasks are very small (overhead would dominate)</li>
                        <li>Simplicity and maintainability are priorities</li>
                        <li>You're prototyping or debugging</li>
                    </ul>
                </div>
            </div>
        `,
        'amdahl': `
            <h2 class="modal-title">📊 Amdahl's Law</h2>
            <div class="modal-body">
                <p><strong>Amdahl's Law</strong> is the fundamental theoretical limit on speedup in parallel computing. It reveals a sobering truth: even with infinite processors, you can't achieve infinite speedup.</p>
                
                <div class="modal-highlight">
                    <h4>The Law</h4>
                    <div class="formula-display">
                        <div class="formula-text" style="font-size: 1.3rem;">
                            Maximum Speedup = 1 / (S + P/N)
                        </div>
                    </div>
                    <p style="margin-top: 12px;">Where:</p>
                    <ul>
                        <li><strong>S</strong> = Fraction of program that must be serial (0 to 1)</li>
                        <li><strong>P</strong> = Fraction of program that can be parallelized (0 to 1)</li>
                        <li><strong>N</strong> = Number of processors</li>
                        <li><strong>S + P = 1</strong> (they must sum to 100%)</li>
                    </ul>
                </div>
                
                <h4>Why This Matters</h4>
                <p>The serial portion of your program creates a fundamental bottleneck. No matter how many processors you add, you're still limited by the time spent in the serial section.</p>
                
                <div class="modal-highlight">
                    <h4>Example: The 10% Serial Bottleneck</h4>
                    <p>Suppose 10% of your program must run serially, and 90% can be parallelized:</p>
                    <ul>
                        <li><strong>With 2 processors:</strong> Speedup = 1 / (0.1 + 0.9/2) = 1.82×</li>
                        <li><strong>With 10 processors:</strong> Speedup = 1 / (0.1 + 0.9/10) = 5.26×</li>
                        <li><strong>With 100 processors:</strong> Speedup = 1 / (0.1 + 0.9/100) = 9.17×</li>
                        <li><strong>With ∞ processors:</strong> Speedup = 1 / 0.1 = <strong>10× maximum!</strong></li>
                    </ul>
                    <p><strong>Key Insight:</strong> Even with unlimited processors, that 10% serial portion caps your speedup at 10×. You can never exceed this limit!</p>
                </div>
                
                <h4>The Brutal Reality</h4>
                <p>Let's see how different serial fractions limit maximum speedup:</p>
                <ul>
                    <li><strong>1% serial:</strong> Max speedup = 100× (excellent!)</li>
                    <li><strong>5% serial:</strong> Max speedup = 20× (good)</li>
                    <li><strong>10% serial:</strong> Max speedup = 10× (okay)</li>
                    <li><strong>25% serial:</strong> Max speedup = 4× (disappointing)</li>
                    <li><strong>50% serial:</strong> Max speedup = 2× (barely worth it)</li>
                </ul>
                
                <div class="modal-highlight">
                    <h4>💡 Practical Implications</h4>
                    <ul>
                        <li><strong>Optimize the serial portion first:</strong> Reducing serial execution time has the biggest impact on maximum speedup</li>
                        <li><strong>Identify parallelizable sections:</strong> Profile your code to find what can actually run in parallel</li>
                        <li><strong>Don't over-parallelize:</strong> Adding more processors has diminishing returns</li>
                        <li><strong>Focus on algorithms:</strong> Sometimes a better serial algorithm beats a parallel one</li>
                    </ul>
                </div>
                
                <h4>Real-World Example: Video Encoding</h4>
                <p>Video encoding is highly parallelizable, but still has serial portions:</p>
                <ul>
                    <li><strong>Serial (5%):</strong> File I/O, initialization, final output writing</li>
                    <li><strong>Parallel (95%):</strong> Encoding individual frames</li>
                    <li><strong>Maximum speedup:</strong> 20× with infinite cores</li>
                    <li><strong>In practice:</strong> With 16 cores, you achieve ~13× speedup, which is 65% of the theoretical maximum</li>
                </ul>
                
                <p>This is why optimizing I/O and reducing serial bottlenecks is crucial in video processing pipelines!</p>
            </div>
        `,
        'realworld': `
            <h2 class="modal-title">🌍 Real-World Applications</h2>
            <div class="modal-body">
                <p>Speedup and parallel computing aren't just theoretical concepts — they power the technology we use every day. Let's explore real-world applications where parallelization makes a dramatic difference.</p>
                
                <h4>1. Video Games & Graphics Rendering 🎮</h4>
                <div class="modal-highlight">
                    <p><strong>The Challenge:</strong> Modern games render millions of polygons and pixels 60-120 times per second.</p>
                    <p><strong>Parallel Solution:</strong> GPUs have thousands of cores that process pixels simultaneously.</p>
                    <ul>
                        <li><strong>Serial approach:</strong> Would take seconds to render a single frame</li>
                        <li><strong>Parallel (GPU):</strong> Renders complex frames in 8-16ms</li>
                        <li><strong>Speedup:</strong> 100-1000× depending on scene complexity</li>
                    </ul>
                    <p><strong>Example:</strong> A GPU with 3,000 cores can process 3,000 pixels simultaneously, making real-time ray tracing possible.</p>
                </div>
                
                <h4>2. Machine Learning & AI 🤖</h4>
                <div class="modal-highlight">
                    <p><strong>The Challenge:</strong> Training neural networks involves billions of mathematical operations.</p>
                    <p><strong>Parallel Solution:</strong> Distribute computations across multiple GPUs or TPUs.</p>
                    <ul>
                        <li><strong>Serial approach:</strong> Training GPT-3 would take decades on a single CPU</li>
                        <li><strong>Parallel (1000+ GPUs):</strong> Completes in weeks to months</li>
                        <li><strong>Speedup:</strong> 10,000-100,000×</li>
                    </ul>
                    <p><strong>Example:</strong> Meta's LLaMA models trained on clusters with 2,000+ GPUs, reducing training time from years to weeks.</p>
                </div>
                
                <h4>3. Weather Forecasting 🌤️</h4>
                <div class="modal-highlight">
                    <p><strong>The Challenge:</strong> Simulating atmospheric conditions requires solving millions of differential equations.</p>
                    <p><strong>Parallel Solution:</strong> Divide the globe into grid cells, each processed by different cores.</p>
                    <ul>
                        <li><strong>Serial approach:</strong> Next-day forecast would arrive next week</li>
                        <li><strong>Parallel (supercomputers):</strong> 7-day forecast in hours</li>
                        <li><strong>Speedup:</strong> 1,000-10,000×</li>
                    </ul>
                    <p><strong>Example:</strong> NOAA's supercomputers use 8,000+ cores to run weather models, processing 30 petabytes of data daily.</p>
                </div>
                
                <h4>4. Movie Visual Effects 🎬</h4>
                <div class="modal-highlight">
                    <p><strong>The Challenge:</strong> Rendering photorealistic CGI requires ray tracing millions of light paths.</p>
                    <p><strong>Parallel Solution:</strong> Render farms with thousands of servers process frames in parallel.</p>
                    <ul>
                        <li><strong>Serial approach:</strong> A single frame could take days</li>
                        <li><strong>Parallel (render farm):</strong> Complete movie in weeks</li>
                        <li><strong>Speedup:</strong> 10,000-100,000×</li>
                    </ul>
                    <p><strong>Example:</strong> Pixar's RenderMan uses 2,000+ servers. A single frame of "Toy Story 4" took 60-100 hours on one core, but with parallelization, they rendered the entire movie in manageable time.</p>
                </div>
                
                <h4>5. Scientific Simulations 🔬</h4>
                <div class="modal-highlight">
                    <p><strong>The Challenge:</strong> Simulating molecular interactions, galaxy formation, or protein folding.</p>
                    <p><strong>Parallel Solution:</strong> Supercomputers with millions of cores work on different parts of the simulation.</p>
                    <ul>
                        <li><strong>Example - Protein Folding (Folding@home):</strong> Distributed computing across 1 million+ devices achieved speedup equivalent to 100,000-1,000,000× over a single machine</li>
                        <li><strong>Example - Black Hole Simulation:</strong> Took months on 128 supercomputer nodes to generate the first black hole image</li>
                    </ul>
                </div>
                
                <h4>6. Web Search Engines 🔍</h4>
                <div class="modal-highlight">
                    <p><strong>The Challenge:</strong> Indexing billions of web pages and serving results in milliseconds.</p>
                    <p><strong>Parallel Solution:</strong> Distributed search across thousands of servers, with each handling a portion of the index.</p>
                    <ul>
                        <li><strong>Google's approach:</strong> Your search query hits 1,000+ servers simultaneously</li>
                        <li><strong>Result:</strong> Searches across 40+ billion pages in under 200ms</li>
                        <li><strong>Speedup:</strong> Would be impossible serially</li>
                    </ul>
                </div>
                
                <h4>7. Financial Trading 💰</h4>
                <div class="modal-highlight">
                    <p><strong>The Challenge:</strong> Analyzing market data and executing trades in microseconds.</p>
                    <p><strong>Parallel Solution:</strong> FPGAs and multi-core systems process market feeds in parallel.</p>
                    <ul>
                        <li><strong>High-frequency trading:</strong> Analyzes millions of data points simultaneously</li>
                        <li><strong>Speedup advantage:</strong> Being 1 microsecond faster than competitors means millions in profit</li>
                    </ul>
                </div>
                
                <div class="modal-highlight">
                    <h4>💡 The Bottom Line</h4>
                    <p>In all these applications, parallelization isn't just about making things faster — it makes previously impossible problems solvable. Without parallel computing:</p>
                    <ul>
                        <li>We wouldn't have modern video games or movies</li>
                        <li>AI and machine learning would still be science fiction</li>
                        <li>Weather forecasts would be useless</li>
                        <li>Scientific breakthroughs would take decades longer</li>
                    </ul>
                    <p><strong>Understanding speedup helps you recognize when and how to apply parallelization to solve real-world problems efficiently.</strong></p>
                </div>
            </div>
        `
    };
    
    return contents[panelId] || '<p>Content not found</p>';
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

    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
    console.log('✅ currentScore set:', window.currentScore);
}

function saveRun() {
    console.log('=== SAVE RUN DEBUG ===');
    console.log('window.currentScore:', window.currentScore);
    console.log('Type of currentScore:', typeof window.currentScore);
    
    if (!window.currentScore) {
        console.log('❌ FAILED: currentScore is null/undefined');
        alert("Please compute speedup first before saving!");
        return;
    }
    
    console.log('speedup value:', window.currentScore.speedup);
    console.log('speedup type:', typeof window.currentScore.speedup);
    
    if (typeof window.currentScore.speedup !== 'number') {
        console.log('❌ FAILED: speedup is not a number');
        alert("Please compute speedup first before saving!");
        return;
    }
    
    console.log('✅ PASSED validation, showing prompt');
    const name = prompt("Enter a name for this run:");
    if(!name) return;

    savedRuns.push({name, ...window.currentScore, timestamp: new Date().toLocaleString()});
    alert(`✅ Run "${name}" saved successfully! (Speedup: ${window.currentScore.speedup.toFixed(2)}×)`);
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