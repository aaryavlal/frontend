---
title: "Core 3 - Day 1"
permalink: /core3/day1
layout: post
---

# Core 3: AI Digit Recognizer — Day 1 Complete

**Team Member:** Rudra
**Core Assignment:** Core 3 - Sequential CNN Digit Recognition

---

## Task 1: Individual Task Identified ✓

**My Task:** AI Digit Recognizer with Sequential CNN Pipeline

**What it does:** User draws a digit (0-9) on a canvas, the system processes it through a sequential CNN (Convolutional Neural Network), and returns the predicted digit with confidence scores.

**Why it fits Create PT:**
- Clear INPUT → PROCEDURE → OUTPUT flow
- Uses LISTS (pixel arrays, confidence scores, layer activations)
- Has defined PROCEDURES with sequencing, selection, and iteration

---

## Task 2: API Routes Reviewed ✓

### Backend API: `backend/api/digit_api.py`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/digit/predict` | POST | Main prediction - takes base64 image, returns digit + confidence |
| `/api/digit/visualize` | POST | Returns CNN layer activations for educational visualization |
| `/api/digit/health` | GET | Check if model is loaded |

### Key Functions:

| Function | Line | Purpose |
|----------|------|---------|
| `find_connected_components()` | 48 | Segments multiple digits from image using projection |
| `advanced_preprocess_digit()` | 146 | Prepares 28x28 normalized image for CNN |
| `predict_with_tta()` | 228 | Test-Time Augmentation for robust predictions |
| `extract_layer_activations()` | 270 | Gets intermediate CNN layer outputs |
| `predict()` | 356 | Main endpoint handler |
| `visualize()` | 456 | Visualization endpoint handler |

---

## Task 3: Frontend + Backend Code Mapped ✓

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND                                       │
│  frontend/assets/digitrecog-standalone.html                             │
│  frontend/assets/css/digrecog.css                                       │
│  frontend/assets/js/digrecog.js                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ User draws digit on canvas
                                    │ Click "Recognize" button
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           INPUT                                          │
│  Canvas (500x500) → toDataURL() → base64 string                         │
│  POST to /api/digit/predict with JSON: { "image": "data:image/png..." } │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      BACKEND PROCEDURE                                   │
│  backend/api/digit_api.py                                               │
│                                                                          │
│  1. Decode base64 → PIL Image → numpy array                             │
│  2. find_connected_components() - segment digits (LIST of components)   │
│  3. For EACH component (ITERATION):                                     │
│     a. advanced_preprocess_digit() → 28x28 normalized array             │
│     b. predict_with_tta() → model inference with augmentation           │
│     c. Get top 3 predictions (SELECTION: if confidence > threshold)     │
│  4. Combine results into response                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           OUTPUT                                         │
│  JSON Response:                                                          │
│  {                                                                       │
│    "success": true,                                                      │
│    "digits": [                          ← LIST of digit results         │
│      {                                                                   │
│        "digit": 7,                      ← predicted digit               │
│        "confidence": 0.98,              ← confidence score              │
│        "top3": [...],                   ← LIST of top 3 predictions     │
│        "bbox": {...},                   ← bounding box coordinates      │
│        "processed_image": "base64..."   ← preprocessed 28x28 image      │
│      }                                                                   │
│    ],                                                                    │
│    "number": "7",                       ← full recognized number        │
│    "count": 1                                                            │
│  }                                                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND DISPLAY                                    │
│  - Show predicted digit in large text                                    │
│  - Show confidence percentage                                            │
│  - Display top 3 predictions with bars                                   │
│  - Show processed 28x28 image                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

### File Locations Summary

| Component | File Path | Key Lines |
|-----------|-----------|-----------|
| Frontend UI | `frontend/assets/digitrecog-standalone.html` | Canvas, buttons, results display |
| Frontend CSS | `frontend/assets/css/digrecog.css` | Styling |
| Frontend JS | `frontend/assets/js/digrecog.js` | fetch() calls, canvas handling |
| Backend API | `backend/api/digit_api.py` | All endpoints |
| CNN Model | `backend/api/best_model.keras` | Trained TensorFlow model |
| Core Page | `frontend/cores/core-3.md` | Embeds the digit recognizer |

