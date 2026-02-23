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

> **Prompt:** Describe the overall purpose of the program and what functionality the selected procedure contributes to.

**Response:**

The purpose of this program is to provide an interactive simulation demonstrating three computing models—Sequential, Parallel, and Distributed—through a GPU assembly factory game. Users assign manufacturing tasks (PCB installation, core assembly, memory installation, and testing) to robots, experiencing how different computational architectures affect throughput and efficiency. This application illustrates fundamental computer science concepts including task scheduling, resource management, and parallel processing optimization.

The student-developed procedure `findEligibleOrder()` accepts **parameters** through function arguments: `task` (string representing the task type) and `stationId` (number identifying which workstation). This procedure **returns** an order object if one is found, or null if no eligible orders exist. The procedure implements **sequencing** by executing operations in order: iterate through orders, filter by station, check task status, verify prerequisites, and return result. It uses **selection** through conditional statements (`if order.stationId !== stationId`, `if !order.steps[task]`, `if order.steps[steps[idx - 1]]`) to filter and validate orders. **Iteration** is implemented via the `for...of` loop that processes each order in the pending queue.

The `findEligibleOrder()` procedure fulfills these essential functions:

1. **Order Discovery:** Searches through the global orders list to find one that needs the specified task
2. **Station Filtering:** In Sequential/Parallel modes, ensures orders are assigned to correct workstations
3. **Task Validation:** Checks if the order has already completed the requested task
4. **Prerequisite Checking:** Verifies that prior assembly steps (PCB → Cores → Memory) are complete before allowing subsequent tasks
5. **Early Exit:** Returns immediately upon finding the first eligible order, optimizing performance

This procedure is indispensable because it enables the `assignTask()` function to locate work for robots. Without `findEligibleOrder()` combining **iteration** through orders, **selection** of valid candidates, and **sequenced** validation logic, the simulation could not match tasks to orders, enforce manufacturing workflows, or demonstrate computing model differences.

---

### Procedure Code (for 3a)

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1859-1876

```javascript
function findEligibleOrder(task, stationId) {
  for (let order of orders) {
    // Selection: Filter by station
    if (order.stationId !== stationId && currentStage !== 3) continue;

    // Selection: Check if task needed
    if (!order.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // Selection: Verify prerequisites
      if (idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // Return first eligible order
      }
    }
  }
  return null;  // No eligible order found
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

The `findEligibleOrder()` procedure implements an algorithm that includes sequencing, selection, and iteration to locate suitable orders for task assignment.

**Sequencing:** The algorithm executes steps in a specific order that cannot be rearranged:
1. First, iterate through each order in the orders list
2. Then, check if the order belongs to the correct station (or skip in distributed mode)
3. Next, verify the order hasn't already completed this task
4. Then, determine the task index in the prerequisite sequence
5. Finally, validate that prerequisite tasks are complete before returning

Each step depends on the previous step's output—you cannot check prerequisites before confirming the task is needed.

**Selection:** The algorithm uses conditional statements to handle different scenarios:
- `if (order.stationId !== stationId && currentStage !== 3)`: Filters orders by station assignment, skipping mismatches except in distributed mode
- `if (!order.steps[task])`: Checks whether this specific task has already been completed
- `if (idx === 0 || order.steps[steps[idx - 1]])`: Verifies either (1) this is the first task with no prerequisites, OR (2) the previous task in sequence is complete

These selections ensure the procedure returns only valid orders that are ready for the specified task.

**Iteration:** The algorithm uses a `for...of` loop to process orders:
- `for (let order of orders)`: Iterates through each pending order in the global orders list
- The loop processes variable numbers of orders (could be 1, could be 10)
- Uses `continue` to skip invalid orders and keep searching
- Uses `return order` to exit immediately when a match is found

This iteration allows the program to handle dynamic workloads and automatically select the next eligible order regardless of queue length.

---

### Algorithm Code (for 3b)

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1859-1876

```javascript
// PROCEDURE: findEligibleOrder
// RETURNS: order object or null
function findEligibleOrder(task, stationId) {

  // ITERATION: Loop through all pending orders
  for (let order of orders) {

    // SEQUENCING STEP 1 + SELECTION: Filter by station assignment
    if (order.stationId !== stationId && currentStage !== 3) continue;

    // SEQUENCING STEP 2 + SELECTION: Check if task is incomplete
    if (!order.steps[task]) {

      // SEQUENCING STEP 3: Determine task position in workflow
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // SEQUENCING STEP 4 + SELECTION: Verify prerequisites met
      if (idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // RETURN: First eligible order
      }
    }
  }

  return null;  // RETURN: No eligible orders found
}
```

---

## Task 3: PPR 3c — List Usage ✓

### Written Response 3c

> **Prompt:** Describe how the selected list manages complexity in your program.

**Response:**

The `orders` list is essential to my program because it stores all pending GPU assembly orders with their current progress states. This list manages complexity in several ways:

**What the list contains:** Each element in `orders` is an object containing:
- Unique order ID for tracking
- Station assignment (`stationId`) for distributed processing
- Assembly steps object with boolean flags: `{pcb: false, cores: false, memory: false, test: false}`
- Creation timestamp for performance calculations

**How the list manages complexity:**

1. **Handles variable workload:** The simulation can have any number of pending orders (typically 0-5 active). The list dynamically grows when orders spawn and shrinks when GPUs complete, eliminating the need for separate variables like `order1`, `order2`, `order3`, etc.

2. **Enables task search:** The `findEligibleOrder()` procedure uses `for (let order of orders)` to search the list, allowing the same code to work whether there's 1 pending order or 10, without modification.

3. **Preserves queue order:** The list maintains first-in-first-out (FIFO) ordering, so `orders[0]` represents the oldest pending order. This ensures earlier orders get priority during iteration.

4. **Supports multiple computing models:**
   - **Stage 1 (Sequential):** Orders process one at a time through a single robot
   - **Stage 2 (Parallel):** Multiple orders can be partially complete simultaneously as three robots work in parallel
   - **Stage 3 (Distributed):** Orders are split across three factories by counting list length at each station

5. **Simplifies state management:** Instead of tracking completion flags for each possible order position, the list allows direct access via iteration and array methods like `.filter()`, `.find()`, and `.splice()`.

Without this list, I would need pre-allocated variables for each order slot, complex conditional logic to handle different queue sizes, and manual tracking of which slots are occupied—significantly increasing code complexity and making the multi-stage computing demonstration impossible to maintain.

---

### List Code (for 3c)

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1595-1650, 1859-1876

```javascript
// LIST DECLARATION: Global orders array
let orders = [];
let orderIdCounter = 1;

