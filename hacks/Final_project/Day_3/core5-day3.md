---
title: "Core 5 - Day 3 Create PT Written Responses"
permalink: /core5/day3
layout: post
---

# Core 5: Speedup Calculator — Day 3

**Task:** Write PPR (Personalized Project Reference) Responses for Create PT

---

## Task 1: PPR 3a — Procedure Description ✓

### Written Response 3a

> **Prompt:** Describe the overall purpose of the program and what functionality the selected procedure contributes to.

**Response:**

My program demonstrates parallel computing speedup by allowing users to organize tasks into Series (sequential) and Parallel (simultaneous) rows, then calculates performance improvement. It helps visualize Amdahl's Law and parallel optimization concepts.

The `computeSpeedup()` procedure serves as the main calculation engine. It collects task values from both rows, validates input, calculates serial time (sum all tasks) and parallel time (series sum + max parallel task), computes the speedup ratio, and displays results. Without this procedure, the program would be only a drag-and-drop interface with no computational analysis.

---

### Procedure Code (for 3a)

**File:** `frontend/cores/core-5.md` — Lines 2747-2785

```javascript
window.computeSpeedup = function() {
    // Collect tasks from rows
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // Validate input
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Add tasks first");
        return;
    }

    // Calculate times
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);
    const parallelTime = seriesBlocks.reduce((a, b) => a + b, 0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // Display and store
    resultsElem.textContent = `Speedup: ${speedup.toFixed(3)}×`;
    speedBig.textContent = `${speedup.toFixed(2)}×`;
    window.currentScore = { seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup };
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

The `computeSpeedup()` algorithm includes sequencing, selection, and iteration:

**Sequencing:** Steps execute in required order: (1) collect series tasks, (2) collect parallel tasks, (3) validate input, (4) calculate serial time, (5) calculate parallel time, (6) compute speedup, (7) display results. Each step depends on previous outputs—speedup cannot be calculated before knowing both times.

**Selection:** Uses conditionals for different scenarios: `if (seriesBlocks.length === 0 && parallelBlocks.length === 0)` validates tasks exist; `parallelBlocks.length ? Math.max(...parallelBlocks) : 0` checks if parallel tasks exist before finding max; `parallelTime > 0 ? serialTime / parallelTime : 0` prevents division by zero.

**Iteration:** Array methods loop through tasks: `.filter(c => c.classList.contains("block"))` iterates through DOM children; `.map(b => parseInt(b.textContent))` loops to extract values; `.reduce((a, b) => a + b, 0)` iterates through arrays to sum times. This processes any number of tasks dynamically.
---

### Algorithm Code (for 3b)

**File:** `frontend/cores/core-5.md` — Lines 2747-2785

```javascript
window.computeSpeedup = function() {
    // STEP 1-2: Collect tasks (ITERATION)
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))  // ITERATION: filter
        .map(b => parseInt(b.textContent));          // ITERATION: map

    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // STEP 3: Validate (SELECTION)
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Add tasks first");
        return;
    }

    // STEP 4-5: Calculate times (ITERATION)
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);
    const parallelTime = seriesBlocks.reduce((a, b) => a + b, 0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);  // SELECTION

    // STEP 6: Compute speedup (SELECTION)
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // STEP 7: Display and store
    resultsElem.textContent = `Speedup: ${speedup.toFixed(3)}×`;
    window.currentScore = { seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup };
}
```

---

## Task 3: PPR 3c — List Usage ✓

### Written Response 3c

> **Prompt:** Describe how the selected list manages complexity in your program.

**Response:**

The `seriesBlocks` and `parallelBlocks` lists store task execution times organized by the user. They manage complexity by:

**What they contain:** `seriesBlocks` holds integers for sequential tasks (e.g., `[5, 10]`), while `parallelBlocks` holds simultaneous tasks (e.g., `[8, 12]`).

**How they manage complexity:**

1. **Variable input:** Lists dynamically accommodate 1-50+ tasks without needing separate variables (`task1`, `task2`, etc.)

2. **Batch processing:** `.filter().map()` processes all tasks regardless of count, avoiding separate code for each scenario

3. **Simplified calculations:** `.reduce((a, b) => a + b, 0)` sums values in one line instead of manual addition

4. **Data persistence:** Both lists store in `currentScore` object and save to `savedRuns` array for comparison

Without lists, the program would be limited to fixed task counts with extensive conditional logic for each possibility.
---

### List Code (for 3c)

**File:** `frontend/cores/core-5.md` — Lines 2747-2821

```javascript
window.computeSpeedup = function() {
    // LIST CREATION: Collect into arrays
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // LIST USAGE: Combine and sum
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);
    const parallelTime = seriesBlocks.reduce((a, b) => a + b, 0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);

    // LIST STORAGE: Save in object
    window.currentScore = { seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup };
}

