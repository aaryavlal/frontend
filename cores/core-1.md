---
toc: false
layout: post
title: "Core 1 — Module 1: Computing Models"
description: "Module 1: Computing Models — an introduction to sequential and parallel models"
permalink: /cores/core-1
breadcrumbs: true
---

## Module 1 — Computing Models

### Introduction

How does your computer do multiple things at once? How can Netflix stream video to millions of users simultaneously? The answer lies in understanding different **computing models** — the fundamental ways computers organize and execute tasks.

In this module, you'll learn three essential computing architectures that power everything from your phone to global data centers.

---

## Learning Objectives

By the end of this module, you will be able to:
- Define sequential, parallel, and distributed computing
- Identify real-world examples of each computing model
- Explain the concept of resource contention in parallel systems
- Compare performance trade-offs between different architectures
- Apply computing models to solve problems efficiently

---

## Core Concepts

### 1. Sequential Computing: One Thing at a Time

**Definition**: Sequential computing executes instructions one after another in a single stream. Only one task runs at any given moment.

**Real-World Analogy**: Imagine a single chef making pizzas. They must complete each step (knead dough, add sauce, add cheese, bake) before moving to the next pizza. No matter how fast the chef works, they can only do one thing at a time.

**How It Works**:
```
Task 1 → Task 2 → Task 3 → Task 4
   ↓        ↓        ↓        ↓
  Done    Done    Done    Done
```

**Examples**:
- Early computers (1940s-1970s)
- Simple calculators
- Single-threaded programs
- Following a recipe step-by-step

**Advantages**:
- Simple to understand and debug
- Predictable execution order
- No coordination overhead

**Disadvantages**:
- Slow for large workloads
- Resources sit idle (CPU waits during I/O operations)
- Cannot take advantage of modern multi-core processors

---

### 2. Parallel Computing: Many Hands Make Light Work

**Definition**: Parallel computing divides a task into smaller subtasks that execute simultaneously on multiple processors or cores. All processors typically share the same memory and resources.

**Real-World Analogy**: Now you have 3 chefs in one kitchen! While Chef 1 makes dough, Chef 2 adds sauce to a different pizza, and Chef 3 adds cheese. But wait — there's only **one oven**, so they have to take turns baking. This is called **resource contention**.

**How It Works**:
```
        Main Task
           ↓
    ┌──────┼──────┐
    ↓      ↓      ↓
  Task 1  Task 2  Task 3  (Execute simultaneously)
    ↓      ↓      ↓
    └──────┼──────┘
           ↓
      Combined Result
```

**Examples**:
- Multi-core processors (your laptop has 4-16 cores!)
- Graphics cards (GPUs with thousands of cores)
- Multi-threaded applications (web browsers, video games)
- Scientific simulations

**Key Concept: Resource Contention**

When multiple threads/processes need the same resource (like memory, disk, or network), they must wait their turn. This is called **contention**, and it can slow down parallel systems.

**Example**:
- 3 chefs (processors) sharing 1 oven (shared resource)
- 4 cores sharing 1 memory bus
- Multiple programs sharing 1 hard drive

**Advantages**:
- Faster than sequential for large tasks
- Better resource utilization
- Can handle multiple users/requests

**Disadvantages**:
- Shared resources create bottlenecks
- Requires careful coordination (synchronization)
- Debugging is harder (race conditions, deadlocks)

---

### 3. Distributed Computing: Independent Powerhouses

**Definition**: Distributed computing spreads tasks across multiple independent computers connected by a network. Each computer (node) has its own processor, memory, and resources.

**Real-World Analogy**: Instead of 3 chefs in one kitchen, you now have **3 separate pizza shops**, each with their own chef and oven. Orders get routed to whichever shop is least busy. No sharing, no waiting!

**How It Works**:
```
        Incoming Requests
               ↓
        Load Balancer
         ↙    ↓    ↘
    Node 1  Node 2  Node 3
    (CPU 1) (CPU 2) (CPU 3)
    [Mem 1] [Mem 2] [Mem 3]
      ↓       ↓       ↓
    Result  Result  Result
```

