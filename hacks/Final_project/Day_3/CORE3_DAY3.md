---
title: "Core 3 - Day 3 Create PT Written Responses"
permalink: /core3/day3
layout: post
---

# Core 3: AI Digit Recognizer — PPR Written Responses

---

## 3a — Procedure Description

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

### Procedure Code

**File:** `backend/api/digit_api.py` — Lines 356-454

```python
@digit_api.route('/api/digit/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 503

        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']

        if ',' in image_data:
            image_data = image_data.split(',')[1]
        img_bytes = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(img_bytes)).convert('L')
        img_array = np.array(img)

        components = find_connected_components(img_array)

        results = []
        for component in components:
            processed = advanced_preprocess_digit(img_array, component['bbox'])
            predictions = predict_with_tta(processed)
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

## 3b — Algorithm Description

My procedure `predict_with_tta(image, num_augmentations)` implements an algorithm that includes sequencing, selection, and iteration to produce reliable handwritten digit predictions.

**Parameters:** It accepts two parameters — `image`, a 28×28 normalized NumPy array representing a single preprocessed digit, and `num_augmentations`, an integer (defaulting to 8) that controls how many augmented copies are generated for averaging.

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

### Algorithm Code

**File:** `backend/api/digit_api.py` — Lines 228-258

```python
def predict_with_tta(image, num_augmentations=8):
    """Test-Time Augmentation for robust predictions"""

    # SEQUENCING STEP 1: Initialize predictions list
    predictions = []

    # SEQUENCING STEP 2: Run original image through CNN
    predictions.append(model.predict(image.reshape(1, 28, 28, 1), verbose=0)[0])

    # ITERATION: Generate augmented copies and predict each
    for _ in range(num_augmentations - 1):
        aug_image = image.copy()

        angle = np.random.uniform(-5, 5)
        aug_image = rotate(aug_image, angle, reshape=False, mode='constant', cval=0)

        shift_x = np.random.randint(-2, 3)
        shift_y = np.random.randint(-2, 3)
        aug_image = shift(aug_image, [shift_y, shift_x], mode='constant', cval=0)

        # SEQUENCING STEP 3: Predict augmented copy and collect
        predictions.append(model.predict(aug_image.reshape(1, 28, 28, 1), verbose=0)[0])

    # SELECTION: Add ensemble model predictions if available
    if ensemble_models:
        # ITERATION: Run each ensemble model on original image
        for ens_model in ensemble_models:
            predictions.append(ens_model.predict(image.reshape(1, 28, 28, 1), verbose=0)[0])

    # SEQUENCING STEP 4: Average all predictions
    avg_prediction = np.mean(predictions, axis=0)

    # SEQUENCING STEP 5: Return averaged probability distribution
    return avg_prediction
```

---

## 3c — List Usage

The `results` list is essential to my program because it stores the prediction data for each digit detected in the user's drawing. This list manages complexity in several ways:

**What the list contains:** Each element in `results` is a dictionary containing:
- The predicted digit (0-9)
- Confidence score (0.0 to 1.0)
- Top 3 alternative predictions
- Bounding box coordinates

**How the list manages complexity:**

1. **Handles variable input:** Users might draw one digit or multiple digits. The list dynamically grows to accommodate any number of detected digits, eliminating the need for separate variables like `digit1`, `digit2`, `digit3`, etc.

2. **Enables batch processing:** The iteration `for component in components` processes each digit and appends results to the list, allowing the same code to handle "7" or "742" without modification.

3. **Preserves order:** The list maintains the left-to-right order of digits, so when joined (`''.join(recognized_digits)`), multi-digit numbers display correctly as "742" instead of scrambled.

4. **Simplifies JSON response:** The entire list serializes directly to JSON with `jsonify({'digits': results})`, providing a clean API response that the frontend can easily iterate through.

Without this list, I would need separate variables for each possible digit position, complex conditional logic to handle different digit counts, and manual JSON construction—significantly increasing code complexity and reducing maintainability.

### List Code

**File:** `backend/api/digit_api.py` — Lines 400-440

```python
# LIST DECLARATION
results = []
recognized_digits = []

