---
title: "Core 5 - Day 2"
permalink: /core5/day2
layout: post
---

# Core 5: Speedup Calculator — Day 2

---

## Task 1: INPUT ✓

**File:** `frontend/cores/core-5.md`

```javascript
// addTask() - Line 2730
window.addTask = function() {
  const val = parseInt(document.getElementById('newTaskTime').value);
  if(isNaN(val) || val < 1) return alert("Invalid input");
  const block = document.createElement("div");
  block.className = "block";
  block.draggable = true;
  block.textContent = val;
  document.getElementById("taskPool").appendChild(block);
}

// Drag & Drop - Lines 2681-2715
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) {
  ev.preventDefault();
  let elem = document.getElementById(ev.dataTransfer.getData("text"));
  ev.target.closest('.drag-area').appendChild(elem);
}
```

**Inputs:** Task creation, drag-and-drop organization, button clicks (Compute, Save, Show)

---

## Task 2: OUTPUT ✓

```javascript
// computeSpeedup() - Lines 2760-2782
const speedup = serialTime / parallelTime;
resultsElem.textContent = `Series: [${seriesBlocks}]\nParallel: [${parallelBlocks}]\nSpeedup: ${speedup.toFixed(3)}×`;
speedBig.textContent = `${speedup.toFixed(2)}×`;
speedBarInner.style.width = `${speedup * 50}%`;

// saveRun() - Line 2805
alert(`✅ Run "${name}" saved!`);

// showSavedRuns() - Lines 2836-2841
savedRuns.forEach((run, i) => {
    text += `${i+1}. ${run.name} - Speedup: ${run.speedup.toFixed(3)}×\n`;
});
```

**Outputs:** Results text, visual speedup panel (bar + number), save alerts, saved runs list

---

## Task 3: PROCEDURE ✓

**Main Procedure:** `computeSpeedup()` (Lines 2747-2785)

```javascript
window.computeSpeedup = function() {
  // STEP 1-2: ITERATION - Collect tasks from DOM into LISTS
  const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
    .filter(c => c.classList.contains("block"))  // SELECTION
    .map(b => parseInt(b.textContent));          // LIST

  const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
    .filter(c => c.classList.contains("block"))
    .map(b => parseInt(b.textContent));

  // STEP 3: SELECTION - Validate
  if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
      alert("Add tasks first");
      return;
  }

  // STEP 4-5: Calculate times
  const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b) => a+b, 0);
  const parallelTime = seriesBlocks.reduce((a,b) => a+b, 0) + 
                       (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);

  // STEP 6: Calculate speedup
  const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

  // STEP 7-8: OUTPUT - Display results
  resultsElem.textContent = `Speedup: ${speedup.toFixed(3)}×`;
  speedBig.textContent = `${speedup.toFixed(2)}×`;
  speedBarInner.style.width = `${Math.round(speedup * 50)}%`;

  // STEP 9: Store result
  window.currentScore = { seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup };
}
```

---

## Task 4: Data Flow Example ✓

**Scenario:** Tasks [5, 10, 8, 12] → Series [5, 10], Parallel [8, 12]

1. **Collect:** `.filter().map()` → seriesBlocks = [5,10], parallelBlocks = [8,12]
2. **Serial Time:** 5 + 10 + 8 + 12 = 35 units
3. **Parallel Time:** (5 + 10) + max(8, 12) = 15 + 12 = 27 units
4. **Speedup:** 35 / 27 = 1.296× (29.6% faster)
5. **Display:** "Speedup: 1.296×" + progress bar at 65%
6. **Store:** `currentScore = { seriesBlocks, parallelBlocks, 35, 27, 1.296 }`

---

## Task 5: Create PT Elements ✓

| Element | Location | Example |
|---------|----------|---------|
| **INPUT** | Lines 2730, 2681-2715 | Task creation, drag & drop |
| **OUTPUT** | Lines 2764-2782, 2805 | Results display, alerts |
| **PROCEDURE** | Lines 2747-2785 | `computeSpeedup()` |
| **SEQUENCING** | 2747-2785 | 9 steps execute in order |
| **SELECTION** | 2755, 2763, 2770 | `if` statements, ternary operators |
| **ITERATION** | 2749-2753, 2760 | `.filter()`, `.map()`, `.reduce()` |
| **LIST** | 2749, 2666 | `seriesBlocks[]`, `parallelBlocks[]`, `savedRuns[]` |

