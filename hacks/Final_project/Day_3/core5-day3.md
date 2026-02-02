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

The overall purpose of my program is to demonstrate parallel computing speedup by allowing users to organize computational tasks into sequential (series) and simultaneous (parallel) execution models, then calculate how much faster the parallel approach performs. This interactive speedup calculator helps users understand Amdahl's Law and performance optimization in parallel systems.

The `computeSpeedup()` procedure contributes essential functionality by serving as the main calculation engine that processes user-organized tasks and computes performance metrics. This procedure:

1. Collects task time values from the Series and Parallel rows on the interface
2. Validates that at least one task exists before proceeding
3. Calculates total serial execution time (all tasks running sequentially)
4. Calculates total parallel execution time (series tasks + longest parallel task)
5. Computes the speedup ratio (serial time ÷ parallel time)
6. Updates the visual interface with results and stores data for saving

Without this procedure, the program would only be a static drag-and-drop interface with no ability to analyze or compare execution models, making it impossible to demonstrate parallel computing concepts.

---

### Procedure Code (for 3a)

**File:** `frontend/cores/core-5.md` — Lines 2747-2785

```javascript
window.computeSpeedup = function() {
    /**
     * PROCEDURE: computeSpeedup()
     * PURPOSE: Calculate speedup from task organization
     * RETURNS: None (updates DOM and global state)
     */

    // Collect tasks from Series Row
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // Collect tasks from Parallel Row
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // Validate input
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    // Calculate serial time (sum all tasks)
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);

    // Calculate parallel time (series sum + max parallel)
    const parallelTime = seriesBlocks.reduce((a, b) => a + b, 0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);

    // Calculate speedup ratio
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // Display results
    resultsElem.textContent = `Speedup: ${speedup.toFixed(3)}×`;
    speedBig.textContent = `${speedup.toFixed(2)}×`;
    speedBarInner.style.width = `${Math.round(speedup * 50)}%`;

    // Store result
    window.currentScore = { seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup };
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

The `computeSpeedup()` procedure implements an algorithm that includes sequencing, selection, and iteration to analyze parallel computing performance.

**Sequencing:** The algorithm executes steps in a specific order that cannot be rearranged:
1. First, collect task values from the Series row into an array
2. Then, collect task values from the Parallel row into a separate array
3. Next, validate that at least one task exists
4. Then, calculate the serial execution time
5. Next, calculate the parallel execution time
6. Then, compute the speedup ratio
7. Finally, update the visual display and store results

Each step depends on data from the previous step—for example, you cannot calculate speedup before knowing serial and parallel times.

**Selection:** The algorithm uses conditional statements to handle different scenarios:
- `if (seriesBlocks.length === 0 && parallelBlocks.length === 0)`: Validates that tasks exist before calculation
- `parallelBlocks.length ? Math.max(...parallelBlocks) : 0`: Checks if parallel tasks exist; if yes, finds the longest task; if no, uses 0
- `parallelTime > 0 ? serialTime / parallelTime : 0`: Prevents division by zero when calculating speedup

These selections ensure the program handles edge cases like empty task lists or zero parallel time.

**Iteration:** The algorithm uses array methods that iterate through task lists:
- `.filter(c => c.classList.contains("block"))`: Loops through DOM children to find task blocks
- `.map(b => parseInt(b.textContent))`: Iterates through filtered blocks to extract time values
- `.reduce((a, b) => a + b, 0)`: Loops through the combined task array to sum all values for serial time

This iteration processes any number of tasks dynamically, whether the user creates 1 task or 20 tasks.

---

### Algorithm Code (for 3b)

**File:** `frontend/cores/core-5.md` — Lines 2747-2785

```javascript
window.computeSpeedup = function() {
    // ===== SEQUENCING STEP 1: Collect series tasks =====
    // ITERATION: Array.from loops through DOM children
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))  // ITERATION: filter loops
        .map(b => parseInt(b.textContent));          // ITERATION: map loops

    // ===== SEQUENCING STEP 2: Collect parallel tasks =====
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // ===== SEQUENCING STEP 3: Validate input =====
    // SELECTION: Check if tasks exist
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    // ===== SEQUENCING STEP 4: Calculate serial time =====
    // ITERATION: reduce loops through combined array
    const serialTime = [...seriesBlocks, ...parallelBlocks]
        .reduce((a, b) => a + b, 0);

    // ===== SEQUENCING STEP 5: Calculate parallel time =====
    // ITERATION: reduce loops through series array
    const seriesTotal = seriesBlocks.reduce((a, b) => a + b, 0);
    
    // SELECTION: Check if parallel tasks exist
    const parallelMax = parallelBlocks.length 
        ? Math.max(...parallelBlocks)  // Find longest task
        : 0;                           // No parallel tasks
    
    const parallelTime = seriesTotal + parallelMax;

    // ===== SEQUENCING STEP 6: Calculate speedup =====
    // SELECTION: Avoid division by zero
    const speedup = parallelTime > 0 
        ? serialTime / parallelTime 
        : 0;

    // ===== SEQUENCING STEP 7: Display results =====
    resultsElem.textContent = `Speedup: ${speedup.toFixed(3)}×`;
    speedBig.textContent = `${speedup.toFixed(2)}×`;
    speedBarInner.style.width = `${Math.round(speedup * 50)}%`;

    // ===== SEQUENCING STEP 8: Store result =====
    window.currentScore = {
        seriesBlocks,      // LIST
        parallelBlocks,    // LIST
        serialTime,
        parallelTime,
        speedup
    };
}
```

---

## Task 3: PPR 3c — List Usage ✓

### Written Response 3c

> **Prompt:** Describe how the selected list manages complexity in your program.

**Response:**

The `seriesBlocks` and `parallelBlocks` lists are essential to my program because they store the execution time values for tasks organized by the user. These lists manage complexity in several ways:

**What the lists contain:** 
- `seriesBlocks`: Array of integers representing tasks that must run sequentially (e.g., `[5, 10]` means two tasks taking 5 and 10 time units)
- `parallelBlocks`: Array of integers representing tasks that can run simultaneously (e.g., `[8, 12]`)

**How the lists manage complexity:**

1. **Handle variable input:** Users might organize 1 task or 50 tasks in any combination of series/parallel. The lists dynamically grow or shrink to accommodate any number of tasks, eliminating the need for separate variables like `task1`, `task2`, `task3`, etc.

2. **Enable batch processing:** The iteration `.filter().map()` processes all task blocks in one operation, regardless of how many exist. Without lists, I would need separate code for each possible task count.

3. **Preserve execution order:** The lists maintain the left-to-right order of tasks as organized by the user, ensuring calculations reflect the intended task sequence.

4. **Simplify calculations:** List methods like `.reduce((a, b) => a + b, 0)` sum all values in one line. Without lists, I would need manual addition with variables: `total = task1 + task2 + task3 + ...`, which fails when task counts vary.

5. **Enable data persistence:** Both lists are stored in the `currentScore` object and later saved to the `savedRuns` array, allowing users to save and compare different task configurations.

Without these lists, the program would be limited to a fixed number of tasks, require extensive conditional logic for each possible task count, and could not adapt to user input dynamically.

---

### List Code (for 3c)

**File:** `frontend/cores/core-5.md` — Lines 2747-2785, 2787-2821

```javascript
window.computeSpeedup = function() {
    // ===== LIST CREATION: Collect tasks into arrays =====
    // LIST: seriesBlocks stores sequential task times
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))  // Filter to task blocks
        .map(b => parseInt(b.textContent));          // Extract time values

    // LIST: parallelBlocks stores simultaneous task times
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // ===== LIST USAGE: Combine lists for serial time =====
    // Spread operator combines both lists into one array
    const serialTime = [...seriesBlocks, ...parallelBlocks]
        .reduce((a, b) => a + b, 0);  // Sum all values

    // ===== LIST USAGE: Iterate through series list =====
    const seriesTotal = seriesBlocks.reduce((a, b) => a + b, 0);

    // ===== LIST USAGE: Find max in parallel list =====
    const parallelMax = parallelBlocks.length 
        ? Math.max(...parallelBlocks)  // Spread list into Math.max
        : 0;

    const parallelTime = seriesTotal + parallelMax;
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // ===== LIST STORAGE: Store lists in object =====
    window.currentScore = {
        seriesBlocks,      // LIST stored for saving
        parallelBlocks,    // LIST stored for saving
        serialTime,
        parallelTime,
        speedup
    };
}

