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

### PURPOSE

> The `findEligibleOrder()` procedure searches through pending GPU assembly orders to locate one that needs a specific task and meets all manufacturing prerequisites. It returns the first eligible order object or null, enabling the simulation's task assignment system to match robots with work.

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

    // Selection: Check if task needed and not already claimed by another robot
    if (!order.steps[task] && !(order.claimed && order.claimed[task])) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // Selection: In parallel mode tasks are independent; otherwise verify prerequisites
      if (currentStage === 2 || idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // Return first eligible order
      }
    }
  }
  return null;  // No eligible order found
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### PURPOSE

> The algorithm iterates through a list of pending orders, applying sequential filter checks (station match → task incomplete → prerequisites met) before returning. Selection handles different stage configurations and validation rules, while iteration enables processing of variable-length order queues.

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
- `if (!order.steps[task] && !(order.claimed && order.claimed[task]))`: Checks whether this specific task has already been completed or is currently being worked on by another robot
- `if (currentStage === 2 || idx === 0 || order.steps[steps[idx - 1]])`: In parallel mode, tasks are independent and can run simultaneously; otherwise verifies either (1) this is the first task with no prerequisites, OR (2) the previous task in sequence is complete

These selections ensure the procedure returns only valid orders that are ready for the specified task, and adapts behavior based on the computing model.

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

### PURPOSE

> The `orders` list stores pending GPU assembly orders with their completion states, enabling the program to handle variable workloads dynamically. It maintains FIFO queue ordering and allows iteration-based task assignment across all three computing models without hardcoded order limits.

### Written Response 3c

> **Prompt:** Describe how the selected list manages complexity in your program.

**Response:**

The `orders` list is essential to my program because it stores all pending GPU assembly orders with their current progress states. This list manages complexity in several ways:

**What the list contains:** Each element in `orders` is an object containing:
- Unique order ID for tracking
- Station assignment (`stationId`) for distributed processing
- Assembly steps object with boolean flags: `{pcb: false, cores: false, memory: false, test: false}`
- Start timestamp (`startTime`) for performance calculations

**How the list manages complexity:**

1. **Handles variable workload:** The simulation can have any number of pending orders (typically 0-5 active). The list dynamically grows when orders spawn and shrinks when GPUs complete, eliminating the need for separate variables like `order1`, `order2`, `order3`, etc.

2. **Enables task search:** The `findEligibleOrder()` procedure uses `for (let order of orders)` to search the list, allowing the same code to work whether there's 1 pending order or 10, without modification.

3. **Preserves queue order:** The list maintains first-in-first-out (FIFO) ordering, so `orders[0]` represents the oldest pending order. This ensures earlier orders get priority during iteration.

4. **Simplifies removal:** Array methods like `.filter()` and `.find()` replace complex manual tracking logic, keeping the codebase maintainable. For example, `orders = orders.filter(o => o.id !== order.id)` removes a completed order in one line.

Without this list, I would need pre-allocated variables for each order slot, complex conditional logic to handle different queue sizes, and manual tracking of which slots are occupied—significantly increasing code complexity and reducing maintainability.

---

### List Code (for 3c)

**File:** `frontend/hacks/gpu-assembly-simulator.md` — Lines 1461, 1778-1795, 1859-1876, 1897-1938, 1986-1999

```javascript
// LIST DECLARATION: Global orders array
let orders = [];
let orderCounter = 1;

// LIST APPEND: Add new order to queue
function addOrder() {
  const stationId = currentStage === 3 ? findLeastBusyStation() : 1;

  const order = {
    id: orderCounter++,
    steps: { pcb: false, cores: false, memory: false, test: false },
    stationId: stationId,
    startTime: Date.now()
  };

  // LIST APPEND
  orders.push(order);
  playSound('click');
  renderOrders();
}

// LIST ITERATION: Search for eligible order
function findEligibleOrder(task, stationId) {
  // ITERATION through orders list
  for (let order of orders) {
    if (order.stationId !== stationId && currentStage !== 3) continue;

    // LIST ELEMENT ACCESS + claim check
    if (!order.steps[task] && !(order.claimed && order.claimed[task])) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      if (currentStage === 2 || idx === 0 || order.steps[steps[idx - 1]]) {
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
function checkOrderComplete(order) {
  if (order.steps.pcb && order.steps.cores &&
      order.steps.memory && order.steps.test) {
    completedGPUs++;
    totalGPUsAllTime++;

    orders = orders.filter(o => o.id !== order.id);  // LIST REMOVAL
  }
}
```

---

## Task 4: Code Screenshots ✓

### Input
**File:** `gpu-assembly-simulator.md` — Lines 1728

Button click triggering `assignTask()`:

