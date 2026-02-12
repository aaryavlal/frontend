---
title: "Core 5 - Day 3 Create PT Written Responses"
permalink: /core5/day3/2
layout: post
---

# Core 5: Speedup Calculator — Day 3 Complete

**Task:** Write PPR (Personalized Project Reference) Responses for Create PT

---

## College Board Create PT Requirements

The written response section requires you to answer questions about:
- **3a:** Procedure description — *What does your procedure do and why?*
- **3b:** Algorithm with sequencing, selection, and iteration — *How does it work step-by-step?*
- **3c:** List usage and purpose — *How does your list manage program complexity?*

---

## Task 1: PPR 3a — Procedure Description ✓

### Written Response 3a

**Program Purpose:**
This program demonstrates parallel computing speedup by allowing users to organize computational tasks into Series (sequential) and Parallel (simultaneous) execution rows. Users drag tasks between areas, calculate performance metrics, and visualize Amdahl's Law—learning how parallelism improves computational efficiency.

**Procedure: `computeSpeedup()`**

The `computeSpeedup()` procedure calculates speedup performance by:
1. **Collecting task data** — Extracts time values from series and parallel rows using `.filter()` and `.map()`
2. **Validating input** — Ensures tasks exist before calculation
3. **Computing serial time** — Sums all tasks as if sequential execution
4. **Computing parallel time** — Series sum + longest parallel task time
5. **Calculating speedup** — Ratio of serial/parallel times (T_serial / T_parallel)
6. **Displaying results** — Updates live monitor, speed bar, and results panel
7. **Storing data** — Saves configuration in `currentScore` for comparison/saving

**Parameters:** None (reads from DOM elements)
**Sequencing:** Steps execute in order—collect → validate → compute serial → compute parallel → calculate ratio → display → store
**Selection:** `if (no tasks)` returns early, `parallelBlocks.length ? max : 0` handles empty parallel, `parallelTime > 0 ? ratio : 0` prevents divide-by-zero
**Iteration:** `.filter()` iterates DOM children, `.map()` loops to extract values, `.reduce()` sums array times

Without this procedure, the program cannot calculate speedup, display metrics, or demonstrate parallel computing concepts—it becomes a non-functional drag-and-drop interface with no educational value.

---

### Procedure Code (for 3a)

**File:** `frontend/cores/core-5.md` — Lines 2200-2240

```javascript
function computeSpeedup() {
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));

    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    const resultsElem = document.getElementById("results");
    resultsElem.textContent = 
        `RESULTS\n` +
        `Series Tasks: [${seriesBlocks.join(', ') || 'none'}]\n` +
        `Parallel Tasks: [${parallelBlocks.join(', ') || 'none'}]\n\n` +
        `Serial Time (all sequential): ${serialTime} units\n` +
        `Parallel Time (with parallelism): ${parallelTime} units\n\n` +
        `Speedup: ${speedup.toFixed(3)}×\n\n` +
        `${speedup > 1 ? 'Success! You achieved speedup through parallelization.' : 'No speedup gained - try moving more tasks to parallel row.'}`;

    // Update live visual panel
    const speedBig = document.getElementById('speedBig');
    const speedBarInner = document.getElementById('speedBarInner');
    const speedLabel = document.getElementById('speedLabel');
    const pct = Math.min(200, Math.max(0, Math.round(speedup * 50)));
    speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
    speedBarInner.style.width = pct + '%';
    speedLabel.textContent = speedup > 1 ? 'Nice — parallelism helped!' : 'No speedup yet — try moving tasks to parallel.';

    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### Written Response 3b

**Sequencing:** Steps execute in required order:
1. Collect series tasks → 2. Collect parallel tasks → 3. Validate input → 4. Compute serial time → 5. Compute parallel time → 6. Calculate speedup → 7. Display results

Each step depends on prior output. Cannot compute speedup before collecting data, cannot display before calculating.

**Selection:** Conditionals handle different scenarios:
- `if (seriesBlocks.length === 0 && parallelBlocks.length === 0)` — Validates tasks exist before processing
- `parallelBlocks.length ? Math.max(...parallelBlocks) : 0` — Checks if parallel tasks exist before finding max (handles empty array)
- `parallelTime > 0 ? serialTime / parallelTime : 0` — Prevents division by zero
- `speedup > 1 ? 'Success!' : 'No speedup'` — Displays appropriate message based on result

**Iteration:** Array methods loop through collections:
- `.filter(c => c.classList.contains("block"))` — Iterates through DOM children to find task blocks
- `.map(b => parseInt(b.textContent))` — Loops to extract and convert values
- `.reduce((a,b)=>a+b,0)` — Iterates through array to sum all task times

This handles any number of tasks dynamically (1-50+).

---

### Algorithm Code (for 3b)

**File:** `frontend/cores/core-5.md` — Lines 2200-2240

```javascript
// SEQUENCING: Steps must execute in this order
function computeSpeedup() {
    // Step 1-2: Collect task data
    // ITERATION: Filter and map through DOM elements
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                            .filter(c => c.classList.contains("block"))  // ITERATION
                            .map(b => parseInt(b.textContent));          // ITERATION
    
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));

    // Step 3: Validate input
    // SELECTION: Check if tasks exist
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    // Step 4: Calculate serial time
    // ITERATION: Sum all tasks
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    
    // Step 5: Calculate parallel time
    // ITERATION: Sum series + SELECTION: handle empty parallel
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);  // SELECTION

    // Step 6: Calculate speedup
    // SELECTION: Prevent division by zero
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // Step 7: Display results
    const resultsElem = document.getElementById("results");
    resultsElem.textContent = 
        `RESULTS\n` +
        `Series Tasks: [${seriesBlocks.join(', ') || 'none'}]\n` +
        `Parallel Tasks: [${parallelBlocks.join(', ') || 'none'}]\n\n` +
        `Serial Time: ${serialTime} units\n` +
        `Parallel Time: ${parallelTime} units\n\n` +
        `Speedup: ${speedup.toFixed(3)}×\n\n` +
        // SELECTION: Choose message based on result
        `${speedup > 1 ? 'Success! You achieved speedup through parallelization.' : 'No speedup gained - try moving more tasks to parallel row.'}`;

    // Update live monitor
    const speedBig = document.getElementById('speedBig');
    const speedBarInner = document.getElementById('speedBarInner');
    const speedLabel = document.getElementById('speedLabel');
    
    const pct = Math.min(200, Math.max(0, Math.round(speedup * 50)));
    speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
    speedBarInner.style.width = pct + '%';
    speedLabel.textContent = speedup > 1 ? 'Nice — parallelism helped!' : 'No speedup yet — try moving tasks to parallel.';

    // Store for saving
    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}
