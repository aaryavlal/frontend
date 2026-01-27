---
title: "Hardware Havoc - N@tM Preparation Plan"
permalink: /NATM_PLAN
layout: post
---

<style>
  .task-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #00ffaa;
  }
  .task-checkbox:checked + .task-label {
    text-decoration: line-through;
    opacity: 0.6;
  }
  td:has(.task-checkbox) {
    text-align: center;
  }
  .progress-bar {
    background: rgba(0,255,170,0.2);
    border: 1px solid #00ffaa;
    border-radius: 4px;
    height: 24px;
    margin: 10px 0;
    overflow: hidden;
  }
  .progress-fill {
    background: linear-gradient(90deg, #00ffaa, #00d4ff);
    height: 100%;
    transition: width 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0e14;
    font-weight: bold;
    font-size: 0.85rem;
  }
</style>

<div class="progress-bar">
  <div class="progress-fill" id="progressFill" style="width: 0%">0%</div>
</div>

# Hardware Havoc - N@tM Preparation Plan

**Name/Team:** Rudra J, Aaryav L, Lucas M, Tanay P, Dhyan S/Hardware Havoc Team
**Skills:** A, B, C
**Purpose:** Checkpoint → Summative
**Timeline:** 10 School Days Before N@tM

---

## Project Overview

**Hardware Havoc** is a Parallel Computing Education Platform that teaches CPU concepts through gamified multiplayer collaboration.

---

### THE SUPERPOWER: Room Code Multiplayer System

> **"Learn together, light up the CPU together"**

Our standout feature is the **collaborative room system**:
1. **Create/Join Rooms** - Teachers create rooms, students join with a 6-character code (e.g., `ABC123`)
2. **Synchronized Progress** - Everyone in the room sees each other's module completion in real-time
3. **Collective Achievement** - A CPU core only lights up when **ALL members** complete that module
4. **Visual Reward** - Watch the CPU visualization glow as your team progresses together

This mirrors real parallel computing: just like CPU cores must synchronize, students must all complete a module before the "core" activates. **The metaphor IS the lesson.**

---

### Core Features:
- **Room Code Multiplayer** - Join collaborative rooms with 6-character codes (THE SUPERPOWER)
- **6 CPU Modules** - Learning modules that "light up" CPU cores when completed
- **Progress Tracking** - Individual + room-wide completion tracking
- **Glossary System** - Shared term definitions within rooms
- **AI Quiz Grading** - Gemini AI grades free-response answers about parallel computing
- **Speedup Calculator** - Calculate parallel speedup (Amdahl's Law)

### Tech Stack:
- **Backend:** Flask + SQLite + JWT Auth + Gemini AI
- **Frontend:** Jekyll GitHub Pages
- **Key Files:**
  - Frontend: `frontend/hacks/frontend.md`
  - Backend Quest API: `backend/Quest/routes/`

---

## 10-Day Calendar Plan

### Day 1 - Foundation & Task Selection

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Identify YOUR individual task from the features below | Skill A | ☐ |
| 2 | Review Quest API routes in `backend/Quest/routes/` | Skill B | ☐ |
| 3 | Map your task to specific frontend + backend code | Skill B | ☐ |
| 4 | Draft 1-minute video script outline | Skill A | ☐ |
| 5 | Team sync: assign presentation roles | Skill C | ☐ |

---

### Day 2 - Code Deep Dive

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Document your task's INPUT (form, button, Postman) | Skill B | ☐ |
| 2 | Document your task's OUTPUT (API response, UI update) | Skill B | ☐ |
| 3 | Identify the PROCEDURE (backend function) | Skill B | ☐ |
| 4 | Trace data flow: Frontend fetch → API → Database → Response | Skill B | ☐ |
| 5 | **CHECKPOINT:** Show instructor your task selection | Checkpoint | ☐ |

---

### Day 3 - Create PT Written Response Draft

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Write PPR 3a: Describe your procedure | Skill B | ☐ |
| 2 | Write PPR 3b: Describe sequencing/selection/iteration | Skill B | ☐ |
| 3 | Write PPR 3c: Describe your list/collection usage | Skill B | ☐ |
| 4 | Screenshot your code segments (input, output, procedure) | Skill B | ☐ |
| 5 | Annotate code with comments explaining logic | Skill B | ☐ |

---

### Day 4 - Video Recording Prep

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Finalize 1-minute video script | Skill A | ☐ |
| 2 | Set up screen recording software | Skill A | ☐ |
| 3 | Practice demo walkthrough (input → process → output) | Skill A | ☐ |
| 4 | Prepare localhost environment for recording | Skill A | ☐ |
| 5 | **CHECKPOINT:** Review video script with peer | Checkpoint | ☐ |

---

### Day 5 - Video Recording & Iteration

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Record first draft of 1-minute video | Skill A | ☐ |
| 2 | Review timing (must be under 60 seconds) | Skill A | ☐ |
| 3 | Re-record if needed | Skill A | ☐ |
| 4 | Export video in required format | Skill A | ☐ |
| 5 | **CHECKPOINT:** Submit video draft for feedback | Checkpoint | ☐ |

---

### Day 6 - Team Presentation Planning

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Team: Draft 1-minute primary overview script | Skill C | ☐ |
| 2 | Lead with the SUPERPOWER: "Join a room, learn together, light up the CPU together" | Skill C | ☐ |
| 3 | Demo flow: Create Room → Share Code → Multiple users join → Complete module → Core lights up for ALL | Skill C | ☐ |
| 4 | Assign individual 1-minute presentations | Skill C | ☐ |
| 5 | Prepare deployment diagram (Frontend → Backend → SQLite) | Skill C | ☐ |

---

### Day 7 - Individual N@tM Presentation Prep

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Prepare YOUR individual presentation (choose focus below) | Skill C | ☐ |
| 2 | Option A: UI Walkthrough - Room join, module completion, CPU glow effect | Skill C | ☐ |
| 3 | Option B: API demo via Postman - Auth, progress, rooms endpoints | Skill C | ☐ |
| 4 | Option C: Debugging session showing fetch → Flask → SQLite | Skill C | ☐ |
| 5 | **CHECKPOINT:** Practice presentation with teammate | Checkpoint | ☐ |

---

### Day 8 - Transactional & Bulk Data Demos

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Prepare CRUD demo: Create room, Join room, Complete module, Leave room | Skill C | ☐ |
| 2 | Show database changes via SQLite viewer (Quest/database.db) | Skill C | ☐ |
| 3 | Prepare room reset demo (reset progress mid-game) | Skill C | ☐ |
| 4 | Demo destroy & restart on localhost | Skill C | ☐ |
| 5 | Document your "happy moments" / eureka events | Skill C | ☐ |

---

### Day 9 - Final Polish & Integration

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Finalize Create PT video (final edit) | Skill A | ☐ |
| 2 | Finalize PPR written responses | Skill B | ☐ |
| 3 | Team run-through of full presentation | Skill C | ☐ |
| 4 | Test all demos work on presentation device | Skill C | ☐ |
| 5 | **CHECKPOINT:** Full presentation dry run | Checkpoint | ☐ |

---

### Day 10 - Pre-N@tM Final Prep

| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Submit Create PT (Video + Code + PPR) | Skill A/B | ☐ |
| 2 | Final team presentation practice | Skill C | ☐ |
| 3 | Prepare backup demo (screenshots if live fails) | Skill C | ☐ |
| 4 | Feature/Issue lifecycle documentation complete | Skill C | ☐ |
| 5 | **READY FOR N@tM** | Summative | ☐ |

---

## Skill A/B - Individual Task Options (Pick ONE Core)

Each team member should pick a different core for their Create PT:

---

### CORE 1: Computing Models — GPU Assembly Simulator
**Topic:** Sequential vs Parallel vs Distributed computing models
- **Frontend:** `frontend/cores/core-1.md` + `frontend/gpu-assembly-simulator`
- **Feature:** GPU Assembly Simulator that visualizes 3 computing models
- **Input:** User selects computing model (sequential/parallel/distributed)
- **Output:** Visual simulation showing execution differences
- **List Used:** Array of assembly instructions being processed
- **Procedure:** Simulation loop with timing calculations per model
- **Demo:** Show same task running 3 different ways, compare speeds

---

### CORE 2: Why Parallel/Distributed? — Mandelbrot Fractal
**Topic:** Concurrency vs Parallelism visualization
- **Frontend:** `frontend/cores/core-2.md` + `assets/js/mandelbrot.js`
- **Feature:** Mandelbrot fractal generator comparing sequential vs parallel rendering
- **Input:** User sets resolution, zoom level, number of workers
- **Output:** Fractal image with timing comparison
- **List Used:** Pixel data array divided among workers
- **Procedure:** Worker thread distribution, chunk processing, image assembly
- **Demo:** Render fractal with 1 worker vs 4 workers, show speedup

---

### CORE 3: AI Digit Recognizer — Deep Learning
**Topic:** Sequential CNN inference pipeline
- **Frontend:** `frontend/cores/core-3.md` + `assets/digitrecog-standalone.html`
- **Backend:** `backend/api/digit_api.py`
- **Feature:** Draw a digit, AI recognizes it using trained CNN (sequential layers)
- **Input:** User draws digit on canvas (0-9)
- **Output:** Predicted digit with confidence scores
- **List Used:** Pixel array (28x28), layer weights, confidence scores array
- **Procedure:** Canvas capture → preprocessing → sequential layer-by-layer inference → prediction
- **Demo:** Draw digits, show prediction confidence, trace data through CNN layers

---

### CORE 4: Execution Time Calculations — Speedup Calculator
**Topic:** Amdahl's Law and parallel speedup math
- **Frontend:** `frontend/cores/core-4.md`
- **Backend:** `backend/Quest/routes/speedup.py`
- **Feature:** Interactive calculator for sequential vs parallel execution time
- **Input:** Sequential time, parallel fraction, number of processors
- **Output:** Calculated speedup, efficiency, visual graph
- **List Used:** Array of calculation results for different processor counts
- **Procedure:** Amdahl's Law formula: `Speedup = 1 / (S + P/N)`
- **Demo:** Show diminishing returns as you add more processors

---

### CORE 5: Hardware Performance — Interactive Learning Game
**Topic:** Understanding hardware bottlenecks and optimization
- **Frontend:** `frontend/cores/core-5.md`
- **Feature:** Interactive scenarios teaching hardware performance concepts
- **Input:** User makes choices about hardware configurations
- **Output:** Performance metrics, feedback on choices
- **List Used:** Scenario options list, performance metrics history
- **Procedure:** Decision tree evaluation, score calculation
- **Demo:** Walk through a scenario, show how choices affect performance

---

### CORE 6: Case Studies — Infrastructure Builder Game
**Topic:** Applying parallel concepts to real-world systems
- **Frontend:** `frontend/cores/core-6.md`
- **Feature:** Build computing infrastructure for different scenarios
- **Input:** User selects components (CPUs, memory, network)
- **Output:** System performance score, cost analysis
- **List Used:** Component inventory, build configuration list
- **Procedure:** Cost/performance optimization algorithm
- **Demo:** Build infrastructure for a web server vs ML training workload

---

### BONUS: Room System (THE SUPERPOWER)
**Topic:** Multiplayer collaborative learning
- **Frontend:** `frontend/hacks/frontend.md` - `joinRoom()`, `createRoom()`
- **Backend:** `backend/Quest/routes/rooms.py`, `progress.py`
- **Feature:** 6-character room codes for collaborative learning
- **Input:** Room code (e.g., `ABC123`)
- **Output:** Synced progress across all room members, CPU cores light up together
- **List Used:** `room_members` table, `completed_modules` per user
- **Procedure:** `Room.add_member()`, `Room.check_and_update_room_progress()`
- **Demo:** Two users join same room, both complete module, core lights up for both

---

## Skill B - Code Documentation Template

Use this format for your Create PT write-up:

**My Task:** [TASK NAME]

**Input**
- File: [frontend file]
- Code: Show the fetch call or form submission

**Output**
- File: [API response handling]
- Code: Show what happens with the response

**Procedure (Backend)**
- File: `backend/Quest/routes/[file].py`
- Function: [function_name]
- Contains:
  - Sequencing: [describe order of operations]
  - Selection: [describe if/else logic]
  - Iteration: [describe any loops]

**List/Collection**
- Data Structure: [SQLite table or Python list]
- How it's used: [describe read/write operations]

---

## Skill C - N@tM Presentation Outline

### Primary Team Overview (1 min)

**LEAD WITH THE SUPERPOWER:**

- [ ] **Hook:** "What if learning felt like a multiplayer game?"
- [ ] **The Superpower:** "Hardware Havoc uses room codes to connect learners. Join with a 6-character code, complete modules together, and watch CPU cores light up - but ONLY when everyone finishes."
- [ ] **Why it matters:** "This mirrors real parallel computing - cores must synchronize. The multiplayer mechanic IS the lesson."
- [ ] **Demo:** Show 2+ users in same room → one completes module → core stays dark → other completes → CORE LIGHTS UP

### Your Individual Presentation (1 min)
Choose 2-3:
- [ ] **Superpower Deep Dive:** Show room code generation, how multiple users sync, the "waiting for others" state
- [ ] **UI Walkthrough:** Show the room join flow → enter code → see other members → complete together
- [ ] **API Demo:** Use Postman to show `/api/rooms/join`, `/api/rooms/<id>/progress`, `/api/progress/complete`
- [ ] **Database:** Open SQLite viewer, show `room_members` table linking users to rooms
- [ ] **Code Walkthrough:** Show `joinRoom()` → `apiCall()` → `Room.add_member()` → member sync
- [ ] **Debugging:** Network tab showing room progress polling, Flask logs showing member updates
- [ ] **Happy Moment:** The first time multiple users saw the same core light up simultaneously

---

## Key Files Quick Reference

### Frontend
```
frontend/hacks/frontend.md          # Main Hardware Havoc UI (all JS + HTML)
  - Line ~1935: createRoom()
  - Line ~1951: joinRoom()
  - Line ~2081: completeModule()
  - Line ~2114: loadRoomProgress()
  - Line ~2361: loadGlossary()
```

### Backend Quest API
```
backend/Quest/routes/
  auth.py       # /api/auth - Register, login, JWT
  rooms.py      # /api/rooms - Create, join, leave rooms
  progress.py   # /api/progress - Complete modules, track progress
  glossary.py   # /api/glossary - CRUD glossary terms
  speedup.py    # /api/speedup - Amdahl's law calculator

backend/main.py
  - Line ~244: grade_quiz() - AI grading with Gemini
  - Line ~196: summarize_attempts() - List + procedure example
```

### TensorFlow / CNN (Core 3)
```
backend/api/digit_api.py            # Digit recognition API
  - TensorFlow + Keras CNN model
  - Line ~26: model loading (best_model.keras)
  - Line ~48: find_connected_components() - digit segmentation
  - Endpoint: /api/digit - POST with base64 image
  - Input: 28x28 pixel array
  - Output: predicted digit + confidence scores
```

### Database
```
backend/Quest/database.db           # SQLite database
backend/Quest/models/
  user.py       # User model + completed_modules
  room.py       # Room model + room_members
```

---

## Checkpoint Schedule

| Checkpoint | Day | What to Show |
|------------|-----|--------------|
| 1 | Day 2 | Task selection + code file mapping |
| 2 | Day 4 | Video script review |
| 3 | Day 5 | Video draft |
| 4 | Day 7 | Presentation practice |
| 5 | Day 9 | Full dry run |

---

## Remember

> "Computer Science is best done through iteration; you will never be done with these items."

> "I am already late for my next checkpoint."

**Checkpoint multiple times = Engineer mindset**

---

## Quick Start Commands

```bash
# Start backend
cd backend
python main.py

# Frontend is served via Jekyll/GitHub Pages
# Access at localhost or deployed URL

# Test API with curl
curl -X POST http://localhost:8405/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

<script>
document.addEventListener('DOMContentLoaded', function() {
  const STORAGE_KEY = 'natm_plan_checkboxes';

  // Load saved state
  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  // Save state
  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Update progress bar
  function updateProgress() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.task-checkbox:checked').length;
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

    const fill = document.getElementById('progressFill');
    if (fill) {
      fill.style.width = percent + '%';
      fill.textContent = checked + '/' + total + ' (' + percent + '%)';
    }
  }

  // Find all table cells with ☐ and replace with checkboxes
  const state = loadState();
  let checkboxId = 0;

  document.querySelectorAll('td').forEach(function(td) {
    if (td.textContent.trim() === '☐') {
      const id = 'task-' + checkboxId++;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.id = id;
      checkbox.checked = state[id] || false;

      checkbox.addEventListener('change', function() {
        const currentState = loadState();
        currentState[this.id] = this.checked;
        saveState(currentState);
        updateProgress();
      });

      td.textContent = '';
      td.appendChild(checkbox);
    }
  });

  updateProgress();
});
</script>
