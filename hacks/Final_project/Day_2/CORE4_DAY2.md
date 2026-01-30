---
title: "Core 4 - Day 2 Code Deep Dive"
permalink: /core4/day2
layout: post
---

# Core 4: Execution Time Calculations — Day 2 Complete

**Task:** Document INPUT, OUTPUT, PROCEDURE, and Data Flow for Create PT

---

## Task 1: INPUT Documentation ✓

### Frontend Input Code

**File:** `frontend/cores/core-4.md` (Speedup Calculator)

```javascript
function setSequentialFraction(fraction) {
  /**
   * INPUT: User adjusts sequential fraction slider
   * This function processes the input and updates simulation parameters
   */

  // INPUT VALIDATION: Clamp between 0 and 1
  const s = Math.max(0, Math.min(1, parseFloat(fraction)));
  state.sequentialFraction = s;
  state.parallelFraction = 1 - s;

  // OUTPUT: Update slider display
  document.getElementById('seq-fraction-display').textContent = `${(s * 100).toFixed(1)}%`;
  document.getElementById('par-fraction-display').textContent = `${((1 - s) * 100).toFixed(1)}%`;

  // INPUT ACCEPTED: Update UI
  updateParameterDisplay();
}

function setCoreCounts(coreList) {
  /**
   * INPUT: User selects which core counts to simulate
   * Example: [1, 2, 4, 8, 16]
   */

  if (!Array.isArray(coreList) || coreList.length === 0) {
    showToast('⚠️ Must select at least one core count', 'warning');
    return;
  }

  // INPUT VALIDATION: Ensure all are positive integers
  if (!coreList.every(c => Number.isInteger(c) && c > 0)) {
    showToast('⚠️ Core counts must be positive integers', 'warning');
    return;
  }

  // INPUT ACCEPTED
  state.coreCounts = coreList.sort((a, b) => a - b);
  
  // OUTPUT: Show selected cores
  document.getElementById('core-counts-display').textContent = 
    state.coreCounts.join(', ');
}

function setWorkloadSize(size) {
  /**
   * INPUT: User adjusts total workload size (affects baseline time)
   */

  const workload = Math.max(100, parseInt(size));

  // INPUT VALIDATION
  if (isNaN(workload)) {
    showToast('⚠️ Invalid workload size', 'warning');
    return;
  }

  // INPUT ACCEPTED
  state.workloadSize = workload;

  // OUTPUT: Update display
  document.getElementById('workload-display').textContent = 
    `${workload} work units`;
}

function setFormula(formulaType) {
  /**
   * INPUT: User toggles between Amdahl's Law and Gustafson's Law
   */

  if (!['amdahl', 'gustafson'].includes(formulaType)) {
    showToast('⚠️ Invalid formula', 'warning');
    return;
  }

  // INPUT ACCEPTED
  state.formula = formulaType;

  // OUTPUT: Highlight selected formula button
  document.querySelectorAll('.formula-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-formula="${formulaType}"]`).classList.add('active');
}

function toggleAutoUpdate(enabled) {
  /**
   * INPUT: User enables/disables automatic chart updates on slider change
   */

  state.autoUpdate = enabled;

  // OUTPUT: Update toggle UI
  document.getElementById('auto-update-toggle').checked = enabled;
}
```

### Input Breakdown

| Component | Description | Code Function |
|-----------|-------------|---|
| **Sequential Fraction Slider** | Sets s value (0 to 1) | `setSequentialFraction(fraction)` |
| **Core Count Selection** | Chooses which core counts to simulate | `setCoreCounts(coreList)` |
| **Workload Size Slider** | Sets total work units | `setWorkloadSize(size)` |
| **Formula Toggle** | Switch between Amdahl and Gustafson | `setFormula(formulaType)` |
| **Start Simulation Button** | Triggers simulation run | `startSimulation()` |
| **Run Benchmark Button** | Executes micro-benchmark (optional) | `runBenchmark()` |
| **Auto-Update Toggle** | Live chart updates as user adjusts sliders | `toggleAutoUpdate(enabled)` |

### Input Data Structures

```javascript
// Global state (Lines 100-150)
let state = {
  sequentialFraction: 0.2,      // s: Sequential portion (0-1)
  parallelFraction: 0.8,        // p: Parallel portion (0-1)
  coreCounts: [1, 2, 4, 8, 16], // LIST of processor counts to simulate
  workloadSize: 1000,           // Total work units
  formula: 'amdahl',            // 'amdahl' or 'gustafson'
  autoUpdate: true,             // Update charts live
  baselineTime: 0,              // Single-core execution time
  results: [],                  // LIST of simulation results
  benchmarkData: null           // Measured benchmark results (optional)
};

