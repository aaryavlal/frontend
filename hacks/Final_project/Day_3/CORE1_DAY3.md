---
title: "Core 1 - Day 3 Create PT Written Responses"
permalink: /core1/day3
layout: post
---

# Core 1: GPU Assembly Simulator — Day 3 Complete

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
This program is an interactive GPU assembly simulator demonstrating Sequential, Parallel, and Distributed computing models. Users assign manufacturing tasks (PCB, Cores, Memory, Test) to robots and compare performance across different architectures.

**Procedure: `assignTask(stationId, robotId, task)`**

The `assignTask()` procedure manages task assignment by:
1. **Locating resources** — Finds the workstation and robot using IDs
2. **Validating availability** — Checks robot isn't busy and orders exist
3. **Finding eligible orders** — Searches for orders needing the task with prerequisites met
4. **Enforcing workflow** — Ensures PCB → Cores → Memory → Test sequence
5. **Scheduling execution** — Assigns task with stage-appropriate timing
6. **Updating state** — Marks completion and refreshes UI

**Parameters:** `stationId`, `robotId`, `task`
**Sequencing:** Steps execute in order—locate, validate, search, check, assign, schedule
**Selection:** `if robot.busy`, `if !order.steps[task]`, `if prerequisites met`
**Iteration:** `for (let o of orders)` searches through pending orders

Without this procedure, users cannot interact with the simulation, tasks cannot be scheduled, and the educational demonstration fails.

---

### Procedure Code (for 3a)

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1678-1739

```javascript
function assignTask(stationId, robotId, task) {
  // Locate workstation and robot
  const station = workstations.find(s => s.id === stationId);
  const robot = station.robots.find(r => r.id === robotId);

  // Validate robot availability
  if (robot.busy || orders.length === 0) return;

  // Find first available order that needs this task
  let order = null;
  for (let o of orders) {
    if (o.stationId !== stationId && currentStage !== 3) continue;

    if (!o.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // Check if prerequisites are met
      if (idx === 0 || order === null) {
        if (idx === 0 || o.steps[steps[idx - 1]]) {
          order = o;
          break;
        }
      }
    }
  }

  // Validate order was found
  if (!order) {
    showToast('No orders need this task!', 'warning');
    return;
  }

  // Check prerequisites
  const steps = ['pcb', 'cores', 'memory'];
  const idx = steps.indexOf(task);
  if (idx > 0 && !order.steps[steps[idx - 1]]) {
    showToast(`Complete ${steps[idx - 1].toUpperCase()} first!`, 'warning');
    return;
  }

  // Assign task to robot
  robot.busy = true;
  robot.task = task;
  robot.orderId = order.id;

  // Set task duration based on stage
  const duration = currentStage === 2 ? TASK_DURATIONS[task] * 0.6 : TASK_DURATIONS[task];

  // Complete task after duration
  robot.timer = setTimeout(() => {
    order.steps[task] = true;
    robot.busy = false;
    robot.task = null;
    robot.orderId = null;
    renderOrders();
    renderWorkstations();
  }, duration);

  renderWorkstations();
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### Written Response 3b

**Sequencing:** Steps execute in required order:
1. Locate workstation and robot → 2. Validate availability → 3. Search orders → 4. Check prerequisites → 5. Assign task → 6. Schedule completion

Each step depends on prior output. Cannot assign before locating, cannot schedule before validating.

**Selection:** Conditionals handle different scenarios:
- `if (robot.busy || orders.length === 0)` — Validates before processing
- `if (o.stationId !== stationId && currentStage !== 3)` — Filters by stage
- `if (!o.steps[task])` — Checks if task needed
- `if (idx > 0 && !order.steps[steps[idx - 1]])` — Enforces PCB → Cores → Memory order
- `currentStage === 2 ? duration * 0.6 : duration` — Adjusts timing for parallel stage

**Iteration:** `for (let o of orders)` loop searches through pending orders:
- Checks each order for task eligibility
- Validates prerequisites are met
- Exits early with `break` when suitable order found

This handles any number of orders dynamically.

---

### Algorithm Code (for 3b)

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1678-1739

```javascript
// SEQUENCING: Steps must execute in this order
// Step 1: Locate resources
const station = workstations.find(s => s.id === stationId);
const robot = station.robots.find(r => r.id === robotId);

// Step 2: Validate availability
// SELECTION: Check robot status
if (robot.busy || orders.length === 0) return;

// Step 3: Find eligible order
let order = null;