```

---

## Task 3: PPR 3c — List Usage ✓

### Written Response 3c

**Lists:** `seriesBlocks` and `parallelBlocks` arrays store task execution times

**What they contain:** Each element is an integer representing task time in arbitrary units:
- `seriesBlocks` — Sequential tasks (e.g., `[5, 10, 8]`)
- `parallelBlocks` — Simultaneous tasks (e.g., `[12, 6]`)

**How they manage complexity:**

1. **Variable input** — Dynamically handles 1-50+ tasks without separate variables (`task1`, `task2`, etc.)

2. **Flexible organization** — Users can reorganize tasks between series/parallel at any time; arrays automatically resize

3. **Batch processing** — `.filter().map()` chain processes all tasks regardless of count—avoiding separate code for each scenario

4. **Simple calculations:**
   - Serial time: `.reduce((a,b)=>a+b,0)` sums values in one line instead of manual addition
   - Parallel time: `Math.max(...parallelBlocks)` finds longest task elegantly

5. **Data persistence** — Both lists stored in `currentScore` object, then saved to `savedRuns` array for run comparison

6. **Spread operator usage** — `[...seriesBlocks, ...parallelBlocks]` combines arrays for serial calculation

**Without lists:** Would need `seriesTask1`, `seriesTask2`, `parallelTask1`, etc. variables with complex conditionals for different counts. Adding a task would require new variables. Comparing configurations would be unmaintainable. The educational demonstration of scalable parallel computing would fail.

---

### List Code (for 3c)

**File:** `frontend/cores/core-5.md` — Lines 2181-2240

```javascript
// LIST CREATION: Collect task times into arrays
function computeSpeedup() {
    // Create seriesBlocks array from DOM
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                            .filter(c => c.classList.contains("block"))  // ITERATION
                            .map(b => parseInt(b.textContent));          // ITERATION
    
    // Create parallelBlocks array from DOM
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));

    // LIST LENGTH CHECK: Validate arrays not empty
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    // LIST USAGE: Combine arrays for serial calculation
    // ITERATION: Reduce sums all elements
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    
    // LIST USAGE: Process arrays separately for parallel
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) +   // Sum series
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);  // Max parallel

    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // LIST STORAGE: Save arrays in object
    window.currentScore = {
        seriesBlocks,      // LIST
        parallelBlocks,    // LIST
        serialTime,
        parallelTime,
        speedup
    };
}

// LIST PERSISTENCE: Add to savedRuns array
let savedRuns = [];  // Global list of runs

function saveRun() {
    if (!window.currentScore) {
        alert("Please compute speedup first before saving!");
        return;
    }
    
    const name = prompt("Enter a name for this run:");
    if(!name) return;

    // LIST APPEND: Add current configuration
    savedRuns.push({
        name,
        seriesBlocks: window.currentScore.seriesBlocks,      // LIST
        parallelBlocks: window.currentScore.parallelBlocks,  // LIST
        speedup: window.currentScore.speedup,
        timestamp: new Date().toLocaleString()
    });
    
    alert(`✅ Run "${name}" saved successfully!`);
}

