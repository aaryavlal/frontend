---
title: "Core 4 - Day 3"
permalink: /core4/day3
layout: post
---

# Core 4: Execution Time Calculations — Day 3 Complete

**Team Member:** Aaryav
**Core Assignment:** Core 4 - Execution Time Calculations (Speedup & Efficiency)

---

## Task 1: Individual Task Identified ✓

**My Task:** Execution Time Calculator - Interactive Speedup & Efficiency Learning Tool

**What it does:** Users input sequential execution time and number of processors, then explore how parallel execution time scales across different processor counts. The tool calculates speedup, efficiency, and demonstrates Amdahl's Law limitations. Interactive sliders and visualizations show the relationship between parallelizable fraction, processor count, and achievable speedup.

**Why it fits Create PT:**
- Clear INPUT → PROCEDURE → OUTPUT flow (user enters time values → calculation algorithm → results display)
- Uses LISTS (processor count array, speedup array, efficiency array, results history)
- Has defined PROCEDURES with sequencing (read inputs → validate → calculate → display), selection (if parallelizable fraction < 100%, apply Amdahl's Law), and iteration (process calculations for each processor count)

---

## Task 2: API Routes Reviewed ✓

### Backend API: `backend/api/compute.py`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/game-logs/speedup-calculator` | POST | Log calculation session data (processor count, speedup achieved, efficiency) |
| `/api/leaderboard/speedup-calculator` | GET | Retrieve top efficiency scores |
| `/api/game-logs/session/{sessionId}` | GET | Get specific calculation session details |

### Key Frontend Functions:

| Function | Location | Purpose |
|----------|----------|---------|
| `initCalculator()` | Line 450 | Initialize calculator state, set default values |
| `updateSpeedup()` | Line 520 | Calculate speedup based on inputs (SELECTION) |
| `calculateEfficiency()` | Line 580 | Compute efficiency metrics (ITERATION) |
| `applyAmdahlsLaw()` | Line 650 | Apply Amdahl's Law formula (PROCEDURE) |
| `updateVisualization()` | Line 720 | Refresh chart and graphs (ITERATION over arrays) |
| `processHistoryArray()` | Line 850 | Track calculation history (LIST manipulation) |
| `logSessionData()` | Line 920 | Send session data to backend API |

---

## Task 3: Frontend + Backend Code Mapped ✓

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND                                       │
│  frontend/hacks/speedup-calculator.md                                   │
│  Lines 400-1200 (Embedded JavaScript)                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ User inputs sequential time, parallelizable fraction
                                    │ User adjusts processor count slider
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           INPUT                                          │
│  1. Sequential execution time: input number (seconds)                   │
│  2. Parallelizable fraction: slider 0-100%                             │
│  3. Processor count: slider 1-256 processors                           │
│  4. Load imbalance factor: optional adjustment                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND PROCEDURE                                  │
│  Calculation Engine (Lines 400-1000)                                    │
│                                                                          │
│  Data Structures (LISTS):                                               │
│  • processorCounts = [1, 2, 4, 8, 16, 32, 64, 128, 256]  ← LIST       │
│  • speedupValues = []    ← LIST of calculated speedups                  │
│  • efficiencyValues = [] ← LIST of efficiency percentages               │
│  • calculationHistory = []  ← LIST of previous sessions                 │
│                                                                          │
│  Core Calculation (Lines 520-650):                                      │
│  1. FOR EACH processor count in LIST (ITERATION):                       │
│     a. Extract inputs:                                                  │
│        - tSeq = sequential execution time (INPUT)                       │
│        - P = parallelizable fraction (0 to 1)                           │
│        - N = number of processors (from slider)                         │
│                                                                          │
│     b. Apply Amdahl's Law (PROCEDURE):                                   │
│        - Serial portion: (1 - P)                                        │
│        - Parallel portion: P / N                                        │
│        - tPar = tSeq * [(1 - P) + (P / N)]                              │
│                                                                          │
│     c. Calculate speedup (SELECTION + arithmetic):                      │
│        - IF tPar > 0 (SELECTION):                                       │
│          • Speedup = tSeq / tPar                                        │
│        - ELSE:                                                           │
│          • Speedup = 1.0 (no parallelization)                           │
│                                                                          │
│     d. Calculate efficiency (PROCEDURE):                                │
│        - Efficiency = Speedup / N * 100%                                │
│                                                                          │
│     e. Store in LIST (LIST manipulation):                               │
│        - speedupValues.push(Speedup)                                    │
│        - efficiencyValues.push(Efficiency)                              │
│                                                                          │
│  Historical Tracking (Lines 850-910):                                   │
│  1. Create result object: {tSeq, parallelizableFraction, processors,   │
│                            speedupValues, efficiencyValues, timestamp}  │
│  2. Add to calculationHistory LIST                                      │
│  3. FOR EACH entry in history (ITERATION):                              │
│     - Update history display panel                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           OUTPUT                                         │
│  Visual Updates:                                                         │
│  • Speedup chart (line graph: processors vs speedup)                    │
│  • Efficiency chart (line graph: processors vs efficiency %)            │
│  • Summary statistics: Max speedup achieved, peak efficiency            │
│  • Comparison table: Processor count | Time | Speedup | Efficiency     │
│  • Amdahl's Law curve visualization                                     │
│                                                                          │
│  Backend Logging (on save):                                             │
│  POST /api/game-logs/speedup-calculator                                │
│  JSON Body:                                                              │
│  {                                                                       │
│    "sessionId": "uuid-v4",                                              │
│    "sequentialTime": 100,        ← seconds                              │
│    "parallelizableFraction": 0.8, ← 80%                                 │
│    "maxProcessors": 16,          ← tested up to N processors            │
│    "maxSpeedup": 4.17,           ← best speedup achieved                │
│    "peakEfficiency": 26.06,      ← highest efficiency %                 │
│    "speedupValues": [1.0, 1.85, 3.08, 4.17, ...], ← LIST              │
│    "efficiencyValues": [100, 92.5, 77, 52.1, ...] ← LIST              │
│    "calculationHistory": [...]   ← LIST of all runs                     │
│  }                                                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      BACKEND PROCESSING                                  │
│  backend/api/compute.py                                                 │
│  • Store calculation session in database                                │
│  • Calculate efficiency ranking                                         │
│  • Return confirmation response                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### File Locations Summary

| Component | File Path | Key Lines |
|-----------|-----------|-----------|
| Main Calculator | `frontend/hacks/speedup-calculator.md` | All content |
| CSS Styling | Lines 12-400 | Layout, charts, visual effects |
| JavaScript Logic | Lines 400-1200 | Calculation engine, state management |
| Chart Visualization | Lines 800-950 | Chart.js integration for graphs |
| Backend API | `backend/api/compute.py` | Logging endpoint |
| Backend Model | `backend/model/compute.py` | Database models |

---

## Task 4: 1-Minute Video Script Outline ✓

### Video Script: "Execution Time Calculations - Understanding Speedup & Amdahl's Law"

**[0:00-0:10] HOOK + INTRO**
> "Ever wonder why parallel code isn't always faster? Let me show you using execution time calculations and Amdahl's Law."

**[0:10-0:25] STAGE 1 - IDEAL SPEEDUP INPUT**
- Show calculator interface
- Input sequential time: 100 seconds
- Input parallelizable fraction: 100%
- Explain: "With 100% parallelizable code, speedup SHOULD equal the number of processors - linear scaling."
- Show chart rising linearly: 1 processor (1x), 2 processors (2x), 4 processors (4x), 8 processors (8x)

**[0:25-0:40] STAGE 2 - AMDAHL'S LAW LIMITATION PROCEDURE**
- Keep same 100 seconds
- Change parallelizable fraction to 80%
- Explain: "But real code has serial portions that can't be parallelized. Watch what happens..."
- Show chart hitting a ceiling
- Point out: "Even with 16 processors, speedup only reaches 4.17x instead of 16x. This is Amdahl's Law - the 20% serial portion is a bottleneck."
- Highlight: "The PROCEDURE iterates through each processor count, applying Amdahl's Law formula with SELECTION logic for optimization"

**[0:40-0:55] STAGE 3 - EFFICIENCY ANALYSIS + LISTS**
- Show efficiency chart alongside speedup
- Explain: "Efficiency shows how well we're using each processor. At 8 processors, we get 52% efficiency - wasting half the CPU power!"
- Point to efficiency values LIST: [100%, 90%, 77%, 52%, 30%, ...]
- Highlight: "More processors = worse efficiency due to Amdahl's Law overhead"

**[0:55-1:00] CLOSE + CREATE PT CONNECTION**
> "This demonstrates INPUT (time and parallelizable fraction), PROCEDURE (Amdahl's Law calculations with iteration through processor counts), and OUTPUT (speedup and efficiency arrays displayed in charts). The calculation history is a LIST that grows with each experiment."

---

## Task 5: Team Sync Notes ✓

### Presentation Role Assignment

| Team Member | Core | Presentation Focus |
|-------------|------|-------------------|
| ALL | SUPERPOWER | Room Code Multiplayer System — Join rooms, learn together, light up CPU together |
| Dhyan | Core 1 | Computing Models — GPU Assembly Simulator |
| Lucas | Core 2 | Why Parallel/Distributed? — Mandelbrot Fractal |
| Rudra | Core 3 | AI Digit Recognizer — Sequential CNN Pipeline |
| **Aaryav** | **Core 4** | **Execution Time Calculations — Speedup Calculator** |
| Tanay | Core 5 | Hardware Performance — Interactive Learning Game |

### My N@tM Presentation Focus:
1. **Live Demo:** Input sequential time, vary parallelizable fraction, observe speedup ceiling
2. **Code Walkthrough:** Show Amdahl's Law formula implementation and calculation loop
3. **Data Structures:** Explain processorCounts[], speedupValues[], efficiencyValues[] LISTS
4. **Visualization:** Show how efficiency drops with processor count
5. **API Integration:** Show backend logging when calculation completes

### Key Talking Points:
- Ideal speedup: Linear (perfect scaling)
- Amdahl's Law: Serial bottleneck limits speedup
- 80% parallelizable code: Maximum speedup ~5-6x (not 100x!)
- Real-world connection: Why enterprise systems don't use 1000 processors for everything
- Efficiency tradeoff: More processors = less bang for the buck

---

## Create PT Code Segments (Preview)

### INPUT (User Input Handlers)
```javascript
// User inputs sequential time and parallelizable fraction
function handleInputChange(inputType, value) {
  // Parse and validate INPUT
  const numValue = parseFloat(value);
  
  if (inputType === 'sequentialTime') {
    // SELECTION: Validate time range
    if (numValue > 0 && numValue <= 10000) {
      sequentialTime = numValue;
    }
  } else if (inputType === 'parallelizableFraction') {
    // SELECTION: Validate fraction range (0-100%)
    if (numValue >= 0 && numValue <= 100) {
      parallelizableFraction = numValue / 100;
    }
  } else if (inputType === 'processorCount') {
    // SELECTION: Validate processor count
    if (numValue >= 1 && numValue <= 256) {
      currentProcessorCount = numValue;
    }
  }

  // Recalculate with new INPUT values
  updateSpeedup();
}
```

### PROCEDURE with Amdahl's Law + Lists (Calculation Engine)
```javascript
// Core PROCEDURE: Calculate speedup for all processor counts - ITERATION over LIST
function updateSpeedup() {
  // Initialize empty LISTS for results
  speedupValues = [];
  efficiencyValues = [];
  parallelTimes = [];

  // ITERATION: Process each processor count in LIST
  for (let processorCount of processorCounts) {
    
    // SELECTION: Apply Amdahl's Law only if valid inputs
    if (sequentialTime > 0) {
      // Amdahl's Law formula: T_par = T_seq * [(1-P) + P/N]
      const serialPortion = (1 - parallelizableFraction);
      const parallelPortion = parallelizableFraction / processorCount;
      const parallelTime = sequentialTime * (serialPortion + parallelPortion);
      
      // Store parallel time in LIST
      parallelTimes.push(parallelTime);

      // Calculate speedup
      const speedup = processorCount === 1 ? 1.0 : sequentialTime / parallelTime;
      speedupValues.push(speedup);

      // Calculate efficiency: Speedup / Number_of_Processors * 100%
      const efficiency = (speedup / processorCount) * 100;
      efficiencyValues.push(efficiency);
    } else {
      // Invalid input: add zeros to LISTS
      speedupValues.push(0);
      efficiencyValues.push(0);
      parallelTimes.push(0);
    }
  }

  // Store calculation in history LIST
  const result = {
    timestamp: new Date().toISOString(),
    sequentialTime: sequentialTime,
    parallelizableFraction: parallelizableFraction,
    processorCounts: processorCounts,
    speedupValues: speedupValues,
    efficiencyValues: efficiencyValues,
    parallelTimes: parallelTimes,
    maxSpeedup: Math.max(...speedupValues),
    peakEfficiency: Math.max(...efficiencyValues)
  };

  calculationHistory.push(result);

  // Update visualization
  updateVisualization();
}
```

### OUTPUT (Visualization + Backend Logging)
```javascript
// OUTPUT: Update charts and display results
function updateVisualization() {
  // Clear existing charts
  speedupChart.destroy();
  efficiencyChart.destroy();

  // Create speedup chart - LISTS for data
  speedupChart = new Chart(document.getElementById('speedupCanvas'), {
    type: 'line',
    data: {
      labels: processorCounts.map(p => `${p}P`),
      datasets: [{
        label: 'Speedup (Amdahl\'s Law)',
        data: speedupValues, // LIST output
        borderColor: '#00ffaa',
        backgroundColor: 'rgba(0, 255, 170, 0.1)',
        tension: 0.3,
        fill: true
      }]
    }
  });

  // Create efficiency chart - LISTS for data
  efficiencyChart = new Chart(document.getElementById('efficiencyCanvas'), {
    type: 'line',
    data: {
      labels: processorCounts.map(p => `${p}P`),
      datasets: [{
        label: 'Efficiency (%)',
        data: efficiencyValues, // LIST output
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        tension: 0.3,
        fill: true
      }]
    }
  });

  // Update summary statistics
  document.getElementById('maxSpeedupDisplay').textContent = 
    Math.max(...speedupValues).toFixed(2) + 'x';
  
  document.getElementById('peakEfficiencyDisplay').textContent = 
    Math.max(...efficiencyValues).toFixed(2) + '%';
}

// OUTPUT: Send calculation session to backend
async function logSessionData() {
  const latestResult = calculationHistory[calculationHistory.length - 1];
  
  const sessionData = {
    sessionId: generateUUID(),
    sequentialTime: latestResult.sequentialTime,
    parallelizableFraction: latestResult.parallelizableFraction,
    maxProcessors: Math.max(...latestResult.processorCounts),
    maxSpeedup: latestResult.maxSpeedup,
    peakEfficiency: latestResult.peakEfficiency,
    speedupValues: latestResult.speedupValues, // LIST output
    efficiencyValues: latestResult.efficiencyValues, // LIST output
    calculationHistory: calculationHistory // LIST output
  };

  const response = await fetch(`${API_URL}/api/game-logs/speedup-calculator`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionData)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('✅ Calculation logged successfully:', result);
  }
}
```

---

## Amdahl's Law Deep Dive

### Formula Breakdown

**Amdahl's Law:**
$$T_{parallel} = T_{sequential} \times \left[(1-P) + \frac{P}{N}\right]$$

Where:
- $T_{parallel}$ = Parallel execution time
- $T_{sequential}$ = Sequential execution time
- $P$ = Parallelizable fraction (0 to 1)
- $N$ = Number of processors

**Speedup Formula:**
$$S = \frac{T_{sequential}}{T_{parallel}} = \frac{1}{(1-P) + \frac{P}{N}}$$

**Efficiency Formula:**
$$E = \frac{S}{N} \times 100\%$$

### Example Calculations

| Sequential | P (%) | 1 Proc | 2 Proc | 4 Proc | 8 Proc | 16 Proc | 32 Proc |
|-----------|-------|--------|--------|--------|--------|---------|---------|
| 100s | 100% | 1.0x | 2.0x | 4.0x | 8.0x | 16.0x | 32.0x |
| 100s | 80% | 1.0x | 1.85x | 3.08x | 4.17x | 4.71x | 4.90x |
| 100s | 50% | 1.0x | 1.33x | 1.60x | 1.78x | 1.88x | 1.94x |

**Key Insight:** As $N \to \infty$, maximum speedup approaches $\frac{1}{1-P}$

---

## Execution Time Comparisons

| Parallelizable % | Max Speedup (infinite procs) | Practical Limit (32 procs) |
|-----------------|------------------------------|---------------------------|
| **100%** | Infinite | 32.0x |
| **90%** | 10.0x | 9.75x |
| **80%** | 5.0x | 4.90x |
| **70%** | 3.33x | 3.22x |
| **50%** | 2.0x | 1.94x |
| **25%** | 1.33x | 1.30x |

**Real-World Observations:**
- Most code is 70-90% parallelizable due to I/O, locking, serial initialization
- Enterprise systems rarely scale beyond 16-32 cores due to Amdahl's Law
- GPU parallelization works because tasks are 95%+ parallelizable
- Cloud computing benefits from distributed (not just parallel) processing

---

## Day 3 Completion Checklist

- [x] Task 1: Individual task identified and documented
- [x] Task 2: API routes and key functions mapped
- [x] Task 3: Complete data flow diagram created
- [x] Task 4: 1-minute video script outlined
- [x] Task 5: Team roles synchronized

**Status:** ✅ Day 3 Complete — Ready for Create PT documentation
