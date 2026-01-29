---
title: "Core 5 - Day 2 Code Deep Dive"
permalink: /core5/day2
layout: post
---

# Core 5: Speedup Calculator — Day 2 Complete

**Task:** Document INPUT, OUTPUT, PROCEDURE, and Data Flow for Create PT

---

## Task 1: INPUT Documentation ✓

### Frontend Input Code

**File:** `frontend/cores/core-5.md` — Lines 2730-2740

```javascript
window.addTask = function() {
  /**
   * INPUT: User enters task time value and clicks "Add Task"
   * Creates a draggable block with the specified time
   */
  
  const val = parseInt(document.getElementById('newTaskTime').value);
  
  // INPUT VALIDATION: Check for valid positive number
  if(isNaN(val) || val < 1) {
      alert("Please enter a valid task time (positive number)");
      return;
  }

  // INPUT ACCEPTED: Create draggable task block
  const block = document.createElement("div");
  block.className = "block";
  block.id = "task" + Date.now();    // Unique ID using timestamp
  block.draggable = true;            // Enable drag functionality
  block.ondragstart = drag;          // Attach drag handler
  block.textContent = val;           // Display time value
  
  // Add to Task Pool (visual LIST on page)
  document.getElementById("taskPool").appendChild(block);
  
  // Clear input field for next task
  document.getElementById('newTaskTime').value = "";
}
```

### Drag & Drop Input Code

**File:** `frontend/cores/core-5.md` — Lines 2678-2715

```javascript
// Drag and Drop INPUT functions

function drag(ev) {
  /**
   * INPUT: User starts dragging a task block
   * Captures the block ID and provides visual feedback
   */
  
  ev.dataTransfer.setData("text", ev.target.id);  // Store block ID
  ev.target.classList.add('dragging');            // Visual feedback
  currentlyDragging = ev.target;
  
  // Highlight valid drop zones (Series Row, Parallel Row, Task Pool)
  document.getElementById('seriesRow').classList.add('highlight-target');
  document.getElementById('parallelRow').classList.add('highlight-target');
  document.getElementById('taskPool').classList.add('highlight-target');
}

function allowDrop(ev) {
  /**
   * INPUT: User hovers dragged block over a drop zone
   * Prevents default behavior to enable dropping
   */
  
  ev.preventDefault();  // Required to allow drop
  
  // Find the closest drag-area container and add visual feedback
  let targetArea = ev.target.closest('.drag-area');
  if (targetArea) {
      targetArea.classList.add('drag-over');
  }
}

function drop(ev) {
  /**
   * INPUT: User releases dragged block in a drop zone
   * Moves the block to the target area (Series or Parallel row)
   */
  
  ev.preventDefault();
  
  let data = ev.dataTransfer.getData("text");  // Get block ID
  let elem = document.getElementById(data);    // Find the block element
  
  // Find the closest drag-area container (Series Row or Parallel Row)
  let targetArea = ev.target.closest('.drag-area');
  
  // If we found a valid drag area, move the block there
  if (targetArea && elem) {
      targetArea.appendChild(elem);         // MOVE block to new location
      elem.classList.remove('dragging');    // Remove drag styling
  }
  
  removeHighlights();  // Clean up visual feedback
}

function removeHighlights() {
  // Remove all drag-over and highlight classes
  document.querySelectorAll('.drag-area').forEach(area => {
      area.classList.remove('drag-over', 'highlight-target');
  });
}
```

### Button Input Code

**File:** `frontend/cores/core-5.md` — Lines 2103-2111 (HTML), Lines 3180-3240 (Event Listeners)