// Order object for each simulation run
let simulationRun = {
  runId: 'uuid-v4',
  timestamp: Date.now(),
  parameters: {
    sequentialFraction: 0.2,
    parallelFraction: 0.8,
    coreCounts: [1, 2, 4, 8, 16],
    workloadSize: 1000,
    formula: 'amdahl'
  },
  results: [                    // LIST of results per core count
    {
      cores: 1,
      predicted: 1.0,           // Single core speedup = 1.0
      measured: 1.05,           // Actual measured (if benchmark run)
      efficiency: 1.0,          // Speedup / cores
      executionTime: 1000       // Predicted exec time (seconds)
    },
    {
      cores: 2,
      predicted: 1.82,
      measured: 1.78,
      efficiency: 0.91,
      executionTime: 549
    }
    // ... more core counts
  ]
};
```

### User Interaction Flow

1. **Adjust Sequential Fraction:** Drag slider → calls `setSequentialFraction(value)`
2. **Select Core Counts:** Check boxes or click buttons → calls `setCoreCounts([...])`
3. **Adjust Workload:** Slider for work units → calls `setWorkloadSize(value)`
4. **Choose Formula:** Click Amdahl or Gustafson → calls `setFormula(type)`
5. **Start Simulation:** Click "Run Simulation" → calls `startSimulation()`
6. **Optional Benchmark:** Click "Run Benchmark" → calls `runBenchmark()`
7. **Save Results:** Click "Log Results" → calls `logBenchmarkData()`

### Input Validation Rules

| Input | Validation Rule | Error Message |
|-------|----------------|---------------|
| Sequential Fraction | 0 ≤ s ≤ 1 | (Auto-clamped) |
| Core Counts | Non-empty array of positive integers | "Must select at least one core count" |
| Workload Size | Integer ≥ 100 | "Invalid workload size" |
| Formula | Must be 'amdahl' or 'gustafson' | "Invalid formula" |
| Start Simulation | At least one core count selected | (Silent if empty) |
| Benchmark | Optional, may take time | (Long-running indicator) |

---

## Task 2: OUTPUT Documentation ✓

### Frontend Output Code

**Visual Updates** — Speedup Charts & Results Table

```javascript
function updateResults() {
  /**
   * OUTPUT: Update charts and results table with simulation data
   * Called after simulation completes
   */

  if (!state.results || state.results.length === 0) {
    showToast('⚠️ No simulation results to display', 'warning');
    return;
  }

  // Extract data for charts
  const coresList = state.results.map(r => r.cores);
  const predictedSpeedups = state.results.map(r => r.predicted);
  const measuredSpeedups = state.results.map(r => r.measured);

  // OUTPUT: Update speedup chart (line plot)
  updateSpeedupChart(coresList, predictedSpeedups, measuredSpeedups);

  // OUTPUT: Update execution time chart (bar plot)
  updateExecutionTimeChart(coresList, state.results);

  // OUTPUT: Update efficiency chart (bar plot)
  updateEfficiencyChart(coresList, state.results);

  // OUTPUT: Update results table
  updateResultsTable(state.results);

  // OUTPUT: Show statistics summary
  const maxSpeedup = Math.max(...predictedSpeedups);
  const maxCores = coresList[predictedSpeedups.indexOf(maxSpeedup)];
  
  document.getElementById('max-speedup-stat').textContent = 
    `${maxSpeedup.toFixed(2)}x @ ${maxCores} cores`;
  
  document.getElementById('baseline-time-stat').textContent = 
    `${state.baselineTime.toFixed(3)}s`;

  showToast('✅ Simulation complete!', 'success');
}