// ITERATION: Search through all orders
for (let o of orders) {
  // SELECTION: Filter by station in non-distributed stages
  if (o.stationId !== stationId && currentStage !== 3) continue;

  // SELECTION: Check if order needs this task
  if (!o.steps[task]) {
    const steps = ['pcb', 'cores', 'memory'];
    const idx = steps.indexOf(task);

    // SELECTION: Verify prerequisites
    if (idx === 0 || order === null) {
      if (idx === 0 || o.steps[steps[idx - 1]]) {
        order = o;
        break;  // Exit iteration early
      }
    }
  }
}

// Step 4: Validate order found
// SELECTION: Handle no eligible orders
if (!order) {
  showToast('No orders need this task!', 'warning');
  return;
}

// Step 5: Check prerequisites
const steps = ['pcb', 'cores', 'memory'];
const idx = steps.indexOf(task);

// SELECTION: Enforce sequential workflow
if (idx > 0 && !order.steps[steps[idx - 1]]) {
  showToast(`Complete ${steps[idx - 1].toUpperCase()} first!`, 'warning');
  return;
}

// Step 6: Assign task
robot.busy = true;
robot.task = task;
robot.orderId = order.id;

// SELECTION: Adjust duration based on stage
const duration = currentStage === 2 ? TASK_DURATIONS[task] * 0.6 : TASK_DURATIONS[task];

// Step 7: Schedule completion
robot.timer = setTimeout(() => {
  order.steps[task] = true;
  robot.busy = false;
  robot.task = null;
  robot.orderId = null;
  renderOrders();
  renderWorkstations();
}, duration);

renderWorkstations();
```

---

## Task 3: PPR 3c — List Usage ✓

### Written Response 3c

**List:** `orders` array stores pending GPU assembly orders

**What it contains:** Each element is an object with:
- Order ID, station assignment
- Steps status: `{pcb: false, cores: false, memory: false, test: false}`
- Timestamp for metrics

**How it manages complexity:**

1. **Variable workload** — Dynamically handles 1-5+ orders without separate variables (`order1`, `order2`, etc.)

2. **Sequential processing** — `for (let o of orders)` in `assignTask()` finds next eligible order automatically

3. **FIFO queue order** — Maintains manufacturing priority; `orders[0]` = oldest

4. **Multi-stage support:**
   - Stage 1 (Sequential): One order at a time
   - Stage 2 (Parallel): Multiple partial orders
   - Stage 3 (Distributed): Auto-routes by checking list length per station

5. **Simple state management** — `.find()`, `.filter()`, `.splice()` methods handle search, filter, removal cleanly

**Without lists:** Would need `order1`, `order2`, `order3` variables, complex conditionals for different counts, manual tracking—making multi-stage simulation unmaintainable.

---

### List Code (for 3c)

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1595-1650, 1678-1739

```javascript
// LIST DECLARATION: Global orders array
let orders = [];
let orderIdCounter = 1;

// LIST APPEND: Add new order to queue
function addOrder() {
  // Determine station assignment for Stage 3 (Distributed)
  let stationId = 1;
  if (currentStage === 3) {
    // LIST USAGE: Find least busy station
    const stationOrders = [1, 2, 3].map(id =>
      orders.filter(o => o.stationId === id).length
    );
    stationId = stationOrders.indexOf(Math.min(...stationOrders)) + 1;
  }

  // LIST APPEND: Add new order object
  orders.push({
    id: orderIdCounter++,
    stationId: stationId,
    steps: { pcb: false, cores: false, memory: false, test: false },
    createdAt: Date.now()
  });

  renderOrders();
}

// LIST ITERATION: Search for eligible order in assignTask()
function assignTask(stationId, robotId, task) {
  const station = workstations.find(s => s.id === stationId);
  const robot = station.robots.find(r => r.id === robotId);

  if (robot.busy || orders.length === 0) return;  // LIST LENGTH CHECK

  let order = null;

  // LIST ITERATION: Find first order needing this task
  for (let o of orders) {
    if (o.stationId !== stationId && currentStage !== 3) continue;

    if (!o.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      if (idx === 0 || order === null) {
        if (idx === 0 || o.steps[steps[idx - 1]]) {
          order = o;  // LIST ELEMENT ACCESS
          break;
        }
      }
    }
  }

  if (!order) {
    showToast('No orders need this task!', 'warning');
    return;
  }

  // ... assign task to robot ...

  robot.timer = setTimeout(() => {
    order.steps[task] = true;  // LIST ELEMENT MODIFICATION
    robot.busy = false;
    renderOrders();
  }, duration);
}