// LIST ITERATION: Display all saved runs
function showSavedRuns() {
    if(savedRuns.length === 0) {
        return "No runs saved yet.";
    }

    let text = `SAVED RUNS (${savedRuns.length} total)\n`;
    
    // ITERATION: Loop through saved runs
    savedRuns.forEach((run, i) => {
        text += `${i+1}. ${run.name} - ${run.timestamp}\n`;
        text += `   Speedup: ${run.speedup.toFixed(3)}×\n`;
        text += `   Series: [${run.seriesBlocks.join(', ')}]\n`;      // LIST ACCESS
        text += `   Parallel: [${run.parallelBlocks.join(', ')}]\n`;  // LIST ACCESS
    });
    
    return text;
}
```

---

## Task 4: Code Screenshots ✓

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `core-5.md` | 2181-2199 | `addTask()` function |
| **Procedure** | `core-5.md` | 2200-2240 | `computeSpeedup()` function |
| **List Creation** | `core-5.md` | 2203-2209 | `seriesBlocks`, `parallelBlocks` arrays |
| **Iteration** | `core-5.md` | 2204-2205, 2215 | `.filter()`, `.map()`, `.reduce()` |
| **Selection** | `core-5.md` | 2211, 2218, 2221 | `if` checks, ternary operators |
| **Output** | `core-5.md` | 2223-2235 | Results display |

---

## Task 5: Code Annotations ✓

```javascript
function computeSpeedup() {
  /**
   * PROCEDURE: computeSpeedup()
   * PURPOSE: Calculate speedup from series vs parallel task organization
   * PARAMETERS: None (reads from DOM)
   * RETURNS: void (updates global state and UI)
   */

  // ===== SEQUENCING STEP 1: Collect series tasks =====
  // LIST CREATION
  // ITERATION: Filter and map through DOM
  const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                          .filter(c => c.classList.contains("block"))  // ITERATION
                          .map(b => parseInt(b.textContent));          // ITERATION
  
  // ===== SEQUENCING STEP 2: Collect parallel tasks =====
  // LIST CREATION
  const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                          .filter(c => c.classList.contains("block"))
                          .map(b => parseInt(b.textContent));

  // ===== SEQUENCING STEP 3: Validate input =====
  // SELECTION: Check if lists have data
  // LIST LENGTH CHECK
  if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
      alert("Please add some tasks to the Series or Parallel rows first");
      return;
  }

  // ===== SEQUENCING STEP 4: Compute serial time =====
  // LIST USAGE: Combine arrays with spread operator
  // ITERATION: Reduce sums all elements
  const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
  
  // ===== SEQUENCING STEP 5: Compute parallel time =====
  // LIST USAGE: Process series and parallel separately
  // ITERATION: Sum series tasks
  // SELECTION: Handle empty parallel array
  const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + 
                       (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);

  // ===== SEQUENCING STEP 6: Calculate speedup ratio =====
  // SELECTION: Prevent division by zero
  const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

  // ===== SEQUENCING STEP 7: Display results =====
  const resultsElem = document.getElementById("results");
  resultsElem.className = "results has-results";
  resultsElem.textContent = 
      `RESULTS\n` +
      `${'='.repeat(50)}\n\n` +
      // LIST ACCESS: Display array contents
      `Series Tasks: [${seriesBlocks.join(', ') || 'none'}]\n` +
      `Parallel Tasks: [${parallelBlocks.join(', ') || 'none'}]\n\n` +
      `Serial Time (all sequential): ${serialTime} units\n` +
      `Parallel Time (with parallelism): ${parallelTime} units\n\n` +
      `Speedup: ${speedup.toFixed(3)}×\n\n` +
      // SELECTION: Choose message based on result
      `${speedup > 1 ? 'Success! You achieved speedup through parallelization.' : 'No speedup gained - try moving more tasks to parallel row.'}`;

  // OUTPUT: Update live visual panel
  const speedBig = document.getElementById('speedBig');
  const speedBarInner = document.getElementById('speedBarInner');
  const speedLabel = document.getElementById('speedLabel');
  
  const pct = Math.min(200, Math.max(0, Math.round(speedup * 50)));
  speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
  speedBarInner.style.width = pct + '%';
  // SELECTION: Display appropriate feedback
  speedLabel.textContent = speedup > 1 ? 'Nice — parallelism helped!' : 'No speedup yet — try moving tasks to parallel.';

  // LIST STORAGE: Save configuration for later
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

## Summary

| Task | Procedure | Algorithm | List |
|------|-----------|-----------|------|
| **Component** | `computeSpeedup()` | 7-step sequence | `seriesBlocks[]`, `parallelBlocks[]` |
| **Sequencing** | Collect → Validate → Compute serial → Compute parallel → Calculate → Display → Store | Each depends on prior | Data flows through steps |
| **Selection** | `if no tasks`, `if empty parallel`, `if parallelTime > 0` | Ternary operators | Handles edge cases |
| **Iteration** | N/A | `.filter()`, `.map()`, `.reduce()` | Processes 1-50+ tasks |
| **Purpose** | Calculate speedup | Demonstrate parallel performance | Dynamic task management |

**Algorithm:** Collect tasks → Validate → Sum serial → Sum parallel → Calculate ratio → Display → Store

**Example:** User adds tasks [5, 10] to series, [8, 12] to parallel → Click "Compute" → Serial: 35, Parallel: 27 (15+12), Speedup: 1.296× → Display results with live monitor
