---
title: "Core 3 - Day 4 Video Recording Workflow"
permalink: /core3/day4
layout: post
---

# Core 3: AI Digit Recognizer — Day 4 Complete

**Task:** Video Recording Preparation Workflow

---

## Video Recording Workflow

### Phase 1: Environment Setup (10 min)

```
[ ] 1. Start backend server
      cd /home/rudra/coding/backend
      python main.py

[ ] 2. Verify API is running
      Open: http://localhost:8405/api/digit/health
      Expected: {"status": "ok", "model_loaded": true}

[ ] 3. Open frontend in browser
      Open: http://localhost:4100/cores/core-3
      OR: http://localhost:4100/assets/digitrecog-standalone.html

[ ] 4. Test draw → recognize flow works
      Draw a "7" → Click Recognize → Should show prediction
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
[ ] 1. Clear canvas before recording
      Click "Clear" button

[ ] 2. Pre-plan what digit to draw:
      Recommended: Draw "7" (high confidence, clear shape)

[ ] 3. Have these windows ready:
      - Browser with digit recognizer
      - VS Code with digit_api.py open (optional for code scroll)

[ ] 4. Practice the flow 2-3 times:
      Draw → Recognize → Show result → Click "View Processing Pipeline"
```

---

### Phase 4: Recording Script (60 seconds)

| Time | Action | What to Show |
|------|--------|--------------|
| 0:00-0:05 | **OPEN** | Show the digit recognizer interface |
| 0:05-0:15 | **INPUT** | Draw digit "7" on canvas slowly and clearly |
| 0:15-0:20 | **TRIGGER** | Click "Recognize" button |
| 0:20-0:30 | **OUTPUT** | Show prediction result: "7" with confidence % |
| 0:30-0:40 | **DETAIL** | Hover over result card, show top 3 predictions |
| 0:40-0:50 | **PIPELINE** | Click "View Processing Pipeline" - show CNN layers |
| 0:50-0:60 | **CLOSE** | Navigate through 1-2 slides showing data flow |

---

### Phase 5: Recording Checklist

**Before Recording:**
```
[ ] Backend running (python main.py)
[ ] Browser at correct URL
[ ] Canvas is clear
[ ] Recording software ready
[ ] Timer visible or mental count ready
```

**During Recording:**
```
[ ] Move mouse slowly and deliberately
[ ] Pause briefly on important elements
[ ] Don't rush - 60 seconds is enough time
[ ] If mistake, stop and restart (don't try to fix mid-recording)
```

**After Recording:**
```
[ ] Watch playback to verify quality
[ ] Check duration (must be ≤ 60 seconds)
[ ] Verify all key elements visible:
    - Input (drawing on canvas)
    - Output (prediction result)
    - Program running (not static screenshots)
```

---

### Phase 6: Export Settings

```
Format: MP4 (H.264 codec)
Resolution: 1280x720 or 1920x1080
Frame rate: 30 fps
File size: Under 30MB
File name: CreatePT_Core3_DigitRecognizer.mp4
```

---

## Quick Reference: What College Board Wants

| Requirement | How to Show It |
|-------------|----------------|
| **Input** | Drawing digit on canvas |
| **Program running** | Click Recognize, see processing |
| **Output** | Prediction result with confidence |
| **≤ 60 seconds** | Keep it tight, no narration |
| **No voice** | Silent video only |

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
| API not responding | Check `python main.py` is running |
| Model not loaded | Verify `best_model.keras` exists in `backend/api/` |
| Recording too long | Cut the pipeline section, focus on input/output |
| Video file too large | Reduce resolution to 720p |
| Laggy recording | Close other apps, reduce browser zoom |
