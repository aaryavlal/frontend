---
title: "Core 4 - Day 3"
permalink: /core4/day3
layout: post
---

# Core 4: Algorithm Performance Analysis — Day 3 Complete

**Team Member:** Aaryav
**Core Assignment:** Core 4 - Computing Performance Optimization (Scalability & Algorithm Efficiency)

---

## Task 1: Individual Task Identified ✓

**My Task:** Algorithm Performance Analyzer - Interactive Computing Scalability Exploration Tool

**What it does:** Users examine algorithm performance characteristics by inputting base execution time and computational properties, then analyze how execution time scales with varying levels of parallelization. The tool models performance scaling using established algorithms, demonstrates scalability limitations, and provides comparative analysis of sequential versus parallel execution models. Interactive controls and visualizations illustrate the relationship between algorithm parallelizability, processor resources, and achievable computational improvement.

**Why it fits CREATE Task (AP CSP Objectives):**
- Demonstrates **Algorithms (Big Idea 3):** Clear algorithmic procedure converting input (time measurements) → processing (performance calculations) → output (scalability metrics)
- Uses **Data Structures (Big Idea 1):** LISTS for processor configurations, performance measurements, efficiency metrics, and historical analysis data
- Implements **Procedural Abstraction (Big Idea 2):** Structured functions with sequencing (collect measurements → validate data → execute scalability algorithm → present results), selection (conditional logic for scalability constraints), and iteration (loop through computational configurations)

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

### Video Script: "Computing Performance Optimization - Understanding Algorithm Scalability & Performance Limitations"

**[0:00-0:10] HOOK + INTRO**
> "Why doesn't adding more processors always proportionally improve program execution time? Let me demonstrate algorithm scalability analysis and inherent computational constraints."

**[0:10-0:25] STAGE 1 - THEORETICAL MAXIMUM SCALABILITY**
- Display performance analysis interface
- Input base execution time: 100 seconds
- Input maximally parallelizable algorithm: 100%
- Explain: "For an algorithm with perfect parallelizability, execution time reduction is theoretically linear with computational resources - doubling processors halves execution time."
- Visualize scaling trajectory: 1 processor (baseline), 2 processors (2× faster), 4 processors (4× faster), 8 processors (8× faster)

**[0:25-0:40] STAGE 2 - PERFORMANCE CONSTRAINT ANALYSIS WITH PROCEDURE**
- Maintain 100 second base measurement
- Adjust algorithm parallelizability to 80%
- Explain: "Real algorithms contain inherent sequential dependencies preventing complete parallelization. Observe the performance ceiling..."
- Show scaling curve flattening
- Demonstrate: "With 16 processors, actual performance improvement only reaches 4.17× rather than theoretical 16×. This reflects the fundamental scalability constraint - the 20% sequential component creates an inherent performance bottleneck."
- Highlight: "The computational PROCEDURE iterates through configuration iterations, applying performance-scaling algorithms with conditional selection logic for constraint identification"

**[0:40-0:55] STAGE 3 - COMPUTATIONAL EFFICIENCY METRICS & LISTS**
- Display efficiency analysis alongside performance curves
- Explain: "Computational efficiency quantifies resource utilization. At 8 processors, efficiency reduces to 52% - the computational system wastes nearly half available resources due to scalability constraints."
- Reference efficiency measurements LISTS: [100%, 90%, 77%, 52%, 30%, ...]
- Highlight: "Increased computational resources demonstrate diminishing returns due to inherent scalability limitations"

**[0:55-1:00] CLOSE + CREATE TASK CONNECTION**
> "This analysis demonstrates all CREATE Task requirements: data INPUT (temporal measurements and algorithm properties), algorithmic PROCEDURE (scalability calculations with iteration through resource configurations and conditional constraint analysis), and information OUTPUT (performance metrics and efficiency arrays displayed as visual representations). The measurement history LISTS demonstrate data aggregation across multiple executions."

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
- **Theoretical scalability:** Linear performance improvement with ideal algorithm parallelization
- **Scalability constraints:** Sequential algorithm components limit maximum performance gains
- **Performance ceiling:** 80% parallelizable algorithms achieve ~5-6× maximum improvement (not 100×)
- **Industrial applications:** Enterprise computing systems face practical scalability limitations preventing unbounded resource allocation
- **Resource efficiency analysis:** Computational efficiency decreases with resource multiplication due to inherent sequential constraints

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

## Scalability Performance Model Deep Analysis

### Computational Performance Algorithm

**Performance Scaling Formula (Computing Scalability Model):**
$$T_{optimized} = T_{base} \times \left[(1-\alpha) + \frac{\alpha}{N}\right]$$

Where:
- $T_{optimized}$ = Optimized algorithm execution time with distributed resources
- $T_{base}$ = Baseline sequential algorithm execution time
- $\alpha$ = Algorithm parallelizability coefficient (0 to 1, representing proportion of algorithm amenable to parallelization)
- $N$ = Computational resource quantity (processor count)

**Performance Improvement Metric:**
$$\text{Speedup} = \frac{T_{base}}{T_{optimized}} = \frac{1}{(1-\alpha) + \frac{\alpha}{N}}$$

**Computational Efficiency Metric:**
$$\text{Efficiency} = \frac{\text{Speedup}}{N} \times 100\%$$

Represents the percentage of computational resources effectively utilized in performance improvement.

### Scalability Analysis Examples

| Base Time | Parallelizability | 1 Resource | 2 Resources | 4 Resources | 8 Resources | 16 Resources | 32 Resources |
|-----------|------------------|-----------|-----------|-----------|-----------|----------|----------|
| 100s | 100% | 1.0× | 2.0× | 4.0× | 8.0× | 16.0× | 32.0× |
| 100s | 80% | 1.0× | 1.85× | 3.08× | 4.17× | 4.71× | 4.90× |
| 100s | 50% | 1.0× | 1.33× | 1.60× | 1.78× | 1.88× | 1.94× |

**Critical Performance Principle:** As $N \to \infty$, maximum achievable performance improvement approaches $\frac{1}{1-\alpha}$

ThiAlgorithm Performance Scalability Comparison

| Algorithm Parallelizability | Theoretical Maximum Improvement | Practical Limitation (32 Resources) |
|------|------|-------|
| **100%** | Unbounded (linear) | 32.0× |
| **90%** | 10.0× maximum | 9.75× |
| **80%** | 5.0× maximum | 4.90× |
| **70%** | 3.33× maximum | 3.22× |
| **50%** | 2.0× maximum | 1.94× |
| **25%** | 1.33× maximum | 1.30× |

**Computational Analysis Observations:**
- **Typical algorithm characteristics:** 70-90% parallelizable; remaining 10-30% demonstrates inherent sequential dependencies (input/output operations, synchronization protocols, initialization procedures)
- **Enterprise system constraints:** Industrial computing infrastructure rarely justifies resource allocation beyond 16-32 computational units due to scalability ceiling limitations
- **GPU computing advantages:** Graphics processing algorithms achieve 95%+ parallelizability, enabling efficient scaling with thousands of cores
- **Distributed computing benefits:** Geographically distributed systems achieve improved performance through reduction of communication bottlenecks and resource fragmentation rather than pure parallelization
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
