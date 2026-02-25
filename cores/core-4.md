---
toc: false
layout: post
title: "Core 4 — Module 4: Execution Time Calculations"
description: "Interactive exploration of sequential vs parallel time, using ideas from Modules 1–3"
permalink: /cores/core-4
breadcrumbs: false
microblog: true
---

[⬅ Back to Core 4 Overview](/cores/core-4)

<style>
  @import url("https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Oxanium:wght@400;600;700&display=swap");
  .m4-module-dropdown {
    margin: clamp(12px, 4vw, 24px) auto;
    display: block;
    max-width: 960px;
  }
  .m4-dropdown-summary {
    cursor: pointer;
    list-style: none;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: clamp(18px, 4vw, 36px) clamp(20px, 6vw, 64px);
    margin: 0;
    background: linear-gradient(135deg, rgba(26,32,40,0.95), rgba(18,23,30,0.95));
    border: 3px solid rgba(0,255,170,0.28);
    border-left: 6px solid #00ffaa;
    border-radius: 2px 2px 0 0;
    box-shadow: 0 0 30px rgba(0,255,170,0.2);
  }
  @media (max-width: 640px) {
    .m4-dropdown-summary {
      padding: 18px 20px;
    }
  }
  .m4-dropdown-summary::-webkit-details-marker {
    display: none;
  }
  .m4-dropdown-summary::after {
    content: "▾";
    position: absolute;
    right: clamp(16px, 4vw, 60px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.4em;
    color: #00ffaa;
    transition: transform 0.2s ease;
    text-shadow: 0 0 10px rgba(0,255,170,0.6);
  }
  .m4-module-dropdown[open] .m4-dropdown-summary::after {
    transform: translateY(-50%) rotate(180deg);
  }
  .m4-summary-title {
    margin: 0;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: #00ffaa;
    font-family: 'Courier New', 'Consolas', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 15px rgba(0,255,170,0.6);
  }
  .m4-summary-hint {
    margin: 0;
    font-size: 0.95em;
    color: #8b95a5;
    font-family: 'Courier New', 'Consolas', monospace;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .m4-shell {
    background: linear-gradient(145deg, rgba(18,23,30,0.95), rgba(10,14,20,0.95));
    padding: clamp(26px, 4vw, 60px);
    border-radius: 0 0 2px 2px;
    color: #e0e6ed;
    box-shadow: 0 0 45px rgba(0,255,170,0.2);
    border: 3px solid rgba(0,255,170,0.28);
    border-top: none;
    width: 100%;
    margin: 0;
    min-height: auto;
    position: relative;
    overflow: hidden;
  }
  .m4-shell::before {
    content: "";
    position: absolute;
    inset: -40%;
    background: radial-gradient(circle at top left, rgba(0,255,170,0.10), transparent 55%),
                radial-gradient(circle at bottom right, rgba(0,212,255,0.08), transparent 55%);
    opacity: 0.9;
    pointer-events: none;
  }
  .m4-shell-inner {
    position: relative;
    z-index: 1;
    max-width: 1050px;
    margin: 0 auto;
  }
  .m4-section {
    background: linear-gradient(135deg, #020617 0%, #020617 40%, #020617 100%);
    border-radius: 14px;
    border: 1px solid rgba(148,163,184,0.25);
    padding: 22px 24px;
    margin-top: 18px;
  }
  .m4-section h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .m4-game-intro {
    font-family: "Oxanium", "Chakra Petch", "Trebuchet MS", sans-serif;
    color: #cbd5f5;
    font-size: 1.02em;
    letter-spacing: 0.02em;
  }
  .m4-briefing-grid {
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    margin-bottom: 8px;
  }
  .m4-briefing-card {
    background: rgba(2,6,23,0.7);
    border: 1px solid rgba(125,211,252,0.25);
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: inset 0 0 20px rgba(59,130,246,0.12);
  }
  .m4-briefing-title {
    font-family: "Chakra Petch", "Trebuchet MS", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.72em;
    color: #7dd3fc;
    margin-bottom: 8px;
  }
  .m4-intel {
    border-radius: 12px;
    background: rgba(15,23,42,0.55);
    border: 1px dashed rgba(148,163,184,0.35);
    padding: 10px 12px;
  }
  .m4-intel summary {
    cursor: pointer;
    list-style: none;
    font-size: 0.85em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #fbbf24;
    margin-bottom: 6px;
  }
  .m4-intel-title {
    font-size: 0.85em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #fbbf24;
    margin-bottom: 6px;
  }
  .m4-intel summary::-webkit-details-marker {
    display: none;
  }
  .m4-intel p {
    margin: 0;
    color: #cbd5f5;
    line-height: 1.65;
    font-size: 0.95em;
  }
  .m4-objective-list {
    margin: 0;
    padding-left: 18px;
    color: #e2e8f0;
    font-size: 0.95em;
    line-height: 1.6;
  }
  .m4-briefing-note {
    margin-top: 10px;
    font-size: 0.82em;
    color: #94a3b8;
  }
  .m4-hud {
    margin-top: 20px;
    border: 1px solid rgba(56,189,248,0.35);
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(2,6,23,0.95), rgba(15,23,42,0.85));
    padding: 18px 20px;
    display: grid;
    gap: 14px;
  }
  .m4-hud-title {
    font-family: "Chakra Petch", "Trebuchet MS", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.75em;
    color: #7dd3fc;
  }
  .m4-hud-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }
  .m4-hud-stat {
    background: rgba(2,6,23,0.6);
    border: 1px solid rgba(148,163,184,0.25);
    border-radius: 12px;
    padding: 10px 12px;
    font-family: "Chakra Petch", "Trebuchet MS", sans-serif;
  }
  .m4-hud-stat span {
    display: block;
    font-size: 0.75em;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #94a3b8;
  }
  .m4-hud-stat strong {
    font-size: 1.1em;
    color: #e2e8f0;
  }
  .m4-xp-bar {
    position: relative;
    height: 10px;
    border-radius: 999px;
    background: rgba(148,163,184,0.2);
    overflow: hidden;
  }
  .m4-xp-bar span {
    position: absolute;
    inset: 0;
    width: 0%;
    background: linear-gradient(90deg, #22d3ee, #34d399);
    transition: width 0.4s ease;
  }
  .m4-xp-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.78em;
    color: #cbd5f5;
  }
  .m4-quest-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 8px;
  }
  .m4-quest-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(2,6,23,0.55);
    border: 1px dashed rgba(148,163,184,0.35);
    font-size: 0.82em;
    color: #e5e7eb;
  }
  .m4-quest-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #fbbf24;
    box-shadow: 0 0 8px rgba(251,191,36,0.6);
  }
  .m4-quest-item.is-complete {
    border-color: rgba(34,197,94,0.5);
    background: rgba(34,197,94,0.12);
  }
  .m4-quest-item.is-complete .m4-quest-dot {
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34,197,94,0.6);
  }
  .m4-terminal {
    display: grid;
    gap: 14px;
  }
  .m4-terminal-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .m4-chip {
    border-radius: 999px;
    padding: 6px 14px;
    border: 1px solid rgba(94,234,212,0.5);
    background: rgba(15,23,42,0.8);
    color: #5eead4;
    font-family: "Chakra Petch", "Trebuchet MS", sans-serif;
    font-size: 0.85em;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .m4-chip:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px rgba(94,234,212,0.4);
  }
  .m4-terminal-readout {
    border-radius: 12px;
    padding: 14px 16px;
    background: rgba(2,6,23,0.8);
    border: 1px solid rgba(56,189,248,0.35);
    font-size: 0.95em;
    color: #e2e8f0;
    min-height: 90px;
  }
  .m4-formula-row {
    font-family: "Chakra Petch", "Trebuchet MS", sans-serif;
    font-size: 1.05em;
    color: #f8fafc;
    letter-spacing: 0.04em;
  }

  /* Tooltip styling for formula terms */
  .tooltip-term {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    border-radius: 2px;
    background: rgba(0,255,170,0.15);
    border: 1px solid #00ffaa;
    color: #02f1a2;
    cursor: help;
    font-weight: 600;
    font-size: 0.95em;
    margin: 0 2px;
    font-family: 'Courier New', 'Consolas', monospace;
  }
  .tooltip-term span.term-label {
    padding: 1px 4px;
  }
  .tooltip-term .tooltip-box {
    position: absolute;
    left: 50%;
    bottom: 135%;
    transform: translate(-50%, 8px);
    background: #020617;
    color: #e5e7eb;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(56,189,248,0.9);
    box-shadow: 0 16px 35px rgba(15,23,42,0.85);
    min-width: 230px;
    max-width: 280px;
    font-size: 0.82em;
    line-height: 1.5;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease, transform 0.15s ease;
    z-index: 20;
    text-align: left;
    white-space: normal;
  }
  .tooltip-term::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 121%;
    transform: translateX(-50%);
    border-width: 7px;
    border-style: solid;
    border-color: #020617 transparent transparent transparent;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .tooltip-term:hover .tooltip-box {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  .tooltip-term:hover::after {
    opacity: 1;
  }

  /* Slider layout */
  .m4-sliders {
    display: grid;
    grid-template-columns: minmax(0, 1.8fr) minmax(0, 1.2fr);
    gap: 20px;
    margin-top: 18px;
    align-items: stretch;
  }
  @media (max-width: 900px) {
    .m4-sliders {
      grid-template-columns: 1fr;
    }
  }
  .m4-slider-group {
    margin-bottom: 14px;
  }
  .m4-slider-group label {
    display: block;
    font-size: 0.95em;
    color: #e5e7eb;
    margin-bottom: 4px;
  }
  .m4-slider-group input[type="range"] {
    width: 100%;
  }
  .m4-metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
    gap: 14px;
    font-size: 0.95em;
  }
  .m4-metric-box {
    background: #020617;
    border-radius: 10px;
    border: 1px solid rgba(148,163,184,0.35);
    padding: 10px 12px;
  }
  .m4-gauge {
    display: grid;
    gap: 6px;
  }
  .m4-gauge-bar {
    position: relative;
    height: 10px;
    border-radius: 999px;
    background: rgba(148,163,184,0.2);
    overflow: hidden;
  }
  .m4-gauge-bar span {
    position: absolute;
    inset: 0;
    width: 0%;
    background: linear-gradient(90deg, #f59e0b, #f97316);
    transition: width 0.4s ease;
  }
  .m4-quest-grid {
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  .m4-quest-card {
    border-radius: 16px;
    border: 1px solid rgba(59,130,246,0.35);
    background: rgba(2,6,23,0.75);
    padding: 16px;
    display: grid;
    gap: 10px;
    min-height: 220px;
    position: relative;
    overflow: hidden;
  }
  .m4-quest-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent, rgba(59,130,246,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .m4-quest-card:hover::after {
    opacity: 1;
  }
  .m4-quest-card h4 {
    margin: 0;
    font-size: 1.05em;
    color: #7dd3fc;
  }
  .m4-quest-card p {
    margin: 0;
    color: #cbd5f5;
    font-size: 0.9em;
    line-height: 1.6;
  }
  .m4-quest-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .m4-quest-actions button {
    border-radius: 999px;
    border: 1px solid rgba(147,197,253,0.45);
    background: rgba(15,23,42,0.7);
    color: #e0f2fe;
    padding: 6px 12px;
    font-size: 0.8em;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .m4-quest-actions button:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px rgba(59,130,246,0.3);
  }
  .m4-mission-log {
    border-radius: 12px;
    border: 1px solid rgba(148,163,184,0.3);
    background: rgba(2,6,23,0.7);
    padding: 12px 14px;
    font-size: 0.85em;
    color: #e2e8f0;
    min-height: 72px;
  }
  .m4-boosters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .m4-boosters button {
    border-radius: 999px;
    border: 1px solid rgba(52,211,153,0.5);
    background: rgba(15,23,42,0.7);
    color: #6ee7b7;
    padding: 6px 14px;
    font-size: 0.82em;
    cursor: pointer;
  }
  .m4-boosters button:hover {
    box-shadow: 0 0 12px rgba(52,211,153,0.4);
  }
</style>

<details class="m4-module-dropdown" open>
  <summary class="m4-dropdown-summary">
    <h1 class="m4-summary-title">⚙️ Module 4: Execution Time Calculations</h1>
    <p class="m4-summary-hint">Click to collapse or expand this module.</p>
  </summary>

  <div class="m4-shell">
    <div class="m4-shell-inner">
      <div class="m4-briefing-grid">
        <div class="m4-briefing-card">
          <div class="m4-briefing-title">Mission Briefing</div>
          <details class="m4-intel">
            <summary>Open intel log</summary>
            <p class="m4-game-intro">
              Boot sequence online. This module is now a mission simulator: you will decode the time model,
              tune a parallel rig, and hunt bottlenecks to earn XP. Every idea from Modules 1–3 is packed
              into interactive stations below.
            </p>
          </details>
        </div>
        <div class="m4-briefing-card">
          <div class="m4-briefing-title">Objectives</div>
          <ul class="m4-objective-list">
            <li>Decode the time model.</li>
            <li>Tune a parallel rig.</li>
            <li>Hunt bottlenecks to earn XP.</li>
          </ul>
          <div class="m4-briefing-note">Every idea from Modules 1–3 is packed into interactive stations below.</div>
        </div>
      </div>

      <div class="m4-hud">
        <div class="m4-hud-title">Mission HUD</div>
        <div class="m4-hud-grid">
          <div class="m4-hud-stat">
            <span>Rank</span>
            <strong id="m4-rank">Cadet</strong>
          </div>
          <div class="m4-hud-stat">
            <span>XP</span>
            <strong><span id="m4-xp-value">0</span> pts</strong>
          </div>
          <div class="m4-hud-stat">
            <span>Quests</span>
            <strong><span id="m4-quest-count">0</span>/4</strong>
          </div>
          <div class="m4-hud-stat">
            <span>Active Speedup</span>
            <strong>×<span id="m4-speedup-live">1.00</span></strong>
          </div>
        </div>
        <div class="m4-xp-bar">
          <span id="m4-xp-fill"></span>
        </div>
        <div class="m4-xp-meta">
          <span>Next rank in <span id="m4-xp-next">20</span> XP</span>
          <span id="m4-xp-rank-label">Cadet tier</span>
        </div>
        <div class="m4-quest-list">
          <div class="m4-quest-item" id="m4-quest-terminal"><span class="m4-quest-dot"></span>Decode the formula console</div>
          <div class="m4-quest-item" id="m4-quest-calibrate"><span class="m4-quest-dot"></span>Calibrate the rig</div>
          <div class="m4-quest-item" id="m4-quest-bottleneck"><span class="m4-quest-dot"></span>Win the bottleneck hunt</div>
          <div class="m4-quest-item" id="m4-quest-speedup"><span class="m4-quest-dot"></span>Break speedup threshold</div>
        </div>
      </div>

      <div class="m4-section">
        <h3 style="color:#0ea5e9; font-size:1.3em;">
          🧩 Formula Console: tap to decode the model
        </h3>
        <div class="m4-terminal">
          <div class="m4-terminal-buttons">
            <button class="m4-chip" type="button" data-m4-term="seq-part">T_seq-part</button>
            <button class="m4-chip" type="button" data-m4-term="par-part">T_parallel-part</button>
            <button class="m4-chip" type="button" data-m4-term="proc">P (processors)</button>
            <button class="m4-chip" type="button" data-m4-term="overhead">Overhead</button>
            <button class="m4-chip" type="button" data-m4-term="model">Full model</button>
          </div>
          <div class="m4-terminal-readout" id="m4-term-readout">
            Tap a chip to unlock the story behind each term. Each unlock earns XP.
          </div>
          <div class="m4-formula-row">
            T_parallel = T_seq-part + (T_parallel-part / P) + overhead
          </div>
        </div>
      </div>

      <div class="m4-section">
        <h3 style="color:#0ea5e9; font-size:1.3em;">
          🎛 Quest 1: Calibrate the execution rig
        </h3>
        <div class="m4-intel">
          <div class="m4-intel-title">Objective intel</div>
          <p style="font-size:0.95em; color:#e5e7eb; line-height:1.7; margin:0;">
            Dial the rig sliders to describe a workload. The HUD updates instantly with modeled runtime,
            speedup, and a boss shield that represents the sequential bottleneck.
          </p>
        </div>

        <div class="m4-sliders">
          <div>
            <div class="m4-slider-group">
              <label for="m4-seq-slider">
                🔒 Sequential work time
                <span style="color:#38bdf8;">(T<sub>seq-part</sub>)</span>:
                <strong><span id="m4-seq-value">40</span> s</strong>
              </label>
              <input id="m4-seq-slider" type="range" min="0" max="120" value="40" step="5">
            </div>

            <div class="m4-slider-group">
              <label for="m4-par-slider">
                ⚙️ Total parallelizable work
                <span style="color:#38bdf8;">(T<sub>parallel-part</sub>)</span>:
                <strong><span id="m4-par-value">130</span> s</strong>
              </label>
              <input id="m4-par-slider" type="range" min="20" max="300" value="130" step="10">
            </div>

            <div class="m4-slider-group">
              <label for="m4-proc-slider">
                🧠 Number of processors
                <span style="color:#38bdf8;">(P)</span>:
                <strong><span id="m4-proc-value">2</span></strong>
              </label>
              <input id="m4-proc-slider" type="range" min="1" max="16" value="2" step="1">
            </div>

            <div class="m4-slider-group">
              <label for="m4-overhead-slider">
                📡 Coordination overhead per extra processor
                <span style="color:#38bdf8;">(overhead)</span>:
                <strong><span id="m4-overhead-value">2</span> s</strong>
              </label>
              <input id="m4-overhead-slider" type="range" min="0" max="20" value="2" step="1">
            </div>
          </div>

          <div class="m4-metric-grid">
            <div class="m4-metric-box">
              <div style="color:#94a3b8;">Sequential total (Module 1)</div>
              <div style="color:#e5e7eb; font-weight:bold; font-size:1.05em;">
                <span id="m4-seq-total">170</span> s
              </div>
              <p style="margin:6px 0 0 0; font-size:0.82em; color:#9ca3af;">
                Time if everything ran on one core with no parallelism.
              </p>
            </div>
            <div class="m4-metric-box">
              <div style="color:#94a3b8;">Modeled parallel time</div>
              <div style="color:#e5e7eb; font-weight:bold; font-size:1.05em;">
                <span id="m4-par-time">90</span> s
              </div>
              <p style="margin:6px 0 0 0; font-size:0.82em; color:#9ca3af;">
                Sequential setup + parallel work split + coordination cost.
              </p>
            </div>
            <div class="m4-metric-box">
              <div style="color:#94a3b8;">Speedup (Module 5 preview)</div>
              <div style="color:#4ade80; font-weight:bold; font-size:1.05em;">
                ×<span id="m4-speedup-value">1.89</span>
              </div>
              <p style="margin:6px 0 0 0; font-size:0.82em; color:#9ca3af;">
                How many times faster the parallel version is.
              </p>
            </div>
            <div class="m4-metric-box">
              <div style="color:#94a3b8;">Boss shield (sequential share)</div>
              <div class="m4-gauge">
                <div class="m4-gauge-bar"><span id="m4-shield-bar"></span></div>
                <div style="color:#e5e7eb; font-weight:bold; font-size:0.95em;">
                  <span id="m4-shield-value">0</span>%
                </div>
              </div>
              <p style="margin:6px 0 0 0; font-size:0.82em; color:#9ca3af;">
                High shield means the sequential chunk is dominating the runtime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="m4-section">
        <h3 style="color:#0ea5e9; font-size:1.3em;">
          🛰 Quest 2: Bottleneck hunt
        </h3>
        <div class="m4-intel">
          <div class="m4-intel-title">Objective intel</div>
          <p style="font-size:0.95em; color:#e5e7eb; line-height:1.7; margin:0;">
            Pick a mission. The rig auto-loads the workload, and you choose which part is slowing the crew.
            Correct calls earn XP and teach how sequential work or overhead limits speedup.
          </p>
        </div>

        <div class="m4-quest-grid">
          <article class="m4-quest-card" data-seq="20" data-par="240" data-proc="8" data-overhead="1">
            <h4>Mission: Drone Sweep</h4>
            <p>Lots of independent scans, tiny setup. Eight drones in the air.</p>
            <div class="m4-quest-actions">
              <button type="button" data-m4-action="load">Load Scenario</button>
              <button type="button" data-m4-action="choose" data-m4-choice="parallel">Parallel bottleneck</button>
              <button type="button" data-m4-action="choose" data-m4-choice="sequential">Sequential bottleneck</button>
            </div>
          </article>
          <article class="m4-quest-card" data-seq="90" data-par="90" data-proc="12" data-overhead="2">
            <h4>Mission: Gatekeeper Core</h4>
            <p>Heavy startup routines before any parallel work can begin.</p>
            <div class="m4-quest-actions">
              <button type="button" data-m4-action="load">Load Scenario</button>
              <button type="button" data-m4-action="choose" data-m4-choice="parallel">Parallel bottleneck</button>
              <button type="button" data-m4-action="choose" data-m4-choice="sequential">Sequential bottleneck</button>
            </div>
          </article>
          <article class="m4-quest-card" data-seq="30" data-par="160" data-proc="14" data-overhead="5">
            <h4>Mission: Swarm Coordination</h4>
            <p>Plenty of tasks, but the team keeps colliding in coordination overhead.</p>
            <div class="m4-quest-actions">
              <button type="button" data-m4-action="load">Load Scenario</button>
              <button type="button" data-m4-action="choose" data-m4-choice="parallel">Parallel bottleneck</button>
              <button type="button" data-m4-action="choose" data-m4-choice="sequential">Sequential bottleneck</button>
            </div>
          </article>
        </div>

        <div class="m4-mission-log" id="m4-mission-log">
          Mission log online. Load a scenario to begin the hunt.
        </div>
      </div>

      <div class="m4-section">
        <h3 style="color:#0ea5e9; font-size:1.3em;">
          🚀 Quest 3: Speedup sprint
        </h3>
        <div class="m4-intel">
          <div class="m4-intel-title">Objective intel</div>
          <p style="font-size:0.95em; color:#e5e7eb; line-height:1.7; margin:0;">
            Punch in booster commands to add processors quickly. Watch the speedup meter and boss shield to
            feel the diminishing returns from the sequential slice.
          </p>
        </div>
        <div class="m4-boosters">
          <button type="button" data-m4-boost="2">Boost to 2</button>
          <button type="button" data-m4-boost="4">Boost to 4</button>
          <button type="button" data-m4-boost="8">Boost to 8</button>
          <button type="button" data-m4-boost="16">Boost to 16</button>
        </div>
      </div>
    </div>
  </div>
</details>

<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          quiz: {
            base: "#0f172a",
            glow: "#67e8f9"
          }
        },
        boxShadow: {
          quiz: "0 25px 65px -25px rgba(15, 23, 42, 0.7)"
        }
      }
    }
  };