// ===== LIST PERSISTENCE: Save to savedRuns array =====
window.saveRun = function() {
    // Validate data exists
    if (!window.currentScore) {
        alert("Please compute speedup first!");
        return;
    }

    const name = prompt("Enter a name for this run:");
    if (!name) return;

    // LIST APPEND: Add to savedRuns array
    savedRuns.push({
        name: name,
        seriesBlocks: window.currentScore.seriesBlocks,      // LIST
        parallelBlocks: window.currentScore.parallelBlocks,  // LIST
        serialTime: window.currentScore.serialTime,
        parallelTime: window.currentScore.parallelTime,
        speedup: window.currentScore.speedup,
        timestamp: new Date().toLocaleString()
    });

    alert(`✅ Run "${name}" saved! (Speedup: ${window.currentScore.speedup.toFixed(2)}×)`);
}

// ===== LIST ITERATION: Display saved runs =====
window.showSavedRuns = function() {
    if (savedRuns.length === 0) {
        savedRunsElem.textContent = "No runs saved yet.";
        return;
    }

    let text = `SAVED RUNS (${savedRuns.length} total)\n\n`;

    // ITERATION: Loop through savedRuns LIST
    savedRuns.forEach((run, i) => {
        text += `${i+1}. ${run.name} - Speedup: ${run.speedup.toFixed(3)}×\n`;
        text += `   Series: [${run.seriesBlocks.join(', ')}]\n`;     // LIST display
        text += `   Parallel: [${run.parallelBlocks.join(', ')}]\n`; // LIST display
    });

    savedRunsElem.textContent = text;
}
```

---

## Task 4: Code Screenshots ✓

### Screenshot Checklist

Take screenshots of these code segments for your Create PT submission:

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `core-5.md` | 2730-2740 | `addTask()` function |
| **Drag & Drop** | `core-5.md` | 2681-2715 | `drag()`, `drop()` functions |
| **Procedure** | `core-5.md` | 2747-2785 | Full `computeSpeedup()` function |
| **List Creation** | `core-5.md` | 2749-2753 | `seriesBlocks`, `parallelBlocks` arrays |
| **List Usage** | `core-5.md` | 2760-2763 | `.reduce()`, `Math.max()` on lists |
| **List Storage** | `core-5.md` | 2784-2785 | `currentScore` object with lists |
| **Iteration** | `core-5.md` | 2749-2753 | `.filter()`, `.map()` methods |
| **Selection** | `core-5.md` | 2755, 2763, 2770 | `if` checks, ternary operators |
| **Output** | `core-5.md` | 2767-2782 | Results display updates |

### How to Take Screenshots

1. Open `cores/core-5.md` in VS Code
2. Highlight the relevant lines (use line numbers)
3. Use `Cmd+Shift+4` (Mac) or `Win+Shift+S` (Windows)
4. Save with names: `input.png`, `procedure.png`, `lists.png`, etc.

---

## Task 5: Code Annotations ✓

### Annotated Procedure Code

Add these comments to your code for clarity:

```javascript
window.computeSpeedup = function() {
    /**
     * ===== PROCEDURE: computeSpeedup() =====
     * PURPOSE: Calculate parallel computing speedup
     * ALGORITHM: Uses sequencing, selection, iteration
     * LISTS: seriesBlocks[], parallelBlocks[]
     */

    // ===== SEQUENCING STEP 1: Collect series tasks into LIST =====
    // ITERATION: Array.from(), .filter(), .map() loop through DOM elements
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
        .filter(c => c.classList.contains("block"))  // SELECTION: filter blocks
        .map(b => parseInt(b.textContent));          // LIST: extract values

    // ===== SEQUENCING STEP 2: Collect parallel tasks into LIST =====
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));

    // ===== SEQUENCING STEP 3: INPUT VALIDATION =====
    // SELECTION: Check if at least one task exists
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;  // Early exit
    }

    // ===== SEQUENCING STEP 4: Calculate serial time =====
    // LIST USAGE: Spread operator combines both lists
    // ITERATION: .reduce() sums all task times
    const serialTime = [...seriesBlocks, ...parallelBlocks]
        .reduce((a, b) => a + b, 0);

    // ===== SEQUENCING STEP 5: Calculate parallel time =====
    // ITERATION: .reduce() sums series tasks
    const seriesTotal = seriesBlocks.reduce((a, b) => a + b, 0);
    
    // SELECTION: Check if parallel tasks exist
    // LIST USAGE: Math.max() finds longest parallel task
    const parallelMax = parallelBlocks.length 
        ? Math.max(...parallelBlocks)  // Tasks run simultaneously - use max
        : 0;                           // No parallel tasks
    
    const parallelTime = seriesTotal + parallelMax;

    // ===== SEQUENCING STEP 6: Calculate speedup ratio =====
    // SELECTION: Avoid division by zero
    const speedup = parallelTime > 0 
        ? serialTime / parallelTime 
        : 0;

    // ===== SEQUENCING STEP 7: OUTPUT - Display results =====
    const resultsElem = document.getElementById("results");
    resultsElem.className = "results has-results";
    
    // SELECTION: Choose success or failure message
    const message = speedup > 1 
        ? 'Success! You achieved speedup through parallelization.' 
        : 'No speedup gained - try moving more tasks to parallel row.';
    
    resultsElem.textContent = 
        `Series Tasks: [${seriesBlocks.join(', ')}]\n` +     // LIST display
        `Parallel Tasks: [${parallelBlocks.join(', ')}]\n` + // LIST display
        `Speedup: ${speedup.toFixed(3)}×\n\n` +
        message;

    // Visual output
    const speedBig = document.getElementById('speedBig');
    const speedBarInner = document.getElementById('speedBarInner');
    const speedLabel = document.getElementById('speedLabel');
    
    speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
    speedBarInner.style.width = `${Math.round(speedup * 50)}%`;
    
    // SELECTION: Choose status message
    speedLabel.textContent = speedup > 1 
        ? 'Nice — parallelism helped!' 
        : 'No speedup yet — try moving tasks to parallel.';

    // ===== SEQUENCING STEP 8: Store result =====
    // LIST STORAGE: Save both lists in object for persistence
    window.currentScore = {
        seriesBlocks,      // LIST
        parallelBlocks,    // LIST
        serialTime,
        parallelTime,
        speedup
    };
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
| **3a** | Purpose: parallel speedup demo; Procedure: `computeSpeedup()` handles collect→calculate→display | 150 words |
| **3b** | Sequencing: 8 ordered steps; Selection: 3 if/ternary checks; Iteration: .filter/.map/.reduce loops | 200 words |
| **3c** | Lists: `seriesBlocks[]`, `parallelBlocks[]`; Manages: variable tasks, batch processing, calculations, persistence | 200 words |

---

## Algorithm Explanation

**Serial Execution Time:**
- Sum ALL tasks as if they run one after another
- Formula: `serialTime = sum(seriesBlocks) + sum(parallelBlocks)`

**Parallel Execution Time:**
- Series tasks still run sequentially (no speedup)
- Parallel tasks run simultaneously (use longest task time)
- Formula: `parallelTime = sum(seriesBlocks) + max(parallelBlocks)`

**Speedup Ratio:**
- Measures how much faster parallel is than serial
- Formula: `speedup = serialTime / parallelTime`

**Example:**
```
Tasks: [5, 10, 8, 12]
Organization: Series [5, 10], Parallel [8, 12]

serialTime = 5 + 10 + 8 + 12 = 35 units
parallelTime = (5 + 10) + max(8, 12) = 15 + 12 = 27 units
speedup = 35 / 27 = 1.296× (29.6% faster!)
```

---

## Next Steps (Day 4)

1. Finalize 1-minute video script
2. Set up screen recording software (QuickTime/OBS)
3. Practice demo walkthrough
4. Prepare clean browser environment for recording
5. **CHECKPOINT:** Review video script with peer
