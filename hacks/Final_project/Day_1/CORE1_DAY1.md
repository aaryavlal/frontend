---
title: "Core 1 - Day 1"
permalink: /core1/day1
layout: post
---

# Core 1: GPU Assembly Simulator — Day 1 Complete

**Team Member:** Dhyan
**Core Assignment:** Core 1 - Computing Models (Sequential, Parallel, Distributed)

---

## Task 1: Individual Task Identified ✓

**My Task:** GPU Assembly Simulator - Interactive Learning Game

**What it does:** Users manage a GPU assembly line through three computational models: sequential (1 robot), parallel (3 robots with shared tester), and distributed (3 independent factories). Players click to assign assembly tasks (PCB, Cores, Memory) and testing operations to build GPUs while learning about bottlenecks and performance scaling.

**Why it fits Create PT:**
- Clear INPUT → PROCEDURE → OUTPUT flow (user clicks → task assignment logic → GPU completion)
- Uses LISTS (orders array, robots array, workstations array, achievements list)
- Has defined PROCEDURES with sequencing (task prerequisites: PCB → Cores → Memory → Test), selection (if robot is busy, skip to next), and iteration (process each order in queue)

---

## Task 2: API Routes Reviewed ✓

### Backend API: `backend/api/compute.py`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/game-logs/gpu-simulator` | POST | Log game session data (stage, time, GPUs completed) |
| `/api/leaderboard/gpu-simulator` | GET | Retrieve top scores/fastest times |
| `/api/game-logs/session/{sessionId}` | GET | Get specific session details |

### Key Frontend Functions:

| Function | Location | Purpose |
|----------|----------|---------|
| `initGame()` | Line 1325 | Initialize game state, set up workstations array |
| `startGame()` | Line 1391 | Begin production, start game loop timer |
| `assignTask()` | Line 1551 | Assign assembly task to specific robot (SELECTION + ITERATION) |
| `assignTest()` | Line 1609 | Assign testing task when all steps complete |
| `updateGameLoop()` | Line 1733 | Main game loop - process tasks, check completion (ITERATION) |
| `processAutoFillTasks()` | Line 2046 | Auto-assignment algorithm (ITERATION + SELECTION) |
| `logGameData()` | Line 2073 | Send session data to backend API |

---

## Task 3: Frontend + Backend Code Mapped ✓

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND                                       │
│  frontend/hacks/gpu-assembly-simulator.md                               │
│  Lines 1200-2181 (Embedded JavaScript)                                  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ User clicks "Start Game"
                                    │ User clicks task buttons (PCB/Cores/Memory/Test)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           INPUT                                          │
│  1. Stage selection: selectStage(stageNum)                              │
│  2. Task assignment: assignTask(workstationId, robotId, taskType)      │
│  3. Testing: assignTest(workstationId)                                  │
│  4. New order: addOrder()                                               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND PROCEDURE                                  │
│  Game State Management (Lines 1200-1320)                                │
│                                                                          │
│  Data Structures (LISTS):                                               │
│  • orders = []           ← LIST of GPU orders                           │
│  • workstations = []     ← LIST of assembly stations                    │
│  • achievements = []     ← LIST of unlockable achievements              │
│                                                                          │
│  Main Game Loop (Lines 1733-1830):                                      │
│  1. FOR EACH workstation (ITERATION):                                   │
│     a. FOR EACH robot in workstation.robots (ITERATION):                │
│        - IF robot.busy (SELECTION):                                     │
│          • Update task progress                                         │
│          • IF progress >= 100 (SELECTION):                              │
│            - Mark task complete                                         │
│            - Update order.steps[taskType] = true                        │
│     b. IF tester.busy (SELECTION):                                      │
│        • Update test progress                                           │
│        • IF progress >= 100 (SELECTION):                                │
│          - Complete GPU, increment completedGPUs                        │
│          - Remove order from LIST                                       │
│                                                                          │
│  Task Assignment Logic (Lines 1551-1608):                               │
│  1. Find target order from orders LIST (ITERATION)                      │
│  2. Check prerequisites (SELECTION):                                    │
│     - PCB: always allowed                                               │
│     - Cores: requires PCB complete                                      │
│     - Memory: requires Cores complete                                   │
│  3. IF prerequisites met AND robot not busy (SELECTION):                │
│     - Assign task to robot                                              │
│     - Update robot.busy = true                                          │
│                                                                          │
│  Auto-Fill Algorithm (Lines 2046-2071):                                 │
│  1. Priority: Test > Assembly                                           │
│  2. FOR EACH robot (ITERATION):                                         │
│     IF robot not busy (SELECTION):                                      │
│        FOR EACH order (ITERATION):                                      │
│           Find next incomplete task with prerequisites met              │
│           Assign task and break                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           OUTPUT                                         │
│  Visual Updates:                                                         │
│  • Workstation displays update (robot states, progress bars)            │
│  • Orders queue panel shows completion status                           │
│  • Statistics panel shows: GPUs completed, time, avg time               │
│  • Achievement notifications                                            │
│                                                                          │
│  Backend Logging (when game completes):                                 │
│  POST /api/game-logs/gpu-simulator                                      │
│  JSON Body:                                                              │
│  {                                                                       │
│    "sessionId": "uuid-v4",                                              │
│    "stage": 1,              ← current stage (1=Sequential, etc.)        │
│    "gpusCompleted": 5,      ← number of GPUs built                      │
│    "timeElapsed": 45.2,     ← total time in seconds                     │
│    "avgTime": 9.04,         ← average time per GPU                      │
│    "throughput": 6.64,      ← GPUs per minute                           │
│    "achievements": [...]    ← LIST of unlocked achievement IDs          │
│  }                                                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      BACKEND PROCESSING                                  │
│  backend/api/compute.py                                                 │
│  • Store session data in database                                       │
│  • Calculate leaderboard rankings                                       │
│  • Return confirmation response                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### File Locations Summary