**Examples**:
- Google Search (thousands of servers working together)
- Netflix streaming (distributed content delivery network)
- Blockchain networks (Bitcoin, Ethereum)
- Cloud computing (AWS, Azure, Google Cloud)
- Multiplayer game servers

**Key Concept: Load Balancing**

Distributing work evenly across nodes so no single machine is overwhelmed while others sit idle.

**Advantages**:
- Scales horizontally (add more machines for more power)
- Fault tolerant (if one node fails, others continue)
- No resource contention between nodes
- Geographic distribution (servers near users = faster)

**Disadvantages**:
- Network latency (communication between nodes takes time)
- Complex coordination (distributed consensus is hard)
- Higher cost (more machines, more maintenance)
- Data consistency challenges

---

## Performance Comparison

| Model | Speed | Scalability | Complexity | Cost |
|-------|-------|-------------|------------|------|
| **Sequential** | Slow | Limited | Simple | 💰 Low |
| **Parallel** | Fast | ⚡ Moderate | ⚠️ Medium | 💰💰 Medium |
| **Distributed** | Very Fast | 🚀 High | Complex | 💰💰💰 High |

**When to use each**:
- **Sequential**: Simple tasks, single-user programs, debugging
- **Parallel**: CPU-intensive tasks on one machine (video rendering, scientific computing)
- **Distributed**: Web services at scale, big data processing, global applications

---

## 🔍 Real-World Case Study: How YouTube Works

YouTube uses **all three models**:

1. **Sequential**: Your web browser processes HTML sequentially
2. **Parallel**: Video encoding uses multiple CPU cores to compress videos faster
3. **Distributed**:
   - Millions of videos stored across thousands of servers worldwide
   - Load balancers route requests to nearest data center
   - Content Delivery Networks (CDNs) cache popular videos closer to users

**Result**: You can watch cat videos in 4K with no buffering!

---

## Interactive Learning: GPU Assembly Simulator

Now it's time to experience these concepts hands-on with **Hardware Havoc**! The GPU Assembly Simulator lets you build graphics cards using different computing architectures.

### What You'll Do:

**Stage 1 — Sequential Assembly**
- Control 1 assembly robot building GPUs step-by-step
- Click buttons to assign tasks: PCB → Cores → Memory → Test
- Notice how single-threaded execution bottlenecks performance!
- **Learning Goal**: Understand sequential processing limitations

**Stage 2 — Parallel Assembly**
- Manage 3 assembly robots working simultaneously
- Assign different tasks to different robots
- **Watch for the bottleneck**: All 3 robots share 1 testing station!
- **Learning Goal**: Experience resource contention in parallel systems

**Stage 3 — Distributed Factories**
- Oversee 3 independent factories (automatic mode)
- Orders automatically route to the least busy factory
- Each factory has its own robots AND testing station (no sharing!)
- **Learning Goal**: See how distributed computing eliminates bottlenecks

### Ready to Build?

<div style="text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #1F2020 0%, #007ACC 50%, #4CAFEF 100%); border-radius: 12px; box-shadow: 0 10px 40px rgba(76,175,239,0.4); border: 2px solid #4CAFEF;">
  <h2 style="color: #4CAFEF; margin-bottom: 20px; font-size: 2.5rem; font-family: 'Courier New', monospace;">⚡ GPU ASSEMBLY SIMULATOR</h2>
  <p style="color: #F0F0F0; font-size: 1.2rem; margin-bottom: 30px; font-family: 'Courier New', monospace;">[ HARDWARE HAVOC :: COMPUTING LAB ]</p>
  <a href="/frontend/gpu-assembly-simulator" style="display: inline-block; padding: 18px 48px; background: linear-gradient(135deg, #007ACC, #4CAFEF); color: white; text-decoration: none; border-radius: 8px; font-size: 1.3rem; font-weight: bold; box-shadow: 0 8px 25px rgba(0,0,0,0.3); transition: all 0.3s ease; font-family: 'Courier New', monospace; text-transform: uppercase;">
    ▶ START PRODUCTION
  </a>
