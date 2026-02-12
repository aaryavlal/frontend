---
title: "Core 5 - Day 3 Create PT Written Responses"
permalink: /core5/day3
layout: post
---

# Core 5: Speedup Calculator — Day 3

**Task:** Write PPR (Personalized Project Reference) Responses for Create PT

---

## 📋 College Board Requirements Summary

| Requirement | Your Response |
|------------|---------------|
| **3a - Procedure** | `computeSpeedup()` - calculates speedup from task organization |
| **3b - Algorithm** | Shows sequencing (7 steps), selection (3 conditionals), iteration (array methods) |
| **3c - Lists** | `seriesBlocks[]` and `parallelBlocks[]` - manage dynamic task data |
| **Screenshots** | Code from `core-5.md` lines 2730-2821 with annotations |

---

## Task 1: PPR 3a — Procedure ✓

### 📝 Criteria

- **Describe:** Overall program purpose
- **Explain:** What the procedure does and why it's essential

### ✅ Your Response

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
### 📸 Code Screenshot

![Procedure Code - computeSpeedup()](../screenshots/core5-procedure.png)

**Location:** `frontend/cores/core-5.md` — Lines 2200-2240

**What to capture:**
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

    // Display results...
    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}
```

---

## Task 2: PPR 3b — Algorithm ✓

### 📝 Criteria
- **Must show:** Sequencing, Selection, AND Iteration
- **Same code** can be used as for 3a

### ✅ Your Response
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
### 📸 Code Screenshot

![Algorithm Code - Annotated](../screenshots/core5-algorithm.png)

**Location:** `frontend/cores/core-5.md` — Lines 2200-2240  
**Must annotate:** SEQUENCING (steps 1-7), SELECTION (if statements), ITERATION (.filter, .map, .reduce)

**What to capture (same as 3a, but add annotations):**
```javascript
function computeSpeedup() {
    // STEP 1-2: Collect tasks (ITERATION)
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                            .filter(c => c.classList.contains("block"))  // ITERATION
                            .map(b => parseInt(b.textContent));          // ITERATION
    
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));

    // STEP 3: Validate (SELECTION)
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    // STEP 4-5: Calculate (ITERATION)
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0); // SELECTION

    // STEP 6: Compute (SELECTION)
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // STEP 7: Store
    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}
```

---

## Task 3: PPR 3c — Lists ✓

### 📝 Criteria
- **Identify:** The list(s) used in your program
- **Explain:** How lists manage complexity (not just what they store)
- **Show:** What would happen WITHOUT lists

### ✅ Your Response

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
### 📸 Code Screenshot

![List Usage - seriesBlocks and parallelBlocks](../screenshots/core5-lists.png)

**Location:** `frontend/cores/core-5.md` — Lines 2200-2240  
**Must highlight:** `seriesBlocks[]`, `parallelBlocks[]` - where created, used, and stored

**What to capture:**
```javascript
function computeSpeedup() {
    // LIST CREATION - collect into arrays
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));
    
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));

    // Validation
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    // LIST USAGE - combine and process
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // LIST STORAGE - save in object
    window.currentScore = {seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup};
}
```

---

## 📸 Complete Screenshot Guide

| # | Purpose | File | Lines | What Code to Screenshot |
|---|---------|------|-------|------------------------|
| **1** | Input (optional) | `core-5.md` | 2181-2199 | `addTask()` function - creates task blocks |
| **2** | Procedure (3a) | `core-5.md` | 2200-2240 | `computeSpeedup()` - full function |
| **3** | Algorithm (3b) | `core-5.md` | 2200-2240 | Same as #2, add annotations: SEQUENCING, SELECTION, ITERATION |
| **4** | Lists (3c) | `core-5.md` | 2200-2240 | Same as #2, highlight `seriesBlocks[]` and `parallelBlocks[]` |
| **5** | Output (optional) | `core-5.md` | 2227-2235 | Results display section with `resultsElem.textContent` |

### 💡 Screenshot Tips
- Use arrows or boxes to highlight key elements
- Add text labels directly in code comments
- Make variable names clearly visible
- Use 14pt+ font size for readability
- **You can use ONE screenshot for 3a, 3b, and 3c** if you add proper annotations

### 🎯 Annotation Guide

**For 3a (Procedure):**
- Label the function name
- No special annotations needed

**For 3b (Algorithm):**
- Add "STEP 1", "STEP 2", etc. comments
- Circle or highlight `if` statements → SELECTION
- Circle `.filter()`, `.map()`, `.reduce()` → ITERATION

**For 3c (Lists):**
- Highlight `seriesBlocks` and `parallelBlocks` with arrows
- Label where created, used, and stored

---

## ✅ Final Checklist

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