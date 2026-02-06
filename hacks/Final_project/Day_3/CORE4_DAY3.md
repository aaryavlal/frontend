---
title: "Core 4 - Day 3 Create PT Written Responses"
permalink: /core4/day3
layout: post
---

# Core 4: Execution Time Calculations — Day 3 Complete

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

> The `updateM4Model()` procedure enables real-time execution time modeling by receiving slider input parameters (sequential time, parallel time, processors, overhead), calculating parallel execution metrics using the time formula, and updating the HUD with speedup values and bottleneck indicators. It serves as the core calculation engine that transforms user-adjusted parameters into meaningful performance visualizations.

### Written Response 3a

> **Prompt:** Describe the overall purpose of the program and what functionality the selected procedure contributes to.

**Response:**

The purpose of this program is to provide an interactive execution time calculator that enables users to explore parallel computing concepts by adjusting workload parameters (sequential portion, parallelizable work, processor count, coordination overhead), then observing how these affect total runtime and speedup. The module includes a Gemini AI-graded quiz that evaluates student understanding of sequential bottlenecks and optimization strategies.

The student-developed procedure `updateM4Model()` accepts **parameters** through slider inputs, specifically receiving sequential time (T_seq-part), parallel time (T_parallel-part), processor count (P), and overhead values. This procedure implements **sequencing** by executing operations in a precise order: first parsing slider values, then calculating sequential total, followed by computing parallel execution time using the formula, and finally updating all HUD display elements. The procedure uses **selection** through conditional statements (`if (speedup >= 2)`) to check quest completion thresholds and trigger XP rewards. **Iteration** is implicitly used through DOM update operations that process multiple display elements.

The `updateM4Model()` procedure fulfills these essential functions within the program architecture:

1. **Input Processing:** Receives and parses numerical **parameters** from range slider elements
2. **Baseline Calculation:** Computes sequential total time (T_seq-part + T_parallel-part)
3. **Parallel Time Modeling:** Applies the execution time formula: T_parallel = seq + par/P + overhead*(P-1)
4. **Speedup Computation:** Calculates speedup ratio as seqTotal / parallelTime
5. **Bottleneck Analysis:** Determines shield ratio (seq/parallelTime) to visualize sequential bottleneck
6. **Quest Tracking:** Checks if speedup threshold met and awards XP accordingly

The `updateM4Model()` procedure is indispensable to the program's functionality; without this computational pathway combining **sequencing**, **selection**, and **iteration**, user slider adjustments could not be transformed into execution metrics, processed through the time model, or returned as meaningful HUD visualizations.

---

### Procedure Code (for 3a)

**File:** `frontend/cores/core-4.md` — Lines 1031-1073

