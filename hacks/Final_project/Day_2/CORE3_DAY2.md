---
title: "Core 3 - Day 2 Code Deep Dive"
permalink: /core3/day2
layout: post
---

# Core 3: AI Digit Recognizer — Day 2 Complete

**Task:** Document INPUT, OUTPUT, PROCEDURE, and Data Flow for Create PT

---

## Task 1: INPUT Documentation ✓

### Frontend Input Code

**File:** `frontend/assets/js/digit-recognizer.js` — Lines 201-232

```javascript
async recognizeDigits() {
    const statusIndicator = document.getElementById('status-indicator');
    statusIndicator.classList.remove('ready');
    statusIndicator.classList.add('processing');

    try {
        // INPUT: Get canvas as base64 image
        const imageData = this.canvas.toDataURL('image/png');

        // INPUT: Send POST request to backend API
        const response = await fetch(`${this.API_URL}/predict`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({ image: imageData })
        });

        const data = await response.json();

        if (data.success) {
            this.displayResults(data);
        } else {
            alert('Error: ' + (data.error || 'Unknown error'));
        }

    } catch (error) {
        console.error('Recognition error:', error);
        alert('Failed to recognize digits. Is the Flask server running?');
    } finally {
        statusIndicator.classList.remove('processing');
        statusIndicator.classList.add('ready');
    }
}
```

### Input Breakdown

| Component | Description | Code Location |
|-----------|-------------|---------------|
| **Canvas Element** | 500x500 HTML5 canvas where user draws | `digitrecog-standalone.html:30` |
| **Drawing Handler** | Mouse/touch events capture strokes | `digit-recognizer.js:44-76` |
| **Data Conversion** | `canvas.toDataURL('image/png')` converts to base64 | `digit-recognizer.js:208` |
| **API Request** | POST to `/api/digit/predict` with JSON body | `digit-recognizer.js:211-215` |

### Input Data Format

```json
{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQ..."
}
```

### Postman Test (Complete Working Example)

**Method:** `POST`

**URL:**
```
http://localhost:8405/api/digit/predict
```

**Headers:**

| Key | Value |
|-----|-------|
| Content-Type | application/json |

**Body (raw JSON):**
```json
{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAAAAABVicqIAAAAxUlEQVR4nO3YQQ5AQBBEUSPuf2V2ViJd1SF/qFlazM/ThMzYl+fX+kIjkUQSSSSR70e2q4ujs+PFV/A7tyuRn0ZG9+fufKduNupKKo0pZlKCzCCpQSaQFCF8SRWCl5QhdEkdApcIELZEgaAlEoQs0SBgiQjhSlQIViJDqBIdApUYEKbEgSAlFoQo8SBAiQnhSVwITmJDaBIfApM0ICxJB4KStCAkSQ9SjOy9M1fhyHa4EGUmPkcavFsBPV2JJJJIIokkcr8OlX4mwEghVJUAAAAASUVORK5CYII="
}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "count": 1,
    "number": "7",
    "digits": [
        {
            "digit": 7,
            "confidence": 0.85,
            "top3": [
                {"digit": 7, "confidence": 0.85},
                {"digit": 1, "confidence": 0.08},
                {"digit": 9, "confidence": 0.03}
            ],
            "bbox": {"x": 20, "y": 20, "width": 60, "height": 60},
            "processed_image": "data:image/png;base64,..."
        }
    ]
}
```

**Test Image:** The base64 above is a 100x100 PNG with a hand-drawn "7"

**Common Errors:**

| Error | Cause | Fix |
|-------|-------|-----|
| `{"error": "No image provided"}` | Missing `image` key in JSON | Add `"image":` to body |
| `{"error": "Model not loaded"}` | `best_model.keras` missing | Check backend/api/ folder |
| `Connection refused` | Flask not running | Run `python main.py` |
| `404 Not Found` | Wrong endpoint URL | Use `/api/digit/predict` |

**Health Check Endpoint:**
```
GET http://localhost:8405/api/digit/health
```
Response:
```json
{
    "status": "ok",
    "model_loaded": true,
    "ensemble_models": 0,
    "tta_enabled": true
}
```

---

## Task 2: OUTPUT Documentation ✓

### Backend Output Code

**File:** `backend/api/digit_api.py` — Lines 443-448