**Algorithm:** Serial time = sum all. Parallel time = series sum + max(parallel). Speedup = serial/parallel.

**Status:** Ready for PPR responses!
  const serialTime = [...seriesBlocks, ...parallelBlocks]
                      .reduce((a, b) => a + b, 0);

  // SEQUENCING STEP 5: Calculate Parallel Time
  // ITERATION: reduce() sums series tasks
  const seriesTotal = seriesBlocks.reduce((a, b) => a + b, 0);
  
  // SELECTION: Check if parallel tasks exist
  // If yes, use Math.max() to find longest task (they run simultaneously)
  // If no, parallel contribution is 0
  const parallelMax = parallelBlocks.length 
                      ? Math.max(...parallelBlocks) 
                      : 0;
  
  const parallelTime = seriesTotal + parallelMax;

  // SEQUENCING STEP 6: Calculate Speedup
  // SELECTION: Avoid division by zero
  const speedup = parallelTime > 0 
                  ? serialTime / parallelTime 
                  : 0;

  // SEQUENCING STEP 7: OUTPUT - Display text results
  const resultsElem = document.getElementById("results");
  resultsElem.className = "results has-results";
  
  // SELECTION: Choose success or failure message
  const message = speedup > 1 
      ? 'Success! You achieved speedup through parallelization.' 
      : 'No speedup gained - try moving more tasks to parallel row.';
  
  resultsElem.textContent = 
      `RESULTS\n` +
      `${'='.repeat(50)}\n\n` +
      `Series Tasks: [${seriesBlocks.join(', ') || 'none'}]\n` +
      `Parallel Tasks: [${parallelBlocks.join(', ') || 'none'}]\n\n` +
      `Serial Time (all sequential): ${serialTime} units\n` +
      `Parallel Time (with parallelism): ${parallelTime} units\n\n` +
      `Speedup: ${speedup.toFixed(3)}×\n\n` +
      `${message}`;

  // SEQUENCING STEP 8: OUTPUT - Update visual speedup panel
  const speedBig = document.getElementById('speedBig');
  const speedBarInner = document.getElementById('speedBarInner');
  const speedLabel = document.getElementById('speedLabel');
  
  // Calculate progress bar percentage
  const pct = Math.min(200, Math.max(0, Math.round(speedup * 50)));
  
  speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
  speedBarInner.style.width = pct + '%';
  
  // SELECTION: Choose status message
  speedLabel.textContent = speedup > 1 
      ? 'Nice — parallelism helped!' 
      : 'No speedup yet — try moving tasks to parallel.';

  // SEQUENCING STEP 9: Store result for saving later
  window.currentScore = {
      seriesBlocks,      // LIST
      parallelBlocks,    // LIST
      serialTime,
      parallelTime,
      speedup
  };
  
  console.log('✅ currentScore set:', window.currentScore);
}
```

### Supporting Procedure: `saveRun()`

**File:** `frontend/cores/core-5.md` — Lines 2787-2821

```javascript
window.saveRun = function() {
  /**
   * PROCEDURE: Save current speedup configuration to persistent LIST
   *
   * Contains:
   * - SEQUENCING: Validate → prompt → save → confirm
   * - SELECTION: Multiple if statements for validation
   * - LIST: savedRuns array (persistent storage)
   */

  console.log('=== SAVE RUN DEBUG ===');
  
  // SEQUENCING STEP 1: SELECTION - Validate currentScore exists
  if (!window.currentScore) {
      console.log('❌ FAILED: currentScore is null/undefined');
      alert("Please compute speedup first before saving!");
      return;
  }
  
  // SEQUENCING STEP 2: SELECTION - Validate speedup is a number
  if (typeof window.currentScore.speedup !== 'number') {
      console.log('❌ FAILED: speedup is not a number');
      alert("Please compute speedup first before saving!");
      return;
  }
  
  console.log('✅ PASSED validation, showing prompt');
  
  // SEQUENCING STEP 3: INPUT - Get name from user
  const name = prompt("Enter a name for this run:");
  
  // SELECTION: Check if user cancelled
  if(!name) return;

  // SEQUENCING STEP 4: LIST MANIPULATION - Add to savedRuns array
  savedRuns.push({
      name: name,
      seriesBlocks: window.currentScore.seriesBlocks,      // LIST
      parallelBlocks: window.currentScore.parallelBlocks,  // LIST
      serialTime: window.currentScore.serialTime,
      parallelTime: window.currentScore.parallelTime,
      speedup: window.currentScore.speedup,
      timestamp: new Date().toLocaleString()
  });
  
  // SEQUENCING STEP 5: OUTPUT - Confirmation message
  alert(`✅ Run "${name}" saved successfully! (Speedup: ${window.currentScore.speedup.toFixed(2)}×)`);
  
  console.log('📊 Current savedRuns LIST:', savedRuns);
  console.log('📊 Total saved runs:', savedRuns.length);
}
```

### Supporting Procedure: `showSavedRuns()`

**File:** `frontend/cores/core-5.md` — Lines 2823-2845

```javascript
window.showSavedRuns = function() {
  /**
   * PROCEDURE: Display all saved speedup configurations
   *
   * Contains:
   * - SEQUENCING: Check empty → format → display
   * - SELECTION: if statement for empty state
   * - ITERATION: forEach loop through savedRuns LIST
   * - LIST: savedRuns array
   */

  const savedRunsElem = document.getElementById("savedRuns");
  
  // SEQUENCING STEP 1: SELECTION - Handle empty state
  if(savedRuns.length === 0) {
      savedRunsElem.textContent = "No runs saved yet. Compute a speedup and save it.";
      savedRunsElem.style.display = "block";
      return;
  }

  // SEQUENCING STEP 2: Build output string
  let text = `SAVED RUNS (${savedRuns.length} total)\n${'='.repeat(60)}\n\n`;
  
  // SEQUENCING STEP 3: ITERATION - Loop through savedRuns LIST
  savedRuns.forEach((run, i) => {
      // Format each run's data
      text += `${i+1}. ${run.name} - ${run.timestamp}\n`;
      text += `   Speedup: ${run.speedup.toFixed(3)}× (Serial: ${run.serialTime}, Parallel: ${run.parallelTime})\n`;
      
      // Display series tasks LIST
      text += `   Series: [${run.seriesBlocks.join(', ') || 'none'}]\n`;
      
      // Display parallel tasks LIST
      text += `   Parallel: [${run.parallelBlocks.join(', ') || 'none'}]\n\n`;
  });
  
  // SEQUENCING STEP 4: OUTPUT - Display formatted text
  savedRunsElem.textContent = text;
  savedRunsElem.style.display = "block";
}
```

### Procedure Summary Table

| Element | Location in computeSpeedup() | Description |
|---------|------------------------------|-------------|
| **SEQUENCING** | Lines 2747-2785 | 9 sequential steps: collect series → collect parallel → validate → calc serial → calc parallel → calc speedup → display text → display visual → store result |
| **SELECTION** | Lines 2755, 2763, 2770, 2776, 2780, 2782 | `if (empty)`, `if (parallelBlocks.length)`, `if (parallelTime > 0)`, `speedup > 1 ? success : failure` |
| **ITERATION** | Lines 2749-2753 | `.filter()`, `.map()`, `.reduce()` array methods loop through task LISTS |
| **LIST** | Lines 2749-2753 | `seriesBlocks` array, `parallelBlocks` array, stored in `window.currentScore` object |

### All Key Procedures

| Function | Line | Purpose | Elements |
|----------|------|---------|----------|
| `addTask()` | 2730 | Create draggable task block | INPUT + SELECTION |
| `drag()` | 2681 | Handle drag start | INPUT |
| `allowDrop()` | 2670 | Allow drop in zone | INPUT |
### Main Procedure: `computeSpeedup()` (Lines 2747-2785)

```javascript
window.computeSpeedup = function() {
  // STEP 1 & 2: ITERATION - Collect tasks from DOM into LISTS
  const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                          .filter(c => c.classList.contains("block"))  // SELECTION
                          .map(b => parseInt(b.textContent));          // LIST

  const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                          .filter(c => c.classList.contains("block"))
                          .map(b => parseInt(b.textContent));          // LIST

  // STEP 3: SELECTION - Validate input
  if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
      alert("Please add some tasks first");
      return;
  }

  // STEP 4: ITERATION - Calculate serial time (sum all tasks)
  const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a, b) => a + b, 0);

  // STEP 5: Calculate parallel time (series sum + max parallel)
  const parallelTime = seriesBlocks.reduce((a, b) => a + b, 0) + 
                       (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);

  // STEP 6: SELECTION - Calculate speedup (avoid division by zero)
  const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

  // STEP 7: OUTPUT - Display text results
  resultsElem.textContent = 
      `Series Tasks: [${seriesBlocks.join(', ')}]\n` +
      `Speedup: ${speedup.toFixed(3)}×`;

  // STEP 8: OUTPUT - Update visual panel
  speedBig.textContent = `${speedup.toFixed(2)}×`;
  speedBarInner.style.width = `${Math.round(speedup * 50)}%`;
  speedLabel.textContent = speedup > 1 ? 'Nice!' : 'No speedup yet';

  // STEP 9: Store result for saving
  window.currentScore = { seriesBlocks, parallelBlocks, serialTime, parallelTime, speedup };
}
```

### Procedure Elements

| Element | Lines | Description |
|---------|-------|-------------|
| **SEQUENCING** | 2747-2785 | 9 steps: collect → validate → calculate → display → store |
| **SELECTION** | 2755, 2763, 2770, 2776 | `if (empty)`, `if (parallelBlocks.length)`, `speedup > 1 ?` |
| **ITERATION** | 2749-2753, 2760 | `.filter()`, `.map()`, `.reduce()` on task LISTS |
| **LIST** | 2749-2753 | `seriesBlocks[]`, `parallelBlocks[]` arrays |               │
│  ┌─────────────────────┐                                                    │
│  │ Parallel Execution: │  (5 + 10) + max(8, 12) = 15 + 12 = 27 units       │
│  └─────────────────────┘  Series    Parallel (simultaneous)                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 9: CALCULATE SPEEDUP                                 │
│  Line 2764                                                                   │
│                                                                              │
│ 30. SELECTION: Check for division by zero                                   │
│     if (parallelTime > 0)  ✓ (27 > 0)                                      │
│                                                                              │
│ 31. Apply speedup formula:                                                  │
│     speedup = serialTime / parallelTime                                     │
│     speedup = 35 / 27                                                       │
│     speedup = 1.296                                                         │
│                                                                              │
│  State: speedup = 1.296×                                                    │
│         (Parallel execution is 1.296× faster than serial)                  │
│         (29.6% improvement!)                                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 10: OUTPUT - TEXT DISPLAY                            │
│  Lines 2767-2775                                                             │
│                                                                              │
│ 32. Get results element:                                                    │
│     resultsElem = document.getElementById("results")                        │
│                                                                              │
│ 33. Add visible class:                                                      │
│     resultsElem.className = "results has-results"                           │
│     (Changes CSS to make results panel visible)                             │
│                                                                              │
│ 34. SELECTION: Choose message                                               │
│     speedup > 1  ✓ (1.296 > 1)                                             │
│     message = "Success! You achieved speedup through parallelization."      │
│                                                                              │
│ 35. Format and display results:                                             │
│     resultsElem.textContent =                                               │
│       "RESULTS"                                                              │
│       "=================================================="                   │
│       ""                                                                     │
│       "Series Tasks: [5, 10]"                                               │
│       "Parallel Tasks: [8, 12]"                                             │
│       ""                                                                     │
│       "Serial Time (all sequential): 35 units"                              │
│       "Parallel Time (with parallelism): 27 units"                          │
│       ""                                                                     │
│       "Speedup: 1.296×"                                                     │
│       ""                                                                     │
│       "Success! You achieved speedup through parallelization."              │
│                                                                              │
│  OUTPUT: Text results displayed in results panel                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 11: OUTPUT - VISUAL DISPLAY                          │
│  Lines 2778-2782                                                             │
│                                                                              │
│ 36. Calculate progress bar percentage:                                      │
│     pct = Math.round(speedup * 50)                                          │
│     pct = Math.round(1.296 * 50)                                            │
│     pct = 65                                                                 │
│     (Scale: 50% bar width = 1× speedup)                                     │
│                                                                              │
│ 37. Update large speedup display:                                           │
│     speedBig.textContent = "1.30×"  (rounded to 2 decimals)                │
│                                                                              │
│ 38. Update progress bar width:                                              │
│     speedBarInner.style.width = "65%"                                       │
│                                                                              │
│ 39. SELECTION: Choose status message                                        │
│     speedup > 1  ✓                                                          │
│     speedLabel.textContent = "Nice — parallelism helped!"                   │
│                                                                              │
│  OUTPUT: Visual speedup panel updated with:                                 │
│  ┌──────────────────────────────────────┐                                   │
│  │ 🎯 Speedup: 1.30×                    │                                   │
│  │ [████████████████░░░░░░░░░░] 65%    │                                   │
│  │ Nice — parallelism helped!           │                                   │
│  └──────────────────────────────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 12: STORE RESULT FOR SAVING                          │
│  Lines 2784-2785                                                             │
│                                                                              │
│ 40. Create currentScore object:                                             │
│     window.currentScore = {                                                 │
│       seriesBlocks: [5, 10],        ← LIST                                 │
│       parallelBlocks: [8, 12],      ← LIST                                 │
│       serialTime: 35,                                                       │
│       parallelTime: 27,                                                     │
│       speedup: 1.296                                                        │
│     }                                                                        │
│                                                                              │
│ 41. Console log for debugging:                                              │
│     console.log('✅ currentScore set:', window.currentScore)                │
│                                                                              │
│  State: currentScore stored globally, ready for saving                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ (User satisfied with results)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 13: USER SAVES CONFIGURATION                         │
│  User clicks "💾 Save Run" button                                           │
│  Function: saveRun() (Line 2787)                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 14: VALIDATE BEFORE SAVING                           │
│  Lines 2789-2799                                                             │
│                                                                              │
│ 42. Console debug header:                                                   │
│     console.log('=== SAVE RUN DEBUG ===')                                   │
│                                                                              │
│ 43. SELECTION: Check currentScore exists                                    │
│     if (!window.currentScore)                                               │
│       → alert error, return                                                 │
│     ✓ currentScore exists                                                   │
│                                                                              │
│ 44. SELECTION: Check speedup is valid number                                │
│     if (typeof window.currentScore.speedup !== 'number')                    │
│       → alert error, return                                                 │
│     ✓ speedup = 1.296 (number)                                             │
│                                                                              │
│ 45. Validation passed:                                                      │
│     console.log('✅ PASSED validation, showing prompt')                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 15: GET RUN NAME FROM USER                           │
│  Line 2801                                                                   │
│                                                                              │
│ 46. Show prompt dialog:                                                     │
│     name = prompt("Enter a name for this run:")                             │
│                                                                              │
│ 47. User enters: "Test Configuration"                                       │
│     name = "Test Configuration"                                             │
│                                                                              │
│ 48. SELECTION: Check if user cancelled                                      │
│     if (!name) return                                                       │
│     ✓ name exists                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 16: ADD TO SAVED RUNS LIST                           │
│  Lines 2804-2812                                                             │
│                                                                              │
│ 49. LIST MANIPULATION: Push to savedRuns array                              │
│     savedRuns.push({                                                        │
│       name: "Test Configuration",                                           │
│       seriesBlocks: [5, 10],              ← LIST                           │
│       parallelBlocks: [8, 12],            ← LIST                           │
│       serialTime: 35,                                                       │
│       parallelTime: 27,                                                     │
│       speedup: 1.296,                                                       │
│       timestamp: "1/29/2026, 3:45:23 PM"                                    │
│     })                                                                       │
│                                                                              │
│  State: savedRuns = [                                                       │
│    {                                                                         │
│      name: "Test Configuration",                                            │
│      seriesBlocks: [5, 10],                                                 │
│      parallelBlocks: [8, 12],                                               │
│      serialTime: 35,                                                        │
│      parallelTime: 27,                                                      │
│      speedup: 1.296,                                                        │
│      timestamp: "1/29/2026, 3:45:23 PM"                                     │
│    }                                                                         │
│  ]                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 17: OUTPUT - CONFIRMATION                            │
│  Lines 2815-2818                                                             │
│                                                                              │
│ 50. Show success alert:                                                     │
│     alert('✅ Run "Test Configuration" saved successfully! (Speedup: 1.30×)')
│                                                                              │
│ 51. Console logs for debugging:                                             │
│     console.log('📊 Current savedRuns LIST:', savedRuns)                    │
│     console.log('📊 Total saved runs:', 1)                                  │
│                                                                              │
│  OUTPUT: User sees confirmation, run is saved                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ (User wants to see all saved runs)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 18: USER REQUESTS SAVED RUNS                         │
│  User clicks "📊 Show Saved" button                                         │
│  Function: showSavedRuns() (Line 2823)                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 19: CHECK IF LIST IS EMPTY                           │
│  Lines 2826-2830                                                             │
│                                                                              │
│ 52. Get display element:                                                    │
│     savedRunsElem = document.getElementById("savedRuns")                    │
│                                                                              │
│ 53. SELECTION: Check if savedRuns LIST is empty                             │
│     if (savedRuns.length === 0)                                             │
│       → Show "No runs saved yet" message                                    │
│       → return                                                               │
│                                                                              │
│     savedRuns.length = 1  ✓                                                │
│     Continue to display                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 20: FORMAT OUTPUT STRING                             │
│  Lines 2833-2841                                                             │
│                                                                              │
│ 54. Create header:                                                          │
│     text = "SAVED RUNS (1 total)\n"                                         │
│     text += "============================================================\n\n"│
│                                                                              │
│ 55. ITERATION: Loop through savedRuns LIST                                  │
│     savedRuns.forEach((run, i) => {                                         │
│                                                                              │
│ 56. For run index 0:                                                        │
│     text += "1. Test Configuration - 1/29/2026, 3:45:23 PM\n"              │
│     text += "   Speedup: 1.296× (Serial: 35, Parallel: 27)\n"             │
│     text += "   Series: [5, 10]\n"                                         │
│     text += "   Parallel: [8, 12]\n\n"                                     │
│                                                                              │
│     }) // End forEach                                                        │
│                                                                              │
│  Final text value:                                                          │
│  "SAVED RUNS (1 total)"                                                     │
│  "============================================================"              │
│  ""                                                                          │
│  "1. Test Configuration - 1/29/2026, 3:45:23 PM"                           │
│  "   Speedup: 1.296× (Serial: 35, Parallel: 27)"                           │
│  "   Series: [5, 10]"                                                       │
│  "   Parallel: [8, 12]"                                                     │
│  ""                                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 21: OUTPUT - DISPLAY SAVED RUNS                      │
│  Lines 2844-2845                                                             │
│                                                                              │
│ 57. Update display element:                                                 │
│     savedRunsElem.textContent = text                                        │
│     savedRunsElem.style.display = "block"  ← Make visible                  │
│                                                                              │
│  OUTPUT: Saved runs list displayed below game area                          │
│  ┌─────────────────────────────────────────────────────────┐               │
│  │ SAVED RUNS (1 total)                                    │               │
│  │ ======================================================== │               │
│  │                                                          │               │
│  │ 1. Test Configuration - 1/29/2026, 3:45:23 PM           │               │
│  │    Speedup: 1.296× (Serial: 35, Parallel: 27)          │               │
│  │    Series: [5, 10]                                      │               │
│  │    Parallel: [8, 12]                                    │               │
│  └─────────────────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Algorithm Walkthrough

**Serial Time Calculation:**
```
Tasks: [5, 10, 8, 12]
Method: Sum ALL tasks (they run one after another)
Calculation: 5 + 10 + 8 + 12 = 35 units
```

**Parallel Time Calculation:**
```
Series Tasks: [5, 10]    → Must run sequentially = 5 + 10 = 15 units
Parallel Tasks: [8, 12]  → Run simultaneously = max(8, 12) = 12 units
Parallel Time = 15 + 12 = 27 units
```

**Speedup Formula:**
```
Speedup = Serial Time / Parallel Time
Speedup = 35 / 27
Speedup = 1.296×