```javascript
function updateM4Model() {
    // Validate slider elements exist
    if (!m4SeqSlider || !m4ParSlider || !m4ProcSlider || !m4OverheadSlider) {
        return;
    }

    // Parse slider values (INPUT)
    const seq = parseFloat(m4SeqSlider.value);      // T_seq-part
    const par = parseFloat(m4ParSlider.value);      // T_parallel-part
    const P = parseInt(m4ProcSlider.value, 10);     // Processors
    const overhead = parseFloat(m4OverheadSlider.value);

    // Sequential baseline calculation
    const seqTotal = seq + par;

    // Parallel model: seq part + parallel split + coordination cost
    const overheadCost = overhead * Math.max(P - 1, 0);
    const parallelTime = seq + par / Math.max(P, 1) + overheadCost;

    // Calculate speedup and bottleneck ratio
    const speedup = seqTotal / parallelTime;
    const shieldRatio = parallelTime > 0 ? Math.min(seq / parallelTime, 1) : 0;

    // Update display elements (OUTPUT)
    m4SeqValue.textContent = seq.toFixed(0);
    m4ParValue.textContent = par.toFixed(0);
    m4ProcValue.textContent = P.toString();
    m4OverheadValue.textContent = overhead.toFixed(0);

    m4SeqTotalEl.textContent = seqTotal.toFixed(0);
    m4ParTimeEl.textContent = parallelTime.toFixed(0);
    m4SpeedupEl.textContent = speedup.toFixed(2);
    m4SpeedupLive.textContent = speedup.toFixed(2);

    // Update shield bar visualization
    const shieldPercent = shieldRatio * 100;
    m4ShieldBar.style.width = `${shieldPercent.toFixed(0)}%`;
    m4ShieldValue.textContent = shieldPercent.toFixed(0);

    // SELECTION: Check speedup quest completion
    if (speedup >= 2 && !m4State.quests.speedup) {
        setQuestComplete("speedup", m4QuestSpeedupEl);
        addXP(12, "Speedup threshold cleared");
    }
}
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### PURPOSE

> The algorithm transforms slider input values into execution time analysis through a sequential pipeline: parse inputs → calculate baseline → apply time formula → compute speedup → update HUD → check quest thresholds. Selection handles quest completion logic, while iteration processes multiple display element updates.

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

The `updateM4Model()` procedure implements an algorithm that includes sequencing, selection, and iteration to model parallel execution time.

**Sequencing:** The algorithm executes steps in a specific order that cannot be rearranged:
1. First, validate that all slider elements exist
2. Then, parse slider values into numeric variables (seq, par, P, overhead)
3. Next, calculate sequential baseline total (seq + par)
4. Then, compute parallel execution time using the formula
5. Next, calculate speedup ratio and shield percentage
6. Finally, update all HUD display elements and check quest completion

Each step depends on the previous step's output, making the sequence essential.

**Selection:** The algorithm uses conditional statements to handle different scenarios:
- `if (!m4SeqSlider || !m4ParSlider || ...)`: Validates slider elements exist before processing
- `Math.max(P - 1, 0)`: Ensures overhead calculation doesn't go negative for single processor
- `Math.max(P, 1)`: Prevents division by zero in parallel time calculation
- `if (speedup >= 2 && !m4State.quests.speedup)`: Checks if speedup threshold met AND quest not already complete
- `parallelTime > 0 ? ... : 0`: Ternary selection for shield ratio calculation

These selections ensure the program responds appropriately to edge cases and quest state.

**Iteration:** The algorithm uses iteration through:
- Array method `forEach` in event listener setup for slider inputs
- DOM updates that process multiple display elements in sequence
- The `sliderInputs.forEach((slider) => {...})` pattern that attaches handlers to all four sliders

This iteration allows the program to respond to any slider change with a complete model recalculation.

---

### Algorithm Code (for 3b)

**File:** `frontend/cores/core-4.md` — Lines 1031-1073, 1116-1122

```javascript
function updateM4Model() {
    // SELECTION: Validate elements exist
    if (!m4SeqSlider || !m4ParSlider || !m4ProcSlider || !m4OverheadSlider) {
        return;
    }

    // SEQUENCING STEP 1: Parse inputs
    const seq = parseFloat(m4SeqSlider.value);
    const par = parseFloat(m4ParSlider.value);
    const P = parseInt(m4ProcSlider.value, 10);
    const overhead = parseFloat(m4OverheadSlider.value);

    // SEQUENCING STEP 2: Calculate sequential baseline
    const seqTotal = seq + par;

    // SEQUENCING STEP 3: Apply parallel time formula
    // SELECTION: Math.max prevents negative/zero values
    const overheadCost = overhead * Math.max(P - 1, 0);
    const parallelTime = seq + par / Math.max(P, 1) + overheadCost;

    // SEQUENCING STEP 4: Calculate metrics
    const speedup = seqTotal / parallelTime;
    // SELECTION: Ternary for safe division
    const shieldRatio = parallelTime > 0 ? Math.min(seq / parallelTime, 1) : 0;

    // SEQUENCING STEP 5: Update displays
    m4SeqTotalEl.textContent = seqTotal.toFixed(0);
    m4ParTimeEl.textContent = parallelTime.toFixed(0);
    m4SpeedupEl.textContent = speedup.toFixed(2);
    m4ShieldBar.style.width = `${(shieldRatio * 100).toFixed(0)}%`;

    // SEQUENCING STEP 6: Check quest (SELECTION)
    if (speedup >= 2 && !m4State.quests.speedup) {
        setQuestComplete("speedup", m4QuestSpeedupEl);
        addXP(12, "Speedup threshold cleared");
    }
}

