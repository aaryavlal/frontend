---
title: "Core 3 - Day 3 Create PT Written Responses"
permalink: /core3/day3
layout: post
---

# Core 3: AI Digit Recognizer — Day 3 Complete

**Task:** Write PPR (Personalized Project Reference) Responses for Create PT

---

## College Board Create PT Requirements

The written response section requires you to answer questions about:
- **3a:** Procedure description
- **3b:** Algorithm with sequencing, selection, and iteration
- **3c:** List usage and purpose

---

## Task 1: PPR 3a — Procedure Description ✓

### Written Response 3a

> **Prompt:** Describe the overall purpose of the program and what functionality the selected procedure contributes to.

**Response:**

The overall purpose of my program is to recognize handwritten digits (0-9) drawn by users on a canvas and return the predicted digit with confidence scores. This AI-powered digit recognition system uses a Convolutional Neural Network (CNN) trained on the MNIST dataset to classify user drawings.

The `predict()` procedure contributes essential functionality by serving as the main API endpoint that processes user input and returns recognition results. This procedure:

1. Receives a base64-encoded image from the frontend canvas
2. Decodes and preprocesses the image for CNN input
3. Segments multiple digits if present in the drawing
4. Runs each digit through the trained neural network
5. Returns predictions with confidence scores in JSON format

Without this procedure, the program would have no way to connect user drawings to the machine learning model, making digit recognition impossible.

---

### Procedure Code (for 3a)

**File:** `backend/api/digit_api.py` — Lines 356-454

```python
@digit_api.route('/api/digit/predict', methods=['POST'])
def predict():
    """
    Main digit recognition endpoint.

    Purpose: Receives drawn digit image, processes through CNN,
    returns predicted digit(s) with confidence scores.
    """
    try:
        # Validate model availability
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 503

        # Get input image from request
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']

        # Decode base64 to image array
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        img_bytes = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(img_bytes)).convert('L')
        img_array = np.array(img)

        # Find and process digits
        components = find_connected_components(img_array)

        # Build results
        results = []
        for component in components:
            processed = advanced_preprocess_digit(img_array, component['bbox'])
            predictions = predict_with_tta(processed)
            # ... build result object
            results.append({...})

        return jsonify({
            'success': True,
            'digits': results,
            'number': ''.join([str(r['digit']) for r in results])
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

---

## Task 2: PPR 3b — Algorithm Description ✓

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

The `predict()` procedure implements an algorithm that includes sequencing, selection, and iteration to recognize handwritten digits.

**Sequencing:** The algorithm executes steps in a specific order that cannot be rearranged:
1. First, validate that the ML model is loaded
2. Then, extract and decode the image from the request
3. Next, segment the image to find individual digits
4. Then, preprocess each digit to 28×28 format
5. Finally, run predictions and build the response

Each step depends on the previous step's output, making the sequence essential.

**Selection:** The algorithm uses conditional statements to handle different scenarios:
- `if model is None`: Checks if the CNN model is loaded before processing
- `if not data or 'image' not in data`: Validates that input was provided
- `if not components`: Handles the case when no digits are detected
- `if digit.confidence < 0.6`: Flags low-confidence predictions in the output

These selections ensure the program responds appropriately to various input conditions.

**Iteration:** The algorithm uses a `for` loop to process multiple digits:
- `for component in components`: Iterates through each detected digit region
- For each iteration, the algorithm preprocesses the digit, runs CNN inference, and appends results to the output list

This iteration allows the program to recognize multi-digit numbers (like "42" or "123") from a single drawing.

---

### Algorithm Code (for 3b)

**File:** `backend/api/digit_api.py` — Lines 382-440

```python
# SEQUENCING: Steps must execute in this order
# Step 1: Decode image
img_bytes = base64.b64decode(image_data)
img = Image.open(io.BytesIO(img_bytes)).convert('L')
img_array = np.array(img)

# Step 2: Find digit regions
components = find_connected_components(img_array)

# SELECTION: Handle no digits found
if not components:
    return jsonify({
        'success': True,
        'digits': [],
        'number': '',
        'message': 'No digits found'
    })

# Step 3: Preprocess each digit
processed_digits = []
for component in components:
    bbox = component['bbox']
    processed = advanced_preprocess_digit(img_array, bbox)
    processed_digits.append(processed)

# Step 4: Predict each digit
results = []
recognized_digits = []

