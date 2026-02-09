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
- **Without it:** Just drag-and-drop interface with no computational analysis



### Procedure Code Screenshot

![Procedure Code - computeSpeedup()](../screenshots/core5-procedure.png)

**Location:** `frontend/cores/core-5.md` — Lines 2747-2785

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



### Algorithm Code Screenshot

![Algorithm Code - Annotated](../screenshots/core5-algorithm.png)

**Location:** `frontend/cores/core-5.md` — Lines 2747-2785  
**Annotations:** SEQUENCING, SELECTION, ITERATION

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

### List Code Screenshot

![List Usage - seriesBlocks and parallelBlocks](../screenshots/core5-lists.png)

**Location:** `frontend/cores/core-5.md` — Lines 2747-2821  
**Highlights:** `seriesBlocks[]`, `parallelBlocks[]` arrays
- **Focus on:** `seriesBlocks[]` and `parallelBlocks[]` creation and usage
- **Add annotations:** LIST CREATION, LIST USAGE, LIST STORAGE

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

   Screenshot Guide

### Required Screenshots

| # | What to Capture | File | Lines | Annotations Needed |
|---|----------------|------|-------|-------------------|
| 1 | **Input Function** | `core-5.md` | 2730-2740 | Label: INPUT |
| 2 | **Procedure (3a)** | `core-5.md` | 2747-2785 | Label: PROCEDURE |
| 3 | **Algorithm (3b)** | `core-5.md` | 2747-2785 | Labels: SEQUENCING, SELECTION, ITERATION |
| 4 | **Lists (3c)** | `core-5.md` | 2749-2753 | Highlight: `seriesBlocks[]`, `parallelBlocks[]` |
| 5 | **Output** | `core-5.md` | 2767-2782 | Label: OUTPUT |

### Annotation Tips
- Use arrows or boxes to highlight key elements
- Add text labels in comments or as overlays
- Make sure variable names are clearly visible
- Zoom to readable size (14pt+ font)