| Component | File Path | Key Lines |
|-----------|-----------|-----------|
| Main Simulator | `frontend/hacks/gpu-assembly-simulator.md` | All content |
| CSS Styling | Lines 12-1200 | Layout, animations, visual effects |
| JavaScript Logic | Lines 1200-2181 | Game engine, state management |
| Backend API | `backend/api/compute.py` | Logging endpoint |
| Backend Model | `backend/model/compute.py` | Database models |

---

## Task 4: 1-Minute Video Script Outline ✓

### Video Script: "GPU Assembly - Sequential vs Parallel vs Distributed Computing"

**[0:00-0:10] HOOK + INTRO**
> "Watch me build GPUs three different ways - sequential, parallel, and distributed. Which is fastest? Let's find out."

**[0:10-0:25] STAGE 1 - SEQUENTIAL INPUT/OUTPUT**
- Click "Stage 1 - Sequential"
- Click "Start Game"
- Show one robot doing tasks one-by-one: PCB → Cores → Memory → Test
- Explain: "One robot processes everything in sequence. This is sequential computing - tasks happen one after another."
- Point to timer: "Let's see how long this takes..."
- Show completing 5 GPUs (time displayed)

**[0:25-0:40] STAGE 2 - PARALLEL PROCEDURE**
- Click "Stage 2 - Parallel"
- Click "Start Game"
- Show 3 robots working simultaneously
- Explain: "Now I have 3 robots working in parallel! But look - they all share one testing station. This shared resource creates a bottleneck."
- Point to the red bottleneck indicator
- Highlight: "The PROCEDURE assigns tasks to any available robot - this is ITERATION through the robots LIST with SELECTION based on busy status"

**[0:40-0:55] STAGE 3 - DISTRIBUTED + LISTS**
- Click "Stage 3 - Distributed"
- Click "Start Game"
- Show 3 independent factories
- Explain: "Distributed computing - 3 completely independent factories with their own testers. Orders automatically route to the least busy station."
- Show orders LIST being distributed
- Point out the dramatic speedup: "Much faster! No shared bottlenecks."

**[0:55-1:00] CLOSE + CREATE PT CONNECTION**
> "This demonstrates all three computing models with INPUT (task assignments), PROCEDURE (iteration through orders and robots with selection logic), and OUTPUT (completed GPUs and statistics). The orders array is a LIST that gets processed through sequential, parallel, or distributed workflows."

---

## Task 5: Team Sync Notes ✓

### Presentation Role Assignment

| Team Member | Core | Presentation Focus |
|-------------|------|-------------------|
| **ALL** | **SUPERPOWER** | **Room Code Multiplayer System — Join rooms, learn together, light up CPU together** |
| **Dhyan** | **Core 1** | **Computing Models — GPU Assembly Simulator** |
| Lucas | Core 2 | Why Parallel/Distributed? — Mandelbrot Fractal |
| Rudra | Core 3 | AI Digit Recognizer — Sequential CNN Pipeline |
| Aaryav | Core 4 | Execution Time Calculations — Speedup Calculator |
| Tanay | Core 5 | Hardware Performance — Interactive Learning Game |

### My N@tM Presentation Focus:
1. **Live Demo:** Play through all 3 stages - show performance difference
2. **Code Walkthrough:** Show task assignment logic and auto-fill algorithm
3. **Data Structures:** Explain orders[], robots[], workstations[] LISTS
4. **Bottleneck Visualization:** Point out shared tester in Stage 2
5. **API Integration:** Show backend logging when game completes

