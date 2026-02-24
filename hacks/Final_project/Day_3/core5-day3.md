---
title: "Core 5 - Day 3 Create PT Written Responses"
permalink: /core5/day3
layout: post
---

# Core 5: Speedup Calculator — Day 3

**Task:** Write PPR (Personalized Project Reference) Responses for Create PT

---

## College Board Requirements Summary

| Requirement | Your Response |
|------------|---------------|
| **3a - Procedure** | `computeSpeedup()` - calculates speedup from task organization |
| **3b - Algorithm** | Shows sequencing (7 steps), selection (3 conditionals), iteration (array methods) |
| **3c - Lists** | `seriesBlocks[]` and `parallelBlocks[]` - manage dynamic task data |
| **Screenshots** | Code from `core-5.md` lines 2730-2821 with annotations |

---

## Task 1: PPR 3a — Procedure

### Criteria

- **Describe:** Overall program purpose
- **Explain:** What the procedure does and why it's essential

### Your Response

**Program Purpose:**
- Demonstrates parallel computing speedup
- Users organize tasks: Series (sequential) vs Parallel (simultaneous)
- Calculates performance improvement
- Visualizes Amdahl's Law

**Main Procedure: `computeSpeedup()`**
- Orchestrates the speedup calculation by calling helper functions
- Each helper function has a single, clear responsibility

**Supporting Procedures:**
- `collectTaskBlocks(rowId)` — Extracts task values from a specific row
- `validateTasks()` — Checks if tasks exist before processing
- `calculateSerialTime()` — Computes total serial execution time
- `calculateParallelTime()` — Computes parallel execution time using Amdahl's Law
- `computeSpeedupRatio()` — Calculates the speedup ratio
- `displayResults()` — Updates the UI with results

**Without it:** Just drag-and-drop interface with no computational analysis
### Code Screenshot

![Procedure Code - computeSpeedup()](../screenshots/core5-procedure.png)

**Location:** `frontend/cores/core-5.md` — Lines 2200-2280

**Complete Code:**

```javascript
// Function 1: Add a new task block (Lines 2181-2196)
function addTask() {
    const val = parseInt(document.getElementById('newTaskTime').value);
    if(isNaN(val) || val < 1) {
        alert("Please enter a valid task time (positive number)");
        return;
    }

    const block = document.createElement("div");
    block.className = "block";
    block.id = "task" + Date.now();
    block.draggable = true;
    block.ondragstart = drag;
    block.textContent = val;
    document.getElementById("taskPool").appendChild(block);
    document.getElementById('newTaskTime').value = "";
}

// Function 2: Compute speedup from task organization (Lines 2198-2237)
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
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    const resultsElem = document.getElementById("results");
    resultsElem.className = "results has-results";
    resultsElem.textContent = 
        `RESULTS\n` +
        `${'='.repeat(50)}\n\n` +
        `Series Tasks: [${seriesBlocks.join(', ') || 'none'}]\n` +
        `Parallel Tasks: [${parallelBlocks.join(', ') || 'none'}]\n\n` +
        `Serial Time (all sequential): ${serialTime} units\n` +
        `Parallel Time (with parallelism): ${parallelTime} units\n\n` +
        `Speedup: ${speedup.toFixed(3)}×\n\n` +
        `${speedup > 1 ? 'Success! You achieved speedup through parallelization.' : 'No speedup gained - try moving more tasks to parallel row.'}`; 

    // update live visual panel
    const speedBig = document.getElementById('speedBig');
    const speedBarInner = document.getElementById('speedBarInner');
    const speedLabel = document.getElementById('speedLabel');
    const pct = Math.min(200, Math.max(0, Math.round(speedup * 50)));
    speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
    speedBarInner.style.width = pct + '%';
    speedLabel.textContent = speedup > 1 ? 'Nice — parallelism helped!' : 'No speedup yet — try moving tasks to parallel.';

    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}

// Function 3: Save current run to history (Lines 2240-2268)
function saveRun() {
    if (!window.currentScore) {
        alert("Please compute speedup first before saving!");
        return;
    }
    
    if (typeof window.currentScore.speedup !== 'number') {
        alert("Please compute speedup first before saving!");
        return;
    }
    
    const name = prompt("Enter a name for this run:");
    if(!name) return;

    savedRuns.push({name, ...window.currentScore, timestamp: new Date().toLocaleString()});
    alert(`Run "${name}" saved successfully! (Speedup: ${window.currentScore.speedup.toFixed(2)}×)`);
    
    checkForCPUReward();
}
```