// LIST PERSISTENCE
window.saveRun = function() {
    savedRuns.push({
        seriesBlocks: window.currentScore.seriesBlocks,      // LIST
        parallelBlocks: window.currentScore.parallelBlocks,  // LIST
        speedup: window.currentScore.speedup
    });
}

// LIST ITERATION
window.showSavedRuns = function() {
    savedRuns.forEach((run, i) => {
        text += `${i+1}. ${run.name} - Speedup: ${run.speedup.toFixed(3)}×\n`;
        text += `   Series: [${run.seriesBlocks.join(', ')}]\n`;     // LIST
        text += `   Parallel: [${run.parallelBlocks.join(', ')}]\n`; // LIST
    });
}
```

---

## Task 4: Code Screenshots ✓

### Screenshot Checklist

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `core-5.md` | 2730-2740 | `addTask()` function |
| **Procedure** | `core-5.md` | 2747-2785 | `computeSpeedup()` function |
| **List Creation** | `core-5.md` | 2749-2753 | `seriesBlocks`, `parallelBlocks` arrays |
| **Iteration** | `core-5.md` | 2749-2753, 2760 | `.filter()`, `.map()`, `.reduce()` |
| **Selection** | `core-5.md` | 2755, 2763, 2770 | `if` checks, ternary operators |
| **Output** | `core-5.md` | 2767-2782 | Results display |

---

## Task 5: Code Annotations ✓

```javascript
window.computeSpeedup = function() {
    // PROCEDURE: Calculate parallel speedup
    // LISTS: seriesBlocks[], parallelBlocks[]
    
    // ITERATION: Collect tasks
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))  // SELECTION
        .map(b => parseInt(b.textContent));

    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // SELECTION: Validate
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Add tasks first");
        return;
    }

    // ITERATION: Calculate
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);
    const parallelTime = seriesBlocks.reduce((a, b) => a + b, 0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);  // SELECTION
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;  // SELECTION

    // OUTPUT: Display
    resultsElem.textContent = `Speedup: ${speedup.toFixed(3)}×`;
    speedBig.textContent = `${speedup.toFixed(2)}×`;

    // LIST STORAGE
    window.currentScore = { seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup };
}
```

---

## Day 3 Checklist

- [x] PPR 3a — Procedure description
- [x] PPR 3b — Algorithm (sequencing/selection/iteration)
- [x] PPR 3c — List usage
- [x] Screenshot checklist
- [x] Code annotations

---

## PPR Summary

| Question | Key Points | Words |
|----------|------------|-------|
| **3a** | Purpose: parallel speedup demo; Procedure: `computeSpeedup()` | 150 |
| **3b** | Sequencing: 7 steps; Selection: 3 conditionals; Iteration: .filter/.map/.reduce | 200 |
| **3c** | Lists: `seriesBlocks[]`, `parallelBlocks[]`; Manages variable tasks, calculations | 150 |

**Algorithm:** Serial = sum all. Parallel = series sum + max(parallel). Speedup = serial/parallel.

**Example:** Tasks [5,10,8,12] → Series [5,10], Parallel [8,12] → Serial: 35, Parallel: 27, Speedup: 1.296×
