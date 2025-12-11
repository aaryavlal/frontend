---
layout: post
title: "Core 4 — Module 4: Execution Time Calculations"
description: "Interactive exploration of sequential vs parallel time, using ideas from Modules 1–3"
permalink: /cores/core-4
breadcrumbs: true
---

[⬅ Back to Core 4 Overview](/cores/core-4)

<style>
  .m4-module-dropdown {
    margin: 0;
  }
  .m4-dropdown-summary {
    cursor: pointer;
    list-style: none;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: clamp(28px, 5vw, 60px) clamp(24px, 8vw, 140px);
    margin: 0 0 18px 0;
    background: linear-gradient(135deg, #020617 0%, #0f172a 45%, #020617 100%);
    border: 1px solid rgba(14,165,233,0.55);
    border-radius: 0;
    box-shadow: 0 14px 40px rgba(2,6,23,0.75);
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
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
    color: #38bdf8;
    transition: transform 0.2s ease;
  }
  .m4-module-dropdown[open] .m4-dropdown-summary::after {
    transform: translateY(-50%) rotate(180deg);
  }
  .m4-summary-title {
    margin: 0;
    font-size: clamp(1.9rem, 4vw, 2.6rem);
    color: #38bdf8;
  }
  .m4-summary-hint {
    margin: 0;
    font-size: 0.95em;
    color: #cbd5f5;
  }
  .m4-shell {
    background: linear-gradient(135deg, #020617 0%, #0f172a 45%, #020617 100%);
    padding: clamp(40px, 6vw, 120px) clamp(24px, 8vw, 140px);
    border-radius: 0;
    color: #e2e8f0;
    box-shadow: 0 18px 45px rgba(15,23,42,0.9);
    border: 2px solid #0ea5e9;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .m4-shell::before {
    content: "";
    position: absolute;
    inset: -40%;
    background: radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 55%),
                radial-gradient(circle at bottom right, rgba(59,130,246,0.16), transparent 55%);
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

  /* Tooltip styling for formula terms */
  .tooltip-term {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    border-radius: 999px;
    background: radial-gradient(circle at 0 0, rgba(56,189,248,0.25), rgba(15,23,42,0.9));
    border: 1px solid rgba(56,189,248,0.7);
    color: #e0f2fe;
    cursor: help;
    font-weight: 600;
    font-size: 0.95em;
    margin: 0 2px;
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
</style>

<details class="m4-module-dropdown" open>
  <summary class="m4-dropdown-summary">
    <h1 class="m4-summary-title">⚙️ Module 4: Execution Time Calculations</h1>
    <p class="m4-summary-hint">Click to collapse or expand this module.</p>
  </summary>

  <div class="m4-shell">
    <div class="m4-shell-inner">
      <p style="font-size:1.05em; color:#cbd5f5; line-height:1.8;">
        This module combines everything from Modules 1–3:
        you already know what <strong>sequential vs parallel</strong> work looks like (Module 1),
        why we chase parallelism at all (Module 2),
        and how <strong>sequential bottlenecks</strong> and <strong>overhead</strong> limit us (Module 3).
        Here you will turn those ideas into actual numbers by playing with a simple execution-time model.
      </p>

    <div class="m4-section">
      <h3 style="color:#0ea5e9; font-size:1.3em;">
        🧾 From story to formula
      </h3>
      <p style="font-size:0.98em; color:#e5e7eb; line-height:1.8;">
        Imagine an algorithm with:
        <strong>setup / combining work</strong> that cannot be split (sequential),
        plus a chunk of <strong>independent tasks</strong> that can run on multiple processors in parallel.
        The total time on one core is just the sum of everything; on multiple cores,
        only the parallel part shrinks.
      </p>

      <p style="font-size:1.0em; color:#e2e8f0; line-height:2;">
        <strong style="color:#0ea5e9;">Sequential time (Module 1):</strong>
        &nbsp; <em>T</em><sub>seq-total</sub> = <em>T</em><sub>seq-part</sub> + <em>T</em><sub>parallel-part</sub>
      </p>

      <p style="font-size:1.0em; color:#e2e8f0; line-height:2; margin-bottom:6px;">
        <strong style="color:#0ea5e9;">Parallel time model (using ideas from Module 3):</strong>
      </p>

      <p style="font-size:1.05em; color:#e5e7eb; line-height:2;">
        <span class="tooltip-term">
          <span class="term-label"><em>T</em><sub>parallel</sub></span>
          <span class="tooltip-box">
            <strong>Total time</strong> for the whole algorithm when you use multiple processors.
            This is what you care about in the real world: how long users wait.
          </span>
        </span>
        =
        <span class="tooltip-term">
          <span class="term-label"><em>T</em><sub>seq-part</sub></span>
          <span class="tooltip-box">
            The <strong>sequential portion</strong> that cannot be split up.
            Every processor must wait for this (setup, critical sections, combining results).
            This is the bottleneck from Module 3.
          </span>
        </span>
        +
        <span class="tooltip-term">
          <span class="term-label"><em>T</em><sub>parallel-part</sub> ÷ <em>P</em></span>
          <span class="tooltip-box">
            The <strong>independent work</strong> from Module 3 shared across
            <strong>P processors</strong>. We assume each processor gets about the same amount of work,
            so the time is roughly total parallel work divided by P, plus hidden overhead.
          </span>
        </span>
      </p>

      <p style="font-size:0.9em; color:#a5b4fc; margin-top:8px;">
        Hover over each pill to connect the symbols back to the story from earlier modules.
      </p>
    </div>

    <div class="m4-section">
      <h3 style="color:#0ea5e9; font-size:1.3em;">
        🎚 Interactive model: change the work, watch the time
      </h3>
      <p style="font-size:0.98em; color:#e5e7eb; line-height:1.7;">
        Use the sliders to describe an algorithm:
        how much is <strong>sequential</strong>, how much is <strong>parallelizable</strong>,
        and how many <strong>processors</strong> you have.
        The dashboard shows the sequential baseline, the modeled parallel time, and the resulting speedup
        (which Module 5 will formalize).
      </p>

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
            <div style="color:#94a3b8;">Parallel time (Modules 2–3)</div>
            <div style="color:#e5e7eb; font-weight:bold; font-size:1.05em;">
              <span id="m4-par-time">90</span> s
            </div>
            <p style="margin:6px 0 0 0; font-size:0.82em; color:#9ca3af;">
              Sequential setup + parallel work split across P processors.
            </p>
          </div>
          <div class="m4-metric-box">
            <div style="color:#94a3b8;">Speedup (Module 5 preview)</div>
            <div style="color:#4ade80; font-weight:bold; font-size:1.05em;">
              ×<span id="m4-speedup-value">1.89</span>
            </div>
            <p style="margin:6px 0 0 0; font-size:0.82em; color:#9ca3af;">
              How many times faster the parallel version is than the sequential baseline.
            </p>
          </div>
        </div>
      </div>

      <p style="font-size:0.9em; color:#a5b4fc; margin-top:14px; line-height:1.6;">
        Try increasing the number of processors while keeping a large sequential part.
        You should see the speedup flatten out — that is the <strong>sequential bottleneck</strong>
        and <strong>diminishing returns</strong> from Module 3 showing up in the math.
      </p>
    </div>
    </div>
  </div>
</details>

<script>
  const m4SeqSlider = document.getElementById('m4-seq-slider');
  const m4ParSlider = document.getElementById('m4-par-slider');
  const m4ProcSlider = document.getElementById('m4-proc-slider');

  const m4SeqValue = document.getElementById('m4-seq-value');
  const m4ParValue = document.getElementById('m4-par-value');
  const m4ProcValue = document.getElementById('m4-proc-value');

  const m4SeqTotalEl = document.getElementById('m4-seq-total');
  const m4ParTimeEl = document.getElementById('m4-par-time');
  const m4SpeedupEl = document.getElementById('m4-speedup-value');

  function updateM4Model() {
    const seq = parseFloat(m4SeqSlider.value);   // T_seq-part
    const par = parseFloat(m4ParSlider.value);   // T_parallel-part
    const P   = parseInt(m4ProcSlider.value, 10);

    // Sequential baseline
    const seqTotal = seq + par;

    // Simple parallel model: seq part + parallel part split over P
    const parallelTime = seq + par / Math.max(P, 1);

    const speedup = seqTotal / parallelTime;

    m4SeqValue.textContent = seq.toFixed(0);
    m4ParValue.textContent = par.toFixed(0);
    m4ProcValue.textContent = P.toString();

    m4SeqTotalEl.textContent = seqTotal.toFixed(0);
    m4ParTimeEl.textContent = parallelTime.toFixed(0);
    m4SpeedupEl.textContent = speedup.toFixed(2);
  }

  if (m4SeqSlider && m4ParSlider && m4ProcSlider) {
    m4SeqSlider.addEventListener('input', updateM4Model);
    m4ParSlider.addEventListener('input', updateM4Model);
    m4ProcSlider.addEventListener('input', updateM4Model);
    updateM4Model();
  }
</script>