</div>

**Pro Tips**:
- Assemble 5 GPUs in each stage to unlock the next
- Compare your performance times between stages
- Try to maximize GPUs/minute throughput
- Challenge: Achieve 10+ GPUs/min in Stage 3!

---

## Check Your Understanding

After playing the simulator, answer these questions:

1. **Why is sequential computing slow?**
   - *Answer*: Only one task executes at a time, so the system cannot take advantage of idle time or multiple processors.

2. **What is resource contention?**
   - *Answer*: When multiple processes compete for the same shared resource (like the oven in Stage 2), causing delays and bottlenecks.

3. **How does distributed computing solve the oven bottleneck?**
   - *Answer*: Each kitchen (node) has its own independent oven, eliminating sharing and contention.

4. **Real-world question**: If you're building a mobile app for 1000 users, which computing model would you choose and why?
   - *Hint*: Consider scalability, cost, and fault tolerance.

---

## Going Deeper (Optional)

### Amdahl's Law: The Limit of Parallelization

Not all programs can be perfectly parallelized. **Amdahl's Law** states:

```
Speedup = 1 / [(1 - P) + (P / N)]
```

Where:
- P = Portion of program that can be parallelized (0 to 1)
- N = Number of processors

**Key Insight**: If only 50% of your program can be parallelized, even with infinite processors, you can only achieve a 2x speedup!

### Modern CPUs: Hybrid Models

Your laptop actually uses **all three models**:
- **Sequential**: Single-threaded instructions within each core
- **Parallel**: Multiple cores working simultaneously
- **Distributed**: Your laptop talks to cloud servers for heavy tasks

---

## Activities

1. Play through all 3 stages of the Pizza Shop Simulator
2. Record your completion times for each stage
3. Calculate the speedup: Stage1Time ÷ Stage3Time
4. 📊 Create a graph comparing your stage performance
5. 💭 Write a short reflection: "Which computing model surprised you most and why?"
6. 🔍 Find 3 apps on your phone and identify which computing model they primarily use

---

## Key Takeaways

- **Sequential**: Simple but slow — one task at a time
- **Parallel**: Faster with multiple workers, but shared resources create bottlenecks
- **Distributed**: Scales massively by giving each worker independent resources
- **Trade-offs**: More speed = more complexity and cost
- **Real-world systems** often use a combination of all three models

---

## Additional Resources

- [Video: How Do CPUs Use Multiple Cores?](https://www.youtube.com/watch?v=fKK933KuPhg) (3 min)
- [Interactive: Visualizing Parallel Computing](https://www.cs.usfca.edu/~galles/visualization/ThreadedRecursion.html)
- [Article: How Netflix Scales Globally](https://netflixtechblog.com/)
- [AP CSP Review: Computing Innovations](https://apcentral.collegeboard.org/courses/ap-computer-science-principles)

---

## ⏭️ Next Steps

Ready to dive deeper?

- **[Module 2: CPU Architecture](/cores/core-2)** — Learn how processors actually execute instructions
- **[Module 3: Operating Systems](/cores/core-3)** — Discover how OSes manage multiple processes
- **[Back to Prototype Room](/prototyperoomcode)** — Return to main menu

---

<div style="background: rgba(76,175,239,0.1); border-left: 5px solid #4CAFEF; padding: 20px; border-radius: 8px; margin-top: 40px; border: 2px solid #4CAFEF;">
  <h3 style="color: #4CAFEF; margin-top: 0; font-family: 'Courier New', monospace;">HARDWARE CHALLENGE</h3>
  <p style="color: #F0F0F0;">Think you've mastered computing models? Try the <a href="/gpu-assembly-simulator" style="color: #4CAFEF; font-weight: bold;">GPU Assembly Simulator</a> and see if you can complete Stage 3 with a throughput of over 10 GPUs/minute!</p>
</div>