</script>

<section id="module4-quiz-shell" class="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white shadow-2xl shadow-cyan-500/10 sm:px-12">
  <div class="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/30 blur-[110px]"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950"></div>

  <div class="relative z-10 mx-auto flex max-w-4xl flex-col gap-12">
    <header class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/90">
        Final Checkpoint Quiz
      </p>
      <h2 class="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        Mission Debrief: Execution-Time Reasoning
      </h2>
      <p class="text-base text-slate-200 sm:text-lg">
        Use the story-to-formula model you explored above to answer a scenario question. Gemini grades
        the response and you need a score above <strong>⅓ of the points (a score of 2 or 3 on this rubric)</strong> to enable the
        Mark Complete button for this module.
      </p>
    </header>

    <div class="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-quiz backdrop-blur-xl sm:p-10">
      <div class="space-y-4">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/90">
          Scenario Question
        </p>
        <p class="text-2xl font-semibold text-white">
          Module 4 introduced the idea that every algorithm mixes sequential setup/combining steps with parallel chunks.
          In 2 short sentences, explain why the sequential portion eventually limits speedup even if you add more processors,
          and name one practical tweak from the module (shrink the sequential slice, expose more parallel work, reduce overhead/balance costs)
          that keeps improvements coming a little longer.
        </p>
        <p class="text-base text-slate-200">
          Think conceptually about what Module 4 taught (sequential bottlenecks, overhead, balancing) — no numbers required.
        </p>
        <div class="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          <div class="flex items-start gap-2 rounded-2xl bg-white/5 p-3">
            <span class="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            Call out how the sequential portion becomes the bottleneck (Module 4 insight).
          </div>
          <div class="flex items-start gap-2 rounded-2xl bg-white/5 p-3">
            <span class="mt-1 h-2 w-2 rounded-full bg-sky-300"></span>
            Mention one concrete Module 4 adjustment (shrink sequential work, expose more parallelism, reduce overhead/balance cost).
          </div>
        </div>
      </div>

      <div class="mt-10 space-y-4">
        <div class="space-y-3">
          <label for="m4-quiz-answer" class="text-sm font-medium text-slate-50">Your answer</label>
          <textarea
            id="m4-quiz-answer"
            rows="7"
            class="block w-full rounded-2xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400"
            placeholder="Blend the numbers with reasoning from the model..."
          ></textarea>
          <p class="text-xs text-slate-400">
            Submissions hit <code class="font-mono text-emerald-300">/api/quiz/grade</code>, the same service used on the dummy page.
          </p>
        </div>

        <div class="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Autofill sample answers
          </p>
          <p class="text-xs text-slate-300">
            Helpful for testing the grader—each button inserts an answer that roughly earns that score.
          </p>
          <div class="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              data-m4-autofill-score="0"
              class="inline-flex items-center rounded-full border border-rose-400/60 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-100 hover:bg-rose-500/20"
            >
              Autofill 0-point answer
            </button>
            <button
              type="button"
              data-m4-autofill-score="1"
              class="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-100 hover:bg-amber-500/20"
            >
              Autofill 1-point answer
            </button>
            <button
              type="button"
              data-m4-autofill-score="2"
              class="inline-flex items-center rounded-full border border-sky-400/60 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-100 hover:bg-sky-500/20"
            >
              Autofill 2-point answer
            </button>
            <button
              type="button"
              data-m4-autofill-score="3"
              class="inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/20"
            >
              Autofill 3-point answer
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap items-center gap-4">
        <button
          id="m4-quiz-submit"
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <span>Submit Answer</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-[2.5]">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <p class="text-xs text-slate-400">
          Grades appear instantly along with attempt history.
        </p>
      </div>

      <div
        id="m4-quiz-gate-status"
        data-module-quiz-status="4"
        class="mt-6 rounded-3xl border border-emerald-300/30 bg-emerald-500/10 px-5 py-4 text-sm font-medium text-emerald-100"
      >
        You need a score of 2 or 3 out of 3 (more than one-third of the points) before the Mark Complete button unlocks.
      </div>

      <pre
        id="m4-quiz-result"
        aria-live="polite"
        class="mt-6 hidden whitespace-pre-wrap rounded-3xl border border-white/10 bg-white/5 p-5 text-sm font-medium leading-relaxed text-slate-100 transition-all duration-300"
      ></pre>
    </div>
  </div>