---

## Task 2: PPR 3b — Algorithm

### Criteria
- **Must show:** Sequencing, Selection, AND Iteration
- **Same code** can be used as for 3a

### Your Response
## Task 2: PPR 3b — Algorithm Description

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Sequencing (7 steps in order):**
1. Call `collectTaskBlocks("seriesRow")` to gather series tasks
2. Call `collectTaskBlocks("parallelRow")` to gather parallel tasks
3. Call `validateTasks()` to ensure input exists
4. Call `calculateSerialTime()` to sum all tasks
5. Call `calculateParallelTime()` to apply Amdahl's Law
6. Call `computeSpeedupRatio()` to calculate speedup
7. Call `displayResults()` to update the UI

**Selection (conditionals):**
- `if (seriesBlocks.length === 0 && parallelBlocks.length === 0)` → validates tasks exist in `validateTasks()`
- `parallelBlocks.length ? Math.max(...) : 0` → checks parallel tasks before max in `calculateParallelTime()`
- `parallelTime > 0 ? serialTime / parallelTime : 0` → prevents divide by zero in `computeSpeedupRatio()`

**Iteration (array methods):**
- `.filter()` in `collectTaskBlocks()` — iterates to find block elements
- `.map()` in `collectTaskBlocks()` — iterates to parse integers
- `.reduce()` in `calculateSerialTime()` and `calculateParallelTime()` — iterates to sum values
### Code Screenshot

![Algorithm Code - Annotated](../screenshots/core5-algorithm.png)

**Location:** `frontend/cores/core-5.md` — Lines 2200-2240  
**Must annotate:** SEQUENCING (steps 1-7), SELECTION (if statements), ITERATION (.filter, .map, .reduce)

**What to capture (same as 3a, but add annotations):**
```javascript
// HELPER: Collect blocks (ITERATION)
function collectTaskBlocks(rowId) {
    return Array.from(document.getElementById(rowId).children)
        .filter(c => c.classList.contains("block"))  // ITERATION
        .map(b => parseInt(b.textContent));          // ITERATION
}

// HELPER: Validate (SELECTION)
function validateTasks(seriesBlocks, parallelBlocks) {
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return false;
    }
    return true;
}

// HELPER: Serial time (ITERATION)
function calculateSerialTime(seriesBlocks, parallelBlocks) {
    return [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);
}

// HELPER: Parallel time (ITERATION + SELECTION)
function calculateParallelTime(seriesBlocks, parallelBlocks) {
    const seriesTime = seriesBlocks.reduce((a, b) => a + b, 0);
    const parallelMax = parallelBlocks.length ? Math.max(...parallelBlocks) : 0; // SELECTION
    return seriesTime + parallelMax;
}

// HELPER: Speedup (SELECTION)
function computeSpeedupRatio(serialTime, parallelTime) {
    return parallelTime > 0 ? serialTime / parallelTime : 0;  // SELECTION
}

// MAIN PROCEDURE: Orchestrates calculation (SEQUENCING)
function computeSpeedup() {
    // STEP 1-2: Collect
    const seriesBlocks = collectTaskBlocks("seriesRow");
    const parallelBlocks = collectTaskBlocks("parallelRow");
    
    // STEP 3: Validate
    if (!validateTasks(seriesBlocks, parallelBlocks)) return;
    
    // STEP 4-5: Calculate
    const serialTime = calculateSerialTime(seriesBlocks, parallelBlocks);
    const parallelTime = calculateParallelTime(seriesBlocks, parallelBlocks);
    
    // STEP 6: Compute speedup
    const speedup = computeSpeedupRatio(serialTime, parallelTime);
    
    // STEP 7: Display
    displayResults(seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup);
}
```

---

## Task 3: PPR 3c — Lists

### Criteria
- **Identify:** The list(s) used in your program
- **Explain:** How lists manage complexity (not just what they store)
- **Show:** What would happen WITHOUT lists

### Your Response

## Task 3: PPR 3c — List Usage

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
### Code Screenshot

![List Usage - seriesBlocks and parallelBlocks](../screenshots/core5-lists.png)

**Location:** `frontend/cores/core-5.md` — Lines 2200-2240  
**Must highlight:** `seriesBlocks[]`, `parallelBlocks[]` - where created, used, and stored