```javascript
// Event listener setup for button clicks
window.addEventListener('load', function() {
    console.log('Page loaded, initializing...');
    
    // INPUT: Add Task button
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            console.log('Add task clicked');
            window.addTask();
        });
    }
    
    // INPUT: Compute Speedup button
    const computeBtn = document.getElementById('computeBtn');
    if (computeBtn) {
        computeBtn.addEventListener('click', function() {
            console.log('Compute clicked');
            window.computeSpeedup();
        });
    }
    
    // INPUT: Save Run button
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            console.log('Save clicked');
            window.saveRun();
        });
    }
    
    // INPUT: Show Saved Runs button
    const showBtn = document.getElementById('showBtn');
    if (showBtn) {
        showBtn.addEventListener('click', function() {
            console.log('Show saved clicked');
            window.showSavedRuns();
        });
    }
    
    // INPUT: Sidebar toggle button
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            window.toggleSidebar();
        });
    }
    
    // INPUT: Modal "View More" buttons
    document.querySelectorAll('[data-modal]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            const modalId = this.getAttribute('data-modal');
            console.log('Opening modal:', modalId);
            window.openModal(modalId);
        });
    });
    
    // INPUT: Modal close (click overlay)
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                window.closeModal();
            }
        });
    }
    
    // INPUT: Modal close button (×)
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            window.closeModal();
        });
    }
});
```

### Input Breakdown

| Component | Description | Code Location | User Action |
|-----------|-------------|---------------|-------------|
| **Task Creation** | Enter time value, click "Add Task" | `addTask()` - Line 2730 | Type number → Click button |
| **Drag Start** | User grabs a task block | `drag()` - Line 2681 | Mouse down + move on block |
| **Drag Over** | User hovers over drop zone | `allowDrop()` - Line 2670 | Dragging over Series/Parallel row |
| **Drop** | User releases block in zone | `drop()` - Line 2693 | Release mouse in drop area |
| **Compute Button** | Calculate speedup | `computeSpeedup()` - Line 2747 | Click "⚡ Compute Speedup" |
| **Save Button** | Save current configuration | `saveRun()` - Line 2787 | Click "💾 Save Run" |
| **Show Button** | Display saved runs | `showSavedRuns()` - Line 2823 | Click "📊 Show Saved" |
| **Sidebar Toggle** | Open/close learning guide | `toggleSidebar()` - Line 2288 | Click hamburger icon |
| **Modal Open** | View detailed explanations | `openModal()` - Line 2289 | Click "View More" buttons |

### Input Data Structures

```javascript
// Global state variables (Lines 2666-2668)
let savedRuns = [];              // LIST: Stores all saved speedup calculations
let currentlyDragging = null;    // Reference: Currently dragged block element

// Task block structure (created dynamically)
let taskBlock = {
    id: "task1738195234567",    // Unique ID (timestamp)
    className: "block",          // CSS styling
    draggable: true,             // Enable drag
    textContent: "10",           // Time value (integer)
    ondragstart: drag            // Event handler
};

// Drop zone elements (existing in DOM)
let dropZones = {
    taskPool: document.getElementById("taskPool"),      // Task storage
    seriesRow: document.getElementById("seriesRow"),    // Sequential tasks
    parallelRow: document.getElementById("parallelRow") // Simultaneous tasks
};
```

### User Interaction Flow

1. **Create Task:**
   - User types "10" in input field
   - Clicks "➕ Add Task"
   - Calls `addTask()` → Creates draggable block in Task Pool

2. **Organize Tasks:**
   - User drags block from Task Pool
   - Calls `drag()` → Stores block ID, adds visual feedback
   - User hovers over Series Row
   - Calls `allowDrop()` → Highlights drop zone
   - User releases mouse
   - Calls `drop()` → Moves block to Series Row

3. **Calculate Speedup:**
   - User clicks "⚡ Compute Speedup"
   - Calls `computeSpeedup()` → Processes task lists, calculates times

4. **Save Configuration:**
   - User clicks "💾 Save Run"
   - Calls `saveRun()` → Prompts for name, saves to `savedRuns` LIST

5. **View History:**
   - User clicks "📊 Show Saved"
   - Calls `showSavedRuns()` → Displays all saved configurations

### Input Validation Rules

