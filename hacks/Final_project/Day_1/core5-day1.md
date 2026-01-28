---
title: "Core 5 - Day 1"
permalink: /core5-day1
layout: post
---

# Core 5: Speedup Calculator — Day 1 Complete

**Team Member:** Tanay
**Core Assignment:** Core 5 - Interactive Speedup Calculator with Drag & Drop

---

## Task 1: Individual Task Identified ✓

**My Task:** Drag & Drop Speedup Calculator for Parallel Computing

**What it does:** User drags task blocks into "Series Row" (sequential) or "Parallel Row" (simultaneous execution), then clicks "Compute Speedup" to calculate how much faster parallel execution is compared to serial execution. Demonstrates Amdahl's Law and performance optimization.

**Why it fits Create PT:**
- Clear INPUT → PROCEDURE → OUTPUT flow
- Uses LISTS (task arrays, saved runs history)
- Has defined PROCEDURES with sequencing (drag → organize → compute), selection (if tasks exist, compute speedup), and iteration (loop through task blocks to calculate times)
- Persistent storage (localStorage for saved runs)

---

## Task 2: API Routes Reviewed ✓

### Backend API: `backend/Quest/routes/speedup.py`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/speedup/quiz` | POST | Speedup knowledge quiz with scoring |
| `/api/speedup/calculate` | POST | Backend calculation validation (optional - frontend also calculates) |

### Key Frontend Functions (Core 5 is primarily client-side):