// LIST APPEND: Add new order to queue
function addOrder() {
  let stationId = 1;

  // LIST USAGE: Count orders per station for load balancing
  if (currentStage === 3) {
    const stationOrders = [1, 2, 3].map(id =>
      orders.filter(o => o.stationId === id).length
    );
    stationId = stationOrders.indexOf(Math.min(...stationOrders)) + 1;
  }

  // LIST APPEND
  orders.push({
    id: orderIdCounter++,
    stationId: stationId,
    steps: { pcb: false, cores: false, memory: false, test: false },
    createdAt: Date.now()
  });

  renderOrders();
}

// LIST ITERATION: Search for eligible order
function findEligibleOrder(task, stationId) {
  // ITERATION through orders list
  for (let order of orders) {
    if (order.stationId !== stationId && currentStage !== 3) continue;

    // LIST ELEMENT ACCESS
    if (!order.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      if (idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // Return element from list
      }
    }
  }
  return null;
}

// LIST MODIFICATION: Update order progress
function assignTask(stationId, robotId, task) {
  const order = findEligibleOrder(task, stationId);  // LIST ACCESS
  if (!order) return;

  // ... robot assignment ...

  robot.timer = setTimeout(() => {
    order.steps[task] = true;  // LIST ELEMENT MODIFICATION
    renderOrders();
  }, duration);
}

