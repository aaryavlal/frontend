---
toc: false
layout: post
title: "Core 3 — Module 3: Computing Models Quiz"
description: "Quiz on computing models, parallel and distributed computing concepts"
permalink: /cores/core-3
breadcrumbs: false
---

<style>
  details {
    background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
    border: 2px solid rgba(0,255,170,0.28);
    border-left: 4px solid #00ffaa;
    border-radius: 2px;
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 0 15px rgba(0,255,170,0.15);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  details:hover {
    border-color: #00ffaa;
    box-shadow: 0 0 20px rgba(0,255,170,0.3);
  }

  details[open] {
    border-color: #00ffaa;
    box-shadow: 0 0 25px rgba(0,255,170,0.4);
  }

  summary {
    font-family: 'Courier New', 'Consolas', monospace;
    font-weight: 700;
    color: #00ffaa;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
  }

  details p {
    margin-top: 12px;
    padding: 12px;
    background: rgba(10,14,20,0.60);
    border-left: 3px solid #00ffaa;
    border-radius: 2px;
    color: #e0e6ed;
    font-family: 'Courier New', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  h2, h3, h4 {
    color: #00ffaa;
    font-family: 'Courier New', 'Consolas', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0,255,170,0.5);
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
    border: 2px solid rgba(0,255,170,0.28);
    border-radius: 2px;
    overflow: hidden;
  }

  th {
    background: rgba(0,255,170,0.15);
    color: #00ffaa;
    padding: 12px;
    text-align: left;
    font-family: 'Courier New', 'Consolas', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.85rem;
    border-bottom: 2px solid #00ffaa;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid rgba(0,255,170,0.15);
    color: #e0e6ed;
    font-family: 'Courier New', 'Consolas', monospace;
    font-size: 0.85rem;
  }

  tr:hover {
    background: rgba(0,255,170,0.05);
  }
</style>

## Module 3 — Computing Models Quiz

Test your understanding of sequential, parallel, and distributed computing! Review Core 1 & Core 2 before taking this quiz.

---

## 📝 Knowledge Check (6 Questions)

### Question 1: Sequential vs. Parallel Computing
**Which statement best describes the main advantage of parallel computing over sequential computing?**

<details>
<summary>A) Parallel computing uses less power than sequential computing</summary>
<p>Incorrect. Parallel computing typically uses MORE power because multiple processors run simultaneously.</p>
</details>

<details>
<summary>B) Parallel computing divides tasks to execute simultaneously on multiple processors</summary>
<p>Correct! This is the core definition of parallel computing — splitting work across multiple cores/processors to speed up execution.</p>
</details>

<details>
<summary>C) Parallel computing eliminates the need for programming</summary>
<p>Incorrect. Parallel computing requires careful programming to manage multiple threads and avoid conflicts.</p>
</details>

<details>
<summary>D) Parallel computing works on single-core processors</summary>
<p>Incorrect. Parallel computing requires multiple processors or cores to execute tasks simultaneously.</p>
</details>

---

### Question 2: Resource Contention
**In the GPU Assembly Simulator Stage 2, why does having 3 robots NOT result in a 3x speedup?**

<details>
<summary>A) The robots aren't programmed correctly</summary>
<p>Incorrect. The problem isn't with the robots themselves.</p>
</details>

<details>
<summary>B) All 3 robots share ONE testing station, creating a bottleneck (resource contention)</summary>
<p>Correct! When multiple workers compete for the same resource, the slower shared resource limits overall performance. This is called resource contention.</p>
</details>

<details>
<summary>C) Stage 2 is intentionally designed to be slower</summary>
<p>Incorrect. Stage 2 demonstrates the real-world issue of shared resources.</p>
</details>

<details>
<summary>D) Robots can't work at the same time</summary>
<p>Incorrect. The robots CAN work simultaneously on different tasks.</p>
</details>

---

### Question 3: Distributed Computing vs. Parallel
**What is the key difference between distributed computing and parallel computing?**

<details>
<summary>A) Distributed computing is always faster</summary>
<p>Incorrect. Distributed computing is faster for certain problems but not always.</p>
</details>

<details>
<summary>B) Distributed systems use multiple independent computers with their own resources; parallel systems share resources</summary>
<p>Correct! In distributed systems (Stage 3), each factory has its own robot and testing station. In parallel systems (Stage 2), robots share resources, causing contention.</p>
</details>

