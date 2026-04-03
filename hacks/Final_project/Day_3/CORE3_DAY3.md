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
- **3a:** Procedure description — *What does your procedure do and why?*
- **3b:** Algorithm with sequencing, selection, and iteration — *How does it work step-by-step?*
- **3c:** List usage and purpose — *How does your list manage program complexity?*

---

## Task 1: PPR 3a — Procedure Description ✓

### PURPOSE

> The `predict()` procedure enables real-time handwritten digit classification by receiving canvas drawings, processing them through a Convolutional Neural Network, and returning prediction results with confidence scores. It serves as the API endpoint that bridges user input with machine learning inference.

> **Parameter Note:** Because `predict()` in Flask has no parameters in its `def` line (data comes via HTTP request body), the **Abstraction** requirement (3b) is best demonstrated using `advanced_preprocess_digit(img_array, bbox)`, which has two explicit, clearly-defined parameters. This is the safer strategy for the rubric.

### Written Response 3a

> **Prompt:** Describe the overall purpose of the program and what functionality the selected procedure contributes to.

**Response:**

The purpose of this program is to provide an intelligent digit recognition system that enables users to draw handwritten numerical characters (0-9) on an interactive canvas interface and receive real-time classification predictions powered by a trained Convolutional Neural Network (CNN). This application demonstrates the practical implementation of machine learning inference within a web-based client-server architecture, utilizing the industry-standard MNIST dataset methodology for handwritten digit classification.

The student-developed procedure `predict()` serves as the top-level coordinator of this system. It orchestrates a three-tier processing hierarchy: at the top level, `predict()` handles the "big picture" — receiving user input, iterating through detected digit regions, and assembling the final response. At the mid level, it calls `advanced_preprocess_digit(img_array, bbox)`, which standardizes each raw digit region to the 28×28 pixel format the CNN requires. At the bottom level, `predict_with_tta()` performs the actual neural network inference. This hierarchical design means `predict()` cannot fulfill its purpose without its sub-algorithms; raw image data must first be standardized before the network can classify it.

The procedure uses **selection** through conditional statements (`if model is None`, `if not data`, `if not components`) to validate preconditions and handle edge cases. **Iteration** is implemented via a `for component in components` loop that processes each detected digit individually, enabling multi-digit recognition from a single canvas drawing. **Sequencing** ensures each step — decode, segment, preprocess, infer, respond — executes in the only order that produces correct output.

The `predict()` procedure fulfills these essential functions within the program architecture:

1. **Input Acquisition:** Receives and validates base64-encoded image data from the client canvas
2. **Data Transformation:** Decodes binary image data into a numerical array
3. **Feature Extraction:** Calls `find_connected_components()` to isolate individual digit regions
4. **Preprocessing Pipeline (Sub-Algorithm):** Calls `advanced_preprocess_digit(img_array, bbox)` — this sub-algorithm is *required* because the CNN only accepts 28×28 grayscale input; without it, inference is impossible
5. **Model Inference (Sub-Algorithm):** Calls `predict_with_tta()` to run the CNN and generate confidence scores across all ten digit classes
6. **Response Construction:** Aggregates results into a structured JSON response

The `predict()` procedure is indispensable to the program's functionality; without this computational pathway combining **sequencing**, **selection**, and **iteration** across its three-tier hierarchy, user-drawn input could not be transformed into machine-readable format, processed through the classification model, or returned as meaningful prediction output.

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

### PURPOSE

> The algorithm transforms raw image data into digit predictions through a sequential pipeline: decode base64 → segment digits → preprocess to 28×28 → run CNN inference → aggregate results. Selection handles error cases and validation, while iteration enables multi-digit recognition from a single drawing.
>
> **Structure:** `predict()` is the **main algorithm**; `advanced_preprocess_digit(img_array, bbox)` is the **sub-algorithm** with explicit parameters. Point to this hierarchy to satisfy both the algorithm and abstraction requirements.

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

The `predict()` procedure implements a two-level algorithm — a main algorithm and a sub-algorithm — that together include sequencing, selection, and iteration to recognize handwritten digits.

---

**Main Algorithm — `predict()`**

**Sequencing:** The main algorithm executes steps in a specific order that cannot be rearranged:
1. Validate that the CNN model is loaded
2. Extract and decode the base64 image from the request
3. Segment the image into individual digit regions
4. For each digit region, call the sub-algorithm to preprocess it
5. Run CNN inference on the preprocessed digit
6. Aggregate and return results