// LIST REMOVAL: Remove completed orders
function checkOrderCompletion() {
  for (let i = orders.length - 1; i >= 0; i--) {
    const order = orders[i];  // LIST ACCESS by index

    if (order.steps.pcb && order.steps.cores &&
        order.steps.memory && order.steps.test) {
      orders.splice(i, 1);  // LIST REMOVAL
      completedGPUs++;
    }
  }
}
```

---

## Task 4: Code Screenshots ✓

### Screenshot Checklist

Take screenshots of these code segments for your Create PT submission:

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `gpu-assembly-simulator.md` | User clicks task button triggering `onclick="assignTask()"` |
| **Procedure** | `gpu-assembly-simulator.md` | 1859-1876 | Full `findEligibleOrder()` function |
| **List Declaration** | `gpu-assembly-simulator.md` | 1595 | `orders = []` |
| **List Iteration** | `gpu-assembly-simulator.md` | 1860-1875 | `for (let order of orders)` loop |
| **Selection** | `gpu-assembly-simulator.md` | 1862, 1865, 1870 | Conditional filters |
| **Return Value** | `gpu-assembly-simulator.md` | 1871, 1875 | `return order` and `return null` |
| **Output** | `gpu-assembly-simulator.md` | Called by `assignTask()` which updates UI |

### How to Take Screenshots

1. Open the file in VS Code
2. Highlight the relevant lines
3. Use `Cmd+Shift+4` (Mac) or `Win+Shift+S` (Windows) to capture
4. Save with descriptive names: `input.png`, `procedure.png`, `list.png`, etc.

---

## Task 5: Code Annotations ✓

### Annotated Procedure Code

```javascript
function findEligibleOrder(task, stationId) {
  /**
   * PROCEDURE: findEligibleOrder
   * PURPOSE: Search orders list for one needing specified task with prerequisites met
   * PARAMETERS: task (string), stationId (number)
   * RETURNS: order object or null
   */

  // ===== ITERATION: Process each order in list =====
  for (let order of orders) {

    // ===== SELECTION: Filter by station assignment =====
    // In stages 1-2, orders are station-specific
    // In stage 3 (distributed), all stations share orders
    if (order.stationId !== stationId && currentStage !== 3) continue;

    // ===== SELECTION: Check if task incomplete =====
    if (!order.steps[task]) {

      // ===== SEQUENCING: Determine prerequisite requirements =====
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // ===== SELECTION: Verify prerequisites satisfied =====
      // First task (idx 0) has no prerequisites
      // Other tasks require previous step complete
      if (idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // RETURN: First eligible order found
      }
    }
  }

  // ===== RETURN: No eligible orders in list =====
  return null;
}
```

### Annotated Helper Functions

```javascript
// HELPER PROCEDURE: validateTaskPrerequisites
// PURPOSE: Check if previous tasks are complete
// PARAMETERS: order (object), task (string)
// RETURNS: boolean (true if prerequisites met)
function validateTaskPrerequisites(order, task) {
  const steps = ['pcb', 'cores', 'memory'];
  const idx = steps.indexOf(task);

  // SELECTION: First task always valid
  if (idx === 0) return true;

  // SELECTION: Check previous task complete
  return order.steps[steps[idx - 1]];
}

// HELPER PROCEDURE: getTaskDuration
// PURPOSE: Calculate task duration based on computing stage
// PARAMETERS: task (string)
// RETURNS: number (milliseconds)
function getTaskDuration(task) {
  // SELECTION: Parallel stage (2) is 40% faster than sequential (1)
  return currentStage === 2 ? TASK_DURATIONS[task] * 0.6 : TASK_DURATIONS[task];
}
```

---

## Day 3 Checklist

- [x] Task 1: PPR 3a — Procedure description written
- [x] Task 2: PPR 3b — Algorithm with sequencing/selection/iteration explained
- [x] Task 3: PPR 3c — List usage and complexity management described
- [x] Task 4: Screenshot checklist prepared
- [x] Task 5: Code annotations added

---

## PPR Summary Table

| Question | Key Points | Word Count |
|----------|------------|------------|
| **3a** | Purpose: computing models simulation; Procedure: `findEligibleOrder()` returns eligible order via iteration+selection | ~150 |
| **3b** | Sequencing: 5 ordered steps; Selection: 3 conditionals for filtering; Iteration: for...of loop through orders; Returns: order or null | ~175 |
| **3c** | List: `orders`; Manages: variable workload, FIFO queue, multi-stage support, eliminates fixed variables | ~175 |

**Key Improvements:**
- ✅ Shorter procedure (17 lines vs 61 lines)
- ✅ Clear return value (order object or null)
- ✅ Focused purpose (search and filter)
- ✅ Still demonstrates all three concepts (sequencing, selection, iteration)

---

## Next Steps (Day 4)

1. Finalize 1-minute video script
2. Set up screen recording software
3. Practice demo walkthrough showing all three stages
4. Prepare localhost environment for recording
5. **CHECKPOINT:** Review video script with peer
