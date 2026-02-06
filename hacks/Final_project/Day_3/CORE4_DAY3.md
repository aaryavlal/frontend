---
title: "Core 4 - Day 3 Create PT Written Responses"
permalink: /core4/day3
layout: post
---

# Core 4: Algorithm Performance Analyzer — Day 3 Complete

**Task:** Write PPR (Personalized Project Reference) Responses for Create PT

---

## College Board Create PT Requirements

The written response section requires you to answer questions about:
- **3a:** Procedure description — *What does your procedure do and why?*
- **3b:** Algorithm with sequencing, selection, and iteration — *How does it work step-by-step?*
- **3c:** List usage and purpose — *How does your list manage program complexity?*

---

## Task 1: PPR 3a — Procedure Description ✓

### PURPOSE

> The `updateSpeedup()` procedure enables real-time algorithm performance analysis by receiving user input parameters (sequential time, parallelizable fraction), calculating speedup values using Amdahl's Law across multiple processor configurations, and returning visualization data with efficiency metrics. It serves as the core calculation engine that transforms user inputs into meaningful performance insights.

### Written Response 3a

> **Prompt:** Describe the overall purpose of the program and what functionality the selected procedure contributes to.

**Response:**

The purpose of this program is to provide an interactive algorithm performance analyzer that enables users to explore computational scalability concepts by inputting base execution time and parallelizability metrics, then observing how performance scales with varying processor counts. This application demonstrates the practical implementation of Amdahl's Law for understanding parallel computing limitations and resource efficiency.

The student-developed procedure `updateSpeedup()` accepts **parameters** through user interface inputs, specifically receiving sequential time, parallelizable fraction, and processor count as input values. This procedure implements **sequencing** by executing operations in a precise order: first initializing result arrays, then iterating through processor configurations, followed by applying Amdahl's Law calculations, and finally updating the visualization. The procedure uses **selection** through conditional statements (`if (sequentialTime > 0)`) to validate inputs and handle edge cases appropriately. **Iteration** is implemented via `for` loops that process each processor count configuration, enabling comprehensive scalability analysis from a single calculation request.

The `updateSpeedup()` procedure fulfills these essential functions within the program architecture:

1. **Input Processing:** Receives and validates the numerical **parameters** from user interface elements
2. **Data Initialization:** Creates empty result LISTS to store speedup, efficiency, and timing values
3. **Performance Calculation:** Applies Amdahl's Law formula through `for` loop iteration over processor configurations
4. **Metric Generation:** Computes speedup ratios and efficiency percentages for each configuration
5. **History Tracking:** Records calculation sessions in a history LIST for comparative analysis
6. **Visualization Trigger:** Invokes chart update functions to display results graphically

The `updateSpeedup()` procedure is indispensable to the program's functionality; without this computational pathway combining **sequencing**, **selection**, and **iteration**, user input could not be transformed into performance metrics, processed through the scaling algorithm, or returned as meaningful visualization output.

---

### Procedure Code (for 3a)

**File:** `frontend/hacks/speedup-calculator.md` — Lines 450-580