Interpretation: Parallel execution is 1.296 times faster
                = 29.6% performance improvement
```

---

## Task 5: CHECKPOINT Ready ✓

### What to Show Instructor

1. **Task Selection:** Core 5 - Speedup Calculator (Drag & Drop, Amdahl's Law)

2. **Code File:**
   - Main File: `frontend/cores/core-5.md` (single-file HTML/CSS/JS module)
   - Lines: ~2850 total (HTML: 1-2260, CSS: 14-1860, JS: 2280-2846)

3. **Key Code Segments:**
   - INPUT: Lines 2730-2740 (addTask), Lines 2678-2715 (drag & drop)
   - OUTPUT: Lines 2760-2785 (computeSpeedup display), Lines 2823-2845 (showSavedRuns)
   - PROCEDURE: Lines 2747-2785 (computeSpeedup - MAIN)
   - LISTS: Lines 2666-2668 (savedRuns), Lines 2749-2753 (seriesBlocks, parallelBlocks)

4. **Create PT Elements Identified:**

| Requirement | Location | Evidence |
|-------------|----------|----------|
| INPUT | Lines 2730-2740, 2678-2715 | `addTask()`, drag/drop functions, button event listeners |
| OUTPUT | Lines 2760-2785, 2823-2845 | Results display, visual panel, saved runs list, console logs |
| LIST | Lines 2666-2668, 2749-2753 | `savedRuns[]`, `seriesBlocks[]`, `parallelBlocks[]` |
| PROCEDURE | Lines 2747-2785 | `computeSpeedup()` - main calculation function |
| SEQUENCING | Lines 2747-2785 | 9 sequential steps in computeSpeedup() |
| SELECTION | Lines 2755, 2763, 2770, 2776, 2780, 2782 | `if (empty)`, `if (parallelBlocks.length)`, `speedup > 1 ? success : failure` |
| ITERATION | Lines 2749-2753, 2836 | `.filter()`, `.map()`, `.reduce()`, `forEach()` on LISTS |

5. **Live Demo Points:**
   - Create tasks with different time values
   - Drag tasks to Series vs Parallel rows
   - Show how organization affects speedup
   - Demonstrate perfect parallelization (move all to Parallel) vs poor parallelization
   - Save multiple configurations
   - Display saved runs history

6. **Key Concepts Demonstrated:**

| Concept | Example Configuration | Speedup | Explanation |
|---------|----------------------|---------|-------------|
| **Poor Parallelization** | Series: [5,10,8,12], Parallel: [] | 1.0× | No speedup - everything sequential |
| **Good Parallelization** | Series: [5,10], Parallel: [8,12] | 1.30× | 30% improvement |
| **Optimal Parallelization** | Series: [], Parallel: [5,10,8,12] | 2.92× | 192% improvement (max time is 12) |
| **Amdahl's Law Limit** | Series: [50], Parallel: [10,10,10] | 1.67× | Serial portion limits speedup |

### Mathematical Concepts

**Speedup Formula:**
```
Speedup = T_serial / T_parallel