```python
# OUTPUT: Return JSON response with results LIST
return jsonify({
    'success': True,
    'digits': results,      # LIST of digit predictions
    'number': full_number,  # Combined recognized number as string
    'count': len(results)   # Number of digits found
})
```

### Output JSON Structure

```json
{
    "success": true,
    "digits": [
        {
            "digit": 7,
            "confidence": 0.9834,
            "top3": [
                { "digit": 7, "confidence": 0.9834 },
                { "digit": 1, "confidence": 0.0089 },
                { "digit": 9, "confidence": 0.0045 }
            ],
            "bbox": {
                "x": 150,
                "y": 100,
                "width": 200,
                "height": 300
            },
            "processed_image": "data:image/png;base64,..."
        }
    ],
    "number": "7",
    "count": 1
}
```

### Output Breakdown

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether prediction succeeded |
| `digits` | **LIST** | Array of digit prediction objects |
| `digits[].digit` | int | Predicted digit (0-9) |
| `digits[].confidence` | float | Confidence score (0.0-1.0) |
| `digits[].top3` | **LIST** | Top 3 predictions with scores |
| `digits[].bbox` | object | Bounding box coordinates |
| `digits[].processed_image` | string | 28x28 preprocessed image (base64) |
| `number` | string | All digits combined as string |
| `count` | int | Number of digits detected |

### Frontend Output Display

**File:** `frontend/assets/js/digit-recognizer.js` — Lines 234-293

```javascript
displayResults(data) {
    // Main result display
    const resultNumber = document.querySelector('.result-number');
    const resultConfidence = document.querySelector('.result-confidence');

    if (data.digits.length === 0) {
        resultNumber.textContent = '?';
        resultConfidence.textContent = 'No digits found';
        return;
    }

    // OUTPUT: Display recognized number
    resultNumber.textContent = data.number;

    // OUTPUT: Calculate and display average confidence
    const avgConfidence = data.digits.reduce((sum, d) => sum + d.confidence, 0) / data.digits.length;
    resultConfidence.textContent = `Confidence: ${(avgConfidence * 100).toFixed(1)}%`;

    // OUTPUT: Display individual digit cards (ITERATION through LIST)
    const container = document.getElementById('individual-digits');
    container.innerHTML = '';

    data.digits.forEach((digit, idx) => {
        // Create card for each digit in the LIST
        const card = document.createElement('div');
        card.className = 'digit-card';

        // SELECTION: Add warning class if low confidence
        if (digit.confidence < 0.6) {
            card.classList.add('low-confidence');
        }

        // ... build card UI with digit info
        container.appendChild(card);
    });
}
```

---

## Task 3: PROCEDURE Identification ✓

### Main Procedure: `predict()`

**File:** `backend/api/digit_api.py` — Lines 356-454

```python
@digit_api.route('/api/digit/predict', methods=['POST'])
def predict():
    """
    PROCEDURE: Main digit recognition endpoint

    Contains:
    - SEQUENCING: Steps execute in order (decode → segment → preprocess → predict → respond)
    - SELECTION: if/else for error handling and confidence thresholds
    - ITERATION: for loop through detected digit components
    - LIST: components list, results list, predictions array
    """
    try:
        # SEQUENCING STEP 1: Validate model is loaded
        if model is None:
            return jsonify({
                'error': 'Model not loaded',
                'message': 'The digit recognition model is not available.'
            }), 503

        # SEQUENCING STEP 2: Get and validate input
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']

        # SELECTION: Check for empty image
        if not image_data or len(image_data.strip()) == 0:
            return jsonify({'error': 'Empty image data'}), 400

        # SEQUENCING STEP 3: Decode base64 to image array
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        img_bytes = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(img_bytes)).convert('L')
        img_array = np.array(img)

        # SEQUENCING STEP 4: Find digit components
        # LIST: components stores all detected digits
        components = find_connected_components(img_array)

        # SELECTION: Handle no digits found
        if not components:
            return jsonify({
                'success': True,
                'digits': [],
                'number': '',
                'message': 'No digits found'
            })

        # SEQUENCING STEP 5: Preprocess each digit
        processed_digits = []
        for component in components:
            bbox = component['bbox']
            processed = advanced_preprocess_digit(img_array, bbox)
            processed_digits.append(processed)

        # SEQUENCING STEP 6: Predict each digit
        # LIST: results stores prediction for each digit
        results = []
        recognized_digits = []

        # ITERATION: Process each detected digit component
        for idx, (component, processed) in enumerate(zip(components, processed_digits)):
            bbox = component['bbox']

            # Call prediction with test-time augmentation
            predictions = predict_with_tta(processed, num_augmentations=8)

            # LIST: Get top 3 predictions sorted by confidence
            top_3_idx = np.argsort(predictions)[-3:][::-1]
            predicted_digit = int(top_3_idx[0])
            confidence = float(predictions[predicted_digit])

            recognized_digits.append(str(predicted_digit))

            # Build result object and add to results LIST
            results.append({
                'digit': predicted_digit,
                'confidence': confidence,
                'top3': [
                    {
                        'digit': int(top_3_idx[i]),
                        'confidence': float(predictions[top_3_idx[i]])
                    }
                    for i in range(3)  # ITERATION: Build top 3 list
                ],
                'bbox': {
                    'x': int(bbox[2]),
                    'y': int(bbox[0]),
                    'width': int(bbox[3] - bbox[2]),
                    'height': int(bbox[1] - bbox[0])
                },
                'processed_image': f'data:image/png;base64,{processed_base64}'
            })

        # SEQUENCING STEP 7: Combine and return results
        full_number = ''.join(recognized_digits)

        return jsonify({
            'success': True,
            'digits': results,
            'number': full_number,
            'count': len(results)
        })

    except Exception as e:
        # SELECTION: Error handling
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
```