```javascript
// PROCEDURE: updateSpeedup()
// PURPOSE: Calculate performance metrics across processor configurations
// RETURNS: Updates global lists and triggers visualization
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

            // Calculate efficiency: Speedup / N * 100%
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
        speedupValues: speedupValues,
        efficiencyValues: efficiencyValues,
        maxSpeedup: Math.max(...speedupValues),
        peakEfficiency: Math.max(...efficiencyValues)
    };
    calculationHistory.push(result);

    // Update visualization
    updateVisualization();
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### PURPOSE

> The algorithm transforms user input parameters into performance analysis results through a sequential pipeline: initialize arrays → iterate processor counts → apply Amdahl's Law → calculate efficiency → store results → update charts. Selection handles input validation, while iteration enables multi-configuration analysis from a single calculation request.

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

The `updateSpeedup()` procedure implements an algorithm that includes sequencing, selection, and iteration to analyze algorithm performance scalability.

**Sequencing:** The algorithm executes steps in a specific order that cannot be rearranged:
1. First, initialize empty result arrays (speedupValues, efficiencyValues, parallelTimes)
2. Then, iterate through each processor count configuration
3. Next, apply Amdahl's Law formula for each configuration
4. Then, calculate efficiency metrics based on speedup results
5. Finally, store results in history and update visualization

Each step depends on the previous step's output, making the sequence essential.

**Selection:** The algorithm uses conditional statements to handle different scenarios:
- `if (sequentialTime > 0)`: Validates that the input time is positive before calculating
- `if (processorCount === 1)`: Special case where speedup is always 1.0 (baseline)
- `if (inputType === 'sequentialTime')`: Determines which input parameter to update
- `if (numValue >= 0 && numValue <= 100)`: Validates parallelizable fraction range

These selections ensure the program responds appropriately to various input conditions.

**Iteration:** The algorithm uses a `for` loop to process multiple processor configurations:
- `for (let processorCount of processorCounts)`: Iterates through [1, 2, 4, 8, 16, 32, 64, 128, 256]
- For each iteration, the algorithm calculates parallel time, speedup, and efficiency, then appends results to output lists

This iteration allows the program to generate comprehensive scalability curves from a single calculation, showing how performance changes across all processor configurations.

---

### Algorithm Code (for 3b)

**File:** `frontend/hacks/speedup-calculator.md` — Lines 520-600

```javascript
// SEQUENCING: Steps must execute in this order
// Step 1: Initialize result arrays
speedupValues = [];
efficiencyValues = [];
parallelTimes = [];

// Step 2: Define processor configurations LIST
const processorCounts = [1, 2, 4, 8, 16, 32, 64, 128, 256];

// ITERATION: Process each processor count
for (let processorCount of processorCounts) {

    // SELECTION: Validate input before calculation
    if (sequentialTime > 0) {
        // Step 3: Apply Amdahl's Law formula
        const serialPortion = (1 - parallelizableFraction);
        const parallelPortion = parallelizableFraction / processorCount;
        const parallelTime = sequentialTime * (serialPortion + parallelPortion);

        // LIST APPEND: Store parallel time
        parallelTimes.push(parallelTime);

        // Step 4: Calculate speedup
        // SELECTION: Handle baseline case
        const speedup = processorCount === 1 ? 1.0 : sequentialTime / parallelTime;

        // LIST APPEND: Store speedup value
        speedupValues.push(speedup);

        // Step 5: Calculate efficiency
        const efficiency = (speedup / processorCount) * 100;

        // LIST APPEND: Store efficiency value
        efficiencyValues.push(efficiency);
    } else {
        // SELECTION: Handle invalid input
        speedupValues.push(0);
        efficiencyValues.push(0);
        parallelTimes.push(0);
    }
}

// Step 6: Store in history LIST
const result = {
    timestamp: new Date().toISOString(),
    sequentialTime: sequentialTime,
    parallelizableFraction: parallelizableFraction,
    processorCounts: processorCounts,
    speedupValues: speedupValues,
    efficiencyValues: efficiencyValues,
    maxSpeedup: Math.max(...speedupValues),
    peakEfficiency: Math.max(...efficiencyValues)
};
calculationHistory.push(result);