Where:
- T_serial = Sum of ALL task times (everything runs sequentially)
- T_parallel = Sum(series tasks) + Max(parallel tasks)
```

**Amdahl's Law Connection:**
```
Maximum Speedup = 1 / (S + P/N)

Where:
- S = Serial fraction (tasks that MUST be sequential)
- P = Parallel fraction (tasks that CAN run simultaneously)
- N = Number of processors

In our simulator:
- Series Row = Serial fraction
- Parallel Row = Parallel fraction
- Speedup shows the benefit of parallelization
```

---

## Day 2 Checklist

- [x] Task 1: Documented INPUT (task creation, drag & drop, button clicks)
- [x] Task 2: Documented OUTPUT (results display, visual panel, saved runs list)
- [x] Task 3: Identified PROCEDURE (`computeSpeedup()` with all required elements)
- [x] Task 4: Traced complete data flow (57 steps from input to output)
- [x] Task 5: Prepared CHECKPOINT materials for instructor

---

## Next Steps (Day 3)

1. **Write PPR 3a:** Describe the `computeSpeedup()` procedure
   - Explain how it processes the series and parallel LISTS
   - Show how tasks are collected from DOM using iteration
   - Demonstrate the speedup calculation algorithm

2. **Write PPR 3b:** Explain sequencing, selection, iteration
   - Sequencing: 9 steps in computeSpeedup (collect → validate → calculate → display → store)
   - Selection: if statements for validation, message choice, empty state handling
   - Iteration: `.filter()`, `.map()`, `.reduce()`, `forEach()` on task LISTS

3. **Write PPR 3c:** Describe how LISTS are used
   - `seriesBlocks` - Created by filtering/mapping DOM children, used in calculation
   - `parallelBlocks` - Created by filtering/mapping DOM children, used in calculation
   - `savedRuns` - Grows as user saves configurations, displayed in showSavedRuns()

4. **Take screenshots:**
   - Code segments with annotations marking SEQUENCING, SELECTION, ITERATION, LIST
   - Interface showing task organization (Series vs Parallel rows)
   - Results display with speedup calculation
   - Saved runs list showing multiple configurations

5. **Add code comments:**
   - Mark each SEQUENCING step
   - Label SELECTION points
   - Annotate ITERATION loops
   - Document LIST operations (create, add, read, display)

**Status:** ✅ Day 2 Complete — Ready for Create PT written responses

---

## Technical Notes

### Algorithm Summary

1. **Task Collection Algorithm:**
   ```javascript
   // ITERATION + SELECTION + LIST manipulation
   const blocks = Array.from(container.children)
                   .filter(c => c.classList.contains("block"))  // SELECTION
                   .map(b => parseInt(b.textContent));          // Create LIST
   ```

2. **Serial Time Algorithm:**
   ```javascript
   // ITERATION: Sum all tasks
   const serialTime = [...series, ...parallel].reduce((a, b) => a + b, 0);
   ```

3. **Parallel Time Algorithm:**
   ```javascript
   // ITERATION (sum) + SELECTION (max)
   const parallelTime = series.reduce((a, b) => a + b, 0) + 
                        (parallel.length ? Math.max(...parallel) : 0);
   ```

4. **Speedup Calculation:**
   ```javascript
   // Division with safety check
   const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;
   ```

### Data Structure Design

**Why use separate Series/Parallel arrays?**
- Mirrors real parallel computing: some tasks MUST be sequential (dependencies)
- Demonstrates Amdahl's Law: serial portion limits maximum speedup
- Educational value: students learn task dependencies affect performance

**Why store savedRuns as array of objects?**
- Preserves complete configuration for comparison
- Allows displaying history with timestamps
- Demonstrates practical use of complex data structures (LIST of objects)

### Performance Metrics

**Example Scenarios:**

| Configuration | Serial Time | Parallel Time | Speedup | Improvement |
|---------------|-------------|---------------|---------|-------------|
| All Serial: [5,10,8,12] in Series | 35 | 35 | 1.0× | 0% |
| Balanced: [5,10] Series, [8,12] Parallel | 35 | 27 | 1.30× | 30% |
| Mostly Parallel: [5] Series, [10,8,12] Parallel | 35 | 17 | 2.06× | 106% |
| All Parallel: [5,10,8,12] in Parallel | 35 | 12 | 2.92× | 192% |