// ITERATION: Attach event listeners to all sliders
const sliderInputs = [m4SeqSlider, m4ParSlider, m4ProcSlider, m4OverheadSlider].filter(Boolean);
sliderInputs.forEach((slider) => {
    slider.addEventListener("input", () => {
        updateM4Model();
        markCalibrated();
    });
});
```

---

## Task 3: PPR 3c — List Usage ✓

### PURPOSE

> The `attempts` list stores quiz submission history for each grading attempt, enabling the program to track student progress across multiple tries. It maintains submission order and provides attempt summaries for both local display and server synchronization.

### Written Response 3c

> **Prompt:** Describe how the selected list manages complexity in your program.

**Response:**

The `attempts` list is essential to my program because it stores the grading history for each quiz submission to the Gemini AI grader. This list manages complexity in several ways:

**What the list contains:** Each element in `attempts` is an object containing:
- The score received (0-3)
- Maximum possible score (3)
- Feedback text from Gemini
- Server-side attempt summary

**How the list manages complexity:**

1. **Handles variable submissions:** Users might submit 1 or 20+ attempts. The list dynamically grows to accommodate any number of quiz submissions, eliminating the need for separate variables like `attempt1`, `attempt2`, etc.

2. **Enables progress tracking:** The `recordAttempt()` function uses `attempts.push(attempt)` to add each submission, then iterates through the list to build a formatted summary string showing all attempts with labels (Perfect/Partial/No credit).

3. **Preserves submission order:** The list maintains chronological order of attempts, so `Attempt 1`, `Attempt 2`, etc. display correctly in the results panel.

4. **Supports aggregate analysis:** The iteration `for (let i = 0; i < attempts.length; i++)` processes each attempt to generate the local summary, classifying each by score level.

5. **Enables state persistence:** The `m4State` object also uses lists (`unlockedTerms: new Set()`, `bottleneckWins: new Set()`) to track which formula terms have been decoded and which bottleneck hunts have been completed.

Without these lists, the program would need separate variables for each possible attempt, complex conditional logic for different submission counts, and manual summary construction—significantly increasing code complexity.

---

### List Code (for 3c)

**File:** `frontend/cores/core-4.md` — Lines 1210-1232, 950-960

```javascript
// LIST DECLARATION: Track quiz attempts
const attempts = [];

// PROCEDURE: Record each grading attempt
function recordAttempt(score, maxScore, feedback, serverSummary) {
    // Create attempt object
    const attempt = { score, maxScore, feedback, serverSummary };

    // LIST APPEND: Add to attempts array
    attempts.push(attempt);

    // Build local summary string
    let localSummary = "";

    // ITERATION: Process each attempt in LIST
    for (let i = 0; i < attempts.length; i++) {
        const a = attempts[i];
        let label;

        // SELECTION: Classify attempt by score
        if (a.score === a.maxScore) {
            label = "Perfect";
        } else if (a.score > 0) {
            label = "Partial";
        } else {
            label = "No credit";
        }

        // Build summary line
        localSummary += `Attempt ${i + 1}: ${label} (${a.score}/${a.maxScore})\n`;
    }

    return localSummary.trim();
}

// STATE OBJECT with LIST structures
const m4State = {
    xp: 0,
    quests: {
        terminal: false,
        calibrate: false,
        bottleneck: false,
        speedup: false
    },
    unlockedTerms: new Set(),    // LIST: Tracks decoded formula terms
    bottleneckWins: new Set()    // LIST: Tracks correct bottleneck calls
};

// LIST USAGE: Check if all terms unlocked
if (m4State.unlockedTerms.size === Object.keys(termMessages).length) {
    setQuestComplete("terminal", m4QuestTerminalEl);
    addXP(8, "Formula console fully decoded");
}