| Input | Validation Rule | Error Message | Code Location |
|-------|----------------|---------------|---------------|
| Task Time | Must be positive integer | "Please enter a valid task time (positive number)" | Line 2734 |
| Task Time | Cannot be NaN | Same as above | Line 2734 |
| Compute Speedup | At least 1 task in Series or Parallel | "Please add some tasks to the Series or Parallel rows first" | Line 2756 |
| Save Run | Must compute speedup first | "Please compute speedup first before saving!" | Line 2794 |
| Save Run | Must enter a name | (Silent return if cancelled) | Line 2802 |

---

## Task 2: OUTPUT Documentation ✓

### Visual Output Code

**File:** `frontend/cores/core-5.md` — Lines 2760-2785

```javascript
window.computeSpeedup = function() {
    // ... input collection code ...
    
    // Calculate speedup values
    const serialTime = [...seriesBlocks, ...parallelBlocks].reduce((a,b)=>a+b,0);
    const parallelTime = seriesBlocks.reduce((a,b)=>a+b,0) + 
                         (parallelBlocks.length ? Math.max(...parallelBlocks) : 0);
    const speedup = parallelTime > 0 ? serialTime / parallelTime : 0;

    // OUTPUT 1: Text results display
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
        `${speedup > 1 ? 
          'Success! You achieved speedup through parallelization.' : 
          'No speedup gained - try moving more tasks to parallel row.'}`;

    // OUTPUT 2: Visual speedup panel
    const speedBig = document.getElementById('speedBig');
    const speedBarInner = document.getElementById('speedBarInner');
    const speedLabel = document.getElementById('speedLabel');
    
    // Calculate progress bar percentage (50% per 1× speedup)
    const pct = Math.min(200, Math.max(0, Math.round(speedup * 50)));
    
    // Update visual elements
    speedBig.textContent = speedup > 0 ? `${speedup.toFixed(2)}×` : '—';
    speedBarInner.style.width = pct + '%';
    speedLabel.textContent = speedup > 1 
        ? 'Nice — parallelism helped!' 
        : 'No speedup yet — try moving tasks to parallel.';

    // OUTPUT 3: Store result in global variable for saving
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

### Save Run Output Code

**File:** `frontend/cores/core-5.md` — Lines 2787-2821

```javascript
window.saveRun = function() {
    console.log('=== SAVE RUN DEBUG ===');
    console.log('window.currentScore:', window.currentScore);
    
    // INPUT VALIDATION
    if (!window.currentScore) {
        console.log('❌ FAILED: currentScore is null/undefined');
        alert("Please compute speedup first before saving!");
        return;
    }
    
    if (typeof window.currentScore.speedup !== 'number') {
        console.log('❌ FAILED: speedup is not a number');
        alert("Please compute speedup first before saving!");
        return;
    }
    
    console.log('✅ PASSED validation, showing prompt');
    
    // Get run name from user
    const name = prompt("Enter a name for this run:");
    if(!name) return;

    // OUTPUT: Add to savedRuns LIST
    savedRuns.push({
        name: name,
        seriesBlocks: window.currentScore.seriesBlocks,      // LIST
        parallelBlocks: window.currentScore.parallelBlocks,  // LIST
        serialTime: window.currentScore.serialTime,
        parallelTime: window.currentScore.parallelTime,
        speedup: window.currentScore.speedup,
        timestamp: new Date().toLocaleString()               // Date/time string
    });
    
    // OUTPUT: Success notification
    alert(`✅ Run "${name}" saved successfully! (Speedup: ${window.currentScore.speedup.toFixed(2)}×)`);
    
    console.log('📊 Current savedRuns LIST:', savedRuns);
    console.log('📊 Total saved runs:', savedRuns.length);
}
```

### Show Saved Runs Output Code

**File:** `frontend/cores/core-5.md` — Lines 2823-2845

```javascript
window.showSavedRuns = function() {
    const savedRunsElem = document.getElementById("savedRuns");
    
    // OUTPUT: Handle empty state
    if(savedRuns.length === 0) {
        savedRunsElem.textContent = "No runs saved yet. Compute a speedup and save it.";
        savedRunsElem.style.display = "block";
        return;
    }

    // OUTPUT: Format saved runs display
    let text = `SAVED RUNS (${savedRuns.length} total)\n${'='.repeat(60)}\n\n`;
    
    // ITERATION: Loop through savedRuns LIST
    savedRuns.forEach((run, i) => {
        text += `${i+1}. ${run.name} - ${run.timestamp}\n`;
        text += `   Speedup: ${run.speedup.toFixed(3)}× (Serial: ${run.serialTime}, Parallel: ${run.parallelTime})\n`;
        text += `   Series: [${run.seriesBlocks.join(', ') || 'none'}]\n`;
        text += `   Parallel: [${run.parallelBlocks.join(', ') || 'none'}]\n\n`;
    });
    
    // OUTPUT: Display formatted text
    savedRunsElem.textContent = text;
    savedRunsElem.style.display = "block";
}
```

### Modal Output Code

**File:** `frontend/cores/core-5.md` — Lines 2289-2308

```javascript
// Modal functions - sidebar panels now open in modals instead of expanding inline
window.openModal = function(panelId) {
    console.log('openModal called with:', panelId);
    
    // Get modal elements
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Get content for this topic (from getModalContent function)
    const content = getModalContent(panelId);
    
    // OUTPUT: Update modal content
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    
    // OUTPUT: Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';  // Prevent background scrolling
    
    console.log('Modal opened for:', panelId);
};