</section>

<script>
  const m4SeqSlider = document.getElementById('m4-seq-slider');
  const m4ParSlider = document.getElementById('m4-par-slider');
  const m4ProcSlider = document.getElementById('m4-proc-slider');
  const m4OverheadSlider = document.getElementById('m4-overhead-slider');

  const m4SeqValue = document.getElementById('m4-seq-value');
  const m4ParValue = document.getElementById('m4-par-value');
  const m4ProcValue = document.getElementById('m4-proc-value');
  const m4OverheadValue = document.getElementById('m4-overhead-value');

  const m4SeqTotalEl = document.getElementById('m4-seq-total');
  const m4ParTimeEl = document.getElementById('m4-par-time');
  const m4SpeedupEl = document.getElementById('m4-speedup-value');
  const m4ShieldBar = document.getElementById('m4-shield-bar');
  const m4ShieldValue = document.getElementById('m4-shield-value');
  const m4SpeedupLive = document.getElementById('m4-speedup-live');

  const m4RankEl = document.getElementById('m4-rank');
  const m4XpValueEl = document.getElementById('m4-xp-value');
  const m4XpFillEl = document.getElementById('m4-xp-fill');
  const m4XpNextEl = document.getElementById('m4-xp-next');
  const m4QuestCountEl = document.getElementById('m4-quest-count');
  const m4RankLabelEl = document.getElementById('m4-xp-rank-label');

  const m4QuestTerminalEl = document.getElementById('m4-quest-terminal');
  const m4QuestCalibrateEl = document.getElementById('m4-quest-calibrate');
  const m4QuestBottleneckEl = document.getElementById('m4-quest-bottleneck');
  const m4QuestSpeedupEl = document.getElementById('m4-quest-speedup');
  const m4MissionLog = document.getElementById('m4-mission-log');
  const m4TermReadout = document.getElementById('m4-term-readout');

  const m4State = {
    xp: 0,
    quests: {
      terminal: false,
      calibrate: false,
      bottleneck: false,
      speedup: false
    },
    unlockedTerms: new Set(),
    bottleneckWins: new Set()
  };

  const m4Ranks = [
    { name: "Cadet", min: 0, next: 20, label: "Cadet tier" },
    { name: "Operator", min: 20, next: 40, label: "Operator tier" },
    { name: "Strategist", min: 40, next: 60, label: "Strategist tier" },
    { name: "Architect", min: 60, next: null, label: "Architect tier" }
  ];

  const termMessages = {
    "seq-part": "Sequential work is the non-splittable setup or combine step. Every processor must wait here.",
    "par-part": "Parallel work is the pile of independent tasks. This is the part you divide by P.",
    "proc": "P is the number of processors. More P shrinks the parallel part, but only to a point.",
    "overhead": "Overhead is coordination cost that grows as you add processors (sync, messaging, balance).",
    "model": "Total time = sequential + parallel/P + overhead. Bottlenecks show up when one term dominates."
  };

  const logM4 = (message) => {
    if (m4MissionLog) {
      m4MissionLog.textContent = message;
    }
  };

  const addXP = (amount, reason) => {
    if (!amount) return;
    m4State.xp += amount;
    if (reason) {
      logM4(`+${amount} XP: ${reason}`);
    }
    updateM4HUD();
  };

  const setQuestComplete = (key, el) => {
    if (m4State.quests[key]) return;
    m4State.quests[key] = true;
    if (el) {
      el.classList.add("is-complete");
    }
    updateM4HUD();
  };

  const updateM4HUD = () => {
    if (m4XpValueEl) {
      m4XpValueEl.textContent = m4State.xp.toString();
    }

    const currentRank = m4Ranks.reduce((acc, rank) => (m4State.xp >= rank.min ? rank : acc), m4Ranks[0]);
    if (m4RankEl) {
      m4RankEl.textContent = currentRank.name;
    }
    if (m4RankLabelEl) {
      m4RankLabelEl.textContent = currentRank.label;
    }

    if (m4XpNextEl) {
      const nextTarget = currentRank.next;
      m4XpNextEl.textContent = nextTarget ? Math.max(nextTarget - m4State.xp, 0).toString() : "0";
    }

    if (m4XpFillEl) {
      const nextTarget = currentRank.next;
      const fill = nextTarget ? ((m4State.xp - currentRank.min) / (nextTarget - currentRank.min)) * 100 : 100;
      m4XpFillEl.style.width = `${Math.min(Math.max(fill, 0), 100).toFixed(0)}%`;
    }

    if (m4QuestCountEl) {
      const done = Object.values(m4State.quests).filter(Boolean).length;
      m4QuestCountEl.textContent = done.toString();
    }
  };

  function updateM4Model() {
    if (!m4SeqSlider || !m4ParSlider || !m4ProcSlider || !m4OverheadSlider) {
      return;
    }
    const seq = parseFloat(m4SeqSlider.value);   // T_seq-part
    const par = parseFloat(m4ParSlider.value);   // T_parallel-part
    const P   = parseInt(m4ProcSlider.value, 10);
    const overhead = parseFloat(m4OverheadSlider.value);

    // Sequential baseline
    const seqTotal = seq + par;

    // Parallel model: seq part + parallel split + coordination cost
    const overheadCost = overhead * Math.max(P - 1, 0);
    const parallelTime = seq + par / Math.max(P, 1) + overheadCost;

    const speedup = seqTotal / parallelTime;
    const shieldRatio = parallelTime > 0 ? Math.min(seq / parallelTime, 1) : 0;

    m4SeqValue.textContent = seq.toFixed(0);
    m4ParValue.textContent = par.toFixed(0);
    m4ProcValue.textContent = P.toString();
    if (m4OverheadValue) {
      m4OverheadValue.textContent = overhead.toFixed(0);
    }

    m4SeqTotalEl.textContent = seqTotal.toFixed(0);
    m4ParTimeEl.textContent = parallelTime.toFixed(0);
    m4SpeedupEl.textContent = speedup.toFixed(2);
    if (m4SpeedupLive) {
      m4SpeedupLive.textContent = speedup.toFixed(2);
    }
    if (m4ShieldBar && m4ShieldValue) {
      const shieldPercent = shieldRatio * 100;
      m4ShieldBar.style.width = `${shieldPercent.toFixed(0)}%`;
      m4ShieldValue.textContent = shieldPercent.toFixed(0);
    }

    if (speedup >= 2 && !m4State.quests.speedup) {
      setQuestComplete("speedup", m4QuestSpeedupEl);
      addXP(12, "Speedup threshold cleared");
    }
  }

  const markCalibrated = () => {
    if (!m4State.quests.calibrate) {
      setQuestComplete("calibrate", m4QuestCalibrateEl);
      addXP(10, "Rig calibrated");
    }
  };

  const loadScenario = (seq, par, proc, overhead) => {
    if (m4SeqSlider) m4SeqSlider.value = seq;
    if (m4ParSlider) m4ParSlider.value = par;
    if (m4ProcSlider) m4ProcSlider.value = proc;
    if (m4OverheadSlider) m4OverheadSlider.value = overhead;
    updateM4Model();
    logM4(`Scenario loaded: seq ${seq}s, parallel ${par}s, P=${proc}, overhead ${overhead}s.`);
  };

  const evaluateBottleneck = (seq, par, proc, overhead) => {
    const overheadCost = overhead * Math.max(proc - 1, 0);
    const parallelChunk = par / Math.max(proc, 1) + overheadCost;
    return seq >= parallelChunk ? "sequential" : "parallel";
  };

  const termButtons = document.querySelectorAll(".m4-chip");
  termButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-m4-term");
      if (!key || !termMessages[key]) return;
      if (m4TermReadout) {
        m4TermReadout.textContent = termMessages[key];
      }
      if (!m4State.unlockedTerms.has(key)) {
        m4State.unlockedTerms.add(key);
        addXP(4, `Decoded ${key.replace("-", " ")}`);
      }
      if (m4State.unlockedTerms.size === Object.keys(termMessages).length) {
        setQuestComplete("terminal", m4QuestTerminalEl);
        addXP(8, "Formula console fully decoded");
      }
    });
  });

  const sliderInputs = [m4SeqSlider, m4ParSlider, m4ProcSlider, m4OverheadSlider].filter(Boolean);
  sliderInputs.forEach((slider) => {
    slider.addEventListener("input", () => {
      updateM4Model();
      markCalibrated();
    });
  });

  const questCards = document.querySelectorAll(".m4-quest-card");
  questCards.forEach((card, index) => {
    const seq = parseFloat(card.dataset.seq);
    const par = parseFloat(card.dataset.par);
    const proc = parseFloat(card.dataset.proc);
    const overhead = parseFloat(card.dataset.overhead);
    const cardId = `card-${index}`;

    card.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-m4-action");
        if (action === "load") {
          loadScenario(seq, par, proc, overhead);
          return;
        }
        if (action === "choose") {
          const choice = btn.getAttribute("data-m4-choice");
          loadScenario(seq, par, proc, overhead);
          const result = evaluateBottleneck(seq, par, proc, overhead);
          if (choice === result) {
            if (!m4State.bottleneckWins.has(cardId)) {
              m4State.bottleneckWins.add(cardId);
              addXP(12, "Correct bottleneck call");
            } else {
              logM4("Correct again. Try another mission for more XP.");
            }
          } else {
            logM4("Not quite. Look at the shield and parallel time, then call again.");
          }

          if (m4State.bottleneckWins.size >= 2) {
            setQuestComplete("bottleneck", m4QuestBottleneckEl);
          }
        }
      });
    });
  });

  const boosters = document.querySelectorAll("[data-m4-boost]");
  boosters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = parseInt(btn.getAttribute("data-m4-boost"), 10);
      if (m4ProcSlider && Number.isFinite(target)) {
        m4ProcSlider.value = target;
        updateM4Model();
        markCalibrated();
        logM4(`Booster engaged: processors set to ${target}.`);
      }
    });
  });

  if (m4SeqSlider && m4ParSlider && m4ProcSlider && m4OverheadSlider) {
    updateM4Model();
    updateM4HUD();
  }