// LIST USAGE: Check bottleneck wins for quest completion
if (m4State.bottleneckWins.size >= 2) {
    setQuestComplete("bottleneck", m4QuestBottleneckEl);
}
```

---

## Task 4: Code Screenshots ✓

### Screenshot Checklist

Take screenshots of these code segments for your Create PT submission:

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `core-4.md` | 1035-1039 | Slider value parsing (seq, par, P, overhead) |
| **Procedure** | `core-4.md` | 1031-1073 | Full `updateM4Model()` function |
| **List Declaration** | `core-4.md` | 1210 | `const attempts = []` |
| **List Append** | `core-4.md` | 1215 | `attempts.push(attempt)` |
| **List Usage** | `core-4.md` | 1220-1230 | `for` loop building attempt summary |
| **Iteration** | `core-4.md` | 1116-1122 | `sliderInputs.forEach((slider) => {...})` |
| **Selection** | `core-4.md` | 1032, 1069-1072 | `if (!m4SeqSlider...)`, `if (speedup >= 2...)` |
| **Output** | `core-4.md` | 1050-1067 | HUD element updates |

### How to Take Screenshots

1. Open the file in VS Code
2. Highlight the relevant lines
3. Use `Cmd+Shift+4` (Mac) or `Win+Shift+S` (Windows) to capture
4. Save with descriptive names: `input.png`, `procedure.png`, `list.png`, etc.

---

## Task 5: Code Annotations ✓

### Annotated Procedure Code

Add these comments to your code for clarity:

```javascript
// ===== PROCEDURE: updateM4Model() =====
// PURPOSE: Calculate parallel execution time and update HUD
// RETURNS: Updates display elements with computed metrics
function updateM4Model() {
    // ===== SELECTION: Validate elements exist =====
    if (!m4SeqSlider || !m4ParSlider || !m4ProcSlider || !m4OverheadSlider) {
        return;
    }

    // ===== SEQUENCING STEP 1: Parse slider inputs =====
    const seq = parseFloat(m4SeqSlider.value);      // T_seq-part
    const par = parseFloat(m4ParSlider.value);      // T_parallel-part
    const P = parseInt(m4ProcSlider.value, 10);     // Processor count
    const overhead = parseFloat(m4OverheadSlider.value); // Coordination cost

    // ===== SEQUENCING STEP 2: Calculate sequential baseline =====
    const seqTotal = seq + par;

    // ===== SEQUENCING STEP 3: Apply parallel time formula =====
    // Formula: T_parallel = T_seq-part + (T_parallel-part / P) + overhead
    // SELECTION: Math.max prevents negative/zero edge cases
    const overheadCost = overhead * Math.max(P - 1, 0);
    const parallelTime = seq + par / Math.max(P, 1) + overheadCost;

    // ===== SEQUENCING STEP 4: Calculate derived metrics =====
    const speedup = seqTotal / parallelTime;
    // SELECTION: Ternary prevents division by zero
    const shieldRatio = parallelTime > 0 ? Math.min(seq / parallelTime, 1) : 0;

    // ===== SEQUENCING STEP 5: Update HUD displays (OUTPUT) =====
    m4SeqValue.textContent = seq.toFixed(0);
    m4ParValue.textContent = par.toFixed(0);
    m4ProcValue.textContent = P.toString();
    m4OverheadValue.textContent = overhead.toFixed(0);

    m4SeqTotalEl.textContent = seqTotal.toFixed(0);
    m4ParTimeEl.textContent = parallelTime.toFixed(0);
    m4SpeedupEl.textContent = speedup.toFixed(2);
    m4SpeedupLive.textContent = speedup.toFixed(2);

    // Update shield bar (bottleneck visualization)
    const shieldPercent = shieldRatio * 100;
    m4ShieldBar.style.width = `${shieldPercent.toFixed(0)}%`;
    m4ShieldValue.textContent = shieldPercent.toFixed(0);

    // ===== SEQUENCING STEP 6: Check quest completion =====
    // SELECTION: Award XP if speedup threshold met
    if (speedup >= 2 && !m4State.quests.speedup) {
        setQuestComplete("speedup", m4QuestSpeedupEl);
        addXP(12, "Speedup threshold cleared");
    }
}

// ===== ITERATION: Attach handlers to all sliders =====
const sliderInputs = [m4SeqSlider, m4ParSlider, m4ProcSlider, m4OverheadSlider].filter(Boolean);
sliderInputs.forEach((slider) => {
    slider.addEventListener("input", () => {
        updateM4Model();    // Recalculate on any slider change
        markCalibrated();   // Mark calibration quest complete
    });
});
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
| **3a** | Purpose: execution time modeling; Procedure: `updateM4Model()` handles input→formula→output | 150 words |
| **3b** | Sequencing: 6 ordered steps; Selection: 5 conditionals; Iteration: forEach on sliders | 200 words |
| **3c** | Lists: `attempts[]`, `unlockedTerms`, `bottleneckWins`; Manages quiz history, quest tracking | 200 words |

---

## Key Formula

**Parallel Execution Time Model:**
```
T_parallel = T_seq-part + (T_parallel-part / P) + overhead × (P - 1)
```

**Speedup Calculation:**
```
Speedup = T_sequential / T_parallel = (seq + par) / parallelTime
```

**Boss Shield (Bottleneck Indicator):**
```
Shield% = (T_seq-part / T_parallel) × 100
```
Higher shield = sequential portion dominates runtime (Amdahl's Law bottleneck)

---

## Next Steps (Day 4)

1. Finalize 1-minute video script
2. Set up screen recording software
3. Practice demo walkthrough (sliders + quiz)
4. Prepare localhost environment for recording
5. **CHECKPOINT:** Review video script with peer