| Function | Line | Purpose |
|----------|------|---------|
| `addTask()` | ~2726 | Creates draggable task block with user-input time value |
| `drag(event)` | ~2691 | Handles drag start event, stores task ID |
| `allowDrop(event)` | ~2695 | Allows drop zone to accept dragged elements |
| `drop(event)` | ~2699 | Handles drop event, moves task to target area |
| `computeSpeedup()` | ~2747 | Calculates serial time, parallel time, and speedup ratio |
| `saveRun()` | ~2787 | Saves current configuration to localStorage array |
| `showSavedRuns()` | ~2823 | Displays list of saved speedup calculations |
| `openModal(panelId)` | ~2289 | Opens educational modal with detailed explanations |
| `getModalContent(panelId)` | ~2309 | Returns content for modals (Amdahl's Law, parallel vs serial, etc.) |

---

## Task 3: Frontend + Backend Code Mapped ✓

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND INPUT                                 │
│  frontend/cores/core-5.md                                               │
│                                                                          │
│  User Actions:                                                           │
│  1. Enter task time value (e.g., "10") in input field                   │
│  2. Click "➕ Add Task" button                                           │
│  3. Drag task blocks to Series or Parallel rows                         │
│  4. Click "⚡ Compute Speedup" button                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      INPUT COLLECTION                                    │
│  Line 2726: addTask() function                                          │
│                                                                          │
│  const val = parseInt(document.getElementById('newTaskTime').value);    │
│  if (val > 0) {                                                          │
│    const block = document.createElement("div");                          │
│    block.className = "block";                                            │
│    block.draggable = true;                                               │
│    block.textContent = val;           ← Store time value in block       │
│    taskPool.appendChild(block);       ← Add to Task Pool (LIST)         │
│  }                                                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      DRAG & DROP INTERACTION                             │
│  Lines 2691-2712: Drag and Drop Functions                               │
│                                                                          │
│  1. drag(event) - User starts dragging a task block                     │
│     → Sets event.dataTransfer with block ID                             │
│                                                                          │
│  2. allowDrop(event) - User hovers over drop zone                       │
│     → event.preventDefault() to allow drop                              │
│     → Adds 'drag-over' CSS class for visual feedback                    │
│                                                                          │
│  3. drop(event) - User releases block in Series or Parallel row         │
│     → Retrieves block ID from dataTransfer                              │
│     → targetArea.appendChild(draggedBlock)                              │
│     → Removes 'drag-over' class                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      PROCEDURE: computeSpeedup()                         │
│  Line 2747-2785: Main calculation procedure                             │
│                                                                          │
│  // STEP 1: Collect tasks from each row (LISTS)                         │
│  const seriesBlocks = Array.from(                                       │
│      document.getElementById("seriesRow").children                      │
│  )                                                                       │
│      .filter(c => c.classList.contains("block"))  ← SELECTION           │
│      .map(b => parseInt(b.textContent));          ← LIST of times       │
│                                                                          │
│  const parallelBlocks = Array.from(                                     │
│      document.getElementById("parallelRow").children                    │
│  )                                                                       │
│      .filter(c => c.classList.contains("block"))                        │
│      .map(b => parseInt(b.textContent));          ← LIST of times       │
│                                                                          │
│  // STEP 2: Validate input (SELECTION)                                  │
│  if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {       │
│      alert("Please add tasks first");                                   │
│      return;                                                             │
│  }                                                                       │
│                                                                          │
│  // STEP 3: Calculate serial time (ITERATION)                           │
│  const serialTime = [...seriesBlocks, ...parallelBlocks]               │
│      .reduce((a, b) => a + b, 0);     ← Sum ALL tasks sequentially     │
│                                                                          │
│  // STEP 4: Calculate parallel time (ITERATION + SELECTION)             │
│  const seriesTotal = seriesBlocks.reduce((a, b) => a + b, 0);          │
│  const parallelMax = parallelBlocks.length                              │
│      ? Math.max(...parallelBlocks)    ← Max time (tasks run together)  │
│      : 0;                                                                │
│  const parallelTime = seriesTotal + parallelMax;                        │
│                                                                          │
│  // STEP 5: Calculate speedup                                           │
│  const speedup = parallelTime > 0                                       │
│      ? serialTime / parallelTime                                        │
│      : 0;                                                                │
│                                                                          │
│  // STEP 6: Store result for saving                                     │
│  window.currentScore = {                                                │
│      seriesBlocks,        ← LIST                                        │
│      parallelBlocks,      ← LIST                                        │
│      serialTime,                                                         │
│      parallelTime,                                                       │
│      speedup                                                             │
│  };                                                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           OUTPUT                                         │
│  Lines 2763-2784: Display results                                       │
│                                                                          │
│  DOM Updates:                                                            │
│  • resultsElem.classList.add("has-results")  ← Show results card        │
│  • serialTimeElem.textContent = serialTime + " units"                   │
│  • parallelTimeElem.textContent = parallelTime + " units"               │
│  • speedupElem.textContent = speedup.toFixed(2) + "×"                   │
│  • Progress bar width = (speedup - 1) * 50 + "%"                        │
│  • speedLabel.textContent = speedup > 1                                 │
│      ? "Nice — parallelism helped!"                                     │
│      : "No speedup yet — try moving tasks to parallel."                 │
│                                                                          │
│  Visual Output:                                                          │
│  ┌─────────────────────────────────────────┐                            │
│  │ 🎯 Results                              │                            │
│  │                                         │                            │
│  │ Serial Time: 35 units                   │                            │
│  │ Parallel Time: 27 units                 │                            │
│  │ Speedup: 1.30×                          │                            │
│  │                                         │                            │
│  │ [████████░░░░░░░░░░] 30% faster         │                            │
│  │ Nice — parallelism helped!              │                            │
│  └─────────────────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      PERSISTENT STORAGE (BONUS)                          │
│  Line 2787: saveRun() function                                          │
│                                                                          │
│  savedRuns.push({                         ← Add to LIST                 │
│      seriesBlocks: window.currentScore.seriesBlocks,                    │
│      parallelBlocks: window.currentScore.parallelBlocks,                │
│      serialTime: window.currentScore.serialTime,                        │
│      parallelTime: window.currentScore.parallelTime,                    │
│      speedup: window.currentScore.speedup,                              │
│      timestamp: new Date().toLocaleString()                             │
│  });                                                                     │
│                                                                          │
│  localStorage.setItem('speedupRuns', JSON.stringify(savedRuns));        │
│  alert(`Run saved! Total saved: ${savedRuns.length}`);                  │
│                                                                          │
│  Line 2823: showSavedRuns() function                                    │
│  → ITERATION: Loop through savedRuns LIST                               │
│  → Display each run's speedup, times, and timestamp                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### File Locations Summary

| Component | File Path | Key Lines |
|-----------|-----------|-----------|
| Main Page | `frontend/cores/core-5.md` | Entire file (~2850 lines) |
| HTML Structure | Lines 1-2260 | Canvas, drag areas, sidebar, modals |
| CSS Styling | Lines 14-1860 | Drag-drop styles, animations, responsive design |
| JavaScript Logic | Lines 2280-2846 | All functions (drag, drop, compute, save) |
| Educational Content | Lines 2288-2563 | Modal content (Amdahl's Law, parallel vs serial) |
| Backend API (optional) | `backend/Quest/routes/speedup.py` | Quiz validation endpoint |

---

## Task 4: 1-Minute Video Script Outline ✓

### Video Script: "Speedup Calculator - Parallel vs Serial Performance"

**[0:00-0:10] HOOK + INTRO**
> "Ever wonder how much faster parallel computing is? Let me show you with this interactive speedup calculator using drag-and-drop task blocks."

**[0:10-0:25] INPUT DEMONSTRATION**
- Show the interface: Task Pool, Series Row, Parallel Row
- Type "10" in the input box and click "Add Task" (creates a block with "10")
- Add 3-4 more tasks with different times (5, 8, 12)
- Highlight: "These numbers represent task execution times in arbitrary units."

**[0:25-0:45] PROCEDURE DEMONSTRATION**
- Drag tasks to organize them:
  - Drag blocks "5" and "10" to the **Series Row**
  - Drag blocks "8" and "12" to the **Parallel Row**
- Explain while dragging: "Series tasks run one after another. Parallel tasks run simultaneously."
- Click "⚡ Compute Speedup"
- Show the calculation happening in real-time

**[0:45-0:55] OUTPUT + LIST USAGE**
- Point to results panel:
  - Serial Time: 35 units (5+10+8+12)
  - Parallel Time: 27 units (5+10 + max(8,12))
  - Speedup: 1.30×
- Highlight: "The system stores my task blocks in LISTS (seriesBlocks array, parallelBlocks array), then iterates through them to calculate speedup."
- Click "💾 Save Run" to demonstrate persistent storage

**[0:55-1:00] CLOSE**
> "This demonstrates input from user interaction, procedures with iteration through lists, selection logic, and output with speedup calculation — the core of parallel computing performance analysis."

---

## Task 5: Team Sync Notes ✓

### Presentation Role Assignment

| Team Member | Core | Presentation Focus |
|-------------|------|-------------------|
| Tanay | Core 5 | Speedup Calculator - Drag & Drop Parallel Performance |
| Rudra | Core 3 | AI Digit Recognizer - CNN Pipeline |
| [Teammate 3] | Core ? | [TBD] |
| [Teammate 4] | Core ? | [TBD] |
| [Teammate 5] | Core ? | [TBD] |

### My N@tM Presentation Focus:
1. **Live Demo:** Drag tasks, compute speedup, show different configurations
2. **Code Walkthrough:** Show `computeSpeedup()` function and list manipulation
3. **Educational Modals:** Click "View More" buttons to explain Amdahl's Law
4. **Saved Runs:** Demonstrate localStorage persistence with "Show Saved" button
5. **Responsive Design:** Show mobile/tablet layout adaptations

---

## Create PT Code Segments (Preview)

### INPUT (User interaction + task creation)
```javascript
// frontend/cores/core-5.md - Line 2726-2739
window.addTask = function() {
    const val = parseInt(document.getElementById('newTaskTime').value);
    if (isNaN(val) || val <= 0) {
        alert("Please enter a positive number");
        return;
    }
    
    const block = document.createElement("div");
    block.className = "block";
    block.id = "task-" + Date.now();
    block.draggable = true;
    block.ondragstart = drag;
    block.textContent = val;
    document.getElementById("taskPool").appendChild(block);
    document.getElementById('newTaskTime').value = "";
}
```

### PROCEDURE with List + Iteration + Selection (Speedup calculation)
```javascript
// frontend/cores/core-5.md - Line 2747-2785
window.computeSpeedup = function() {
    // COLLECT TASKS INTO LISTS
    const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                            .filter(c => c.classList.contains("block"))  // SELECTION
                            .map(b => parseInt(b.textContent));          // LIST
    
    const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                            .filter(c => c.classList.contains("block"))
                            .map(b => parseInt(b.textContent));          // LIST

    // SELECTION: Check if tasks exist
    if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
        alert("Please add some tasks to the Series or Parallel rows first");
        return;
    }

    // ITERATION: Calculate serial time (sum all tasks)
    const serialTime = [...seriesBlocks, ...parallelBlocks]
                        .reduce((a, b) => a + b, 0);

    // ITERATION: Calculate parallel time
    const parallelTime = seriesBlocks.reduce((a, b) => a + b, 0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    
    // CALCULATE SPEEDUP
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // STORE RESULT (for saving later)
    window.currentScore = {
        seriesBlocks,      // LIST
        parallelBlocks,    // LIST
        serialTime,
        parallelTime,
        speedup
    };
    
    // UPDATE DOM (output)
    displayResults(serialTime, parallelTime, speedup);
}
```

### OUTPUT (Display results + persistent storage)
```javascript
// frontend/cores/core-5.md - Line 2763-2784 (Display)
const resultsElem = document.getElementById("results");
resultsElem.className = "results has-results";

document.getElementById("serialTimeValue").textContent = serialTime;
document.getElementById("parallelTimeValue").textContent = parallelTime;
document.getElementById("speedupValue").textContent = speedup.toFixed(2);

const speedBig = document.getElementById("speedupBig");
const speedBarInner = document.querySelector(".speed-bar-inner");
const speedLabel = document.querySelector(".speed-label");

speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
speedBarInner.style.width = `${Math.min((speedup - 1) * 50, 100)}%`;
speedLabel.textContent = speedup > 1 
    ? 'Nice — parallelism helped!' 
    : 'No speedup yet — try moving tasks to parallel.';
```

```javascript
// frontend/cores/core-5.md - Line 2787-2821 (Persistent Storage)
window.saveRun = function() {
    if (!window.currentScore) {
        alert("Please compute speedup first before saving!");
        return;
    }
    
    // Add to LIST of saved runs
    savedRuns.push({
        seriesBlocks: window.currentScore.seriesBlocks,
        parallelBlocks: window.currentScore.parallelBlocks,
        serialTime: window.currentScore.serialTime,
        parallelTime: window.currentScore.parallelTime,
        speedup: window.currentScore.speedup,
        timestamp: new Date().toLocaleString()
    });
    
    // PERSISTENT STORAGE
    localStorage.setItem('speedupRuns', JSON.stringify(savedRuns));
    alert(`Run saved! Total saved: ${savedRuns.length}`);
}
```

---

## Day 1 Checklist

- [x] Task 1: Identified individual task (Core 5: Speedup Calculator)
- [x] Task 2: Reviewed API routes (`/api/speedup/quiz`) and frontend functions
- [x] Task 3: Mapped frontend code with detailed data flow diagram
- [x] Task 4: Drafted 1-minute video script outline
- [ ] Task 5: Team sync - assign other members their cores (DO THIS TODAY)

---

## Next Steps (Day 2)

1. Document INPUT code segment with screenshots of drag-and-drop interface
2. Document OUTPUT code segment with screenshots of results display
3. Identify the exact PROCEDURE function for PPR (likely `computeSpeedup()`)
4. Trace full data flow with browser DevTools console open
5. Test localStorage persistence across page reloads
6. **CHECKPOINT:** Show instructor task selection + code mapping

---

## Technical Notes

### Key Algorithms Demonstrated:

1. **Sequencing:** User actions flow: add task → drag → organize → compute → save
2. **Selection:** `if (seriesBlocks.length === 0 && parallelBlocks.length === 0)` check before calculation
3. **Iteration:** 
   - `Array.from().filter().map()` to collect task times
   - `.reduce()` to sum serial times
   - `Math.max()` to find longest parallel task
4. **Lists:** 
   - `seriesBlocks` array
   - `parallelBlocks` array
   - `savedRuns` array (persistent storage)

### Amdahl's Law Concepts:
- **Serial Time:** Sum of ALL tasks if run sequentially
- **Parallel Time:** Series tasks sum + MAX of parallel tasks (they run simultaneously)
- **Speedup Formula:** `Speedup = T_serial / T_parallel`

### Example Calculation:
```
Tasks: [5, 10, 8, 12]
Organization:
  Series Row: [5, 10]
  Parallel Row: [8, 12]

Serial Time = 5 + 10 + 8 + 12 = 35 units
Parallel Time = (5 + 10) + max(8, 12) = 15 + 12 = 27 units
Speedup = 35 / 27 = 1.30×

Result: Parallel execution is 1.3× faster (30% improvement)
```

---

## Educational Content Covered

The module includes modal popups explaining:
1. **What is Speedup?** - Definition and formula
2. **How It Works** - Step-by-step calculation process
3. **Parallel vs Serial** - Advantages/disadvantages of each approach
4. **Amdahl's Law** - Theoretical speedup limits
5. **Real-World Use** - Practical applications (video encoding, machine learning, etc.)

All content is embedded in `getModalContent()` function (Lines 2309-2563).