<details>
<summary>C) Parallel computing requires the internet; distributed doesn't</summary>
<p>Incorrect. The opposite is more accurate — distributed systems often use networks.</p>
</details>

<details>
<summary>D) There is no real difference between them</summary>
<p>Incorrect. They have fundamental architectural differences.</p>
</details>

---

### Question 4: Real-World Applications
**Which of the following is an example of distributed computing?**

<details>
<summary>A) Your laptop's 8-core processor running a video game</summary>
<p>Incorrect. This is parallel computing — multiple cores on one machine sharing memory.</p>
</details>

<details>
<summary>B) Netflix streaming video from thousands of servers worldwide to millions of users</summary>
<p>Correct! Netflix uses distributed computing — data centers (independent computers) around the world handle requests independently, then use load balancing to route users optimally.</p>
</details>

<details>
<summary>C) A calculator performing addition sequentially</summary>
<p>Incorrect. This is sequential computing.</p>
</details>

<details>
<summary>D) Rendering a movie with OpenGL shaders</summary>
<p>Incorrect. While GPUs are powerful, this is primarily parallel computing on local hardware.</p>
</details>

---

### Question 5: Performance and Bottlenecks
**In Stage 3 of the GPU Assembly Simulator, why does removing the shared testing station improve performance dramatically?**

<details>
<summary>A) The robots work faster without the testing station</summary>
<p>Incorrect. Robot speed doesn't change; the testing still happens.</p>
</details>

<details>
<summary>B) Each factory has independent resources, eliminating resource contention and allowing true parallelism</summary>
<p>Correct! When each factory (distributed node) has its own testing station, robots don't compete for the same resource. All 3 factories can test simultaneously, achieving much higher throughput.</p>
</details>

<details>
<summary>C) Stage 3 GPUs are built faster by nature</summary>
<p>Incorrect. Task times are the same; the difference is in architecture.</p>
</details>

<details>
<summary>D) Testing is optional in Stage 3</summary>
<p>Incorrect. Testing still occurs and is required.</p>
</details>

---

### Question 6: Choosing the Right Model
**You're tasked with building an application that needs to process 1 million images. Which computing model would be MOST appropriate and why?**

<details>
<summary>A) Sequential computing — process one image at a time</summary>
<p>Incorrect. Sequential would be extremely slow for 1 million images.</p>
</details>

<details>
<summary>B) Parallel computing — use all cores on one powerful machine</summary>
<p>⚠️ Partially correct. This would work for medium workloads, but a single machine has hardware limits. The bottleneck would be that one machine's resources.</p>
</details>

<details>
<summary>C) Distributed computing — use multiple cloud servers to process images in parallel, with load balancing distributing work</summary>
<p>Best answer! Distributed computing scales horizontally — you can add more servers as needed. Each server processes images independently with no resource contention, and load balancing ensures even distribution.</p>
</details>

<details>
<summary>D) A combination of all three models depending on the image type</summary>
<p>Incorrect. While modern systems do use hybrid approaches, distributed computing is the clear primary choice for massive workloads.</p>
</details>

---

## 🎓 Reflection Questions

After completing this quiz, consider:

1. **Why does the GPU Assembly Simulator Stage 2 (3 robots, 1 oven) perform better than Stage 1 (1 robot, 1 oven) but WORSE than Stage 3 (3 independent factories)?**
   - Hint: Think about resource contention and bottlenecks.

2. **If you had to choose between parallel and distributed computing for your startup's web application, what factors would you consider?**
   - Cost, scalability, complexity, fault tolerance?

3. **Can you identify a service you use daily (Netflix, Google Maps, Instagram) and explain whether it uses sequential, parallel, or distributed computing (or all three)?**

---

## 📖 Key Concepts Review

| Model | Resources | Bottleneck | Use Case |
|-------|-----------|-----------|----------|
| **Sequential** | Single processor | No sharing, but slow | Simple tasks |
| **Parallel** | Multiple cores, shared memory | Shared resources | CPU-intensive on one machine |
| **Distributed** | Multiple independent computers | Network latency | Web scale, massive data |

---

## 📊 Your Score

After answering all 6 questions, you should understand:
- The definition and trade-offs of each computing model
- Why resource contention limits parallel performance
- How distributed systems eliminate bottlenecks through independence
- When to apply each model to real-world problems

---

[← Back to Prototype Room](/prototyperoomcode)