window.closeModal = function(event) {
    // OUTPUT: Hide modal
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';  // Restore scrolling
    
    console.log('Modal closed');
};
```

### Output Breakdown

| Output Element | Update Trigger | Display Format | Code Location |
|----------------|----------------|----------------|---------------|
| **Results Panel** | Compute button click | Multi-line text with calculations | Lines 2764-2775 |
| **Speedup Display** | Compute button click | Large "1.30×" text | Line 2780 |
| **Progress Bar** | Compute button click | Width = speedup × 50% | Line 2781 |
| **Status Label** | Compute button click | Success/failure message | Line 2782 |
| **Save Confirmation** | Save button click | Alert popup | Line 2805 |
| **Saved Runs List** | Show button click | Formatted text list | Lines 2836-2841 |
| **Console Logs** | Various actions | Debug information | Multiple locations |
| **Modal Popup** | "View More" click | Educational content | Lines 2295-2301 |

### Output Data Structures

```javascript
// currentScore object (stored after computation)
window.currentScore = {
    seriesBlocks: [5, 10],           // LIST: Tasks in Series Row
    parallelBlocks: [8, 12],         // LIST: Tasks in Parallel Row
    serialTime: 35,                  // Sum of all tasks
    parallelTime: 27,                // Series sum + max(Parallel)
    speedup: 1.296                   // serialTime / parallelTime
};

// savedRuns LIST structure
let savedRuns = [
    {
        name: "Test Run 1",
        seriesBlocks: [5, 10],       // LIST
        parallelBlocks: [8, 12],     // LIST
        serialTime: 35,
        parallelTime: 27,
        speedup: 1.296,
        timestamp: "1/29/2026, 3:45:23 PM"
    },
    {
        name: "Optimized Run",
        seriesBlocks: [5],
        parallelBlocks: [10, 8, 12],
        serialTime: 35,
        parallelTime: 17,
        speedup: 2.059,
        timestamp: "1/29/2026, 3:47:10 PM"
    }
    // ... more saved runs
];

// Modal content object (returned by getModalContent)
let modalContent = {
    title: "⚡ What is Speedup?",
    body: "<p>Speedup measures how much faster...</p>"
};
```

### Visual Output Examples

**Example 1: Compute Speedup Output**
```
RESULTS
==================================================

Series Tasks: [5, 10]
Parallel Tasks: [8, 12]

Serial Time (all sequential): 35 units
Parallel Time (with parallelism): 27 units