// LIST REMOVAL: Remove completed order
function checkOrderCompletion() {
  // LIST ITERATION: Check each order
  for (let i = orders.length - 1; i >= 0; i--) {
    const order = orders[i];  // LIST ACCESS

    // Check if all steps complete
    if (order.steps.pcb && order.steps.cores &&
        order.steps.memory && order.steps.test) {

      // LIST REMOVAL: Delete completed order
      orders.splice(i, 1);

      completedGPUs++;

      if (completedGPUs >= 5) {
        completeStage();
      }
    }
  }
}
```

---

## Task 4: Code Screenshots ✓

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `gpu-assembly-simulator.md` | Button HTML | `onclick="assignTask()"` |
| **Procedure** | `gpu-assembly-simulator.md` | 1678-1739 | `assignTask()` function |
| **List Declaration** | `gpu-assembly-simulator.md` | 1595 | `orders = []` |
| **List Operations** | `gpu-assembly-simulator.md` | 1610-1620 | `orders.push({...})` |
| **Iteration** | `gpu-assembly-simulator.md` | 1686-1701 | `for (let o of orders)` |
| **Selection** | `gpu-assembly-simulator.md` | 1682, 1689, 1714 | `if` conditionals |
| **Output** | `gpu-assembly-simulator.md` | 1734-1736 | `renderOrders()` |

---

## Task 5: Code Annotations ✓

```javascript
function assignTask(stationId, robotId, task) {
  /**
   * PROCEDURE: assignTask()
   * PURPOSE: Assign manufacturing task to robot with prerequisite validation
   * PARAMETERS: stationId, robotId, task
   * RETURNS: void (updates global state)
   */

  // ===== SEQUENCING STEP 1: Locate resources =====
  const station = workstations.find(s => s.id === stationId);
  const robot = station.robots.find(r => r.id === robotId);

  // ===== SELECTION: Validate robot availability =====
  if (robot.busy || orders.length === 0) return;

  // ===== SEQUENCING STEP 2: Find eligible order =====
  // LIST DECLARATION
  let order = null;

  // ===== ITERATION: Search through orders list =====
  for (let o of orders) {
    // SELECTION: Filter by station in stages 1-2
    if (o.stationId !== stationId && currentStage !== 3) continue;

    // SELECTION: Check if order needs this task
    if (!o.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // SELECTION: Verify prerequisites met
      if (idx === 0 || order === null) {
        if (idx === 0 || o.steps[steps[idx - 1]]) {
          order = o;  // LIST ELEMENT ACCESS
          break;      // Exit iteration early
        }
      }
    }
  }

  // ===== SELECTION: Handle no eligible orders =====
  if (!order) {
    showToast('No orders need this task!', 'warning');
    return;
  }

  // ===== SELECTION: Validate task not already complete =====
  if (order.steps[task]) {
    showToast(`${task.toUpperCase()} already done!`, 'warning');
    return;
  }

  // ===== SEQUENCING STEP 3: Check prerequisites =====
  const steps = ['pcb', 'cores', 'memory'];
  const idx = steps.indexOf(task);

  // SELECTION: Enforce sequential workflow
  if (idx > 0 && !order.steps[steps[idx - 1]]) {
    showToast(`Complete ${steps[idx - 1].toUpperCase()} first!`, 'warning');
    return;
  }

  // ===== SEQUENCING STEP 4: Assign task to robot =====
  robot.busy = true;
  robot.task = task;
  robot.orderId = order.id;
  playSound('click');

  // ===== SELECTION: Adjust duration for parallel stage =====
  const duration = currentStage === 2 ? TASK_DURATIONS[task] * 0.6 : TASK_DURATIONS[task];

  // ===== SEQUENCING STEP 5: Schedule task completion =====
  robot.timer = setTimeout(() => {
    // LIST ELEMENT MODIFICATION
    order.steps[task] = true;
    robot.busy = false;
    robot.task = null;
    robot.orderId = null;
    playSound('complete');

    // OUTPUT: Update UI
    renderOrders();
    renderWorkstations();
  }, duration);

  // ===== OUTPUT: Update UI immediately =====
  renderWorkstations();
}
```

---

## Summary

| Task | Procedure | Algorithm | List |
|------|-----------|-----------|------|
| **Component** | `assignTask()` | 6-step sequence | `orders[]` array |
| **Sequencing** | Locate → Validate → Search → Check → Assign → Schedule | Each depends on prior | FIFO queue order |
| **Selection** | `if robot.busy`, `if !task`, `if prerequisites` | Stage-based filtering | Route by station |
| **Iteration** | N/A | `for (let o of orders)` | Handles 1-5+ orders |
| **Purpose** | Task scheduling | Workflow enforcement | Dynamic workload |

**Algorithm:** Locate resources → Validate → Search orders → Check prerequisites → Assign → Schedule completion

**Example:** User clicks "PCB" button → `assignTask(1, 1, 'pcb')` → Finds order needing PCB → Validates robot free → Assigns task → Completes after 2s → Updates UI