**What to capture:**
```javascript
// LIST CREATION FUNCTION - Purpose: Create array from DOM elements
function collectTaskBlocks(rowId) {
    return Array.from(document.getElementById(rowId).children)
        .filter(c => c.classList.contains("block"))
        .map(b => parseInt(b.textContent));
}

// LIST PROCESSING FUNCTION - Purpose: Sum all values in both arrays
function calculateSerialTime(seriesBlocks, parallelBlocks) {
    return [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);
}

// LIST PROCESSING FUNCTION - Purpose: Find max from parallel array
function calculateParallelTime(seriesBlocks, parallelBlocks) {
    const seriesTime = seriesBlocks.reduce((a, b) => a + b, 0);
    const parallelMax = parallelBlocks.length ? Math.max(...parallelBlocks) : 0;
    return seriesTime + parallelMax;
}

// MAIN PROCEDURE - Uses lists created by helper functions
function computeSpeedup() {
    // LIST CREATION - collect into arrays
    const seriesBlocks = collectTaskBlocks("seriesRow");
    const parallelBlocks = collectTaskBlocks("parallelRow");

    // Validation
    if (!validateTasks(seriesBlocks, parallelBlocks)) return;
    }

    // LIST USAGE - call processing functions
    const serialTime = calculateSerialTime(seriesBlocks, parallelBlocks);
    const parallelTime = calculateParallelTime(seriesBlocks, parallelBlocks);
    const speedup = computeSpeedupRatio(serialTime, parallelTime);

    // LIST STORAGE - save arrays in object
    displayResults(seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup);
}

// LIST STORAGE FUNCTION - Purpose: Store results including lists
function displayResults(seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup) {
    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
    // Update display elements...
}
```

---

## Complete Screenshot Guide

| # | Purpose | File | Lines | What Code to Screenshot |
|---|---------|------|-------|------------------------|
| **1** | Input (optional) | `core-5.md` | 2181-2199 | `addTask()` function - creates task blocks |
| **2** | Procedure (3a) | `core-5.md` | 2200-2280 | All helper functions + `computeSpeedup()` main procedure |
| **3** | Algorithm (3b) | `core-5.md` | 2200-2280 | Same as #2, add annotations: SEQUENCING, SELECTION, ITERATION |
| **4** | Lists (3c) | `core-5.md` | 2200-2280 | Highlight `collectTaskBlocks()`, list operations in calculation functions |
| **5** | Output (optional) | `core-5.md` | 2227-2235 | `displayResults()` function with storage operation |

### Screenshot Tips
- Use arrows or boxes to highlight key elements
- Add text labels directly in code comments
- Make variable names clearly visible
- Use 14pt+ font size for readability
- **You can use ONE screenshot for 3a, 3b, and 3c** if you add proper annotations

### Annotation Guide

**For 3a (Procedure):**
- Label the main `computeSpeedup()` function
- Label each helper function with its single purpose
- No special annotations needed

**For 3b (Algorithm):**
- Add "STEP 1", "STEP 2", etc. comments in main function
- Circle or highlight `if` statements in `validateTasks()` → SELECTION
- Circle `.filter()`, `.map()` in `collectTaskBlocks()` → ITERATION
- Circle `.reduce()` in calculation functions → ITERATION

**For 3c (Lists):**
- Highlight `seriesBlocks` and `parallelBlocks` arrays with arrows
- Label `collectTaskBlocks()` as LIST CREATION
- Label calculation functions as LIST PROCESSING
- Label `displayResults()` as LIST STORAGE

---

## Final Checklist

- [ ] Written response for 3a (program purpose + procedure function)
- [ ] Written response for 3b (sequencing, selection, iteration explained)
- [ ] Written response for 3c (list complexity explanation)
- [ ] Screenshot of procedure code (annotated)
- [ ] Screenshot of algorithm code (sequencing/selection/iteration labeled)
- [ ] Screenshot of list usage (arrays highlighted)
- [ ] All responses under word limits (~150 words each)
- [ ] Code screenshots are readable and properly annotated 2749-2753 | Highlight: `seriesBlocks[]`, `parallelBlocks[]` |
| 5 | **Output** | `core-5.md` | 2767-2782 | Label: OUTPUT |

### Annotation Tips
- Use arrows or boxes to highlight key elements
- Add text labels in comments or as overlays
- Make sure variable names are clearly visible
- Zoom to readable size (14pt+ font)