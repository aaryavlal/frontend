---
title: "Core 3 - Day 6 Team Presentation Script"
permalink: /core3/day6
layout: post
---

# Core 3: AI Digit Recognizer — Day 6

**Task:** Team Presentation Planning & Script Drafting

---

## Team Presentation Structure

### Overview: 1-Minute Team Intro + 5 Individual 1-Minute Demos

| Order | Presenter | Topic | Duration |
|-------|-----------|-------|----------|
| 0 | **ALL** | SUPERPOWER: Room Code Multiplayer System | 1 min |
| 1 | Dhyan | Core 1: GPU Assembly Simulator | 1 min |
| 2 | Lucas | Core 2: Mandelbrot Fractal | 1 min |
| 3 | **Rudra** | **Core 3: AI Digit Recognizer** | 1 min |
| 4 | Aaryav | Core 4: Speedup Calculator | 1 min |
| 5 | Tanay | Core 5: Hardware Performance Game | 1 min |

**Total Time:** ~6 minutes per visitor group

---

## SCRIPT: Team SUPERPOWER Intro (ALL - 1 min)

> **WHO SPEAKS:** Rotate or one designated speaker

```
[0:00-0:10] HOOK
"Welcome to Hardware Havoc! What if learning computer science felt like
a multiplayer game?"

[0:10-0:25] THE SUPERPOWER
"Our platform uses 6-character room codes to connect learners.
Join a room, complete modules together, and watch CPU cores light up —
but ONLY when everyone finishes. The collaboration IS the lesson."

[0:25-0:40] DEMO
[Show: Create room → Share code → Two users join → Complete module → Core lights up]
"See? When my teammate completes the same module, the core activates for both of us."

[0:40-0:55] WHY IT MATTERS
"This mirrors real parallel computing — cores must synchronize.
We built 6 learning modules, each teaching a different concept."

[0:55-1:00] HANDOFF
"Now each of us will show you our individual module. First up: [Dhyan/Core 1]"
```

---

## SCRIPT: Core 3 Individual Presentation (Rudra - 1 min)

```
[0:00-0:10] INTRO
"I built the AI Digit Recognizer. It uses a neural network to recognize
handwritten digits — the same technology behind postal code readers and
check processing."

[0:10-0:25] LIVE DEMO - INPUT
[Draw a "7" on the canvas]
"I draw a digit on this canvas. The drawing becomes a 28-by-28 pixel grid —
that's 784 numbers going into the neural network."

[0:25-0:40] LIVE DEMO - OUTPUT
[Click Recognize, show result]
"The CNN processes it through convolutional layers, pooling layers, and
dense layers — all sequentially. It predicts '7' with 98% confidence."

[0:40-0:50] TECHNICAL HIGHLIGHT
[Click "View Processing Pipeline" or show code briefly]
"Each layer extracts different features — edges first, then shapes,
then the final classification. About 200,000 calculations per digit."

[0:50-1:00] CONNECTION TO THEME
"This shows how sequential processing works — each layer depends on
the previous one. It's fast, but imagine if we could parallelize it.
That's what the other modules explore."
```

---

## SCRIPT: Backup Talking Points

If you have extra time or questions:

### "How does the neural network work?"
> "It's a CNN — Convolutional Neural Network. First layer finds edges,
> second finds shapes, third combines them into digit patterns.
> Trained on 60,000 handwritten samples from the MNIST dataset."

### "Why 28x28 pixels?"
> "That's the MNIST standard. Small enough to process quickly,
> large enough to capture digit details. Our preprocessing
> normalizes any drawing size to this format."

### "What if it gets it wrong?"
> "We show the top 3 predictions with confidence scores.
> If confidence is below 60%, we flag it as uncertain.
> The model is about 98.5% accurate on clean drawings."

### "Did you train the model yourself?"
> "Yes! Using TensorFlow and Keras. The architecture has
> 2 conv layers, 2 pooling layers, and 2 dense layers.
> Training took about 10 minutes on my laptop."

---

## Demo Flow Checklist

Before your presentation:

```
[ ] Backend running (python main.py)
[ ] Browser open to digit recognizer
[ ] Canvas cleared
[ ] Tested draw → recognize works
[ ] "View Processing Pipeline" tested
```

During presentation:

```
[ ] Speak clearly and make eye contact
[ ] Draw slowly so audience can follow
[ ] Point to results as you explain
[ ] Watch your time (1 minute max)
[ ] End with connection to team theme
```

---

## Visual Aids to Point Out

| Element | What to Say |
|---------|-------------|
| **Canvas** | "This is where users draw — any digit 0-9" |
| **Recognize Button** | "This triggers the API call to our Flask backend" |
| **Confidence %** | "The neural network's certainty — higher is better" |
| **Top 3 Predictions** | "Shows alternatives if the network is uncertain" |
| **Processed Image** | "This 28x28 image is what the CNN actually sees" |
| **Pipeline View** | "Watch the data flow through each layer" |

---

## Presentation Tips

1. **Practice out loud** — timing feels different when speaking
2. **Have a backup** — if live demo fails, show screenshots
3. **Engage the visitor** — "Want to try drawing a digit?"
4. **Connect to the theme** — always tie back to parallel computing
5. **Be ready for questions** — but don't let them derail your time

---

## Day 6 Checklist

- [x] Team presentation structure defined
- [x] SUPERPOWER intro script drafted
- [x] Individual Core 3 script drafted
- [x] Backup talking points prepared
- [x] Demo flow checklist created
- [ ] Assign who speaks for SUPERPOWER intro
- [ ] Practice full presentation with team
- [ ] **CHECKPOINT:** Practice presentation with teammate

---

## Next Steps (Day 7)

1. Prepare YOUR individual N@tM presentation
2. Choose 2-3 focus areas from: UI walkthrough, API demo, debugging, database
3. Practice with teammate
4. Time yourself — stay under 1 minute