---

## Task 4: 1-Minute Video Script Outline ✓

### Video Script: "AI Digit Recognition - Sequential CNN Pipeline"

**[0:00-0:10] HOOK + INTRO**
> "Watch me draw a digit and see AI recognize it in real-time using a sequential neural network pipeline."

**[0:10-0:25] INPUT DEMONSTRATION**
- Show drawing canvas
- Draw a digit (e.g., "7")
- Click "Recognize" button
- Highlight: "The canvas converts my drawing to a 28x28 pixel array - that's 784 numbers going into the system."

**[0:25-0:40] PROCEDURE EXPLANATION**
- Show the prediction happening
- Explain briefly: "The backend runs my drawing through a CNN - that's Convolutional Neural Network. It processes the image through multiple layers sequentially: convolution to detect edges, pooling to reduce size, then dense layers to classify."
- Click "View Processing Pipeline" to show layer visualization

**[0:40-0:55] OUTPUT + LIST USAGE**
- Show the results: predicted digit, confidence score
- Highlight the JSON response structure
- Point out: "The system returns a LIST of predictions - the top 3 most likely digits with their confidence scores."

**[0:55-1:00] CLOSE**
> "This demonstrates input, procedure with iteration through layers, and output with lists - all running sequentially through the neural network."

---

## Task 5: Team Sync Notes ✓

### Presentation Role Assignment

| Team Member | Core | Presentation Focus |
|-------------|------|-------------------|
| Rudra | Core 3 | AI Digit Recognizer - CNN Pipeline |
| [Teammate 2] | Core ? | [TBD] |
| [Teammate 3] | Core ? | [TBD] |
| [Teammate 4] | Core ? | [TBD] |
| [Teammate 5] | Core ? | [TBD] |

### My N@tM Presentation Focus:
1. **Live Demo:** Draw digits, show recognition
2. **Code Walkthrough:** Show `predict()` function flow
3. **Visualization:** Use "View Processing Pipeline" to explain CNN layers
4. **API Demo:** Show Postman request/response

---

## Create PT Code Segments (Preview)

### INPUT (Frontend fetch call)
```javascript
// frontend/assets/js/digrecog.js
const imageData = canvas.toDataURL('image/png');
const response = await fetch('/api/digit/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageData })
});
```

### PROCEDURE with List + Iteration (Backend)
```python
# backend/api/digit_api.py - Line 392-413
# LIST: components stores all detected digits
components = find_connected_components(img_array)

# ITERATION: Process each digit
for idx, (component, processed) in enumerate(zip(components, processed_digits)):
    # PROCEDURE: Run prediction
    predictions = predict_with_tta(processed, num_augmentations=8)

    # SELECTION: Get top predictions
    top_3_idx = np.argsort(predictions)[-3:][::-1]
    predicted_digit = int(top_3_idx[0])

    # Add to results LIST
    results.append({
        'digit': predicted_digit,
        'confidence': float(predictions[predicted_digit]),
        'top3': [...]
    })
```

### OUTPUT (JSON Response)
```python
# backend/api/digit_api.py - Line 443-448
return jsonify({
    'success': True,
    'digits': results,      # LIST of digit predictions
    'number': full_number,  # Combined string
    'count': len(results)
})
```

---

## Day 1 Checklist

- [x] Task 1: Identified individual task (Core 3: AI Digit Recognizer)
- [x] Task 2: Reviewed API routes (`/api/digit/predict`, `/api/digit/visualize`)
- [x] Task 3: Mapped frontend + backend code with data flow diagram
- [x] Task 4: Drafted 1-minute video script outline
- [ ] Task 5: Team sync - assign other members their cores (DO THIS TODAY)

---

## Next Steps (Day 2)

1. Document INPUT code segment with screenshots
2. Document OUTPUT code segment with screenshots
3. Identify the exact PROCEDURE function for PPR
4. Trace full data flow with network tab open
5. **CHECKPOINT:** Show instructor task selection + code mapping