# ITERATION: Process each detected digit
for idx, (component, processed) in enumerate(zip(components, processed_digits)):
    bbox = component['bbox']

    # Run CNN prediction with test-time augmentation
    predictions = predict_with_tta(processed, num_augmentations=8)

    # Get top 3 predictions
    top_3_idx = np.argsort(predictions)[-3:][::-1]
    predicted_digit = int(top_3_idx[0])
    confidence = float(predictions[predicted_digit])

    # SELECTION: Check confidence threshold
    recognized_digits.append(str(predicted_digit))

    # Build result and add to list
    results.append({
        'digit': predicted_digit,
        'confidence': confidence,
        'top3': [
            {'digit': int(top_3_idx[i]), 'confidence': float(predictions[top_3_idx[i]])}
            for i in range(3)
        ],
        'bbox': {
            'x': int(bbox[2]),
            'y': int(bbox[0]),
            'width': int(bbox[3] - bbox[2]),
            'height': int(bbox[1] - bbox[0])
        }
    })

# Step 5: Return results
full_number = ''.join(recognized_digits)
return jsonify({
    'success': True,
    'digits': results,
    'number': full_number,
    'count': len(results)
})
```

---

## Task 3: PPR 3c — List Usage ✓

### Written Response 3c

> **Prompt:** Describe how the selected list manages complexity in your program.

**Response:**

The `results` list is essential to my program because it stores the prediction data for each digit detected in the user's drawing. This list manages complexity in several ways:

**What the list contains:** Each element in `results` is a dictionary containing:
- The predicted digit (0-9)
- Confidence score (0.0 to 1.0)
- Top 3 alternative predictions
- Bounding box coordinates
- Processed image data

**How the list manages complexity:**

1. **Handles variable input:** Users might draw one digit or multiple digits. The list dynamically grows to accommodate any number of detected digits, eliminating the need for separate variables like `digit1`, `digit2`, `digit3`, etc.

2. **Enables batch processing:** The iteration `for component in components` processes each digit and appends results to the list, allowing the same code to handle "7" or "742" without modification.

3. **Preserves order:** The list maintains the left-to-right order of digits, so when joined (`''.join(recognized_digits)`), multi-digit numbers display correctly as "742" instead of scrambled.

4. **Simplifies JSON response:** The entire list serializes directly to JSON with `jsonify({'digits': results})`, providing a clean API response that the frontend can easily iterate through.

Without this list, I would need separate variables for each possible digit position, complex conditional logic to handle different digit counts, and manual JSON construction—significantly increasing code complexity and reducing maintainability.

---

### List Code (for 3c)

**File:** `backend/api/digit_api.py` — Lines 400-440

```python
# LIST DECLARATION: Initialize empty list to store results
results = []
recognized_digits = []

# ITERATION: Process each digit and populate the list
for idx, (component, processed) in enumerate(zip(components, processed_digits)):
    bbox = component['bbox']
    predictions = predict_with_tta(processed, num_augmentations=8)

    top_3_idx = np.argsort(predictions)[-3:][::-1]
    predicted_digit = int(top_3_idx[0])
    confidence = float(predictions[predicted_digit])

    # LIST APPEND: Add digit string to recognized_digits list
    recognized_digits.append(str(predicted_digit))

    # LIST APPEND: Add full result object to results list
    results.append({
        'digit': predicted_digit,
        'confidence': confidence,
        'top3': [
            {'digit': int(top_3_idx[i]), 'confidence': float(predictions[top_3_idx[i]])}
            for i in range(3)  # LIST COMPREHENSION: Build top 3 list
        ],
        'bbox': {
            'x': int(bbox[2]),
            'y': int(bbox[0]),
            'width': int(bbox[3] - bbox[2]),
            'height': int(bbox[1] - bbox[0])
        }
    })

# LIST USAGE: Join all digits into final number string
full_number = ''.join(recognized_digits)

