---
title: "Core 4 - Day 1"
permalink: /core4/day1
layout: post
---

# Core 4: Execution Time Calculations — Day 1 Complete

**Team Member:** Aaryav
**Core Assignment:** Core 4 - Execution Time Calculations (Speedup Calculator)

---

## Task 1: Individual Task Identified ✓

**My Task:** Speedup Calculator — Interactive Visualization of Amdahl's & Gustafson's Laws

**What it does:** Users adjust workload parameters (sequential fraction, parallel fraction, number of processors, per-core speed), then run simulations that show execution time, theoretical speedup, and effective throughput. Visualizations include plots of speedup vs cores, per-stage timelines, and a small benchmark harness to compare measured vs predicted times.

**Why it fits Create PT:**
- Clear INPUT → PROCEDURE → OUTPUT flow (user inputs → simulation logic → speedup/plots)
- Uses LISTS (benchmarks array, results array, series for charts)
- Has defined PROCEDURES with sequencing (compute baseline time → apply parallel fraction → distribute work), selection (if cores>1 choose parallel schedule), and iteration (simulate across core counts)

---

## Task 2: API Routes Reviewed ✓

### Backend API (example endpoints)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/game-logs/speedup-calculator` | POST | Log simulation/benchmark runs (params, results) |
| `/api/leaderboard/speedup-calculator` | GET | Retrieve top benchmark runs |
| `/api/compute/benchmark/{benchmarkId}` | GET | Get stored benchmark details |

### Key Frontend Functions (suggested names / locations in `core-4.md`)

| Function | Purpose |
|----------|---------|
| `initCalculator()` | Initialize UI, default parameters, charts |
| `startSimulation()` | Run simulation loop across core counts |
| `setParallelFraction()` | Update sequential/parallel fraction inputs |
| `runBenchmark()` | Execute a timed, optional micro-benchmark to measure actual execution time |
| `updateResults()` | Render charts/tables and update results LIST |
| `logBenchmarkData()` | Send run results to backend API |

---

## Task 3: Frontend + Backend Code Mapped ✓

### Data Flow (high level)

```
USER INPUTS (UI controls)
- sequentialFraction, parallelFraction, coreCounts[], perCoreSpeed
       │
       ▼
SIMULATION PROCEDURE (frontend)
- compute baseline time T1 = workUnits / singleCoreSpeed
- for each coreCount: compute predictedTime (Amdahl/Gustafson)
- optionally run micro-benchmark to measure realTime
- push result into results LIST
       │
       ▼
OUTPUT
- Charts: Speedup vs Cores, Time vs Cores
- Table: predictedTime, measuredTime, efficiency
- Backend: POST /api/game-logs/speedup-calculator (JSON payload)
```

### Core Procedures (behavioral summary)

- Input validation: clamp fractions between 0 and 1
- Iteration: step through requested core counts (e.g., 1,2,4,8,16)
- Selection: choose Amdahl or Gustafson formula based on user toggle
- Results LIST: append {cores, predicted, measured, efficiency}

---

## Task 4: 1-Minute Video Script Outline ✓

**Video Script: "Speedup Calculator — Amdahl vs Gustafson in 60s"**

**[0:00-0:08] HOOK**
> "How much faster does your code get with more cores? Let's measure it." 

**[0:08-0:22] SHOW INPUTS**
- Toggle sequential fraction to 40% → explain that 40% cannot be parallelized
- Show number of cores selector (1 → 16)

**[0:22-0:40] RUN SIMULATION**
- Click `Start Simulation` → show chart updating with predicted speedups
- Point out the flattening curve (Amdahl) versus near-linear (Gustafson) when parallel fraction grows

**[0:40-0:52] BENCHMARK**
- Run micro-benchmark → show measured times vs predicted
- Explain why measured can lag (overheads, synchronization, I/O)

**[0:52-1:00] CLOSE**
> "This tool connects INPUT (fractions, cores), PROCEDURE (apply formulas & simulate), and OUTPUT (speedup charts). Try changing the sequential fraction and see how scaling disappears." 

---

## Task 5: Team Sync Notes ✓

### Presentation Role Assignment (current project roster)

| Team Member | Core | Presentation Focus |
|-------------|------|-------------------|
| ALL | SUPERPOWER | Room Code Multiplayer System |
| Dhyan | Core 1 | GPU Assembly Simulator |
| Lucas | Core 2 | Mandelbrot Fractal (Parallelism) |
| Rudra | Core 3 | AI Digit Recognizer (Sequential pipeline) |
| **Aaryav** | **Core 4** | **Execution Time Calculations — Speedup Calculator** |
| Tanay | Core 5 | Hardware Performance Game |

### My N@tM Presentation Focus:
1. Live demo of the Speedup Calculator across core counts
2. Code walkthrough: Amdahl vs Gustafson implementation
3. Explain `results[]` LIST and simulation loop (ITERATION + SELECTION)
4. Show measured vs predicted benchmark results and explain overheads
5. Backend logging when user saves a run

---

## Create PT Code Segments (Preview)

### INPUT (Parameter change handler)
```javascript
// User adjusts sequential fraction slider
function setParallelFraction(seqFraction) {
  const p = Math.max(0, Math.min(1, 1 - seqFraction));
  state.sequentialFraction = seqFraction;
  state.parallelFraction = p;
  updateUI();
}
```

### PROCEDURE (Simulation loop with iteration)
```javascript
function startSimulation() {
  const results = [];
  const seq = state.sequentialFraction;
  const par = 1 - seq;

  for (let cores of state.coreCounts) { // ITERATION over core counts
    // SELECTION: choose formula
    const predictedAmdahl = 1 / (seq + par / cores);
    const predictedGustafson = cores - seq * (cores - 1);

    // Optionally measure (micro-benchmark) -> measuredTime
    const measured = runMicroBenchmark(cores);

    results.push({
      cores,
      predictedAmdahl,
      predictedGustafson,
      measured
    });
  }

  state.results = results; // LIST update
  updateResults();
}
```

### OUTPUT (Backend logging)
```javascript
async function logBenchmarkData(runId) {
  const payload = {
    runId,
    params: {
      sequentialFraction: state.sequentialFraction,
      coreCounts: state.coreCounts
    },
    results: state.results
  };

  const res = await fetch(`${API_URL}/api/game-logs/speedup-calculator`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });

  return res.ok;
}
```

---

## Amdahl vs Gustafson Comparison (quick table)

| Scenario | Formula | Expected Scaling |
|---------:|--------:|-----------------:|
| Amdahl's Law | $S(N)=\frac{1}{(1-P)+P/N}$ | Speedup limited by sequential fraction |
| Gustafson's Law | $S(N)=N - (N-1)\times s$ | Near-linear when problem size grows with N |

**Example (seq=0.2):**
- Cores=1 → speedup=1
- Cores=4 → Amdahl≈1/(0.2+0.8/4)=2.5, Gustafson≈4 - 3*0.2 = 3.4

---

## Day 1 Completion Checklist

- [x] Task 1: Individual task identified and documented
- [x] Task 2: API routes and key frontend functions mapped
- [x] Task 3: Data flow diagram and procedures sketched
- [x] Task 4: 1-minute video script outlined
- [x] Task 5: Team roles synchronized

**Status:** ✅ Day 1 Complete — Ready for Create PT documentation