# ITERATION: Process each digit and populate the list
for idx, (component, processed) in enumerate(zip(components, processed_digits)):
    bbox = component['bbox']
    predictions = predict_with_tta(processed, num_augmentations=8)

    top_3_idx = np.argsort(predictions)[-3:][::-1]
    predicted_digit = int(top_3_idx[0])
    confidence = float(predictions[predicted_digit])

    recognized_digits.append(str(predicted_digit))  # LIST APPEND

    results.append({                                 # LIST APPEND
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

full_number = ''.join(recognized_digits)  # LIST USAGE

return jsonify({
    'success': True,
    'digits': results,       # LIST returned in response
    'number': full_number,
    'count': len(results)    # LIST length
})
```

---

## Code Screenshots

### Input
**File:** `digit-recognizer.js` — Canvas capture + fetch POST

![Core3 Input]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3Input.png)

---

### Algorithm (Procedure)
**File:** `digit_api.py` — Full `predict_with_tta()` function

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
**File:** `digit_api.py` — `for _ in range(num_augmentations - 1)`

![Core3 Iteration]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3Iteration.png)

---

### Selection
**File:** `digit_api.py` — `if ensemble_models:`

![Core3 Selection Part 1]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3SelectionPart1.png)

![Core3 Selection Part 2]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3SelectionPart2.png)

![Core3 Selection Part 3]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3SelectionPart3.png)

---

### Output
**File:** `digit_api.py` — `return jsonify({...})`

![Core3 Output]({{site.baseurl}}/hacks/Final_project/Day_3/Snippits/Core3Output.png)

---



### Export
<div style="text-align:center; margin: 2rem 0;">
  <button id="export-pdf-btn" style="
    background: #1a1a2e;
    color: #fff;
    border: none;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    letter-spacing: 0.03em;
  ">Export to PDF</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script>
document.getElementById('export-pdf-btn').addEventListener('click', function () {
  var btn = this;
  btn.disabled = true;
  btn.textContent = 'Generating PDF…';

  // Find just the post body, not the full Jekyll page
  var source = document.querySelector('.post-content, article.post, main article, .page-content article')
               || document.querySelector('main')
               || document.body;

  // Clone so we can strip unwanted sections without touching the live page
  var clone = source.cloneNode(true);

  // Remove the screenshots section and everything after it
  var allHeadings = clone.querySelectorAll('h2');
  allHeadings.forEach(function (h) {
    if (h.textContent.trim() === 'Code Screenshots') {
      var node = h;
      var toRemove = [];
      // collect the heading and all its following siblings
      while (node) { toRemove.push(node); node = node.nextElementSibling; }
      toRemove.forEach(function (el) { el.parentNode && el.parentNode.removeChild(el); });
    }
  });

  // Remove the export button itself and any <script> tags
  clone.querySelectorAll('#export-pdf-btn, [id="export-pdf-btn"]').forEach(function (el) {
    el.closest('div') ? el.closest('div').remove() : el.remove();
  });
  clone.querySelectorAll('script, hr:last-of-type').forEach(function (el) { el.remove(); });

  // Add CB-style cover header
  var header = document.createElement('div');
  header.innerHTML = [
    '<div style="border-bottom:2px solid #000;padding-bottom:10pt;margin-bottom:18pt;">',
    '  <div style="font-family:\'Times New Roman\',serif;font-size:11pt;color:#000;">',
    '    <strong>AP Computer Science Principles — Create Performance Task</strong><br>',
    '    <strong>Personalized Project Reference (PPR) — Written Responses</strong><br>',
    '    <span style="font-size:10pt;">AI Digit Recognizer &nbsp;|&nbsp; Student: Rudra Joshi</span>',
    '  </div>',
    '</div>'
  ].join('');
  clone.insertBefore(header, clone.firstChild);

  // Inject CB-consistent PDF styles
  var style = document.createElement('style');
  style.textContent = [
    '* { box-sizing: border-box; }',
    // CB standard: Times New Roman 12pt, black on white
    'body, div, p, li, td { font-family: "Times New Roman", Times, serif !important; font-size: 12pt !important; color: #000 !important; background: #fff !important; }',
    'h1 { font-size: 14pt !important; font-weight: bold; margin: 0 0 14pt; }',
    // Section labels (3a, 3b, 3c) get a clear visual break
    'h2 { font-size: 13pt !important; font-weight: bold; margin: 20pt 0 8pt; padding-bottom: 4pt; border-bottom: 1px solid #000; page-break-after: avoid; }',
    'h3 { font-size: 12pt !important; font-weight: bold; font-style: italic; margin: 12pt 0 4pt; page-break-after: avoid; }',
    'p  { line-height: 1.8 !important; margin: 0 0 10pt; }',
    'ul, ol { margin: 0 0 10pt 22pt !important; padding: 0; }',
    'li { line-height: 1.8 !important; margin-bottom: 3pt; }',
    // Inline code: keep readable but minimal decoration
    'code { font-family: "Courier New", Courier, monospace !important; font-size: 10pt !important; background: #f0f0f0 !important; padding: 0 2pt; }',
    // Code blocks: CB expects code to be readable; light gray bg, no overflow
    'pre { font-family: "Courier New", Courier, monospace !important; font-size: 9pt !important;',
    '      background: #f5f5f5 !important; border: 1px solid #ccc; padding: 10pt; margin: 8pt 0 14pt;',
    '      white-space: pre-wrap !important; word-break: break-word !important;',
    '      overflow: visible !important; page-break-inside: avoid; line-height: 1.45 !important; }',
    'pre code { background: none !important; padding: 0; font-size: inherit !important; }',
    'hr { border: none; border-top: 1px solid #999; margin: 16pt 0; }',
    'blockquote { border-left: 3pt solid #555; margin: 8pt 0 8pt 12pt; padding-left: 10pt; font-style: italic; }',
    'strong { font-weight: bold; }',
    'em { font-style: italic; }',
    'img { display: none !important; }',   // screenshots excluded from written response PDF
  ].join('\n');
  clone.insertBefore(style, clone.firstChild);

  var opt = {
    margin:      [1, 1, 1, 1],            // standard 1-inch margins
    filename:    'PPR_Written_Responses_RudraJoshi.pdf',
    image:       { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
    jsPDF:       { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak:   { mode: ['css', 'legacy'], avoid: ['pre', 'h2', 'h3', 'ul', 'ol', 'li'] }
  };

  html2pdf().set(opt).from(clone).save().then(function () {
    btn.disabled = false;
    btn.textContent = 'Export to PDF';
  });
});
</script>
