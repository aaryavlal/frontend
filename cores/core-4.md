---
toc: false
layout: post
title: "Core 4 — Module 4: Execution Time Calculations"
description: "Interactive exploration of sequential vs parallel time, using ideas from Modules 1–3"
permalink: /cores/core-4
breadcrumbs: false
---

[⬅ Back to Core 4 Overview](/cores/core-4)

<style>
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
    background: linear-gradient(135deg, #020617 0%, #0f172a 45%, #020617 100%);
    border: 1px solid rgba(14,165,233,0.55);
    border-radius: 18px 18px 0 0;
    box-shadow: 0 12px 30px rgba(2,6,23,0.55);
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
    color: #38bdf8;
    transition: transform 0.2s ease;
  }
  .m4-module-dropdown[open] .m4-dropdown-summary::after {
    transform: translateY(-50%) rotate(180deg);
  }
  .m4-summary-title {
    margin: 0;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: #38bdf8;
  }
  .m4-summary-hint {
    margin: 0;
    font-size: 0.95em;
    color: #cbd5f5;
  }
  .m4-shell {
    background: linear-gradient(145deg, #020617 0%, #04102a 80%);
    padding: clamp(26px, 4vw, 60px);
    border-radius: 0 0 18px 18px;
    color: #e2e8f0;
    box-shadow: 0 18px 45px rgba(15,23,42,0.9);
    border: 2px solid #0ea5e9;
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
        Gemini QPI Quiz
      </p>
      <h2 class="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        Module 4: Execution-Time Reasoning Check
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

<script>
  const MODULE4_PASS_RATIO = 1 / 3;
  const MODULE4_NUMBER = 4;
  const API_URL = "http://localhost:8587/api/quiz/grade";
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
  function recordAttempt(score, maxScore, feedback, serverSummary) {
    const attempt = { score, maxScore, feedback, serverSummary };
    attempts.push(attempt);

    let localSummary = "";
    for (let i = 0; i < attempts.length; i++) {
      const a = attempts[i];
      let label;

      if (a.score === a.maxScore) {
        label = "Perfect";
      } else if (a.score > 0) {
        label = "Partial";
      } else {
        label = "No credit";
      }

      localSummary += `Attempt ${i + 1}: ${label} (${a.score}/${a.maxScore})\n`;
    }

    return localSummary.trim();
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