### Key Talking Points:
- Sequential: One robot, 50-60 seconds for 5 GPUs
- Parallel: 3 robots but shared tester = bottleneck, ~30 seconds
- Distributed: 3 independent factories, ~15 seconds (3.3x speedup!)
- Real-world connection: This is how modern GPUs process graphics workloads

---

## Create PT Code Segments (Preview)

### INPUT (Task Assignment Click Handler)
```javascript
// User clicks task button to assign work
function assignTask(workstationId, robotId, taskType) {
  const station = workstations[workstationId - 1];
  const robot = station.robots.find(r => r.id === robotId);

  // Find next order that needs this task
  const order = orders.find(o => {
    if (o.steps[taskType]) return false; // Already done

    // Check prerequisites (SELECTION)
    if (taskType === 'cores' && !o.steps.pcb) return false;
    if (taskType === 'memory' && !o.steps.cores) return false;

    return true;
  });

  if (!order || robot.busy) return;

  // INPUT accepted: assign task
  robot.busy = true;
  robot.currentTask = taskType;
  robot.orderId = order.id;
  robot.progress = 0;
}
```

### PROCEDURE with Lists + Iteration (Main Game Loop)
```javascript
// Process all workstations - ITERATION over LIST
function updateGameLoop() {
  // ITERATION: Process each workstation
  for (let station of workstations) {

    // ITERATION: Process each robot in station
    for (let robot of station.robots) {
      // SELECTION: Only update busy robots
      if (robot.busy) {
        robot.progress += deltaTime * 20;

        // SELECTION: Check if task complete
        if (robot.progress >= 100) {
          const order = orders.find(o => o.id === robot.orderId);
          if (order) {
            order.steps[robot.currentTask] = true; // Mark step complete
          }
          robot.busy = false;
          robot.progress = 0;
        }
      }
    }

    // Process tester (SELECTION)
    if (station.tester.busy) {
      station.tester.progress += deltaTime * 15;

      // SELECTION: Check if test complete
      if (station.tester.progress >= 100) {
        completedGPUs++;
        
        // Remove completed order from LIST
        const orderIndex = orders.findIndex(o => o.id === station.tester.orderId);
        if (orderIndex !== -1) {
          orders.splice(orderIndex, 1); // LIST manipulation
        }

        station.tester.busy = false;
        
        // SELECTION: Check win condition
        if (completedGPUs >= 5) {
          endGame();
        }
      }
    }
  }
}
```

### OUTPUT (Backend API Logging)
```javascript
// OUTPUT: Send game data to backend
async function logGameData() {
  const unlockedAchievements = achievements.filter(a => a.unlocked).map(a => a.id);
  const throughput = (completedGPUs / timeElapsed) * 60;

  const gameData = {
    sessionId: sessionId,
    stage: currentStage,
    gpusCompleted: completedGPUs,
    timeElapsed: parseFloat(timeElapsed.toFixed(2)),
    avgTime: parseFloat((timeElapsed / completedGPUs).toFixed(2)),
    throughput: parseFloat(throughput.toFixed(2)),
    achievements: unlockedAchievements, // LIST output
    fastestGPU: fastestGPU !== Infinity ? parseFloat(fastestGPU.toFixed(2)) : null
  };

  const response = await fetch(`${API_URL}/api/game-logs/gpu-simulator`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(gameData)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('✅ Game data logged successfully:', result);
  }
}
```

---

## Computing Model Comparisons

| Model | Robots | Testers | Bottleneck | Typical Time (5 GPUs) |
|-------|--------|---------|------------|----------------------|
| **Sequential** | 1 | Shared | Everything | 50-60 seconds |
| **Parallel** | 3 | Shared | Testing | 25-35 seconds |
| **Distributed** | 3 | Dedicated (3) | None | 12-18 seconds |

**Speedup Analysis:**
- Parallel vs Sequential: ~1.8x speedup (not 3x due to bottleneck)
- Distributed vs Sequential: ~3.3x speedup (near-linear scaling)
- Distributed vs Parallel: ~2x speedup (removing bottleneck)

**Real-World Applications:**
- Sequential: Old single-core CPUs
- Parallel: Modern multi-core CPUs with shared memory/cache
- Distributed: GPU CUDA cores, cloud computing clusters

---

## Day 1 Completion Checklist

- [x] Task 1: Individual task identified and documented
- [x] Task 2: API routes and key functions mapped
- [x] Task 3: Complete data flow diagram created
- [x] Task 4: 1-minute video script outlined
- [x] Task 5: Team roles synchronized

**Status:** ✅ Day 1 Complete — Ready for Create PT documentation