### Procedure Summary Table

| Element | Location | Description |
|---------|----------|-------------|
| **SEQUENCING** | Lines 360-448 | 7 sequential steps: validate → decode → segment → preprocess → predict → build response → return |
| **SELECTION** | Lines 360, 368, 372, 384, 450 | `if` statements for model check, input validation, empty check, no digits, error handling |
| **ITERATION** | Lines 394, 403, 425 | `for` loops through components, digit processing, top 3 building |
| **LIST** | Lines 382, 400, 409, 422 | `components`, `processed_digits`, `results`, `top_3_idx` arrays |

### Supporting Procedures

| Function | Line | Purpose |
|----------|------|---------|
| `find_connected_components()` | 48 | Segments multiple digits from image |
| `advanced_preprocess_digit()` | 146 | Normalizes digit to 28x28 for CNN |
| `predict_with_tta()` | 228 | Runs prediction with augmentation |

---

## Task 4: Data Flow Trace ✓

### Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER ACTION                                     │
│                                                                              │
│  User draws digit "7" on 500x500 canvas                                     │
│  User clicks "Recognize" button                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND: INPUT                                      │
│  File: frontend/assets/js/digit-recognizer.js                               │
│                                                                              │
│  1. recognizeDigits() called (line 201)                                     │
│  2. canvas.toDataURL('image/png') → base64 string (line 208)                │
│  3. fetch() POST to /api/digit/predict (line 211)                           │
│                                                                              │
│  Data: { "image": "data:image/png;base64,iVBORw0K..." }                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP POST
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND: RECEIVE                                     │
│  File: backend/api/digit_api.py                                             │
│                                                                              │
│  4. Flask receives request at @digit_api.route('/api/digit/predict')        │
│  5. request.get_json() extracts image data (line 366)                       │
│  6. base64.b64decode() → PIL Image → numpy array (line 378-380)             │
│                                                                              │
│  Data: numpy array shape (500, 500) grayscale                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND: SEGMENT                                     │
│  Function: find_connected_components() (line 48)                            │
│                                                                              │
│  7. Binarize image (threshold 250)                                          │
│  8. Horizontal projection to find digit boundaries                          │
│  9. Create bounding boxes for each digit                                    │
│                                                                              │
│  Data: LIST of components [{'bbox': (y1,y2,x1,x2), 'center_x': 250}]       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND: PREPROCESS                                  │
│  Function: advanced_preprocess_digit() (line 146)                           │
│                                                                              │
│  10. Crop digit from image using bbox                                       │
│  11. Binary threshold + invert colors                                       │
│  12. Rotation correction using image moments                                │
│  13. Morphological thinning (erosion)                                       │
│  14. Resize to fit in 20x20 box                                             │
│  15. Center in 28x28 canvas (MNIST format)                                  │
│  16. Gaussian blur + normalize to 0-1                                       │
│                                                                              │
│  Data: numpy array shape (28, 28) normalized float32                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND: PREDICT (CNN)                               │
│  Function: predict_with_tta() (line 228)                                    │
│                                                                              │
│  17. Original image → model.predict() → probabilities                       │
│  18. ITERATION: 7 augmented versions (rotation ±5°, shift ±2px)            │
│  19. Each augmented → model.predict() → probabilities                       │
│  20. If ensemble models loaded: each ensemble → predict()                   │
│  21. Average all predictions                                                │
│                                                                              │
│  Data: numpy array shape (10,) — probability for each digit 0-9            │
│        Example: [0.001, 0.002, 0.003, 0.001, 0.001, 0.001, 0.002, 0.983, 0.004, 0.002]
│                                                                  └─ digit 7 = 98.3%
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND: BUILD RESPONSE                              │
│  Function: predict() (lines 409-448)                                        │
│                                                                              │
│  22. np.argsort(predictions)[-3:][::-1] → top 3 indices                    │
│  23. Build result dict with digit, confidence, top3, bbox                   │
│  24. Convert processed image to base64                                      │
│  25. Append to results LIST                                                 │
│  26. Join all digits into full_number string                                │
│  27. Return jsonify() response                                              │
│                                                                              │
│  Data: JSON response (see OUTPUT section)                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP Response
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND: DISPLAY                                    │
│  Function: displayResults() (line 234)                                      │
│                                                                              │
│  28. Parse JSON response                                                    │
│  29. Display main result number                                             │
│  30. Calculate average confidence                                           │
│  31. ITERATION: forEach digit in digits LIST                               │
│  32. Create card elements with digit info                                   │
│  33. SELECTION: Add warning if confidence < 0.6                            │
│                                                                              │
│  UI: Shows "7" with "Confidence: 98.3%" and processed image                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Network Tab Trace (for debugging demo)

