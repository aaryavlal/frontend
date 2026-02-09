---
toc: false
layout: post
title: "Core 5 — Hardware Havoc"
description: "Module 5: Understanding hardware performance and parallel computing"
permalink: /cores/core-5
breadcrumbs: false
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hardware Havoc - Interactive Performance Learning</title>
<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
                radial-gradient(circle at 20% 20%, rgba(0,255,170,0.08), transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0,212,255,0.06), transparent 50%),
                #0a0e14;
    color: #e0e6ed;
    font-family: 'Courier New', 'Consolas', monospace;
    line-height: 1.6;
    overflow-x: hidden;
    letter-spacing: 0.3px;
}

/* Welcome Overlay */
.welcome-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 14, 20, 0.95);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.5s ease-out;
}

.welcome-overlay.hidden {
    display: none;
}

.welcome-box {
    background: linear-gradient(135deg, #1a2028 0%, #0f1419 100%);
    border: 3px solid #00ffaa;
    border-radius: 16px;
    padding: 40px;
    max-width: 700px;
    box-shadow: 0 20px 60px rgba(0,255,170,0.3), 0 0 100px rgba(0,255,170,0.1);
    animation: slideUp 0.6s ease-out;
    text-align: center;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        transform: translateY(50px);
        opacity: 0;
    }
    to { 
        transform: translateY(0);
        opacity: 1;
    }
}

.welcome-box h1 {
    color: #00ffaa;
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 0 20px rgba(0,255,170,0.6);
}

.welcome-box p {
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 16px;
    text-align: left;
}

.welcome-box .highlight {
    color: #38bdf8;
    font-weight: 600;
}

.welcome-box ul {
    text-align: left;
    margin: 20px 0;
    padding-left: 30px;
}

.welcome-box li {
    color: #94a3b8;
    margin-bottom: 12px;
    font-size: 1rem;
}

.start-btn {
    background: linear-gradient(135deg, #00ffaa 0%, #00d4ff 100%);
    color: #0a0e14;
    border: none;
    padding: 16px 48px;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,255,170,0.4);
}

.start-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,255,170,0.6);
}

.page-wrapper {
    display: flex;
    min-height: 100vh;
    max-width: 100vw;
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
    .page-wrapper {
        flex-direction: column;
    }
    .info-sidebar {
        width: 100%;
        height: auto;
        border-right: none;
        border-bottom: 2px solid #1e293b;
    }
    .main-content {
        max-width: 100vw !important;
    }
}

@media (max-width: 768px) {
    .welcome-box {
        padding: 24px;
        margin: 20px;
    }
    .welcome-box h1 {
        font-size: 1.8rem;
    }
    .welcome-box p {
        font-size: 0.95rem;
    }
    .content-header h1 {
        font-size: 1.8rem;
    }
    .sidebar-toggle {
        top: 10px;
        left: 10px;
        padding: 8px 12px;
        font-size: 0.75rem;
    }
}

@media (max-width: 480px) {
    .welcome-box {
        padding: 20px;
        margin: 10px;
    }
    .welcome-box h1 {
        font-size: 1.5rem;
    }
    .start-btn {
        padding: 12px 32px;
        font-size: 1rem;
    }
}

/* LEFT SIDEBAR - Information Panels */
.info-sidebar {
    width: 200px;
    background: linear-gradient(180deg, #0f1419 0%, #0a0e14 100%);
    border-right: 3px solid #00ffaa;
    overflow-y: auto;
    position: relative;
    height: 100vh;
    flex-shrink: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 2px 0 20px rgba(0,255,170,0.1);
}

.info-sidebar.collapsed {
    width: 0;
    min-width: 0;
    border-right: none;
    overflow: hidden;
    box-shadow: none;
}

.info-sidebar::-webkit-scrollbar {
    width: 8px;
}

.info-sidebar::-webkit-scrollbar-track {
    background: #0a0e14;
}

.info-sidebar::-webkit-scrollbar-thumb {
    background: #38bdf8;
    border-radius: 4px;
}

.info-sidebar::-webkit-scrollbar-thumb:hover {
    background: #00ffaa;
}

.sidebar-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
    background: linear-gradient(135deg, rgba(0,255,170,0.15), rgba(0,212,255,0.15));
    color: #00ffaa;
    border: 2px solid #00ffaa;
    border-radius: 8px;
    padding: 12px 20px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0,255,170,0.2);
}