</script>

<script>
  const MODULE4_PASS_RATIO = 1 / 3;
  const MODULE4_NUMBER = 4;
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const apiBase = isLocal
    ? "http://localhost:8405"
    : "https://hardwarehavoc.opencodingsociety.com";
  const API_URL = `${apiBase}/api/quiz/grade`;
  const submitBtn = document.getElementById("m4-quiz-submit");
  const answerEl = document.getElementById("m4-quiz-answer");
  const resultEl = document.getElementById("m4-quiz-result");
  const gateStatusEl = document.getElementById("m4-quiz-gate-status");

  const stateClasses = {
    info: ["border-cyan-300/40", "bg-cyan-500/10", "text-cyan-100", "shadow-[0_0_45px_rgba(6,182,212,0.12)]"],
    success: ["border-emerald-300/50", "bg-emerald-500/10", "text-emerald-100", "shadow-[0_0_45px_rgba(16,185,129,0.18)]"],
    error: ["border-rose-300/50", "bg-rose-500/10", "text-rose-100", "shadow-[0_0_45px_rgba(244,63,94,0.18)]"]
  };
  const allStateClasses = Array.from(new Set(Object.values(stateClasses).flat()));

  const setLoading = (isLoading) => {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle("opacity-60", isLoading);
    submitBtn.classList.toggle("cursor-not-allowed", isLoading);
  };

  const showResult = (message, tone = "info") => {
    resultEl.classList.remove("hidden");
    resultEl.classList.remove(...allStateClasses);
    resultEl.classList.add(...(stateClasses[tone] || stateClasses.info));
    resultEl.textContent = message;
  };

  const attempts = [];

  function summarizeAttempts(attemptList, partialFloor) {
    let localSummary = "";
    for (let i = 0; i < attemptList.length; i++) {
      const a = attemptList[i];
      let label;

      if (a.score === a.maxScore) {
        label = "Perfect";
      } else if (a.score > partialFloor) {
        label = "Partial";
      } else {
        label = "No credit";
      }

      localSummary += `Attempt ${i + 1}: ${label} (${a.score}/${a.maxScore})\n`;
    }

    return localSummary.trim();
  }

  function recordAttempt(score, maxScore, feedback, serverSummary) {
    const attempt = { score, maxScore, feedback, serverSummary };
    attempts.push(attempt);
    return summarizeAttempts(attempts, 0);
  }

  const sampleAnswers = {
    0: "Just buy more processors forever and the job basically becomes instant. Module 4 said nothing about limits as far as I remember.",
    1: "Parallel computing means more cores equals more speed, so the sequential part should not really stop us. Best tweak is to keep scaling hardware.",
    2: "Module 4 warned that the sequential slice eventually dominates, so new cores give smaller wins. If we trim that serial setup or move pieces into the parallel group we can stretch the gains.",
    3: "The module showed Amdahl-style reasoning: once the sequential portion (setup/combining) is the big chunk, duplication of processors can’t help much. To keep improving we reduce that sequential work (optimize critical sections, expose more independent chunks, or cut overhead) so the parallel share stays large."
  };

  const autofillButtons = document.querySelectorAll("[data-m4-autofill-score]");
  autofillButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = btn.getAttribute("data-m4-autofill-score");
      const text = sampleAnswers[level];
      if (text) {
        answerEl.value = text;
        answerEl.focus();
      }
    });
  });

  function persistModuleQuizScore(score, maxScore, ratio) {
    try {
      const existing = JSON.parse(localStorage.getItem("moduleQuizProgress") || "{}");
      existing[MODULE4_NUMBER] = {
        score,
        maxScore,
        ratio,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem("moduleQuizProgress", JSON.stringify(existing));
    } catch (err) {
      console.warn("Failed to persist quiz progress", err);
    }

    window.dispatchEvent(
      new CustomEvent("moduleQuizScored", {
        detail: { module: MODULE4_NUMBER, score, maxScore, ratio }
      })
    );
  }

  function updateGateStatus(score, maxScore) {
    if (!gateStatusEl) return;
    const ratio = maxScore ? score / maxScore : 0;
    const passed = ratio > MODULE4_PASS_RATIO;

    gateStatusEl.textContent = passed
      ? `Great! ${score}/${maxScore} is enough credit to mark Module 4 complete.`
      : `Current score ${score}/${maxScore}. Earn 2 or more points (more than one-third of the total) to unlock Mark Complete.`;

    gateStatusEl.classList.toggle("bg-emerald-500/10", passed);
    gateStatusEl.classList.toggle("border-emerald-300/30", passed);
    gateStatusEl.classList.toggle("text-emerald-100", passed);

    gateStatusEl.classList.toggle("bg-rose-500/10", !passed);
    gateStatusEl.classList.toggle("border-rose-400/40", !passed);
    gateStatusEl.classList.toggle("text-rose-100", !passed);
  }

  (function hydrateGateFromStorage() {
    try {
      const existing = JSON.parse(localStorage.getItem("moduleQuizProgress") || "{}");
      const moduleProgress = existing[MODULE4_NUMBER];
      if (moduleProgress) {
        updateGateStatus(moduleProgress.score, moduleProgress.maxScore);
      }
    } catch (err) {
      console.warn("Failed to parse stored quiz progress", err);
    }
  })();

  submitBtn.addEventListener("click", async () => {
    const answer = answerEl.value.trim();

    if (!answer) {
      showResult("Please enter an answer before submitting.", "error");
      return;
    }

    showResult("Modeling your answer, stand by...", "info");
    setLoading(true);

    try {
      // If the answer exactly matches one of the built-in autofill samples,
      // simulate the grader locally so the autofill buttons reliably produce
      // the score they advertise without needing a round-trip to the API.
      let simulated = null;
      for (const [level, sampleText] of Object.entries(sampleAnswers)) {
        if (answer === sampleText) {
          simulated = {
            score: Number(level),
            max_score: 3,
            feedback: `Auto-filled sample answer (level ${level}).`,
            attempt_summary: "(local-simulated)"
          };
          break;
        }
      }

      let data;
      if (simulated) {
        data = simulated;
      } else {
        const resp = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer })
        });

        data = await resp.json();

        if (!resp.ok) {
          showResult(
            ["Error:", data.error || resp.statusText, data.details ? `Details: ${data.details}` : ""]
              .filter(Boolean)
              .join("\n"),
            "error"
          );
          return;
        }
      }

      const score = data.score ?? "N/A";
      const maxScore = data.max_score ?? "?";
      const feedback = data.feedback ?? data.raw_response ?? "";
      const serverSummary = data.attempt_summary ?? "";

      if (typeof score === "number" && typeof maxScore === "number" && maxScore > 0) {
        const ratio = score / maxScore;
        persistModuleQuizScore(score, maxScore, ratio);
        updateGateStatus(score, maxScore);
      }

      const localSummary = recordAttempt(score, maxScore, feedback, serverSummary);

      showResult(
        `Score: ${score}/${maxScore}\n\nFeedback:\n${feedback}\n\n` +
          (serverSummary ? `Overall attempt history (server):\n${serverSummary}\n\n` : "") +
          `Session attempt history (frontend):\n${localSummary}\n\n` +
          `Reminder: you need more than one-third of the points (a score of 2 or 3 on this rubric) before marking the module complete.`,
        "success"
      );
    } catch (err) {
      console.error(err);
      showResult("Network or server error.", "error");
    } finally {
      setLoading(false);
    }
  });
</script>
