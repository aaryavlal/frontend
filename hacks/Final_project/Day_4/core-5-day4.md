---
title: "Core 5 - Day 4 Video Recording Workflow"
permalink: /core5/day4
layout: post
---

# Core 5: Hardware Havoc — Day 4

---

## Setup (10 min)

```
[ ] 1. Open: http://localhost:4100/cores/core-5
[ ] 2. Close welcome overlay ("Start Learning →")
[ ] 3. Test: Add task → Drag to parallel → "Compute Speedup"
```

## Recording Setup (5 min)

```
[ ] 1. Software: QuickTime (Mac), Xbox Game Bar (Win), or OBS
[ ] 2. Record browser window only (1920x1080 or 1280x720)
[ ] 3. NO audio (mic/system audio OFF)
[ ] 4. Test 5-second recording
```

## Demo Prep (10 min)

```
[ ] 1. Clear all tasks to Task Pool
[ ] 2. Plan scenario: 4 tasks [5, 10, 8, 12]
      - Run 1: All series (no speedup)
      - Run 2: Mixed parallel (speedup >1.5×)
[ ] 3. Practice 2-3 times
```

## 60-Second Script

| Time | Action |
|------|--------|
| 0:00-0:15 | Add 4 tasks [5, 10, 8, 12] |
| 0:15-0:25 | All to Series Row → "Compute" → Show ~1.0× |
| 0:30-0:40 | Move 2 to Parallel Row → "Compute" |
| 0:40-0:60 | Show >1.5× speedup + live monitor |

## Recording Checklist

**Before:** Browser ready • Tasks in pool • Recorder on  
**During:** Move slowly • Show contrast • Don't rush  
**After:** ≤60s • Has input/output • Clear serial vs parallel

## Export

```
MP4 (H.264) • 1280x720 • 30fps • <30MB
File: CreatePT_Core5_HardwareHavoc.mp4
```

## College Board Requirements

| Must Show | How |
|-----------|-----|
| Input | Task values, dragging |
| Running | Drag-and-drop + compute clicks |
| Output | Speedup results |
| ≤60s, no voice | Silent video |

---

## Quick Tips

**Best Results:**
- Use round numbers (5, 10, 15)
- Speedup >1.5× shows clear benefit
- Keep mouse smooth and slow

**Alternative (Dramatic 2.5× Speedup):**
- Add 5 tasks: [10, 10, 10, 10, 10]
- All series: 50 units
- Reorganize: Series [10], Parallel [10,10,10,10]
- Result: 20 units (2.5× speedup)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Page not loading | Run `bundle exec jekyll serve` |
| Drag not working | Refresh page |
| No speedup | Move tasks to Parallel row |
| File too large | Use 720p |