.sidebar-toggle:hover {
    background: linear-gradient(135deg, rgba(0,255,170,0.25), rgba(0,212,255,0.25));
    box-shadow: 0 0 20px rgba(0,255,170,0.6), 0 0 40px rgba(0,255,170,0.3), 0 6px 20px rgba(0,255,170,0.3);
    text-shadow: 0 0 12px #00ffaa;
    transform: translateY(-3px) scale(1.05);
}

.sidebar-toggle:active {
    transform: translateY(-1px) scale(1.02);
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
    background: #00ffaa;
    transition: all 0.3s;
    border-radius: 1px;
    box-shadow: 0 0 5px rgba(0,255,170,0.5);
}

.sidebar-header {
    padding: 8px 10px;
    background: linear-gradient(135deg, rgba(0,255,170,0.1) 0%, rgba(0,212,255,0.05) 100%);
    border-bottom: 2px solid #00ffaa;
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(10px);
}

.sidebar-header h2 {
    color: #00ffaa;
    font-size: 0.85rem;
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-shadow: 0 0 10px rgba(0,255,170,0.5);
}

.sidebar-header p {
    display: none;
}

.info-panel {
    margin: 3px 6px;
    border-radius: 4px;
    background: rgba(15,23,42,0.4);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(56,189,248,0.2);
}

.info-panel:hover {
    background: rgba(15,23,42,0.8);
    border-color: #38bdf8;
    transform: translateX(4px);
    box-shadow: 0 4px 15px rgba(56,189,248,0.3);
}

.panel-header {
    padding: 6px 8px;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
}

.panel-header h3 {
    color: #e2e8f0;
    font-size: 0.75rem;
    margin: 0;
    font-weight: 600;
    flex: 1;
    letter-spacing: 0;
    transition: all 0.3s ease;
    line-height: 1.1;
}

.info-panel:hover .panel-header h3 {
    color: #fff;
    text-shadow: 0 0 8px rgba(56,189,248,0.4);
}

/* Panel content removed - all info appears in modals */

.highlight-box {
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%);
    border-left: 4px solid #38bdf8;
    padding: 16px;
    margin: 16px 0;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(56,189,248,0.1);
    position: relative;
    overflow: hidden;
}

.highlight-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, rgba(56,189,248,0.05) 100%);
    pointer-events: none;
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
    color: #00ffaa;
    font-size: 2.4rem;
    margin-bottom: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 0 20px rgba(0,255,170,0.6);
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

/* CPU Collection Animation */
.cpu-collection {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #1a2028 0%, #0f1419 100%);
    border: 3px solid #00ffaa;
    border-radius: 16px;
    padding: 40px;
    text-align: center;
    z-index: 9999;
    box-shadow: 0 20px 60px rgba(0,255,170,0.4);
    display: none;
    animation: popIn 0.5s ease-out;
}

.cpu-collection.show {
    display: block;
}

/* Progress Tracker */
.progress-tracker {
    background: rgba(26, 32, 40, 0.6);
    border: 2px solid #38bdf8;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    text-align: center;
}

.progress-tracker h4 {
    color: #38bdf8;
    font-size: 1rem;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.progress-bar-container {
    background: #1e293b;
    border-radius: 8px;
    height: 24px;
    overflow: hidden;
    position: relative;
    margin-bottom: 8px;
}

.progress-bar-fill {
    background: linear-gradient(90deg, #00ffaa 0%, #00d4ff 100%);
    height: 100%;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: #0a0e14;
}

.progress-text {
    color: #94a3b8;
    font-size: 0.85rem;
}

@keyframes popIn {
    0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

.cpu-icon {
    font-size: 5rem;
    margin-bottom: 20px;
    animation: spin 2s ease-in-out;
}

@keyframes spin {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    50% { transform: rotate(-15deg); }
    75% { transform: rotate(10deg); }
}

.cpu-collection h2 {
    color: #00ffaa;
    font-size: 2rem;
    margin-bottom: 16px;
    text-shadow: 0 0 15px rgba(0,255,170,0.6);
}

.cpu-collection p {
    color: #cbd5e1;
    font-size: 1.1rem;
    margin-bottom: 12px;
}

.cpu-count {
    color: #38bdf8;
    font-size: 3rem;
    font-weight: 800;
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.8);
    margin: 20px 0;
}

.collect-btn {
    background: linear-gradient(135deg, #00ffaa 0%, #00d4ff 100%);
    color: #0a0e14;
    border: none;
    padding: 16px 40px;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,255,170,0.4);
}

.collect-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,255,170,0.6);
}