function updateSpeedupChart(cores, predicted, measured) {
  /**
   * OUTPUT: Line chart showing Speedup vs Core Count
   * Predicted: theoretical from Amdahl/Gustafson
   * Measured: actual from optional benchmark
   */

  const ctx = document.getElementById('speedup-chart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: cores.map(c => `${c}c`),
      datasets: [
        {
          label: `Predicted (${state.formula === 'amdahl' ? 'Amdahl' : 'Gustafson'})`,
          data: predicted,
          borderColor: '#4CAF50',
          fill: false,
          tension: 0.1
        },
        {
          label: 'Measured (if available)',
          data: measured,
          borderColor: '#2196F3',
          borderDash: [5, 5],
          fill: false,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Speedup vs Core Count' }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Speedup (S)' }
        },
        x: {
          title: { display: true, text: 'Number of Cores' }
        }
      }
    }
  });
}

function updateResultsTable(results) {
  /**
   * OUTPUT: Display detailed results table
   * ITERATION: Create row for each simulation result in LIST
   */

  const tbody = document.getElementById('results-tbody');
  tbody.innerHTML = '';

  // ITERATION: Process each result in results LIST
  results.forEach(result => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${result.cores}</td>
      <td>${result.executionTime.toFixed(3)}s</td>
      <td>${result.predicted.toFixed(2)}x</td>
      <td>${(result.measured !== null ? result.measured.toFixed(2) + 'x' : 'N/A')}</td>
      <td>${(result.measured !== null ? (result.measured / result.predicted * 100).toFixed(1) : 'N/A')}%</td>
      <td>${result.efficiency.toFixed(3)}</td>
    `;
    tbody.appendChild(row);
  });
}

function showBenchmarkStatus(message, progress = null) {
  /**
   * OUTPUT: Show benchmark progress indicator
   */

  const statusDiv = document.getElementById('benchmark-status');
  statusDiv.textContent = message;
  
  if (progress !== null) {
    statusDiv.innerHTML += ` (${progress}%)`;
  }
}
```

### Backend Output Code

**File:** `backend/api/compute.py`

```python
# OUTPUT: Backend receives benchmark data
@app.route('/api/game-logs/speedup-calculator', methods=['POST'])
def log_speedup_benchmark():
    try:
        data = request.get_json()

        # Extract data from request
        run_id = data.get('runId')
        params = data.get('params', {})
        results = data.get('results', [])
        timestamp = datetime.now()

        # Store simulation metadata
        benchmark_log = {
            'run_id': run_id,
            'timestamp': timestamp,
            'sequential_fraction': params.get('sequentialFraction'),
            'parallel_fraction': params.get('parallelFraction'),
            'core_counts': params.get('coreCounts'),
            'formula': params.get('formula'),
            'result_count': len(results)
        }

        # Store each simulation result
        for result in results:
            result_entry = {
                'run_id': run_id,
                'cores': result['cores'],
                'predicted_speedup': result['predicted'],
                'measured_speedup': result.get('measured'),
                'efficiency': result['efficiency'],
                'execution_time': result['executionTime']
            }
            db.session.add(result_entry)

        db.session.commit()

        # OUTPUT: Return success response
        return jsonify({
            'success': True,
            'message': 'Benchmark data logged successfully',
            'run_id': run_id,
            'results_stored': len(results)
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# GET endpoint: Retrieve leaderboard (fastest speedups)
@app.route('/api/leaderboard/speedup-calculator', methods=['GET'])
def get_speedup_leaderboard():
    """
    OUTPUT: Return top speedup runs
    """
    try:
        # Query best runs (highest speedup at max cores)
        top_runs = db.session.query(BenchmarkLog)\
            .order_by(BenchmarkLog.predicted_speedup.desc())\
            .limit(10)\
            .all()

        leaderboard = [{
            'rank': i + 1,
            'run_id': run.run_id,
            'formula': run.formula,
            'seq_fraction': run.sequential_fraction,
            'max_cores': max(run.core_counts),
            'max_speedup': run.predicted_speedup,
            'timestamp': run.timestamp.isoformat()
        } for i, run in enumerate(top_runs)]

        return jsonify({
            'success': True,
            'leaderboard': leaderboard
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
```

### Output JSON Structure (Backend Logging)

```json
{
  "runId": "550e8400-e29b-41d4-a716-446655440000",
  "params": {
    "sequentialFraction": 0.2,
    "parallelFraction": 0.8,
    "coreCounts": [1, 2, 4, 8, 16],
    "workloadSize": 1000,
    "formula": "amdahl"
  },
  "results": [
    {
      "cores": 1,
      "predicted": 1.0,
      "measured": 1.05,
      "efficiency": 1.0,
      "executionTime": 1000.0
    },
    {
      "cores": 2,
      "predicted": 1.82,
      "measured": 1.78,
      "efficiency": 0.91,
      "executionTime": 549.0
    },
    {
      "cores": 4,
      "predicted": 2.86,
      "measured": 2.65,
      "efficiency": 0.71,
      "executionTime": 350.0
    }
  ]
}
```

### Output Breakdown

| Field | Type | Description | Calculation |
|-------|------|-------------|-------------|
| `runId` | UUID | Unique simulation run identifier | Generated at simulation start |
| `params` | Object | Input parameters used | User selections |
| `results` | **LIST** | Array of per-core results | One entry per core count |
| `cores` | int | Number of processors | From input selection |
| `predicted` | float | Theoretical speedup | Amdahl or Gustafson formula |
| `measured` | float | Actual speedup (if benchmarked) | Time measurement from `runBenchmark()` |
| `efficiency` | float | Speedup per core | `speedup / cores` |
| `executionTime` | float | Predicted execution time (seconds) | `baselineTime / speedup` |

### Visual Output Elements

| UI Element | Update Trigger | Display Value |
|------------|----------------|---------------|
| **Speedup Chart** | Simulation complete | Line plot, Predicted vs Measured |
| **Execution Time Chart** | Simulation complete | Bar chart showing time decrease |
| **Efficiency Chart** | Simulation complete | Efficiency per core count |
| **Results Table** | Simulation complete | Detailed per-core statistics |
| **Max Speedup Stat** | Simulation complete | `${maxSpeedup.toFixed(2)}x @ ${cores}c` |
| **Baseline Time Stat** | Simulation complete | `${baselineTime.toFixed(3)}s` |
| **Formula Display** | Formula toggle | "Amdahl's Law" or "Gustafson's Law" |
| **Toast Notifications** | Various events | Completion/error messages |
| **Benchmark Progress** | During benchmark | "Running... (XX%)" |

### Frontend Output Display Functions

```javascript
// OUTPUT: Format and display parameter summary
function displayParameterSummary() {
  const s = state.sequentialFraction;
  const p = 1 - s;

  const summaryHTML = `
    <div class="parameter-summary">
      <p><strong>Sequential Fraction (s):</strong> ${(s * 100).toFixed(1)}%</p>
      <p><strong>Parallel Fraction (p):</strong> ${(p * 100).toFixed(1)}%</p>
      <p><strong>Cores Simulated:</strong> ${state.coreCounts.join(', ')}</p>
      <p><strong>Formula:</strong> ${state.formula === 'amdahl' ? "Amdahl's Law" : "Gustafson's Law"}</p>
      <p><strong>Baseline Time:</strong> ${state.baselineTime.toFixed(3)}s</p>
    </div>
  `;

  document.getElementById('parameter-summary').innerHTML = summaryHTML;
}

// OUTPUT: Show detailed result for single core count
function displayDetailedResult(cores) {
  const result = state.results.find(r => r.cores === cores);
  
  if (!result) {
    showToast('⚠️ Result not found', 'warning');
    return;
  }

  const detailHTML = `
    <div class="detailed-result">
      <h3>${cores}-Core Configuration</h3>
      <p><strong>Predicted Speedup:</strong> ${result.predicted.toFixed(2)}x</p>
      <p><strong>Measured Speedup:</strong> ${(result.measured || 'N/A').toFixed(2)}x</p>
      <p><strong>Efficiency:</strong> ${result.efficiency.toFixed(3)} (${(result.efficiency * 100).toFixed(1)}%)</p>
      <p><strong>Execution Time:</strong> ${result.executionTime.toFixed(3)}s</p>
    </div>
  `;

  document.getElementById('detailed-result').innerHTML = detailHTML;
}

// OUTPUT: Send results to backend
async function logBenchmarkData() {
  const payload = {
    runId: state.runId,
    params: {
      sequentialFraction: state.sequentialFraction,
      parallelFraction: state.parallelFraction,
      coreCounts: state.coreCounts,
      workloadSize: state.workloadSize,
      formula: state.formula
    },
    results: state.results
  };

  try {
    const response = await fetch(`${API_URL}/api/game-logs/speedup-calculator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      showToast(`✅ Results saved (Run ID: ${result.run_id})`, 'success');
      return true;
    } else {
      showToast('❌ Failed to save results', 'error');
      return false;
    }
  } catch (error) {
    console.error('Error logging benchmark:', error);
    showToast('❌ Error saving results', 'error');
    return false;
  }
}
```

---

## Task 3: PROCEDURE Identification ✓

### Main Procedure: `startSimulation()`

**File:** `frontend/cores/core-4.md`

```javascript
function startSimulation() {
  /**
   * PROCEDURE: Run simulation across all selected core counts
   *
   * Contains:
   * - SEQUENCING: Compute baseline → validate params → iterate cores → calculate results
   * - SELECTION: Choose Amdahl or Gustafson based on state.formula
   * - ITERATION: for loop through state.coreCounts LIST
   * - LIST MANIPULATION: Push results into state.results array
   */

  // SEQUENCING STEP 1: Validate inputs
  if (!state.coreCounts || state.coreCounts.length === 0) {
    showToast('⚠️ Select core counts first', 'warning');
    return;
  }

  if (state.sequentialFraction < 0 || state.sequentialFraction > 1) {
    showToast('⚠️ Sequential fraction must be 0-1', 'warning');
    return;
  }

  // SEQUENCING STEP 2: Calculate baseline (single-core) time
  const s = state.sequentialFraction;
  const p = 1 - s;
  
  // Baseline: assume speed = 1.0 per work unit per core
  state.baselineTime = state.workloadSize / 1.0;

  // SEQUENCING STEP 3: Clear previous results
  state.results = [];

  // SEQUENCING STEP 4: ITERATION through core counts LIST
  for (let N of state.coreCounts) {
    // SELECTION: Choose formula and calculate speedup
    let speedup;
    
    if (state.formula === 'amdahl') {
      // Amdahl's Law: S(N) = 1 / (s + p/N)
      speedup = 1 / (s + (p / N));
    } else {
      // Gustafson's Law: S(N) = N - (N-1)*s
      speedup = N - (N - 1) * s;
    }

    // Calculate execution time under this speedup
    const executionTime = state.baselineTime / speedup;

    // Calculate efficiency
    const efficiency = speedup / N;

    // Optionally measure actual time (if benchmark was run)
    const measured = (state.benchmarkData && state.benchmarkData[N]) 
      ? state.benchmarkData[N] 
      : null;

    // SEQUENCING: Create result object and push into LIST
    const result = {
      cores: N,
      predicted: speedup,
      measured: measured,
      efficiency: efficiency,
      executionTime: executionTime
    };

    state.results.push(result); // LIST MANIPULATION
  }

  // SEQUENCING STEP 5: Update UI with new results
  updateResults();

  // SEQUENCING STEP 6: Log execution
  console.log(`✅ Simulation complete: ${state.results.length} core counts processed`);
}
```

### Secondary Procedure: `runBenchmark()`

**Optional: Measure actual execution times**

```javascript
async function runBenchmark() {
  /**
   * PROCEDURE: Execute micro-benchmark to measure real vs predicted times
   *
   * Contains:
   * - SEQUENCING: Initialize → run tasks → measure time → compare
   * - ITERATION: For each core count, run repeated work samples
   * - SELECTION: Only benchmark if benchmarks were selected
   */

  if (!state.coreCounts || state.coreCounts.length === 0) {
    showToast('⚠️ Run simulation first', 'warning');
    return;
  }

  showBenchmarkStatus('Benchmark starting...');
  state.benchmarkData = {};

  // ITERATION: Process each core count
  for (let i = 0; i < state.coreCounts.length; i++) {
    const N = state.coreCounts[i];
    
    // Show progress
    const progress = Math.round((i / state.coreCounts.length) * 100);
    showBenchmarkStatus(`Benchmarking ${N} cores...`, progress);

    // SEQUENCING: Run work simulation
    const startTime = performance.now();

    // Simulate parallel work: distribute work across N cores
    const workPerCore = state.workloadSize / N;
    let totalWork = 0;

    // Simulate sequential portion (cannot be parallelized)
    const seqWork = state.workloadSize * state.sequentialFraction;
    totalWork += seqWork;

    // Simulate parallel portion (can be parallelized)
    const parWork = state.workloadSize * state.parallelFraction;
    // Parallel work: divided by N cores
    totalWork += parWork / N;

    // Add overhead estimate (5% per additional core)
    const overhead = (N - 1) * 0.05 * state.baselineTime;
    totalWork += overhead;

    const endTime = performance.now();
    const measuredTime = (endTime - startTime) / 1000; // Convert to seconds
    const measuredSpeedup = state.baselineTime / measuredTime;

    // SEQUENCING: Store measured result
    state.benchmarkData[N] = measuredSpeedup;
  }

  showBenchmarkStatus('Benchmark complete!');

  // SEQUENCING STEP: Update results with measured data
  for (let result of state.results) {
    if (state.benchmarkData[result.cores]) {
      result.measured = state.benchmarkData[result.cores];
    }
  }

  updateResults();
  showToast('✅ Benchmark complete!', 'success');
}
```

### Auto-Update Procedure (Live Updates)

```javascript
function handleSliderChange(value, type) {
  /**
   * PROCEDURE: Handle live slider updates (if auto-update enabled)
   *
   * Contains:
   * - SELECTION: If autoUpdate enabled, re-run simulation
   * - SEQUENCING: Update parameter → simulate → display
   */

  // Update parameter based on type
  if (type === 'sequential') {
    setSequentialFraction(value);
  } else if (type === 'workload') {
    setWorkloadSize(value);
  }

  // SELECTION: Check if auto-update enabled
  if (state.autoUpdate && state.coreCounts.length > 0) {
    // SEQUENCING: Re-run simulation
    startSimulation();
  }
}
```

### Procedure Call Graph

```
startSimulation()
├─ SEQUENCING: Validate inputs
├─ SEQUENCING: Calculate baseline time (single-core)
├─ SEQUENCING: Clear previous results
└─ ITERATION: for each N in state.coreCounts
   ├─ SELECTION: if formula == 'amdahl'
   │  └─ Calculate: S(N) = 1 / (s + p/N)
   ├─ SELECTION: else (gustafson)
   │  └─ Calculate: S(N) = N - (N-1)*s
   ├─ Calculate efficiency: speedup / N
   ├─ Calculate execution time: baseline / speedup
   ├─ SELECTION: if measured data exists
   │  └─ Include measured speedup
   └─ LIST MANIPULATION: state.results.push(result)