// Step 7: Update visualization
updateVisualization();
```

---

## Task 3: PPR 3c — List Usage ✓

### PURPOSE

> The `speedupValues` list stores calculated performance metrics for each processor configuration, enabling the program to handle variable analysis ranges. It maintains processor-count ordering and provides data directly to Chart.js for visualization rendering.

### Written Response 3c

> **Prompt:** Describe how the selected list manages complexity in your program.

**Response:**

The `speedupValues` list is essential to my program because it stores the calculated speedup metric for each processor configuration analyzed. This list manages complexity in several ways:

**What the list contains:** Each element in `speedupValues` is a floating-point number representing:
- The performance improvement ratio at that processor count
- Values range from 1.0 (baseline, single processor) to the theoretical maximum (limited by Amdahl's Law)
- Index position corresponds to the processor count in `processorCounts` array

**How the list manages complexity:**

1. **Handles variable configurations:** The calculation might analyze 9 different processor counts (1 to 256). The list dynamically stores results for any number of configurations, eliminating the need for separate variables like `speedup1`, `speedup2`, `speedup4`, etc.

2. **Enables batch visualization:** The Chart.js library accepts the `speedupValues` array directly as a dataset, allowing `data: speedupValues` instead of manually constructing data points.

3. **Preserves order:** The list maintains the processor-count order from the iteration, ensuring the x-axis (processors) correctly aligns with y-axis (speedup) values in the visualization.

4. **Supports aggregate functions:** Operations like `Math.max(...speedupValues)` easily find the peak speedup achieved, and `speedupValues.length` tracks how many configurations were analyzed.

5. **Enables history comparison:** The entire list is stored in the `calculationHistory` array, allowing users to compare previous analysis sessions.

Without this list, I would need separate variables for each processor configuration, manual Chart.js data construction, complex conditional logic to extract maximum values—significantly increasing code complexity and reducing maintainability.

---

### List Code (for 3c)

**File:** `frontend/hacks/speedup-calculator.md` — Lines 500-600

```javascript
// LIST DECLARATION: Initialize empty lists to store results
let speedupValues = [];      // Stores speedup for each processor count
let efficiencyValues = [];   // Stores efficiency for each processor count
let parallelTimes = [];      // Stores parallel execution time
let calculationHistory = []; // Stores all calculation sessions

// LIST: Processor configurations to analyze
const processorCounts = [1, 2, 4, 8, 16, 32, 64, 128, 256];

// ITERATION: Process each processor count and populate lists
for (let processorCount of processorCounts) {
    if (sequentialTime > 0) {
        // Calculate metrics
        const serialPortion = (1 - parallelizableFraction);
        const parallelPortion = parallelizableFraction / processorCount;
        const parallelTime = sequentialTime * (serialPortion + parallelPortion);
        const speedup = sequentialTime / parallelTime;
        const efficiency = (speedup / processorCount) * 100;

        // LIST APPEND: Add values to respective lists
        parallelTimes.push(parallelTime);
        speedupValues.push(speedup);
        efficiencyValues.push(efficiency);
    }
}

// LIST USAGE: Find maximum speedup achieved
const maxSpeedup = Math.max(...speedupValues);
const peakEfficiency = Math.max(...efficiencyValues);

// LIST USAGE: Store entire calculation in history
calculationHistory.push({
    timestamp: new Date().toISOString(),
    speedupValues: speedupValues,        // <-- LIST stored in history
    efficiencyValues: efficiencyValues,  // <-- LIST stored in history
    maxSpeedup: maxSpeedup
});

// LIST USAGE: Pass directly to Chart.js for visualization
speedupChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: processorCounts.map(p => `${p}P`),
        datasets: [{
            label: 'Speedup',
            data: speedupValues  // <-- LIST used as chart data
        }]
    }
});

// LIST USAGE: Display statistics
document.getElementById('maxSpeedup').textContent =
    Math.max(...speedupValues).toFixed(2) + 'x';  // <-- LIST aggregate function
