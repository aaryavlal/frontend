---
title: "Core 5 - Day 3 Create PT Written Responses"
permalink: /core5/day3
layout: post
---

# Core 5: Speedup Calculator — Day 3

**Task:** Write PPR (Personalized Project Reference) Responses for Create PT

---

## Task 1: PPR 3a — Procedure Description ✓

> **Prompt:** Describe the overall purpose of the program and what functionality the selected procedure contributes to.

**Program Purpose:**
- Demonstrates parallel computing speedup
- Users organize tasks: Series (sequential) vs Parallel (simultaneous)
- Calculates performance improvement
- Visualizes Amdahl's Law

**Procedure: `computeSpeedup()`**
- Collects task values from both rows
- Validates input exists
- Calculates serial time (sum all)
- Calculates parallel time (series + max parallel)
- Computes speedup ratio
- Displays results
- Without it: Just drag-and-drop, no analysis

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

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Sequencing (7 steps in order):**
1. Collect series tasks
2. Collect parallel tasks
3. Validate input
4. Calculate serial time
5. Calculate parallel time
6. Compute speedup
7. Display results

**Selection (conditionals):**
- `if (seriesBlocks.length === 0 && parallelBlocks.length === 0)` → validates tasks exist
- `parallelBlocks.length ? Math.max(...) : 0` → checks parallel tasks before max
- `parallelTime > 0 ? serialTime / parallelTime : 0` → prevents divide by zero

**Iteration (loops):**
- `.filter()` → iterates through DOM children
- `.map()` → loops to extract values
- `.reduce()` → sums array values

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

> **Prompt:** Describe how the selected list manages complexity in your program.

**Lists:** `seriesBlocks[]` and `parallelBlocks[]`

**What they store:**
- `seriesBlocks`: Sequential task times (e.g., `[5, 10]`)
- `parallelBlocks`: Simultaneous task times (e.g., `[8, 12]`)

**How they manage complexity:**

1. **Variable input**
   - Handle 1-50+ tasks dynamically
   - No need for `task1`, `task2`, etc.

2. **Batch processing**
   - `.filter().map()` processes all at once
   - Same code works for any count

3. **Simple calculations**
   - `.reduce()` sums in one line
   - No manual loops needed

4. **Data persistence**
   - Stored in `currentScore` object
   - Saved to `savedRuns[]` array

**Without lists:** Limited to fixed task counts, messy conditional logic

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
