---
title: "Core 1 - Day 2 Code Deep Dive"
permalink: /core1/day2
layout: post
---

# Core 1: GPU Assembly Simulator — Day 2 Complete

**Task:** Document INPUT, OUTPUT, PROCEDURE, and Data Flow for Create PT

---

## Task 1: INPUT Documentation ✓

### Frontend Input Code

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1551-1608

```javascript
function assignTask(workstationId, robotId, taskType) {
  /**
   * INPUT: User clicks task button (PCB, Cores, or Memory)
   * This function processes the input and assigns work to a robot
   */

  if (!gameRunning) return;

  // INPUT: Get the target workstation and robot
  const station = workstations[workstationId - 1];
  const robot = station.robots.find(r => r.id === robotId);

  // INPUT: Find the next order that needs this task
  const order = orders.find(o => {
    // SELECTION: Skip if task already done
    if (o.steps[taskType]) return false;

    // SELECTION: Check prerequisites
    // Cores requires PCB first
    if (taskType === 'cores' && !o.steps.pcb) {
      showToast('⚠️ Build PCB first!', 'warning');
      return false;
    }

    // Memory requires Cores first
    if (taskType === 'memory' && !o.steps.cores) {
      showToast('⚠️ Install cores first!', 'warning');
      return false;
    }

    return true;
  });

  // INPUT VALIDATION: Check if order exists and robot is available
  if (!order) {
    showToast('⚠️ No orders need this task', 'warning');
    return;
  }

  if (robot.busy) {
    showToast(`⚠️ Robot ${robot.id} is busy`, 'warning');
    return;
  }

  // INPUT ACCEPTED: Assign the task
  robot.busy = true;
  robot.currentTask = taskType;
  robot.orderId = order.id;
  robot.progress = 0;

  const taskNames = { pcb: 'PCB', cores: 'Cores', memory: 'Memory' };
  showToast(`🤖 Robot ${robot.id} building ${taskNames[taskType]}`, 'info');
}

function assignTest(workstationId) {
  /**
   * INPUT: User clicks Test button
   * Assigns testing task to the testing station
   */

  if (!gameRunning) return;

  const station = workstations[workstationId - 1];

  // INPUT: Find order ready for testing
  const order = orders.find(o => 
    !o.steps.test && 
    o.steps.pcb && 
    o.steps.cores && 
    o.steps.memory
  );

  // INPUT VALIDATION: Check conditions
  if (!order) {
    showToast('⚠️ No orders ready for testing', 'warning');
    return;
  }

  if (station.tester.busy) {
    showToast('⚠️ Tester is busy', 'warning');
    return;
  }

  // INPUT ACCEPTED: Assign testing
  station.tester.busy = true;
  station.tester.orderId = order.id;
  station.tester.progress = 0;

  showToast('🔬 Testing started', 'info');
}
```

### Input Breakdown

| Component | Description | Code Location |
|-----------|-------------|---------------|
| **Stage Selection** | User selects Sequential/Parallel/Distributed mode | `selectStage(stageNum)` |
| **Start Button** | Begins game, initializes timer and spawns orders | `startGame()` - Line 1391 |
| **Task Buttons** | PCB, Cores, Memory assignment to robots | `assignTask()` - Line 1551 |
| **Test Button** | Assigns testing operation | `assignTest()` - Line 1609 |
| **New Order Button** | Manually adds order to queue | `addOrder()` - Line 1537 |
| **Auto-Fill Toggle** | Enables/disables automatic task assignment | `toggleAutoFill()` - Line 2000 |

### Input Data Structures

```javascript
// Global state (Lines 1200-1320)
let currentStage = 1;           // Which computing model (1=Sequential, 2=Parallel, 3=Distributed)
let gameRunning = false;        // Game state flag
let orders = [];                // LIST of GPU orders
let completedGPUs = 0;          // Counter
let timeElapsed = 0;            // Timer in seconds

// Workstations array structure (LIST)
let workstations = [
  {
    id: 1,
    robots: [                   // LIST of robots
      { id: 1, busy: false, currentTask: null, progress: 0, orderId: null },
      { id: 2, busy: false, currentTask: null, progress: 0, orderId: null },
      { id: 3, busy: false, currentTask: null, progress: 0, orderId: null }
    ],
    tester: { busy: false, progress: 0, orderId: null }
  }
];

// Order object structure
let order = {
  id: 1,
  startTime: Date.now(),
  steps: {
    pcb: false,      // Assembly step 1
    cores: false,    // Assembly step 2
    memory: false,   // Assembly step 3
    test: false      // Final testing
  }
};
```