```

---

## Task 4: Code Screenshots ✓

### Screenshot Checklist

Take screenshots of these code segments for your Create PT submission:

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `speedup-calculator.md` | 450-480 | Input handlers for sequential time, fraction, processors |
| **Procedure** | `speedup-calculator.md` | 520-600 | Full `updateSpeedup()` function |
| **List Declaration** | `speedup-calculator.md` | 500-510 | `speedupValues = []`, `efficiencyValues = []` |
| **List Append** | `speedup-calculator.md` | 550-560 | `speedupValues.push(speedup)` |
| **List Usage** | `speedup-calculator.md` | 720-740 | `data: speedupValues` in Chart.js |
| **Iteration** | `speedup-calculator.md` | 530-580 | `for (let processorCount of processorCounts)` |
| **Selection** | `speedup-calculator.md` | 535, 555 | `if (sequentialTime > 0)`, `if (processorCount === 1)` |
| **Output** | `speedup-calculator.md` | 720-800 | Chart.js visualization code |

### How to Take Screenshots

1. Open the file in VS Code
2. Highlight the relevant lines
3. Use `Cmd+Shift+4` (Mac) or `Win+Shift+S` (Windows) to capture
4. Save with descriptive names: `input.png`, `procedure.png`, `list.png`, etc.

---

## Task 5: Code Annotations ✓

### Annotated Procedure Code

Add these comments to your code for clarity:

```javascript
// ===== PROCEDURE: updateSpeedup() =====
// PURPOSE: Calculate speedup and efficiency across processor configurations
// RETURNS: Updates visualization charts with performance data
function updateSpeedup() {
    // ===== LIST DECLARATION =====
    speedupValues = [];      // Stores speedup for each processor count
    efficiencyValues = [];   // Stores efficiency percentages
    parallelTimes = [];      // Stores parallel execution times

    // ===== SEQUENCING STEP 1: Define configurations =====
    const processorCounts = [1, 2, 4, 8, 16, 32, 64, 128, 256];

    // ===== ITERATION: Process each processor count =====
    for (let processorCount of processorCounts) {

        // ===== SELECTION: Validate input =====
        if (sequentialTime > 0) {

            // ===== SEQUENCING STEP 2: Apply Amdahl's Law =====
            // Formula: T_parallel = T_sequential * [(1-P) + P/N]
            const serialPortion = (1 - parallelizableFraction);
            const parallelPortion = parallelizableFraction / processorCount;
            const parallelTime = sequentialTime * (serialPortion + parallelPortion);

            // ===== LIST APPEND: Store parallel time =====
            parallelTimes.push(parallelTime);

            // ===== SEQUENCING STEP 3: Calculate speedup =====
            // SELECTION: Handle baseline case (1 processor = no speedup)
            const speedup = processorCount === 1 ? 1.0 : sequentialTime / parallelTime;

            // ===== LIST APPEND: Store speedup =====
            speedupValues.push(speedup);

            // ===== SEQUENCING STEP 4: Calculate efficiency =====
            // Efficiency = Speedup / Processors * 100%
            const efficiency = (speedup / processorCount) * 100;

            // ===== LIST APPEND: Store efficiency =====
            efficiencyValues.push(efficiency);

        } else {
            // ===== SELECTION: Handle invalid input =====
            speedupValues.push(0);
            efficiencyValues.push(0);
            parallelTimes.push(0);
        }
    }

    // ===== SEQUENCING STEP 5: Store in history =====
    // LIST: calculationHistory tracks all sessions
    const result = {
        timestamp: new Date().toISOString(),
        sequentialTime: sequentialTime,
        parallelizableFraction: parallelizableFraction,
        processorCounts: processorCounts,
        speedupValues: speedupValues,         // LIST stored
        efficiencyValues: efficiencyValues,   // LIST stored
        maxSpeedup: Math.max(...speedupValues),
        peakEfficiency: Math.max(...efficiencyValues)
    };

    // ===== LIST APPEND: Add to history =====
    calculationHistory.push(result);

    // ===== SEQUENCING STEP 6: Update visualization =====
    // LIST USAGE: Pass speedupValues to Chart.js
    updateVisualization();
}
```

---

## Day 3 Checklist

- [x] Task 1: PPR 3a — Procedure description written
- [x] Task 2: PPR 3b — Algorithm with sequencing/selection/iteration explained
- [x] Task 3: PPR 3c — List usage and complexity management described
- [x] Task 4: Screenshot checklist prepared
- [x] Task 5: Code annotations added

---

## PPR Summary Table

| Question | Key Points | Word Count Target |
|----------|------------|-------------------|
| **3a** | Purpose: performance analysis; Procedure: `updateSpeedup()` handles input→Amdahl's Law→output | 150 words |
| **3b** | Sequencing: 6 ordered steps; Selection: 4 if statements; Iteration: for loop through processor counts | 200 words |
| **3c** | List: `speedupValues`; Manages: variable configs, batch visualization, order preservation, aggregate functions | 200 words |

---

## Next Steps (Day 4)

1. Finalize 1-minute video script
2. Set up screen recording software
3. Practice demo walkthrough
4. Prepare localhost environment for recording
5. **CHECKPOINT:** Review video script with peer