1. **Request Headers:**
   ```
   POST /api/digit/predict HTTP/1.1
   Host: localhost:8405
   Content-Type: application/json
   ```

2. **Request Payload:**
   ```json
   {"image":"data:image/png;base64,iVBORw0KGgo..."}
   ```

3. **Response Headers:**
   ```
   HTTP/1.1 200 OK
   Content-Type: application/json
   ```

4. **Response Body:**
   ```json
   {"success":true,"digits":[{"digit":7,"confidence":0.983,...}],"number":"7","count":1}
   ```

---

## Task 5: CHECKPOINT Ready ✓

### What to Show Instructor

1. **Task Selection:** Core 3 - AI Digit Recognizer (Sequential CNN)

2. **Code Files:**
   - Frontend: `frontend/assets/js/digit-recognizer.js`
   - Backend: `backend/api/digit_api.py`
   - UI: `frontend/assets/digitrecog-standalone.html`

3. **Key Code Segments:**
   - INPUT: Lines 201-215 in `digit-recognizer.js`
   - OUTPUT: Lines 443-448 in `digit_api.py`
   - PROCEDURE: Lines 356-454 in `digit_api.py`

4. **Create PT Elements Identified:**

| Requirement | Location | Evidence |
|-------------|----------|----------|
| INPUT | `digit-recognizer.js:208` | `canvas.toDataURL()` |
| OUTPUT | `digit_api.py:443-448` | `jsonify({...})` |
| LIST | `digit_api.py:382,400` | `components`, `results` |
| PROCEDURE | `digit_api.py:356-454` | `predict()` function |
| SEQUENCING | `digit_api.py:360-448` | Steps 1-7 in order |
| SELECTION | `digit_api.py:360,384` | `if model is None`, `if not components` |
| ITERATION | `digit_api.py:394,403` | `for component in components` |

---

## Day 2 Checklist

- [x] Task 1: Documented INPUT (canvas → toDataURL → fetch POST)
- [x] Task 2: Documented OUTPUT (JSON response structure + UI display)
- [x] Task 3: Identified PROCEDURE (`predict()` with sequencing/selection/iteration)
- [x] Task 4: Traced complete data flow (33 steps from draw to display)
- [x] Task 5: Prepared CHECKPOINT materials for instructor

---

## Next Steps (Day 3)

1. Write PPR 3a: Describe the `predict()` procedure
2. Write PPR 3b: Explain sequencing, selection, iteration in the code
3. Write PPR 3c: Describe how `results` LIST is used
4. Take screenshots of code segments
5. Add comments/annotations to code
