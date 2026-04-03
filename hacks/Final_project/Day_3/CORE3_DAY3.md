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

My program provides an intelligent digit recognition system that lets users draw handwritten numerical characters (0-9) on an interactive canvas interface and receive real-time classification predictions powered by a trained Convolutional Neural Network (CNN). It demonstrates machine learning inference within a web-based client-server architecture, using the industry-standard MNIST dataset methodology for handwritten digit classification.

My procedure `predict()` serves as the top-level coordinator of this system. It orchestrates a three-tier processing hierarchy: at the top level, `predict()` handles the "big picture" — receiving user input, iterating through detected digit regions, and assembling the final response. At the mid level, it calls `advanced_preprocess_digit(img_array, bbox)`, which standardizes each raw digit region to the 28×28 pixel format the CNN requires. At the bottom level, `predict_with_tta()` performs the actual neural network inference. This hierarchical design means `predict()` cannot fulfill its purpose without its sub-algorithms; raw image data must first be standardized before the network can classify it.

I implemented **selection** through conditional statements (`if model is None`, `if not data`, `if not components`) to validate preconditions and handle edge cases. **Iteration** is implemented via a `for component in components` loop that processes each detected digit individually, enabling multi-digit recognition from a single canvas drawing. **Sequencing** ensures each step — decode, segment, preprocess, infer, respond — executes in the only order that produces correct output.

`predict()` fulfills these essential functions within my program:

1. **Input Acquisition:** Receives and validates base64-encoded image data from the client canvas
2. **Data Transformation:** Decodes binary image data into a numerical array
3. **Feature Extraction:** Calls `find_connected_components()` to isolate individual digit regions
4. **Preprocessing Pipeline (Sub-Algorithm):** Calls `advanced_preprocess_digit(img_array, bbox)` — this sub-algorithm is *required* because the CNN only accepts 28×28 grayscale input; without it, inference is impossible
5. **Model Inference (Sub-Algorithm):** Calls `predict_with_tta()` to run the CNN and generate confidence scores across all ten digit classes
6. **Response Construction:** Aggregates results into a structured JSON response

`predict()` is indispensable to my program; without this computational pathway combining **sequencing**, **selection**, and **iteration** across its three-tier hierarchy, user-drawn input could not be transformed into machine-readable format, processed through the classification model, or returned as meaningful prediction output.

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

> The student-developed procedure `predict_with_tta(image, num_augmentations)` performs robust CNN inference using Test-Time Augmentation — running the model on the original image and multiple augmented copies, then averaging the results to produce a more reliable confidence score.
>
> **Structure:** `predict_with_tta(image, num_augmentations)` is the **main algorithm** with two explicit parameters. It is called by `predict()` for every detected digit. The two-parameter signature satisfies the abstraction/parameter requirement directly.

### Written Response 3b

> **Prompt:** Describe how the selected algorithm includes sequencing, selection, and iteration.

**Response:**

My procedure `predict_with_tta(image, num_augmentations)` implements an algorithm that includes sequencing, selection, and iteration to produce reliable handwritten digit predictions.

**Parameters:** It accepts two parameters — `image`, a 28×28 normalized NumPy array representing a single preprocessed digit, and `num_augmentations`, an integer (defaulting to 8) that controls how many augmented copies are generated for averaging.

---

**Sequencing:** My algorithm executes steps in a precise order that cannot be rearranged:
1. Initialize an empty `predictions` list
2. Run the original `image` through the CNN model and append the output probability array to `predictions`
3. For each of the remaining `num_augmentations - 1` iterations, copy the image, apply a random rotation (−5° to +5°) and a random pixel shift, run the augmented copy through the CNN, and append its output
4. Check if additional ensemble models are loaded; if so, run the original image through each and append those outputs as well
5. Average all collected prediction arrays with `np.mean`
6. Return the single averaged probability distribution

Each step depends on the previous step's results — the list must be populated before it can be averaged, and the original pass must come first.

**Selection:** I use `if ensemble_models:` to check whether additional trained models were loaded at startup. If true, my algorithm iterates through each ensemble model and adds its predictions to the pool before averaging. This selection lets my procedure work correctly with either a single model or a multi-model ensemble, without requiring two separate code paths.

**Iteration:** I use two loops:
- `for _ in range(num_augmentations - 1):` — iterates to generate augmented copies of the input digit, each with a different random rotation and shift. Running the CNN on these varied copies captures how the model responds to slight drawing inconsistencies.
- `for ens_model in ensemble_models:` (inside the selection block) — iterates through any loaded ensemble models, collecting additional predictions.

Averaging all predictions — original, augmented, and ensemble — is what makes my procedure more accurate than a single forward pass. Without iteration, only one prediction would exist; without sequencing, the average could be computed before all predictions are collected; without selection, my procedure would crash if no ensemble models were present.

I call `predict_with_tta` from my top-level `predict()` endpoint once per detected digit (inside a `for component in components` loop), making it the core inference engine of my entire digit recognition system.

---

### Algorithm Code (for 3b)

**File:** `backend/api/digit_api.py` — Lines 228-258

```python
def predict_with_tta(image, num_augmentations=8):
    """Test-Time Augmentation for robust predictions"""

    # ===== SEQUENCING STEP 1: Initialize predictions list =====
    predictions = []

    # ===== SEQUENCING STEP 2: Run original image through CNN =====
    predictions.append(model.predict(image.reshape(1, 28, 28, 1), verbose=0)[0])

    # ===== ITERATION: Generate augmented copies and predict each =====
    for _ in range(num_augmentations - 1):
        aug_image = image.copy()

        # Apply random rotation (-5° to +5°)
        angle = np.random.uniform(-5, 5)
        aug_image = rotate(aug_image, angle, reshape=False, mode='constant', cval=0)

        # Apply random pixel shift
        shift_x = np.random.randint(-2, 3)
        shift_y = np.random.randint(-2, 3)
        aug_image = shift(aug_image, [shift_y, shift_x], mode='constant', cval=0)

        # ===== SEQUENCING STEP 3: Predict augmented copy and collect =====
        predictions.append(model.predict(aug_image.reshape(1, 28, 28, 1), verbose=0)[0])

    # ===== SELECTION: Add ensemble model predictions if available =====
    if ensemble_models:
        # ===== ITERATION: Run each ensemble model on original image =====
        for ens_model in ensemble_models:
            predictions.append(ens_model.predict(image.reshape(1, 28, 28, 1), verbose=0)[0])

    # ===== SEQUENCING STEP 4: Average all predictions =====
    avg_prediction = np.mean(predictions, axis=0)

    # ===== SEQUENCING STEP 5: Return averaged probability distribution =====
    return avg_prediction
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
| **3b** | Main algo: `predict_with_tta(image, num_augmentations)` — sequencing (6 steps), selection (`if ensemble_models`), iteration (augmentation loop + ensemble loop); two explicit params satisfy abstraction requirement | 200 words |
| **3c** | List: `results`; Manages: variable digits, batch processing, order preservation, JSON serialization | 200 words |

> **Rubric strategy summary:**
> - Use `predict_with_tta(image, num_augmentations)` as the **3b student-developed procedure** — two explicit parameters, clear sequencing, selection (`if ensemble_models`), and two iterations
> - Use `predict()` in **3a** to explain overall program purpose and the three-tier hierarchy
> - Use `advanced_preprocess_digit(img_array, bbox)` if an additional parameter-based procedure is needed elsewhere

---