```html
<button class="task-btn" onclick="assignTask(${station.id}, ${robot.id}, '${task}')" ${robot.busy ? 'disabled' : ''}>
  ${TASK_ICONS[task]}
</button>
```

---

### Algorithm (Procedure)
**File:** `gpu-assembly-simulator.md` — Lines 1859-1876

Full `findEligibleOrder()` function:

```javascript
function findEligibleOrder(task, stationId) {
  for (let order of orders) {
    // Selection: Filter by station
    if (order.stationId !== stationId && currentStage !== 3) continue;

    // Selection: Check if task needed and not already claimed by another robot
    if (!order.steps[task] && !(order.claimed && order.claimed[task])) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // Selection: In parallel mode tasks are independent; otherwise verify prerequisites
      if (currentStage === 2 || idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // Return first eligible order
      }
    }
  }
  return null;  // No eligible order found
}
```

---

### List Declaration
**File:** `gpu-assembly-simulator.md` — Line 1461

```javascript
let orders = [];
```

---

### List Append
**File:** `gpu-assembly-simulator.md` — Lines 1778-1795

```javascript
function addOrder() {
  const stationId = currentStage === 3 ? findLeastBusyStation() : 1;

  const order = {
    id: orderCounter++,
    steps: { pcb: false, cores: false, memory: false, test: false },
    stationId: stationId,
    startTime: Date.now()
  };

  orders.push(order);  // LIST APPEND
  playSound('click');
  renderOrders();

  if (currentStage === 3) {
    autoProcessOrder(order);
  }
}
```

---

### List Usage
**File:** `gpu-assembly-simulator.md` — Lines 1860-1875

`for (let order of orders)` in `findEligibleOrder()`:

```javascript
function findEligibleOrder(task, stationId) {
  // LIST ITERATION
  for (let order of orders) {
    if (order.stationId !== stationId && currentStage !== 3) continue;

    if (!order.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      if (idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // LIST ACCESS
      }
    }
  }
  return null;
}
```

---

### Iteration
**File:** `gpu-assembly-simulator.md` — Lines 1860-1875

`for (let order of orders)` loop:

```javascript
// ITERATION: Loop through all pending orders
for (let order of orders) {
  // Filter by station
  if (order.stationId !== stationId && currentStage !== 3) continue;

  // Check if task needed
  if (!order.steps[task]) {
    const steps = ['pcb', 'cores', 'memory'];
    const idx = steps.indexOf(task);

    // Verify prerequisites
    if (idx === 0 || order.steps[steps[idx - 1]]) {
      return order;
    }
  }
}
```

---

### Selection

**File:** `gpu-assembly-simulator.md` — Lines 1862, 1865, 1870

#### Selection 1: Station filtering
```javascript
if (order.stationId !== stationId && currentStage !== 3) continue;
```

#### Selection 2: Task status and claim check
```javascript
if (!order.steps[task] && !(order.claimed && order.claimed[task])) {
  // ... continue processing
}
```

#### Selection 3: Prerequisite validation (adapts to computing model)
```javascript
const steps = ['pcb', 'cores', 'memory'];
const idx = steps.indexOf(task);

if (currentStage === 2 || idx === 0 || order.steps[steps[idx - 1]]) {
  return order;
}
```

---

### Output
**File:** `gpu-assembly-simulator.md` — Lines 1871, 1875

Return statements:

```javascript
function findEligibleOrder(task, stationId) {
  for (let order of orders) {
    if (order.stationId !== stationId && currentStage !== 3) continue;

    if (!order.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      if (idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // OUTPUT: Return eligible order
      }
    }
  }
  return null;  // OUTPUT: No eligible order found
}
```

---

## Task 5: Code Annotations ✓

### Annotated Procedure Code

Add these comments to your code for clarity:

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

    // ===== SELECTION: Check if task incomplete and not claimed =====
    if (!order.steps[task] && !(order.claimed && order.claimed[task])) {

      // ===== SEQUENCING: Determine prerequisite requirements =====
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // ===== SELECTION: Verify prerequisites satisfied =====
      // Parallel mode: tasks are independent, no prerequisites
      // Sequential/Distributed: first task has no prereqs, others require previous step
      if (currentStage === 2 || idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // RETURN: First eligible order found
      }
    }
  }

  // ===== RETURN: No eligible orders in list =====
  return null;
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

| Question | Key Points | Word Count Target |
|----------|------------|-------------------|
| **3a** | Purpose: computing models simulation; Procedure: `findEligibleOrder()` returns eligible order via iteration+selection | 150 words |
| **3b** | Sequencing: 5 ordered steps; Selection: 3 conditionals for filtering; Iteration: for...of loop through orders | 200 words |
| **3c** | List: `orders`; Manages: variable workload, FIFO queue, multi-stage support, eliminates fixed variables | 200 words |

---
