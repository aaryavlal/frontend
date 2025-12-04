---
layout: post
title: "Dummy Quiz"
permalink: /dummy-quiz
---

<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          quiz: {
            base: "#1e1b4b",
            glow: "#818cf8"
          }
        },
        boxShadow: {
          quiz: "0 25px 65px -25px rgba(20, 0, 80, 0.65)"
        }
      }
    }
  };
</script>

<section class="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white shadow-2xl shadow-indigo-600/10 sm:px-12">
  <div class="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[110px]"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950"></div>

  <div class="relative z-10 mx-auto flex max-w-4xl flex-col gap-12">
    <header class="space-y-3 text-center sm:text-left">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300">
        AI-Assisted Quiz
      </p>
      <h1 class="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        Dummy Quiz
      </h1>
      <p class="text-base text-slate-200 sm:text-lg">
        Craft a thoughtful response and get instant grading from the quiz microservice.
      </p>
    </header>

    <div class="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-quiz backdrop-blur-xl sm:p-10">
      <div class="space-y-4">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/90">
          Question
        </p>
        <p class="text-2xl font-semibold text-white">
          In your own words, explain what parallel computing is and give one real-world example
          where it would be beneficial.
        </p>
        <p class="text-base text-slate-200">
          Keep the answer concise—3 to 5 sentences is the sweet spot.
        </p>
        <div class="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          <div class="flex items-start gap-2 rounded-2xl bg-white/5 p-3">
            <span class="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            Connect the concept to a tangible scenario or workflow.
          </div>
          <div class="flex items-start gap-2 rounded-2xl bg-white/5 p-3">
            <span class="mt-1 h-2 w-2 rounded-full bg-sky-300"></span>
            Highlight why the task benefits from parallel execution.
          </div>
        </div>
      </div>

      <div class="mt-10 space-y-4">
        <div class="space-y-3">
          <label for="answer" class="text-sm font-medium text-slate-50">Your answer</label>
          <textarea
            id="answer"
            rows="7"
            class="block w-full rounded-2xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-400"
            placeholder="Type your answer here..."
          ></textarea>
          <p class="text-xs text-slate-400">
            Submissions are scored via the backend endpoint at <code class="font-mono text-emerald-300">/api/quiz/grade</code>.
          </p>
        </div>

        <!-- NEW: AUTOFILL CONTROLS -->
        <div class="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
            Autofill sample answers
          </p>
          <p class="text-xs text-slate-300">
            Click a level to insert a prewritten example answer for testing the grader.
          </p>
          <div class="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              data-autofill-score="0"
              class="inline-flex items-center rounded-full border border-rose-400/60 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-100 hover:bg-rose-500/20"
            >
              Autofill 0-point answer
            </button>
            <button
              type="button"
              data-autofill-score="1"
              class="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-100 hover:bg-amber-500/20"
            >
              Autofill 1-point answer
            </button>
            <button
              type="button"
              data-autofill-score="2"
              class="inline-flex items-center rounded-full border border-sky-400/60 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-100 hover:bg-sky-500/20"
            >
              Autofill 2-point answer
            </button>
            <button
              type="button"
              data-autofill-score="3"
              class="inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/20"
            >
              Autofill 3-point answer
            </button>
          </div>
        </div>
        <!-- END AUTOFILL CONTROLS -->
      </div>

      <div class="mt-8 flex flex-wrap items-center gap-4">
        <button
          id="submit-btn"
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <span>Submit Answer</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-[2.5]">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <p class="text-xs text-slate-400">
          You'll see scoring details here in just a moment.
        </p>
      </div>

      <pre
        id="result"
        aria-live="polite"
        class="mt-6 hidden whitespace-pre-wrap rounded-3xl border border-white/10 bg-white/5 p-5 text-sm font-medium leading-relaxed text-slate-100 transition-all duration-300"
      ></pre>
    </div>
  </div>
</section>

<script>
  const API_URL = "http://localhost:5000/api/quiz/grade"; // change for production
  const submitBtn = document.getElementById("submit-btn");
  const answerEl = document.getElementById("answer");
  const resultEl = document.getElementById("result");

  const stateClasses = {
    info: ["border-indigo-300/40", "bg-indigo-500/10", "text-indigo-100", "shadow-[0_0_45px_rgba(79,70,229,0.12)]"],
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

  // FRONTEND LIST + PROCEDURE AS BEFORE
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

  // NEW: SAMPLE ANSWERS FOR AUTOFILL
  const sampleAnswers = {
    0: "Hello, I really like eating food and sleeping",
    1: "Parallel computing is many computers sort of helping each other with work. It just makes the computer faster in a general way. People use it in science and big projects, but I am not sure exactly how.",
    2: "Parallel computing is when a program uses more than one processor to work on a problem at the same time instead of doing every step one after another.",
    3: "Parallel computing is a way of solving a problem by splitting it into smaller pieces that run at the same time on multiple processors or cores. Instead of one processor doing every step in order, many workers share the load and combine their results at the end. A common real-world example is rendering frames for an animated movie, where each frame is rendered on a different machine in a render farm. This parallel work lets studios finish huge graphical jobs in hours or days instead of weeks."
  };

  const autofillButtons = document.querySelectorAll("[data-autofill-score]");
  autofillButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = btn.getAttribute("data-autofill-score");
      const text = sampleAnswers[level];
      if (text) {
        answerEl.value = text;
        answerEl.focus();
      }
    });
  });

  submitBtn.addEventListener("click", async () => {
    const answer = answerEl.value.trim();

    if (!answer) {
      showResult("Please enter an answer before submitting.", "error");
      return;
    }

    showResult("Grading your answer...", "info");
    setLoading(true);

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer })   // INPUT SENT TO BACKEND
      });

      const data = await resp.json();

      if (!resp.ok) {
        showResult(
          ["Error:", data.error || resp.statusText, data.details ? `Details: ${data.details}` : ""]
            .filter(Boolean)
            .join("\n"),
          "error"
        );
        return;
      }

      const score = data.score ?? "N/A";
      const maxScore = data.max_score ?? "?";
      const feedback = data.feedback ?? data.raw_response ?? "";
      const serverSummary = data.attempt_summary ?? "";

      const localSummary = recordAttempt(score, maxScore, feedback, serverSummary);

      showResult(
        `Score: ${score}/${maxScore}\n\nFeedback:\n${feedback}\n\n` +
        (serverSummary ? `Overall attempt history (server):\n${serverSummary}\n\n` : "") +
        `Session attempt history (frontend):\n${localSummary}`,
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