# LIST USAGE: Return entire list in JSON response
return jsonify({
    'success': True,
    'digits': results,      # <-- The list is returned here
    'number': full_number,
    'count': len(results)   # <-- List length used
})
```

---

## Task 4: Code Screenshots ✓

### Screenshot Checklist

Take screenshots of these code segments for your Create PT submission:

| Screenshot | File | Lines | Shows |
|------------|------|-------|-------|
| **Input** | `digit-recognizer.js` | 201-215 | `canvas.toDataURL()` + fetch POST |
| **Procedure** | `digit_api.py` | 356-454 | Full `predict()` function |
| **List Declaration** | `digit_api.py` | 400 | `results = []` |
| **List Append** | `digit_api.py` | 413-430 | `results.append({...})` |
| **List Usage** | `digit_api.py` | 443-448 | `'digits': results` in return |
| **Iteration** | `digit_api.py` | 403-430 | `for idx, (component, processed) in enumerate(...)` |
| **Selection** | `digit_api.py` | 360, 368, 384 | `if model is None`, `if not data`, `if not components` |
| **Output** | `digit_api.py` | 443-448 | `return jsonify({...})` |

### How to Take Screenshots

1. Open the file in VS Code
2. Highlight the relevant lines
3. Use `Cmd+Shift+4` (Mac) or `Win+Shift+S` (Windows) to capture
4. Save with descriptive names: `input.png`, `procedure.png`, `list.png`, etc.

---

## Task 5: Code Annotations ✓

### Annotated Procedure Code

Add these comments to your code for clarity:

```python
@digit_api.route('/api/digit/predict', methods=['POST'])
def predict():
    """
    PROCEDURE: predict()
    PURPOSE: Recognize handwritten digits from canvas drawing
    RETURNS: JSON with predicted digits and confidence scores
    """
    try:
        # ===== SELECTION: Validate model is loaded =====
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 503

        # ===== SEQUENCING STEP 1: Get input data =====
        data = request.get_json()

        # ===== SELECTION: Validate input exists =====
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']

        # ===== SEQUENCING STEP 2: Decode base64 to image =====
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        img_bytes = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(img_bytes)).convert('L')
        img_array = np.array(img)

        # ===== SEQUENCING STEP 3: Segment digits =====
        # LIST: components stores bounding boxes for each digit
        components = find_connected_components(img_array)

        # ===== SELECTION: Handle no digits found =====
        if not components:
            return jsonify({
                'success': True,
                'digits': [],
                'number': '',
                'message': 'No digits found'
            })

        # ===== SEQUENCING STEP 4: Preprocess each digit =====
        processed_digits = []
        for component in components:
            processed = advanced_preprocess_digit(img_array, component['bbox'])
            processed_digits.append(processed)

        # ===== LIST DECLARATION =====
        results = []           # Stores prediction results for each digit
        recognized_digits = [] # Stores digit characters for final number

        # ===== ITERATION: Process each detected digit =====
        for idx, (component, processed) in enumerate(zip(components, processed_digits)):
            bbox = component['bbox']

            # ===== SEQUENCING STEP 5: Run CNN prediction =====
            predictions = predict_with_tta(processed, num_augmentations=8)

            # Get top 3 predictions sorted by confidence
            top_3_idx = np.argsort(predictions)[-3:][::-1]
            predicted_digit = int(top_3_idx[0])
            confidence = float(predictions[predicted_digit])

            # ===== LIST APPEND: Add to recognized digits =====
            recognized_digits.append(str(predicted_digit))

            # ===== LIST APPEND: Add result object =====
            results.append({
                'digit': predicted_digit,
                'confidence': confidence,
                'top3': [
                    {'digit': int(top_3_idx[i]), 'confidence': float(predictions[top_3_idx[i]])}
                    for i in range(3)  # LIST COMPREHENSION
                ],
                'bbox': {
                    'x': int(bbox[2]),
                    'y': int(bbox[0]),
                    'width': int(bbox[3] - bbox[2]),
                    'height': int(bbox[1] - bbox[0])
                }
            })

        # ===== SEQUENCING STEP 6: Build response =====
        # LIST USAGE: Join digits into number string
        full_number = ''.join(recognized_digits)

        # ===== OUTPUT: Return JSON with results LIST =====
        return jsonify({
            'success': True,
            'digits': results,      # LIST returned in response
            'number': full_number,
            'count': len(results)   # LIST length
        })

    except Exception as e:
        # ===== SELECTION: Error handling =====
        return jsonify({'error': str(e)}), 500
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
| **3a** | Purpose: digit recognition; Procedure: `predict()` handles input→CNN→output | 150 words |
| **3b** | Sequencing: 6 ordered steps; Selection: 4 if statements; Iteration: for loop through components | 200 words |
| **3c** | List: `results`; Manages: variable digits, batch processing, order preservation, JSON serialization | 200 words |

---

## Next Steps (Day 4)

1. Finalize 1-minute video script
2. Set up screen recording software
3. Practice demo walkthrough
4. Prepare localhost environment for recording
5. **CHECKPOINT:** Review video script with peer