/* Fractal Hint Section */
.fractal-hint {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
    border: 2px solid #a855f7;
    border-radius: 12px;
    padding: 30px;
    margin: 40px 0;
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.2);
}

.fractal-hint h2 {
    color: #c4b5fd;
    font-size: 1.8rem;
    margin-bottom: 16px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.fractal-hint p {
    color: #cbd5e1;
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 16px;
}

.fractal-hint .highlight {
    color: #fbbf24;
    font-weight: 600;
}

.fractal-hint ul {
    margin: 16px 0 16px 24px;
}

.fractal-hint li {
    color: #94a3b8;
    margin-bottom: 10px;
    line-height: 1.6;
}

.fractal-link {
    display: inline-block;
    background: rgba(168, 85, 247, 0.2);
    color: #c4b5fd;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 16px;
    transition: all 0.3s ease;
    border: 2px solid #a855f7;
}

.fractal-link:hover {
    background: rgba(168, 85, 247, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
}

/* Help Tooltip System */
.help-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    border: 2px solid #38bdf8;
    border-radius: 50%;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: help;
    margin-left: 8px;
    position: relative;
}

.help-icon:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.tooltip {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: #1e293b;
    color: #cbd5e1;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
    border: 1px solid #38bdf8;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    max-width: 300px;
    white-space: normal;
}

/* Additional responsive improvements */
@media (max-width: 768px) {
    .controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .controls input,
    .controls button {
        width: 100%;
    }
    
    .drag-area {
        min-height: 100px;
        padding: 12px;
    }
    
    .block {
        padding: 10px 16px;
        font-size: 0.95rem;
    }
    
    .live-panel {
        padding: 16px;
    }
    
    .speed-big {
        font-size: 2.5rem;
    }
    
    .modal-body .comparison-grid {
        grid-template-columns: 1fr;
    }
    
    .fractal-hint {
        padding: 20px;
    }
    
    .fractal-hint h2 {
        font-size: 1.4rem;
    }
}

@media (max-width: 480px) {
    .activity-card {
        padding: 16px;
    }
    
    .game-section-title {
        font-size: 1rem;
    }
    
    .results,
    .saved-runs {
        padding: 12px;
        font-size: 0.85rem;
    }
}

</style>
</head>
<body>

<!-- Welcome Overlay -->
<div class="welcome-overlay" id="welcomeOverlay">
    <div class="welcome-box">
        <h1>🎮 Hardware Havoc</h1>
        <p>Welcome to <span class="highlight">Module 5: Hardware Performance</span>!</p>
        <p>In this module, you'll explore how different computing hardware configurations affect performance. Understanding hardware performance is crucial for solving complex computational problems efficiently.</p>
        
        <ul>
            <li>🎯 <strong>Learn:</strong> How parallel computing improves performance through speedup</li>
            <li>🧪 <strong>Experiment:</strong> Drag and drop tasks to see real-time performance changes</li>
            <li>⚡ <strong>Discover:</strong> When parallel processing makes a difference</li>
            <li>🏆 <strong>Apply:</strong> Connect hardware knowledge to real-world problems</li>
        </ul>
        
        <button class="start-btn" onclick="closeWelcome()">Start Learning →</button>
    </div>
</div>

<!-- CPU Collection Popup -->
<div class="cpu-collection" id="cpuCollection">
    <div class="cpu-icon">🔥</div>
    <h2>OCS Delivery Service</h2>
    <p>Congratulations! You've mastered hardware performance concepts!</p>
    <p>You've earned:</p>
    <div class="cpu-count">+1 CPU Core</div>
    <p>These CPU cores will help you run the Fractal Machine faster!</p>
    <button class="collect-btn" onclick="collectCPU()">Collect CPU →</button>
</div>

<div class="page-wrapper">
    <!-- LEFT SIDEBAR with Information Panels -->
    <div class="info-sidebar collapsed">
        <div class="sidebar-header">
            <h2>📚 Learning Guide</h2>
            <p>Essential Concepts</p>
        </div>

        <!-- Panel 1: What is Speedup? -->
        <div class="info-panel" onclick="openModal('speedup')">
            <div class="panel-header">
                <h3>⚡ What is Speedup?</h3>
            </div>
        </div>

        <!-- Panel 2: How It Works -->
        <div class="info-panel" onclick="openModal('howitworks')">
            <div class="panel-header">
                <h3>🔧 How It Works</h3>
            </div>
        </div>

        <!-- Panel 3: Parallel vs Serial -->
        <div class="info-panel" onclick="openModal('comparison')">
            <div class="panel-header">
                <h3>⚙️ Parallel vs Serial</h3>
            </div>
        </div>

        <!-- Panel 4: Amdahl's Law -->
        <div class="info-panel" onclick="openModal('amdahl')">
            <div class="panel-header">
                <h3>📊 Amdahl's Law</h3>
            </div>
        </div>

        <!-- Panel 5: Real-World Examples -->
        <div class="info-panel" onclick="openModal('realworld')">
            <div class="panel-header">
                <h3>🌍 Real-World Use</h3>
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
            <h2 class="activity-title">
                🎮 Drag & Drop Activity
                <span class="help-icon">?
                    <span class="tooltip">Drag tasks to test serial vs. parallel execution</span>
                </span>
            </h2>
            
            <div class="activity-intro">
                <p><strong>Step-by-step Guide:</strong></p>
                <ol style="margin-left: 20px; color: #cbd5e1; line-height: 1.8;">
                    <li><strong>Create Tasks:</strong> Enter a time value (e.g., 10) and click "Add Task"</li>
                    <li><strong>Organize Tasks:</strong> Drag tasks from the Task Pool to either:
                        <ul style="margin-left: 20px; margin-top: 8px;">
                            <li><em>Series Row</em> - Tasks run one after another (slower but sometimes necessary)</li>
                            <li><em>Parallel Row</em> - Tasks run simultaneously (faster when possible)</li>
                        </ul>
                    </li>
                    <li><strong>Calculate:</strong> Click "Compute Speedup" to see performance improvements</li>
                    <li><strong>Experiment:</strong> Try different configurations to maximize speedup!</li>
                </ol>
            </div>

            <!-- Progress Tracker -->
            <div class="progress-tracker">
                <h4>🎯 Progress to CPU Reward</h4>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="progressBarFill" style="width: 0%;">
                        <span id="progressBarText">0/3</span>
                    </div>
                </div>
                <p class="progress-text">Complete 3 runs with speedup > 1.5× to earn a CPU core!</p>
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

                <h3 class="game-section-title">
                    📦 Task Pool
                    <span class="help-icon">?
                        <span class="tooltip">Drag to series or parallel rows</span>
                    </span>
                </h3>
                <div class="drag-area" id="taskPool" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <span class="area-label">Available Tasks</span>
                    <span class="area-hint">Drag tasks from here to series or parallel rows below</span>
                </div>

                <h3 class="game-section-title">🔄 Series Row (Sequential)
                    <span class="help-icon">?
                        <span class="tooltip">Run one-by-one. Time = sum of all</span>
                    </span>
                </h3>
                <div class="drag-area" id="seriesRow" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <span class="area-label">Series Tasks (Run One After Another)</span>
                    <span class="area-hint">These tasks execute sequentially - total time = sum of all</span>
                </div>

                <h3 class="game-section-title">⚡ Parallel Row (Simultaneous)
                    <span class="help-icon">?
                        <span class="tooltip">Run simultaneously. Time = longest task</span>
                    </span>
                </h3>
                <div class="drag-area" id="parallelRow" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <span class="area-label">Parallel Tasks (Run At Same Time)</span>
                    <span class="area-hint">These tasks execute simultaneously - time = longest task</span>
                </div>

                <div id="results" class="results"></div>
                <div id="savedRuns" class="saved-runs"></div>
            </div>
        </div>

        <!-- Fractal Problem Hint Section -->
        <div class="fractal-hint">
            <h2>🧩 Connection to the Fractal Problem</h2>
            <p>Now that you understand <span class="highlight">hardware performance and parallel computing</span>, think about how this applies to our ultimate challenge:</p>
            
            <p><strong>The Fractal Problem</strong> requires massive computational power. Each pixel in a fractal needs to be calculated, and with millions of pixels, this takes a lot of time!</p>
            
            <p>Consider these questions:</p>
            <ul>
                <li>💭 <strong>How could parallel processing help render fractals faster?</strong></li>
                <li>💭 <strong>If each pixel calculation is independent, can they run in parallel?</strong></li>
                <li>💭 <strong>What speedup could you achieve with multiple CPU cores or a GPU?</strong></li>
                <li>💭 <strong>Are there parts of fractal generation that MUST run sequentially?</strong></li>
            </ul>
            
            <p><em>Hint: With the right hardware configuration, you could turn hours of computation into minutes!</em></p>
            
            <a href="/cores/core-6" class="fractal-link">Continue to Fractal Challenge →</a>
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
let cpuCoresCollected = 0;

// Welcome overlay functions
function closeWelcome() {
    document.getElementById('welcomeOverlay').classList.add('hidden');
    localStorage.setItem('core5_welcomeSeen', 'true');
}

// Check if welcome was already seen
window.addEventListener('load', function() {
    const welcomeSeen = localStorage.getItem('core5_welcomeSeen');
    if (welcomeSeen === 'true') {
        document.getElementById('welcomeOverlay').classList.add('hidden');
    }
});

// CPU Collection functions
function showCPUCollection() {
    const cpuPopup = document.getElementById('cpuCollection');
    cpuPopup.classList.add('show');
    
    // Store CPU collection in localStorage
    const currentCPUs = parseInt(localStorage.getItem('totalCPUs') || '0');
    localStorage.setItem('totalCPUs', currentCPUs + 1);
    
    // Mark this module as completed
    localStorage.setItem('core5_completed', 'true');
}

function collectCPU() {
    const cpuPopup = document.getElementById('cpuCollection');
    cpuPopup.classList.remove('show');
    
    // Optional: redirect to next module or show success message
    alert('🎉 CPU Core collected! Check your inventory before tackling the Fractal Machine!');
}

// Trigger CPU collection when user achieves significant progress
function checkForCPUReward() {
    const completedRuns = savedRuns.filter(run => run.speedup > 1.5).length;
    const moduleCompleted = localStorage.getItem('core5_completed');
    
    // Update progress bar
    updateProgressBar(completedRuns);
    
    // Award CPU if user has 3+ good speedup runs and hasn't collected yet
    if (completedRuns >= 3 && moduleCompleted !== 'true') {
        setTimeout(() => {
            showCPUCollection();
        }, 1000);
    }
}

// Update progress bar visual
function updateProgressBar(completedRuns) {
    const progressBarFill = document.getElementById('progressBarFill');
    const progressBarText = document.getElementById('progressBarText');
    
    const progress = Math.min(completedRuns, 3);
    const percentage = (progress / 3) * 100;
    
    progressBarFill.style.width = percentage + '%';
    progressBarText.textContent = progress + '/3';
    
    if (progress >= 3) {
        progressBarText.textContent = '✓ Complete!';
    }
}

// Initialize default tasks
function initializeDefaultTasks() {
    const taskPool = document.getElementById("taskPool");
    const defaultTasks = [3, 5, 8, 4, 6];
    
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
                <p><strong>Speedup</strong> measures how much faster parallel execution is compared to serial.</p>
                
                <div class="formula-display">
                    <div class="formula-text" style="font-size: 1.4rem;">Speedup = T<sub>serial</sub> / T<sub>parallel</sub></div>
                </div>
                
                <ul>
                    <li><strong>Speedup > 1:</strong> Parallel is faster ✓</li>
                    <li><strong>Speedup = 1:</strong> No improvement</li>
                    <li><strong>Speedup < 1:</strong> Parallel is slower (overhead)</li>
                </ul>
                
                <div class="modal-highlight">
                    <p><strong>Example:</strong> 100 images on 4 cores<br>
                    Serial: 100s → Parallel: 25s → <strong>Speedup = 4×</strong></p>
                </div>
            </div>
        `,
        'howitworks': `
            <h2 class="modal-title">🔧 How It Works</h2>
            <div class="modal-body">
                <h4>Serial Time</h4>
                <p>Sum all tasks: <code>T<sub>serial</sub> = task1 + task2 + ... + taskN</code></p>
                
                <h4>Parallel Time</h4>
                <p><code>T<sub>parallel</sub> = series_sum + max(parallel_tasks)</code></p>
                
                <div class="modal-highlight">
                    <p><strong>Example:</strong> Tasks [5, 10, 8, 12]<br>
                    Series [5, 10] = 15 units<br>
                    Parallel [8, 12] = max = 12 units<br>
                    <code>T<sub>parallel</sub> = 15 + 12 = 27</code><br>
                    <code>Speedup = 35 / 27 = 1.30×</code></p>
                </div>
                
                <p><strong>💡 Key:</strong> Parallel time = longest task in parallel group</p>
            </div>
        `,
        'comparison': `
            <h2 class="modal-title">⚖️ Parallel vs Serial</h2>
            <div class="modal-body">
                <h4>⚡ Parallel Execution</h4>
                <p><strong>Pros:</strong> Faster, uses all cores, scales well<br>
                <strong>Cons:</strong> Complex, overhead, race conditions<br>
                <strong>Best for:</strong> Large datasets, independent tasks</p>
                
                <h4>🔄 Serial Execution</h4>
                <p><strong>Pros:</strong> Simple, no overhead, predictable<br>
                <strong>Cons:</strong> Slow, wastes cores, no scalability<br>
                <strong>Best for:</strong> Small tasks, dependencies</p>
                
                <div class="modal-highlight">
                    <p><strong>Use Parallel:</strong> Independent tasks, large workload, multiple cores available<br>
                    <strong>Use Serial:</strong> Task dependencies, small tasks, simplicity matters</p>
                </div>
            </div>
        `,
        'amdahl': `
            <h2 class="modal-title">📊 Amdahl's Law</h2>
            <div class="modal-body">
                <p>Even with infinite processors, you can't achieve infinite speedup due to the <strong>serial bottleneck</strong>.</p>
                
                <div class="formula-display">
                    <div class="formula-text" style="font-size: 1.3rem;">Max Speedup = 1 / (S + P/N)</div>
                </div>
                
                <p><strong>S</strong> = Serial fraction, <strong>P</strong> = Parallel fraction, <strong>N</strong> = Processors</p>
                
                <div class="modal-highlight">
                    <p><strong>Example:</strong> 10% serial, 90% parallel</p>
                    <ul>
                        <li>2 cores: 1.82× speedup</li>
                        <li>10 cores: 5.26× speedup</li>
                        <li>∞ cores: <strong>10× max</strong> (limited by 10% serial!)</li>
                    </ul>
                </div>
                
                <p><strong>Reality:</strong><br>
                1% serial → Max 100×<br>
                10% serial → Max 10×<br>
                50% serial → Max 2×</p>
                
                <p><strong>💡 Takeaway:</strong> Optimize serial code first!</p>
            </div>
        `,
        'realworld': `
            <h2 class="modal-title">🌍 Real-World Use</h2>
            <div class="modal-body">
                <h4>Where Parallel Computing Shines</h4>
                <ul>
                    <li><strong>🎮 Games:</strong> GPUs with 1000s of cores render pixels simultaneously (100-1000× speedup)</li>
                    <li><strong>🤖 AI/ML:</strong> Training models on 1000+ GPUs (10,000× speedup vs single CPU)</li>
                    <li><strong>🌤️ Weather:</strong> Supercomputers with 8,000+ cores forecast in hours vs weeks</li>
                    <li><strong>🎬 Movies:</strong> Pixar's render farms process frames in parallel (100,000× speedup)</li>
                    <li><strong>🔍 Search:</strong> Google searches 40B pages in 200ms across 1000+ servers</li>
                    <li><strong>🔬 Science:</strong> Protein folding simulations distributed across millions of devices</li>
                </ul>
                
                <div class="modal-highlight">
                    <p><strong>💡 Bottom Line:</strong> Parallelization makes previously impossible problems solvable. Without it, we wouldn't have modern games, AI, accurate weather forecasts, or CGI movies!</p>
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
    
    // Check if user should receive CPU reward
    checkForCPUReward();
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

// Initialize tasks when page loads
window.addEventListener('load', function() {
    initializeDefaultTasks();
});
</script>
</body>
</html>