### User Interaction Flow

1. **Stage Selection:** Click "Stage 1", "Stage 2", or "Stage 3" button
2. **Start Game:** Click "🚀 Start Game" → calls `startGame()`
3. **Task Assignment:** Click "PCB", "Cores", or "Memory" → calls `assignTask(workstationId, robotId, taskType)`
4. **Testing:** Click "🔬 Test" → calls `assignTest(workstationId)`
5. **Add Order:** Click "➕ New Order" → calls `addOrder()`

### Input Validation Rules

| Input | Validation Rule | Error Message |
|-------|----------------|---------------|
| Task Assignment | Game must be running | (Silent return) |
| Task Assignment | Robot must not be busy | "Robot X is busy" |
| Task Assignment | Order must exist needing task | "No orders need this task" |
| PCB Task | None (always allowed) | - |
| Cores Task | PCB must be complete first | "Build PCB first!" |
| Memory Task | Cores must be complete first | "Install cores first!" |
| Test Task | PCB + Cores + Memory complete | "No orders ready for testing" |
| Test Task | Tester must not be busy | "Tester is busy" |

---

## Task 2: OUTPUT Documentation ✓

### Frontend Output Code

**Visual Updates** — Lines 1733-1830 (updateGameLoop function)

```javascript
function updateGameLoop() {
  if (!gameRunning) return;

  const currentTime = Date.now();
  const deltaTime = (currentTime - lastUpdateTime) / 1000;
  lastUpdateTime = currentTime;

  timeElapsed += deltaTime;

  // OUTPUT: Update timer display
  document.getElementById('timer').textContent = `${timeElapsed.toFixed(1)}s`;

  // ITERATION: Process each workstation
  for (let i = 0; i < workstations.length; i++) {
    const station = workstations[i];

    // ITERATION: Process each robot
    for (let j = 0; j < station.robots.length; j++) {
      const robot = station.robots[j];

      if (robot.busy) {
        robot.progress += deltaTime * 20; // 20% per second = 5 seconds per task

        // OUTPUT: Update progress bar
        const progressBar = document.querySelector(
          `#workstation-${station.id} .robot-${robot.id} .progress-fill`
        );
        if (progressBar) {
          progressBar.style.width = `${Math.min(robot.progress, 100)}%`;
        }

        // SELECTION: Check task completion
        if (robot.progress >= 100) {
          const order = orders.find(o => o.id === robot.orderId);
          if (order) {
            order.steps[robot.currentTask] = true;

            // OUTPUT: Update order status display
            updateOrdersDisplay();

            // OUTPUT: Show completion toast
            const taskNames = { pcb: 'PCB', cores: 'Cores', memory: 'Memory' };
            showToast(`✅ ${taskNames[robot.currentTask]} complete!`, 'success');
          }

          // Reset robot
          robot.busy = false;
          robot.currentTask = null;
          robot.progress = 0;
        }
      }
    }

    // Process tester
    if (station.tester.busy) {
      station.tester.progress += deltaTime * 15; // 15% per second = ~6.7 seconds

      // OUTPUT: Update tester progress bar
      const testerBar = document.querySelector(
        `#workstation-${station.id} .tester .progress-fill`
      );
      if (testerBar) {
        testerBar.style.width = `${Math.min(station.tester.progress, 100)}%`;
      }

      // SELECTION: Check test completion
      if (station.tester.progress >= 100) {
        const order = orders.find(o => o.id === station.tester.orderId);
        if (order) {
          order.steps.test = true;
          completedGPUs++;

          // Track timing
          const buildTime = (Date.now() - order.startTime) / 1000;
          if (buildTime < fastestGPU) {
            fastestGPU = buildTime;
          }

          // OUTPUT: Update statistics display
          document.getElementById('gpus-completed').textContent = completedGPUs;
          const avgTime = timeElapsed / completedGPUs;
          document.getElementById('avg-time').textContent = `${avgTime.toFixed(1)}s`;

          // Remove completed order from LIST
          const orderIndex = orders.findIndex(o => o.id === order.id);
          if (orderIndex !== -1) {
            orders.splice(orderIndex, 1);
          }

          updateOrdersDisplay();

          // OUTPUT: Show completion notification
          showToast(`🎉 GPU #${completedGPUs} complete!`, 'success');

          // SELECTION: Check win condition
          if (completedGPUs >= 5) {
            endGame();
          }
        }

        station.tester.busy = false;
        station.tester.progress = 0;
      }
    }
  }
}
```

### Backend Output Code

**File:** `backend/api/compute.py` (referenced, not shown in simulator file)

```python
# OUTPUT: Backend receives game session data
@app.route('/api/game-logs/gpu-simulator', methods=['POST'])
def log_gpu_game():
    try:
        data = request.get_json()

        # Extract data from request
        session_id = data.get('sessionId')
        stage = data.get('stage')
        gpus_completed = data.get('gpusCompleted')
        time_elapsed = data.get('timeElapsed')
        avg_time = data.get('avgTime')
        throughput = data.get('throughput')
        achievements = data.get('achievements', [])
        fastest_gpu = data.get('fastestGPU')

        # Store in database (implementation varies)
        log_entry = {
            'session_id': session_id,
            'timestamp': datetime.now(),
            'stage': stage,
            'gpus_completed': gpus_completed,
            'time_elapsed': time_elapsed,
            'avg_time': avg_time,
            'throughput': throughput,
            'achievements': achievements,
            'fastest_gpu': fastest_gpu
        }

        # Save to database
        db.session.add(log_entry)
        db.session.commit()

        # OUTPUT: Return success response
        return jsonify({
            'success': True,
            'message': 'Game data logged successfully',
            'log_id': log_entry.id
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
```

### Output JSON Structure (Backend Logging)

```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "stage": 1,
  "gpusCompleted": 5,
  "timeElapsed": 52.3,
  "avgTime": 10.46,
  "throughput": 5.74,
  "achievements": ["speed_demon", "first_gpu", "perfectionist"],
  "fastestGPU": 8.2
}
```

### Output Breakdown

| Field | Type | Description | Calculation |
|-------|------|-------------|-------------|
| `sessionId` | UUID | Unique game session identifier | Generated at game start |
| `stage` | int | Computing model (1/2/3) | Selected by user |
| `gpusCompleted` | int | Number of GPUs built | Incremented on test completion |
| `timeElapsed` | float | Total time in seconds | Cumulative timer |
| `avgTime` | float | Average time per GPU | `timeElapsed / gpusCompleted` |
| `throughput` | float | GPUs per minute | `(gpusCompleted / timeElapsed) * 60` |
| `achievements` | **LIST** | Array of unlocked achievement IDs | Filter `achievements.filter(a => a.unlocked)` |
| `fastestGPU` | float | Fastest single GPU build time | Track minimum time per order |

### Visual Output Elements

| UI Element | Update Trigger | Display Value |
|------------|----------------|---------------|
| **Timer** | Every frame | `${timeElapsed.toFixed(1)}s` |
| **GPUs Completed** | Test completion | `${completedGPUs}` |
| **Average Time** | Test completion | `${avgTime.toFixed(1)}s` |
| **Robot Progress Bars** | Every frame | Width = `${robot.progress}%` |
| **Tester Progress Bars** | Every frame | Width = `${tester.progress}%` |
| **Orders Queue** | Order add/remove | List of order cards with checkmarks |
| **Achievement Popup** | Achievement unlock | Modal with achievement name/icon |
| **Toast Notifications** | Various events | Temporary notification card |
| **End Game Modal** | 5 GPUs complete | Results summary with statistics |

### Frontend Output Display Functions

```javascript
// OUTPUT: Update orders queue panel
function updateOrdersDisplay() {
  const container = document.querySelector('.orders-queue');
  container.innerHTML = '';

  // ITERATION: Display each order in the LIST
  orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
      <div class="order-id">Order #${order.id}</div>
      <div class="order-steps">
        <span class="${order.steps.pcb ? 'done' : ''}">PCB</span>
        <span class="${order.steps.cores ? 'done' : ''}">Cores</span>
        <span class="${order.steps.memory ? 'done' : ''}">Memory</span>
        <span class="${order.steps.test ? 'done' : ''}">Test</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// OUTPUT: Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// OUTPUT: Display end game results
function endGame() {
  gameRunning = false;

  const avgTime = timeElapsed / completedGPUs;
  const throughput = (completedGPUs / timeElapsed) * 60;

  // Show results modal
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-emoji">🏆</div>
      <h2>Stage ${currentStage} Complete!</h2>
      <div class="results-box">
        <div class="result-row">
          <span>GPUs Built:</span>
          <span>${completedGPUs}</span>
        </div>
        <div class="result-row">
          <span>Total Time:</span>
          <span>${timeElapsed.toFixed(2)}s</span>
        </div>
        <div class="result-row">
          <span>Avg Time:</span>
          <span>${avgTime.toFixed(2)}s</span>
        </div>
        <div class="result-row">
          <span>Throughput:</span>
          <span>${throughput.toFixed(2)} GPUs/min</span>
        </div>
        <div class="result-row">
          <span>Fastest GPU:</span>
          <span>${fastestGPU.toFixed(2)}s</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // OUTPUT: Log to backend
  logGameData();
}
```

---

## Task 3: PROCEDURE Identification ✓

### Main Procedure: `updateGameLoop()`

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1733-1830

```javascript
function updateGameLoop() {
  /**
   * PROCEDURE: Main game loop that processes all tasks
   *
   * Contains:
   * - SEQUENCING: Steps execute in order (check game state → update timer → process stations → check win)
   * - SELECTION: if/else for busy robots, task completion, win condition
   * - ITERATION: for loops through workstations LIST, robots LIST
   * - LIST: workstations array, robots array, orders array
   */

  // SEQUENCING STEP 1: Guard clause - exit if game not running
  if (!gameRunning) return;

  // SEQUENCING STEP 2: Calculate delta time
  const currentTime = Date.now();
  const deltaTime = (currentTime - lastUpdateTime) / 1000;
  lastUpdateTime = currentTime;

  // SEQUENCING STEP 3: Update global timer
  timeElapsed += deltaTime;
  document.getElementById('timer').textContent = `${timeElapsed.toFixed(1)}s`;

  // SEQUENCING STEP 4: ITERATION through workstations LIST
  for (let i = 0; i < workstations.length; i++) {
    const station = workstations[i];

    // ITERATION: Process each robot in station.robots LIST
    for (let j = 0; j < station.robots.length; j++) {
      const robot = station.robots[j];

      // SELECTION: Only process busy robots
      if (robot.busy) {
        // SEQUENCING: Update progress
        robot.progress += deltaTime * 20;

        // Update visual progress bar
        const progressBar = document.querySelector(
          `#workstation-${station.id} .robot-${robot.id} .progress-fill`
        );
        if (progressBar) {
          progressBar.style.width = `${Math.min(robot.progress, 100)}%`;
        }

        // SELECTION: Check if task is complete
        if (robot.progress >= 100) {
          // Find the order in orders LIST
          const order = orders.find(o => o.id === robot.orderId);

          if (order) {
            // SEQUENCING: Mark step complete
            order.steps[robot.currentTask] = true;

            // Update UI
            updateOrdersDisplay();

            // Show notification
            const taskNames = { pcb: 'PCB', cores: 'Cores', memory: 'Memory' };
            showToast(`✅ ${taskNames[robot.currentTask]} complete!`, 'success');
          }

          // SEQUENCING: Reset robot state
          robot.busy = false;
          robot.currentTask = null;
          robot.progress = 0;
        }
      }
    }

    // SELECTION: Process tester if busy
    if (station.tester.busy) {
      // SEQUENCING: Update test progress
      station.tester.progress += deltaTime * 15;

      // Update visual progress bar
      const testerBar = document.querySelector(
        `#workstation-${station.id} .tester .progress-fill`
      );
      if (testerBar) {
        testerBar.style.width = `${Math.min(station.tester.progress, 100)}%`;
      }

      // SELECTION: Check if test is complete
      if (station.tester.progress >= 100) {
        const order = orders.find(o => o.id === station.tester.orderId);

        if (order) {
          // SEQUENCING: Mark test complete
          order.steps.test = true;
          completedGPUs++;

          // Track timing
          const buildTime = (Date.now() - order.startTime) / 1000;
          if (buildTime < fastestGPU) {
            fastestGPU = buildTime;
          }

          // Update statistics
          document.getElementById('gpus-completed').textContent = completedGPUs;
          const avgTime = timeElapsed / completedGPUs;
          document.getElementById('avg-time').textContent = `${avgTime.toFixed(1)}s`;

          // LIST MANIPULATION: Remove completed order from orders LIST
          const orderIndex = orders.findIndex(o => o.id === order.id);
          if (orderIndex !== -1) {
            orders.splice(orderIndex, 1);
          }

          updateOrdersDisplay();
          showToast(`🎉 GPU #${completedGPUs} complete!`, 'success');

          // SELECTION: Check win condition
          if (completedGPUs >= 5) {
            endGame(); // End game when 5 GPUs complete
          }
        }

        // SEQUENCING: Reset tester state
        station.tester.busy = false;
        station.tester.progress = 0;
      }
    }
  }

  // SEQUENCING STEP 5: Schedule next frame
  requestAnimationFrame(updateGameLoop);
}
```

### Supporting Procedure: Auto-Fill Algorithm

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 2046-2071

```javascript
function processAutoFillTasks() {
  /**
   * PROCEDURE: Automatic task assignment algorithm
   * Demonstrates ITERATION + SELECTION for task prioritization
   */

  const station = workstations[0]; // Stage 1 & 2 only have one station

  // PRIORITY 1: Try to assign test tasks first (highest priority)
  // SELECTION: Only if tester not busy
  if (!station.tester.busy) {
    // ITERATION: Search through orders LIST
    for (let order of orders) {
      // SELECTION: Check if order is ready for testing
      if (!order.steps.test && order.steps.pcb && order.steps.cores && order.steps.memory) {
        assignTest(1);
        return; // Process one assignment at a time
      }
    }
  }

  // PRIORITY 2: Try to assign assembly tasks to idle robots
  const tasks = ['pcb', 'cores', 'memory']; // Task sequence

  // ITERATION: Check each robot in station.robots LIST
  for (let robot of station.robots) {
    // SELECTION: Skip busy robots
    if (robot.busy) continue;

    // ITERATION: Find next task that needs to be done
    for (let order of orders) {
      // ITERATION: Check each task type
      for (let task of tasks) {
        // SELECTION: Check if task not done yet
        if (!order.steps[task]) {
          // SELECTION: Check prerequisites are met
          const taskIndex = tasks.indexOf(task);

          // First task (PCB) has no prerequisites
          // Other tasks require previous task to be complete
          if (taskIndex === 0 || order.steps[tasks[taskIndex - 1]]) {
            assignTask(1, robot.id, task);
            return; // Process one assignment at a time
          }
        }
      }
    }
  }
}
```

### Procedure Summary Table

| Element | Location | Description |
|---------|----------|-------------|
| **SEQUENCING** | Lines 1733-1830 | 5 sequential steps: guard check → calc time → update timer → process stations → check win |
| **SELECTION** | Lines 1747, 1773, 1796, 1810 | `if (robot.busy)`, `if (robot.progress >= 100)`, `if (station.tester.busy)`, `if (completedGPUs >= 5)` |
| **ITERATION** | Lines 1744, 1748, 2054, 2061, 2066 | `for` loops through workstations, robots, orders, tasks |
| **LIST** | Lines 1200-1320 | `workstations[]`, `robots[]`, `orders[]`, `achievements[]` |

### All Key Procedures

| Function | Line | Purpose | Elements |
|----------|------|---------|----------|
| `initGame()` | 1325 | Initialize game state and workstations | LIST creation |
| `startGame()` | 1391 | Begin production, spawn orders | SEQUENCING |
| `assignTask()` | 1551 | Assign assembly task to robot | INPUT + SELECTION |
| `assignTest()` | 1609 | Assign testing operation | INPUT + SELECTION |
| `updateGameLoop()` | 1733 | Main game loop (CRITICAL) | All elements |
| `processAutoFillTasks()` | 2046 | Auto-assignment algorithm | ITERATION + SELECTION |
| `endGame()` | 1880 | Display results, log data | OUTPUT |
| `logGameData()` | 2073 | Send data to backend API | OUTPUT |

---

## Task 4: Data Flow Trace ✓

### Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER ACTION                                     │
│                                                                              │
│  User selects "Stage 1 - Sequential"                                        │
│  User clicks "🚀 Start Game" button                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         INITIALIZATION                                       │
│  Function: startGame() (Line 1391)                                          │
│                                                                              │
│  1. Set gameRunning = true                                                  │
│  2. Reset completedGPUs = 0, timeElapsed = 0                               │
│  3. Clear orders LIST: orders = []                                          │
│  4. Reset all robots and testers to idle state                             │
│  5. Start game loop: requestAnimationFrame(updateGameLoop)                 │
│  6. Start order spawning: setInterval(addOrder, 2000)                      │
│                                                                              │
│  State: gameRunning=true, orders=[], workstations initialized              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ORDER SPAWNING                                       │
│  Function: addOrder() (Line 1537)                                           │
│                                                                              │
│  7. Create new order object:                                                │
│     {                                                                        │
│       id: nextOrderId++,                                                    │
│       startTime: Date.now(),                                                │
│       steps: { pcb: false, cores: false, memory: false, test: false }      │
│     }                                                                        │
│  8. Push to orders LIST: orders.push(order)                                │
│  9. Update UI: updateOrdersDisplay()                                        │
│ 10. Show toast: "📦 New order #X arrived"                                  │
│                                                                              │
│  State: orders = [order1], displayed in queue panel                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER INPUT: TASK ASSIGNMENT                          │
│  Function: assignTask(1, 1, 'pcb') (Line 1551)                              │
│                                                                              │
│ 11. User clicks "PCB" button for Robot 1                                   │
│ 12. Get workstation: workstations[0]                                        │
│ 13. Get robot: station.robots.find(r => r.id === 1)                        │
│                                                                              │
│ 14. ITERATION: Find order needing PCB task                                  │
│     order = orders.find(o => !o.steps.pcb)                                 │
│                                                                              │
│ 15. SELECTION: Check prerequisites                                          │
│     - PCB task: no prerequisites (always allowed)                           │
│     - if (robot.busy) → show warning, return                               │
│                                                                              │
│ 16. INPUT ACCEPTED: Assign task                                             │
│     robot.busy = true                                                       │
│     robot.currentTask = 'pcb'                                               │
│     robot.orderId = order.id                                                │
│     robot.progress = 0                                                      │
│                                                                              │
│ 17. Show toast: "🤖 Robot 1 building PCB"                                  │
│                                                                              │
│  State: Robot 1 busy with PCB task for Order 1                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GAME LOOP: TASK PROCESSING                           │
│  Function: updateGameLoop() (Line 1733) - runs every frame (~60 FPS)       │
│                                                                              │
│ 18. Calculate deltaTime = (now - lastUpdate) / 1000                        │
│ 19. Update global timer: timeElapsed += deltaTime                          │
│ 20. Update timer display: "5.2s"                                            │
│                                                                              │
│ 21. ITERATION: for each workstation in workstations LIST                   │
│     22. ITERATION: for each robot in station.robots LIST                   │
│         23. SELECTION: if (robot.busy)                                      │
│             24. Update progress: robot.progress += deltaTime * 20           │
│             25. Update progress bar width: `${robot.progress}%`             │
│                                                                              │
│             26. SELECTION: if (robot.progress >= 100)                       │
│                 27. Find order: orders.find(o => o.id === robot.orderId)   │
│                 28. Mark step complete: order.steps.pcb = true             │
│                 29. Update orders display (show checkmark ✓)               │
│                 30. Show toast: "✅ PCB complete!"                          │
│                 31. Reset robot:                                            │
│                     robot.busy = false                                      │
│                     robot.currentTask = null                                │
│                     robot.progress = 0                                      │
│                                                                              │
│  State: Order 1 now has { pcb: true, cores: false, memory: false, test: false }
│  Robot 1 is idle and ready for next task                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBSEQUENT TASKS                                     │
│  User continues clicking: Cores → Memory                                    │
│                                                                              │
│ 32. User clicks "Cores" → assignTask(1, 1, 'cores')                        │
│ 33. SELECTION: Check prerequisite (o.steps.pcb === true) ✓                 │
│ 34. Assign and process (same as steps 16-31)                               │
│                                                                              │
│ 35. User clicks "Memory" → assignTask(1, 1, 'memory')                      │
│ 36. SELECTION: Check prerequisite (o.steps.cores === true) ✓               │
│ 37. Assign and process (same as steps 16-31)                               │
│                                                                              │
│  State: Order 1 now has { pcb: true, cores: true, memory: true, test: false }
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TESTING PHASE                                        │
│  Function: assignTest(1) (Line 1609)                                        │
│                                                                              │
│ 38. User clicks "🔬 Test" button                                            │
│ 39. ITERATION: Find order ready for testing                                 │
│     order = orders.find(o =>                                                │
│       !o.steps.test &&                                                      │
│       o.steps.pcb && o.steps.cores && o.steps.memory                       │
│     )                                                                        │
│                                                                              │
│ 40. SELECTION: Check tester availability                                    │
│     if (station.tester.busy) → show warning, return                        │
│                                                                              │
│ 41. Assign testing:                                                         │
│     station.tester.busy = true                                              │
│     station.tester.orderId = order.id                                       │
│     station.tester.progress = 0                                             │
│                                                                              │
│ 42. Show toast: "🔬 Testing started"                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GAME LOOP: TEST PROCESSING                           │
│  Function: updateGameLoop() - tester section (Line 1796)                   │
│                                                                              │
│ 43. SELECTION: if (station.tester.busy)                                     │
│     44. Update progress: tester.progress += deltaTime * 15                  │
│     45. Update tester progress bar width                                    │
│                                                                              │
│     46. SELECTION: if (tester.progress >= 100)                              │
│         47. Find order: orders.find(o => o.id === tester.orderId)          │
│         48. Mark test complete: order.steps.test = true                    │
│         49. Increment counter: completedGPUs++                              │
│                                                                              │
│         50. Calculate build time:                                           │
│             buildTime = (Date.now() - order.startTime) / 1000              │
│             if (buildTime < fastestGPU) fastestGPU = buildTime             │
│                                                                              │
│         51. Update statistics display:                                      │
│             - GPUs Completed: "1"                                           │
│             - Average Time: "12.4s"                                         │
│                                                                              │
│         52. LIST MANIPULATION: Remove from orders                           │
│             orderIndex = orders.findIndex(o => o.id === order.id)          │
│             orders.splice(orderIndex, 1)                                    │
│                                                                              │
│         53. Update orders display (remove card from UI)                     │
│         54. Show toast: "🎉 GPU #1 complete!"                              │
│                                                                              │
│         55. SELECTION: Check win condition                                  │
│             if (completedGPUs >= 5) endGame()                               │
│                                                                              │
│         56. Reset tester:                                                   │
│             station.tester.busy = false                                     │
│             station.tester.progress = 0                                     │
│                                                                              │
│  State: completedGPUs = 1, orders.length = 0 (or more if spawned)         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ (Repeat steps 32-56 for remaining 4 GPUs)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GAME COMPLETION                                      │
│  Function: endGame() (Line 1880)                                            │
│                                                                              │
│ 57. Set gameRunning = false                                                 │
│ 58. Stop game loop and order spawning                                       │
│                                                                              │
│ 59. Calculate final statistics:                                             │
│     avgTime = timeElapsed / completedGPUs                                   │
│     throughput = (completedGPUs / timeElapsed) * 60                         │
│                                                                              │
│ 60. Display results modal with:                                             │
│     - GPUs Built: 5                                                         │
│     - Total Time: 52.3s                                                     │
│     - Avg Time: 10.46s                                                      │
│     - Throughput: 5.74 GPUs/min                                             │
│     - Fastest GPU: 8.2s                                                     │
│                                                                              │
│ 61. Check achievements (ITERATION through achievements LIST)                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND LOGGING                                      │
│  Function: logGameData() (Line 2073)                                        │
│                                                                              │
│ 62. Prepare data object:                                                    │
│     {                                                                        │
│       sessionId: "550e8400-e29b-41d4-a716-446655440000",                   │
│       stage: 1,                                                             │
│       gpusCompleted: 5,                                                     │
│       timeElapsed: 52.3,                                                    │
│       avgTime: 10.46,                                                       │
│       throughput: 5.74,                                                     │
│       achievements: ["speed_demon", "first_gpu"],                           │
│       fastestGPU: 8.2                                                       │
│     }                                                                        │
│                                                                              │
│ 63. Send POST request:                                                      │
│     fetch(`${API_URL}/api/game-logs/gpu-simulator`, {                      │
│       method: 'POST',                                                       │
│       body: JSON.stringify(gameData)                                        │
│     })                                                                       │
│                                                                              │
│ 64. Backend receives and stores in database                                 │
│ 65. Backend returns success response                                        │
│ 66. Log confirmation: "✅ Game data logged successfully"                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Parallel vs Sequential Flow Comparison

| Step | Sequential (Stage 1) | Parallel (Stage 2) |
|------|---------------------|-------------------|
| **Task Assignment** | 1 robot, tasks in series | 3 robots, tasks simultaneous |
| **Orders Processing** | One at a time | Multiple orders in progress |
| **Bottleneck** | Everything | Shared tester (1 tester, 3 robots) |
| **Code Difference** | Same logic, 1 iteration | Same logic, 3 iterations |
| **Typical Time** | 50-60s for 5 GPUs | 25-35s for 5 GPUs |

### Distributed Flow (Stage 3)

In Stage 3, the system has:
- 3 independent workstations (instead of 1)
- 3 dedicated testers (no bottleneck)
- Auto-routing: orders assigned to least busy station

```javascript
// Distributed mode: Auto-route orders to best station
function addOrder() {
  // Find station with fewest active orders
  let bestStation = workstations[0];
  let minOrders = countActiveOrders(1);

  for (let i = 1; i < workstations.length; i++) {
    const count = countActiveOrders(i + 1);
    if (count < minOrders) {
      bestStation = workstations[i];
      minOrders = count;
    }
  }

  // Assign order to best station
  // ... create and assign order
}
```

**Result:** ~3x speedup (12-18s for 5 GPUs)

---

## Task 5: CHECKPOINT Ready ✓

### What to Show Instructor

1. **Task Selection:** Core 1 - GPU Assembly Simulator (Computing Models)

2. **Code Files:**
   - Main File: `frontend/hacks/gpu-assembly-simulator.md`
   - Backend: `backend/api/compute.py`
   - Backend Model: `backend/model/compute.py`

3. **Key Code Segments:**
   - INPUT: Lines 1551-1608 (assignTask, assignTest functions)
   - OUTPUT: Lines 1733-1830 (updateGameLoop function)
   - PROCEDURE: Lines 1733-1830 (main game loop - CRITICAL)
   - AUTO-FILL: Lines 2046-2071 (processAutoFillTasks)

4. **Create PT Elements Identified:**

| Requirement | Location | Evidence |
|-------------|----------|----------|
| INPUT | Lines 1551-1608 | `assignTask()`, `assignTest()` user interactions |
| OUTPUT | Lines 1733-1830 | Visual updates, statistics, backend logging |
| LIST | Lines 1200-1320 | `orders[]`, `workstations[]`, `robots[]`, `achievements[]` |
| PROCEDURE | Lines 1733-1830 | `updateGameLoop()` - main processing function |
| SEQUENCING | Lines 1733-1830 | 5 sequential steps in game loop |
| SELECTION | Lines 1747, 1773, 1810 | `if (robot.busy)`, `if (progress >= 100)`, `if (completedGPUs >= 5)` |
| ITERATION | Lines 1744, 1748 | `for` loops through workstations and robots LISTS |

5. **Live Demo Points:**
   - Show all 3 stages: Sequential → Parallel → Distributed
   - Point out bottleneck in Stage 2 (shared tester)
   - Demonstrate auto-fill algorithm
   - Show orders LIST being processed
   - Display end game statistics

6. **Computing Model Comparisons:**

| Model | Time | Speedup | Key Concept |
|-------|------|---------|-------------|
| Sequential | ~55s | 1.0x | One robot, all tasks in order |
| Parallel | ~30s | 1.8x | 3 robots, shared tester bottleneck |
| Distributed | ~15s | 3.3x | 3 independent factories, no bottleneck |

---

## Day 2 Checklist

- [x] Task 1: Documented INPUT (stage selection, task assignment, testing)
- [x] Task 2: Documented OUTPUT (visual updates, statistics, backend logging)
- [x] Task 3: Identified PROCEDURE (`updateGameLoop()` with all required elements)
- [x] Task 4: Traced complete data flow (66 steps from start to backend logging)
- [x] Task 5: Prepared CHECKPOINT materials for instructor

---

## Next Steps (Day 3)

1. **Write PPR 3a:** Describe the `updateGameLoop()` procedure
   - Explain how it processes the orders LIST
   - Show how robots are assigned and tracked
   - Demonstrate task completion logic

2. **Write PPR 3b:** Explain sequencing, selection, iteration
   - Sequencing: 5 steps in game loop
   - Selection: if statements for busy check, completion check, win condition
   - Iteration: for loops through workstations and robots

3. **Write PPR 3c:** Describe how orders LIST is used
   - Created in addOrder()
   - Searched in assignTask() and assignTest()
   - Updated in updateGameLoop()
   - Removed when GPU completes

4. **Take screenshots:**
   - Code segments with annotations
   - Game running showing all 3 stages
   - Orders queue panel with LIST visualization
   - Statistics display

5. **Add code comments:**
   - Mark SEQUENCING, SELECTION, ITERATION
   - Annotate LIST operations
   - Document INPUT and OUTPUT points

**Status:** ✅ Day 2 Complete — Ready for Create PT written responses