Speedup: 1.296×

Success! You achieved speedup through parallelization.
```

**Example 2: Saved Runs Output**
```
SAVED RUNS (2 total)
============================================================

1. Test Run 1 - 1/29/2026, 3:45:23 PM
   Speedup: 1.296× (Serial: 35, Parallel: 27)
   Series: [5, 10]
   Parallel: [8, 12]

2. Optimized Run - 1/29/2026, 3:47:10 PM
   Speedup: 2.059× (Serial: 35, Parallel: 17)
   Series: [5]
   Parallel: [10, 8, 12]
```

### Console Output (Debugging)

```javascript
// Console logs throughout the code for debugging
console.log('Page loaded, initializing...');
console.log('Add task clicked');
console.log('Compute clicked');
console.log('✅ currentScore set:', window.currentScore);
console.log('=== SAVE RUN DEBUG ===');
console.log('window.currentScore:', window.currentScore);
console.log('✅ PASSED validation, showing prompt');
console.log('📊 Current savedRuns LIST:', savedRuns);
console.log('📊 Total saved runs:', savedRuns.length);
console.log('Opening modal:', panelId);
console.log('Modal opened for:', panelId);
```

---

## Task 3: PROCEDURE Identification ✓

### Main Procedure: `computeSpeedup()`

**File:** `frontend/cores/core-5.md` — Lines 2747-2785

```javascript
window.computeSpeedup = function() {
  /**
   * PROCEDURE: Calculate speedup from task organization
   *
   * Contains ALL required elements:
   * - SEQUENCING: Steps execute in order (collect → validate → calculate → display)
   * - SELECTION: if statements for validation and success/failure messages
   * - ITERATION: Array methods (.filter, .map, .reduce) loop through task LISTS
   * - LIST: seriesBlocks array, parallelBlocks array
   *
   * Parameters: None (reads from DOM)
   * Return: None (updates DOM and global state)
   */

  // SEQUENCING STEP 1: Collect tasks from Series Row
  // ITERATION: Array.from creates array, filter selects blocks, map extracts values
  const seriesBlocks = Array.from(document.getElementById("seriesRow").children)
                          .filter(c => c.classList.contains("block"))  // SELECTION
                          .map(b => parseInt(b.textContent));          // LIST

  // SEQUENCING STEP 2: Collect tasks from Parallel Row
  const parallelBlocks = Array.from(document.getElementById("parallelRow").children)
                          .filter(c => c.classList.contains("block"))
                          .map(b => parseInt(b.textContent));          // LIST

  // SEQUENCING STEP 3: INPUT VALIDATION - Check if tasks exist
  // SELECTION: Conditional check
  if (seriesBlocks.length === 0 && parallelBlocks.length === 0) {
      alert("Please add some tasks to the Series or Parallel rows first");
      return;  // Early exit if no tasks
  }

  // SEQUENCING STEP 4: Calculate Serial Time
  // ITERATION: reduce() loops through combined array, summing all values
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
| `drop()` | 2693 | Move block to zone | INPUT + SELECTION |
| `computeSpeedup()` | 2747 | Calculate speedup (MAIN) | All elements |
| `saveRun()` | 2787 | Save to savedRuns LIST | SEQUENCING + SELECTION + LIST |
| `showSavedRuns()` | 2823 | Display saved runs | ITERATION + LIST + OUTPUT |
| `openModal()` | 2289 | Show educational content | OUTPUT |
| `closeModal()` | 2302 | Hide modal | OUTPUT |
| `toggleSidebar()` | 2288 | Show/hide learning guide | OUTPUT |

---

## Task 4: Data Flow Trace ✓

### Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER ACTION: CREATE TASK                        │
│                                                                              │
│  User types "10" in input field                                             │
│  User clicks "➕ Add Task" button                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STEP 1: INPUT PROCESSING                             │
│  Function: addTask() (Line 2730)                                            │
│                                                                              │
│  1. Read value from input field:                                            │
│     val = parseInt(document.getElementById('newTaskTime').value)            │
│     val = 10                                                                 │
│                                                                              │
│  2. SELECTION: Validate input                                               │
│     if (isNaN(val) || val < 1)                                              │
│       → alert error, return                                                 │
│     ✓ Passed validation                                                     │
│                                                                              │
│  3. SEQUENCING: Create task block                                           │
│     block = document.createElement("div")                                   │
│     block.className = "block"                                               │
│     block.id = "task1738195234567"  ← Unique timestamp ID                  │
│     block.draggable = true                                                  │
│     block.ondragstart = drag                                                │
│     block.textContent = "10"                                                │
│                                                                              │
│  4. OUTPUT: Add to Task Pool                                                │
│     document.getElementById("taskPool").appendChild(block)                  │
│                                                                              │
│  5. Clear input field                                                       │
│     document.getElementById('newTaskTime').value = ""                       │
│                                                                              │
│  State: Task Pool now contains: [block with "10"]                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ (User creates more tasks: 5, 8, 12)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 2: USER ORGANIZES TASKS (DRAG & DROP)               │
│                                                                              │
│  Task Pool: [5, 10, 8, 12]                                                  │
│  Series Row: []                                                              │
│  Parallel Row: []                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DRAG ACTION: Move "5" to Series Row                  │
│  Functions: drag() → allowDrop() → drop()                                   │
│                                                                              │
│  6. User clicks and holds "5" block                                         │
│     → drag(event) called (Line 2681)                                        │
│                                                                              │
│  7. Store block ID in dataTransfer:                                         │
│     ev.dataTransfer.setData("text", "task1738195234567")                    │
│                                                                              │
│  8. Add visual feedback:                                                    │
│     ev.target.classList.add('dragging')                                     │
│     currentlyDragging = ev.target                                           │
│                                                                              │
│  9. Highlight valid drop zones:                                             │
│     seriesRow.classList.add('highlight-target')                             │
│     parallelRow.classList.add('highlight-target')                           │
│     taskPool.classList.add('highlight-target')                              │
│                                                                              │
│ 10. User drags over Series Row                                              │
│     → allowDrop(event) called (Line 2670)                                   │
│                                                                              │
│ 11. Allow drop:                                                             │
│     ev.preventDefault()  ← Required for drop to work                        │
│                                                                              │
│ 12. Add hover feedback:                                                     │
│     targetArea = ev.target.closest('.drag-area')                            │
│     targetArea.classList.add('drag-over')                                   │
│                                                                              │
│ 13. User releases mouse                                                     │
│     → drop(event) called (Line 2693)                                        │
│                                                                              │
│ 14. Get block from dataTransfer:                                            │
│     data = ev.dataTransfer.getData("text")                                  │
│     elem = document.getElementById(data)  ← Get "5" block                  │
│                                                                              │
│ 15. Move block to Series Row:                                               │
│     targetArea = ev.target.closest('.drag-area')  ← Series Row             │
│     targetArea.appendChild(elem)                  ← MOVE block              │
│                                                                              │
│ 16. Clean up visual feedback:                                               │
│     elem.classList.remove('dragging')                                       │
│     removeHighlights()  ← Remove all highlight classes                      │
│                                                                              │
│  State: Task Pool: [10, 8, 12]                                              │
│         Series Row: [5]                                                      │
│         Parallel Row: []                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ (User continues dragging)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 3: FINAL TASK ORGANIZATION                           │
│                                                                              │
│  After user organizes all tasks:                                            │
│  Task Pool: []                                                               │
│  Series Row: [5, 10]         ← Tasks run one after another                 │
│  Parallel Row: [8, 12]       ← Tasks run simultaneously                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 4: USER REQUESTS CALCULATION                         │
│  User clicks "⚡ Compute Speedup" button                                    │
│  Function: computeSpeedup() (Line 2747)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 5: COLLECT TASKS FROM DOM                            │
│  Lines 2749-2753                                                             │
│                                                                              │
│ 17. ITERATION: Get all children of Series Row                               │
│     Array.from(document.getElementById("seriesRow").children)               │
│     → [<div class="block">5</div>, <div class="block">10</div>]            │
│                                                                              │
│ 18. SELECTION: Filter to only block elements                                │
│     .filter(c => c.classList.contains("block"))                             │
│     → [<div class="block">5</div>, <div class="block">10</div>]            │
│                                                                              │
│ 19. ITERATION: Extract text content as integers                             │
│     .map(b => parseInt(b.textContent))                                      │
│     → [5, 10]                                                               │
│                                                                              │
│ 20. Store in seriesBlocks LIST                                              │
│     const seriesBlocks = [5, 10]                                            │
│                                                                              │
│ 21. Repeat for Parallel Row (same process)                                  │
│     const parallelBlocks = [8, 12]                                          │
│                                                                              │
│  State: seriesBlocks = [5, 10]                                              │
│         parallelBlocks = [8, 12]                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 6: VALIDATE INPUT                                    │
│  Line 2755                                                                   │
│                                                                              │
│ 22. SELECTION: Check if tasks exist                                         │
│     if (seriesBlocks.length === 0 && parallelBlocks.length === 0)          │
│       → alert("Please add tasks...")                                        │
│       → return                                                               │
│                                                                              │
│     seriesBlocks.length = 2  ✓                                              │
│     parallelBlocks.length = 2  ✓                                            │
│     Validation passed!                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 7: CALCULATE SERIAL TIME                             │
│  Line 2760                                                                   │
│                                                                              │
│ 23. Combine both LISTS with spread operator:                                │
│     [...seriesBlocks, ...parallelBlocks]                                    │
│     → [5, 10, 8, 12]                                                        │
│                                                                              │
│ 24. ITERATION: Sum all values with reduce()                                 │
│     .reduce((a, b) => a + b, 0)                                             │
│     → 0 + 5 = 5                                                             │
│     → 5 + 10 = 15                                                           │
│     → 15 + 8 = 23                                                           │
│     → 23 + 12 = 35                                                          │
│                                                                              │
│ 25. Store result:                                                           │
│     const serialTime = 35                                                   │
│                                                                              │
│  Meaning: If all tasks run sequentially, total time = 35 units             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STEP 8: CALCULATE PARALLEL TIME                           │
│  Lines 2761-2763                                                             │
│                                                                              │
│ 26. ITERATION: Sum series tasks                                             │
│     seriesBlocks.reduce((a, b) => a + b, 0)                                 │
│     → 0 + 5 = 5                                                             │
│     → 5 + 10 = 15                                                           │
│     const seriesTotal = 15                                                  │
│                                                                              │
│     (Series tasks MUST run sequentially - no speedup possible)              │
│                                                                              │
│ 27. SELECTION: Check if parallel tasks exist                                │
│     parallelBlocks.length > 0  ✓ (length = 2)                              │
│                                                                              │
│ 28. Find longest parallel task with Math.max():                             │
│     Math.max(...parallelBlocks)                                             │
│     Math.max(8, 12)                                                         │
│     → 12                                                                    │
│                                                                              │
│     (Parallel tasks run SIMULTANEOUSLY - use max time, not sum)             │
│                                                                              │
│     const parallelMax = 12                                                  │
│                                                                              │
│ 29. Calculate total parallel time:                                          │
│     parallelTime = seriesTotal + parallelMax                                │
│     parallelTime = 15 + 12                                                  │
│     parallelTime = 27                                                       │
│                                                                              │
│  State: serialTime = 35                                                     │
│         parallelTime = 27                                                    │
│                                                                              │
│  Breakdown:                                                                  │
│  ┌─────────────────────┐                                                    │
│  │ Serial Execution:   │  5 + 10 + 8 + 12 = 35 units                        │
│  └─────────────────────┘                                                    │
│                                                                              │
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
