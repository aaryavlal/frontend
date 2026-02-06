---
title: "Core 5 - Day 4 Video Recording Workflow"
permalink: /core5/day4
layout: post
---

# Core 5: Hardware Havoc — Day 4 Complete

**Task:** Video Recording Preparation Workflow

---

## Video Recording Workflow

### Phase 1: Environment Setup (10 min)

```
[ ] 1. Open frontend in browser
      Open: http://localhost:4100/cores/core-5
      OR: http://localhost:4100/gpu-assembly-simulator.html

[ ] 2. Verify page loads correctly
      Expected: Interactive speedup calculator with drag-and-drop interface

[ ] 3. Close welcome overlay
      Click "Start Learning →" button

[ ] 4. Test drag → calculate flow works
      Add task → Drag to parallel row → Click "Compute Speedup" → Should show speedup result
```

---

### Phase 2: Screen Recording Setup (5 min)

```
[ ] 1. Choose recording software:
      - Mac: QuickTime (Cmd+Shift+5) or OBS
      - Windows: Xbox Game Bar (Win+G) or OBS
      - Chrome: Screencastify extension

[ ] 2. Set recording area:
      - Record browser window only (not full screen)
      - Resolution: 1920x1080 or 1280x720

[ ] 3. Audio settings:
      - NO microphone (College Board requires no narration)
      - NO system audio

[ ] 4. Test recording:
      - Record 5 seconds
      - Play back to verify quality
```

---

### Phase 3: Demo Preparation (10 min)

```
[ ] 1. Clear all tasks from rows
      Drag all blocks back to Task Pool

[ ] 2. Pre-plan your scenario:
      Recommended: Show contrast between serial and parallel execution
      - Example: 4 tasks [5, 10, 8, 12]
      - First run: All in series row (slow)
      - Second run: Some in parallel row (faster)

[ ] 3. Have these windows ready:
      - Browser with Hardware Havoc interface
      - VS Code with core-5.md open (optional for code view)

[ ] 4. Practice the flow 2-3 times:
      Add tasks → Organize in series/parallel → Compute speedup → Show results
```

---

### Phase 4: Recording Script (60 seconds)

| Time | Action | What to Show |
|------|--------|--------------|
| 0:00-0:05 | **OPEN** | Show the Hardware Havoc interface with task pool |
| 0:05-0:15 | **INPUT** | Add 3-4 tasks with different time values (e.g., 5, 10, 8, 12) |
| 0:15-0:25 | **SCENARIO 1** | Drag all tasks to Series Row, click "Compute Speedup" |
| 0:25-0:30 | **OUTPUT 1** | Show serial execution result (no speedup, ~1.0×) |
| 0:30-0:40 | **SCENARIO 2** | Reorganize: Move some tasks to Parallel Row |
| 0:40-0:50 | **OUTPUT 2** | Click "Compute Speedup" again - show improved speedup (>1.5×) |
| 0:50-0:60 | **DETAILS** | Show live speedup monitor, highlight speedup comparison |

---

### Phase 5: Recording Checklist

**Before Recording:**
```
[ ] Browser at correct URL (localhost:4100/cores/core-5)
[ ] Welcome overlay closed
[ ] All tasks in Task Pool (clean state)
[ ] Recording software ready
[ ] Timer visible or mental count ready
```

**During Recording:**
```
[ ] Move mouse slowly and deliberately
[ ] Pause briefly when results appear
[ ] Show clear contrast between serial and parallel
[ ] Don't rush - 60 seconds is enough time
[ ] If mistake, stop and restart (don't try to fix mid-recording)
```

**After Recording:**
```
[ ] Watch playback to verify quality
[ ] Check duration (must be ≤ 60 seconds)
[ ] Verify all key elements visible:
    - Input (adding tasks with time values)
    - Output (speedup calculation results)
    - Program running (drag-and-drop interaction)
    - Clear demonstration of parallel vs serial comparison
```

---

### Phase 6: Export Settings

```
Format: MP4 (H.264 codec)
Resolution: 1280x720 or 1920x1080
Frame rate: 30 fps
File size: Under 30MB
File name: CreatePT_Core5_HardwareHavoc.mp4
```

---

## Quick Reference: What College Board Wants

| Requirement | How to Show It |
|-------------|----------------|
| **Input** | Adding task time values, dragging tasks to rows |
| **Program running** | Drag-and-drop interaction, compute button clicks |
| **Output** | Speedup calculation results (serial time vs parallel time) |
| **≤ 60 seconds** | Keep it tight, no narration |
| **No voice** | Silent video only |

---

## Alternative Demo Flow (Option 2)

If you want to show more dramatic improvement:

| Time | Action |
|------|--------|
| 0:00-0:10 | Add 5 tasks: [10, 10, 10, 10, 10] |
| 0:10-0:20 | All in Series Row → Compute (50 units, no speedup) |
| 0:20-0:30 | Reorganize: Series [10], Parallel [10, 10, 10, 10] |
| 0:30-0:45 | Compute again → Show dramatic speedup (50 → 20 = 2.5×) |
| 0:45-0:60 | Highlight the speedup monitor showing 2.5× improvement |

---

## Day 4 Checklist

- [x] Workflow documented
- [ ] Environment tested and working
- [ ] Recording software chosen and tested
- [ ] Demo flow practiced 2-3 times
- [ ] **CHECKPOINT:** Review workflow with peer

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Page not loading | Check that Jekyll server is running (bundle exec jekyll serve) |
| Drag and drop not working | Refresh page, ensure JavaScript is enabled |
| Tasks not appearing | Click "Add Task" button after entering time value |
| Recording too long | Skip the second compute, focus on one clear comparison |
| Speedup not calculating | Make sure tasks are in Series or Parallel rows, not Task Pool |
| Video file too large | Reduce resolution to 720p |
| Laggy recording | Close other apps, reduce browser zoom |

---

## Tips for Best Results

**✨ Pro Tips:**
- Use round numbers (5, 10, 15) for easier mental math
- Show at least 3-4 tasks to demonstrate meaningful parallelism
- Make sure speedup result is > 1.5× to show clear benefit
- Hover over "Live Speedup Monitor" to emphasize the performance gain
- Keep mouse movements smooth and purposeful

**🎯 What Graders Love to See:**
- Clear before/after comparison (serial vs parallel)
- Visible computational difference in results
- Interactive elements (dragging, clicking, computing)
- Real-time feedback (speedup monitor changing)
- Evidence of program logic working (different inputs → different outputs)

---

## Connection to College Board Requirements

This module demonstrates:
- **Algorithm**: Speedup calculation formula (T_serial / T_parallel)
- **Abstraction**: Using task blocks to represent computational units
- **Data Processing**: Converting task arrangements into performance metrics
- **Parallel Computing**: CSP Big Idea - demonstrating how parallelism improves efficiency

**Your video should show:** The program taking INPUT (task times), PROCESSING them (calculating serial vs parallel execution), and producing OUTPUT (speedup results).