Each step depends on the previous step's output, making the sequence essential.

**Selection (in the main algorithm):** Conditional statements handle different scenarios:
- `if model is None`: Terminates early if the CNN model failed to load
- `if not data or 'image' not in data`: Validates that the client sent image data
- `if not components`: Returns an empty result set when no digits are detected

These selections ensure the program responds correctly to invalid or empty inputs.

**Iteration (in the main algorithm):** The `for component in components` loop iterates through every digit region detected in the drawing. For each iteration, the algorithm calls the sub-algorithm, runs CNN inference, and appends results to the output list. This iteration is what allows the program to recognize multi-digit numbers like "742" from a single canvas drawing — the same code handles any count of digits without modification.

---

**Sub-Algorithm — `advanced_preprocess_digit(img_array, bbox)`**

The main algorithm **cannot fulfill its purpose without this sub-algorithm.** The CNN was trained exclusively on 28×28 grayscale images in the MNIST format. Raw canvas drawings are arbitrary sizes and must be cropped, resized, and normalized before the network can classify them. `advanced_preprocess_digit` takes two parameters — `img_array` (the full canvas pixel data) and `bbox` (the bounding box coordinates of a single digit) — and returns a standardized 28×28 array ready for inference.

This creates a clear processing hierarchy:
- **Top Level:** `predict()` handles the big picture — routing, looping, and response assembly
- **Mid Level:** `advanced_preprocess_digit(img_array, bbox)` handles the math — cropping, scaling, and centering each digit to MNIST format
- **Bottom Level:** `predict_with_tta()` handles the inference — running the CNN and averaging predictions across augmented copies for accuracy

Without the sub-algorithm standardizing inputs to 28×28, the CNN would receive incorrectly-shaped data and produce meaningless output, making the entire digit recognition pipeline non-functional.

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

### PURPOSE

> The `results` list stores prediction data for each detected digit, enabling the program to handle variable-length input (single digit or multi-digit numbers). It maintains left-to-right spatial ordering and serializes directly to JSON for API response construction.

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

### Input
**File:** `digit-recognizer.js` — Canvas capture + fetch POST

![Core3 Input]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3Input.png)

---

### Algorithm (Procedure)
**File:** `digit_api.py` — Full `predict()` function

![Core3 Algorithm Part 1]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3imgAlgPart1.png)

![Core3 Algorithm Part 2]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3imgAlgPart2.png)

---

### List Declaration
**File:** `digit_api.py` — `results = []`

![Core3 List Declaration]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3imgList.png)

---

### List Append
**File:** `digit_api.py` — `results.append({...})`

![Core3 List Append]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3Listappend.png)

---

### List Usage
**File:** `digit_api.py` — `'digits': results` in return

![Core3 List Usage]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3ListUsage.png)

---

### Iteration
**File:** `digit_api.py` — `for idx, (component, processed) in enumerate(...)`

![Core3 Iteration]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3Iteration.png)

---

### Selection
**File:** `digit_api.py` — `if model is None`, `if not data`, `if not components`

![Core3 Selection Part 1]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3SelectionPart1.png)

![Core3 Selection Part 2]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3SelectionPart2.png)

![Core3 Selection Part 3]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3SelectionPart3.png)

---

### Output
**File:** `digit_api.py` — `return jsonify({...})`

![Core3 Output]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3Output.png)

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
| **3a** | Purpose: digit recognition; `predict()` is top-level coordinator; 3-tier hierarchy; sub-algorithms are required dependencies | 150 words |
| **3b** | Main algo: `predict()` — sequencing (6 steps), selection (3 if-checks), iteration (`for component in components`); Sub-algo: `advanced_preprocess_digit(img_array, bbox)` — has explicit params, required because CNN needs 28×28 MNIST format | 200 words |
| **3c** | List: `results`; Manages: variable digits, batch processing, order preservation, JSON serialization | 200 words |

> **Rubric strategy summary:**
> - Use `predict()` as the main student-developed procedure (shows loop + selection clearly)
> - Use `advanced_preprocess_digit(img_array, bbox)` for the **Abstraction / Parameter** requirement — it has two visible parameters and a clear, testable contract
> - Always name the dependency: `predict()` calls the sub-algorithm *because* the CNN mandates 28×28 MNIST-format input

---