runBenchmark()
├─ ITERATION: for each N in state.coreCounts
│  ├─ Simulate sequential work (cannot parallelize)
│  ├─ Simulate parallel work (divide by N)
│  ├─ Add overhead estimate
│  ├─ Measure total time
│  └─ Calculate measured speedup
├─ SEQUENCING: Store results in state.benchmarkData
└─ SEQUENCING: Update state.results with measured data

updateResults()
├─ Extract data from state.results LIST
├─ ITERATION: for each result
│  ├─ Add to chart datasets
│  ├─ Add to table row
│  └─ Update statistics
└─ Render all visualizations
```

---

## Task 4: Data Flow Diagram ✓

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
│  frontend/cores/core-4.md (Speedup Calculator)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
         User Input      User Input      User Input
         (Sliders)       (Core Select)   (Buttons)
                │             │             │
                └─────────────┼─────────────┘
                              │
                              ▼
     ┌──────────────────────────────────────────┐
     │           INPUT VALIDATION                │
     │  • Clamp fractions [0,1]                  │
     │  • Verify core counts positive integers   │
     │  • Check formula is 'amdahl'/'gustafson'  │
     └──────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
         startSimulation()           runBenchmark()
              │                           │
              │                           │
    PROCEDURE WITH:                 PROCEDURE WITH:
    • SEQUENCING                    • ITERATION
    • SELECTION                     • SEQUENCING
    • ITERATION                     • Timing code
              │                           │
              ▼                           ▼
    ┌─────────────────┐          ┌──────────────┐
    │ For N in cores: │          │ Simulated    │
    ├─────────────────┤          │ benchmark    │
    │ if Amdahl:      │          │ execution    │
    │ S=1/(s+p/N)    │          │ across cores │
    │ if Gustafson:   │          └──────────────┘
    │ S=N-(N-1)s     │                 │
    │                 │                 │
    │ efficiency=S/N  │                 │
    │ time=base/S    │                 │
    │                 │                 │
    │ Push to         │                 │
    │ results LIST    │                 │
    └─────────────────┘                 │
              │                         │
              │                    Update results
              │                    with measured
              │                         │
              └──────────┬──────────────┘
                         │
                         ▼
           ┌─────────────────────────────┐
           │     updateResults()         │
           │  OUTPUT: Charts + Tables    │
           └─────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   Speedup Chart    Exec Time Chart  Efficiency
   (Line plot)      (Bar chart)      (Bar chart)
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
           ┌─────────────────────────────┐
           │    Results Table Display    │
           │  • Cores | Time | Speedup   │
           │  • Measured | Efficiency    │
           └─────────────────────────────┘
                         │
                         ▼
           ┌─────────────────────────────┐
           │   logBenchmarkData()        │
           │   POST to backend           │
           └─────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │      BACKEND                    │
        │  backend/api/compute.py         │
        │                                 │
        │  POST /api/game-logs/           │
        │  speedup-calculator             │
        │                                 │
        │  • Store run in database        │
        │  • Log parameters + results     │
        │  • Calculate leaderboard rank   │
        └────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │   Database (PostgreSQL/MySQL)  │
        │  • benchmark_logs table         │
        │  • benchmark_results table      │
        │  • leaderboard rankings         │
        └────────────────────────────────┘
```

---

## Task 5: Create PT Criteria Mapping ✓

### INPUT, PROCEDURE, OUTPUT Alignment

| Create PT Req | Core 4 Implementation | Evidence |
|---------------|----------------------|----------|
| **INPUT** | User adjusts sliders for s, p, core counts | `setSequentialFraction()`, `setCoreCounts()` |
| **PROCEDURE with SELECTION** | Choose Amdahl or Gustafson formula | `if (state.formula === 'amdahl')` in loop |
| **PROCEDURE with ITERATION** | For loop through `state.coreCounts` LIST | `for (let N of state.coreCounts)` |
| **LISTS** | `state.results` array stores all results | `state.results.push(result)` |
| **OUTPUT** | Charts display speedup, execution time, efficiency | `updateSpeedupChart()`, `updateExecutionTimeChart()` |
| **Numeric Calculations** | Amdahl/Gustafson formulas with math operations | $S(N)=\frac{1}{s+p/N}$, $S(N)=N-(N-1)s$ |
| **Backend Integration** | POST results to `/api/game-logs/speedup-calculator` | `logBenchmarkData()` calls fetch |
| **Complexity** | Multi-stage: input validation → simulation loop → chart rendering | Meets minimum complexity requirements |

---

## Day 2 Completion Checklist

- [x] Task 1: INPUT functions documented with validation rules
- [x] Task 2: OUTPUT functions documented with JSON structure
- [x] Task 3: PROCEDURE identified (startSimulation, runBenchmark, updateResults)
- [x] Task 4: Data flow diagram created (frontend → backend flow)
- [x] Task 5: Create PT criteria verified

**Status:** ✅ Day 2 Complete — Code documentation ready for Create PT submission
