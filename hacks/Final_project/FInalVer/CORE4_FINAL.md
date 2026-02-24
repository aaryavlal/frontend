---
title: "Core 4 - Final Written Responses"
permalink: /core4/final
layout: post
---

## Frontend (core-4 attempt summary)

Code snippet:
```javascript
const attempts = [];

function summarizeAttempts(attemptList, partialFloor) {
  let localSummary = "";
  for (let i = 0; i < attemptList.length; i++) {
    const a = attemptList[i];
    let label;

    if (a.score === a.maxScore) {
      label = "Perfect";
    } else if (a.score > partialFloor) {
      label = "Partial";
    } else {
      label = "No credit";
    }

    localSummary += `Attempt ${i + 1}: ${label} (${a.score}/${a.maxScore})\n`;
  }

  return localSummary.trim();
}

function recordAttempt(score, maxScore, feedback, serverSummary) {
  const attempt = { score, maxScore, feedback, serverSummary };
  attempts.push(attempt);
  return summarizeAttempts(attempts, 0);
}
```

### 1) Program Purpose (What it does)
My program was created to help students understand parallel computing tradeoffs by exploring how execution time changes with different inputs. The purpose is to allow users to experiment with Amdahl-style parameters and see how speedup and feedback respond.

### 2) Program Functionality (How it works)
The program allows a user to input sequential time, parallel time, processor count, and overhead using sliders, then submit a short answer for grading. It stores grading attempts in a list and uses a procedure to build a readable summary of those attempts. When the user submits an answer, the program processes the data using a procedure and produces feedback and attempt history on the screen.

### 3) Input and Output (Explicit Explanation)
The program receives input when the user types an answer into the quiz textbox and clicks the submit button. This input is used as a parameter in the procedure that summarizes attempts. The program outputs the score, feedback, and attempt history by displaying text in the results panel.

### 4) List / Data Abstraction Explanation
The program uses a list called `attempts` to store multiple related pieces of data. Each element in the list represents one quiz attempt, including score and maxScore. The list manages complexity because it allows the program to store and process multiple values using a loop. Without the list, I would need to create separate variables for each attempt, which would require repeating code and make the program harder to modify or expand.

### 5) Procedure Explanation
The procedure `summarizeAttempts(attemptList, partialFloor)` takes a parameter called `partialFloor`, which represents the threshold used to decide whether an attempt counts as partial credit. The parameter affects the program because it changes how each element in the list is labeled inside the conditional statement.

### 6) Algorithm Explanation (Sequencing, Selection, Iteration)
Iteration: The procedure uses a loop to iterate through each element in the list. This allows the program to process multiple attempts instead of just one.

Selection: The procedure includes a conditional statement that checks whether `a.score === a.maxScore`, else whether `a.score > partialFloor`. If the condition is true, the program labels the attempt as Perfect or Partial. Otherwise, it labels it as No credit.

Sequencing: Inside the procedure, the algorithm performs steps in order: it initializes a summary string, evaluates each element in the loop, updates the summary with the label and score, and returns the final summary text.

### 7) Boolean Condition (If asked)
The Boolean expression `a.score > partialFloor` evaluates to true when the attempt score is greater than the parameter value provided by the caller. It evaluates to false otherwise.

### 8) What Happens If the List Changes (If asked)
If additional elements are added to the `attempts` list, the loop will automatically process those elements because it iterates through the entire length of the list. This allows the program to scale without requiring additional variables or repeated code.

### 9) What Happens If the Condition Changes (If asked)
If the Boolean condition evaluates to false, the program executes the else branch, which labels the attempt as No credit. This ensures the program handles multiple possible cases.

---

## Backend (quiz grading attempt summary)

Code snippet:
```python
RECENT_ATTEMPTS = []

def summarize_attempts(attempts, max_items=5, partial_floor=0):
    if not attempts:
        return "No attempts have been recorded yet."

    summary_lines = []
    start_index = len(attempts) - 1
    end_index = max(-1, len(attempts) - 1 - max_items)

    for index in range(start_index, end_index, -1):
        attempt = attempts[index]
        score = attempt["score"]
        max_score = attempt["max_score"]

        if score == max_score:
            label = "Perfect"
        elif score > partial_floor:
            label = "Partial"
        else:
            label = "No credit"

        summary_lines.append(f"Attempt {index + 1}: {label} ({score}/{max_score})")

    summary_text = "\n".join(summary_lines)
    return summary_text
```

### 1) Program Purpose (What it does)
My program was created to grade student responses about parallel computing and provide feedback on their understanding. The purpose is to allow users to submit an answer and receive a scored response with a summary of past attempts.

### 2) Program Functionality (How it works)
The program allows a user to input a short answer through an API request. It stores attempt results in a list and uses a procedure to build a readable attempt summary. When the user submits an answer, the program processes the data using a procedure and returns score, feedback, and attempt history as JSON output.

### 3) Input and Output (Explicit Explanation)
The program receives input when the user submits a JSON body containing an answer to the quiz endpoint. This input is used as a parameter in the procedure that summarizes attempts. The program outputs a JSON response that includes the score, feedback, and attempt summary.

### 4) List / Data Abstraction Explanation
The program uses a list called `RECENT_ATTEMPTS` to store multiple related pieces of data. Each element in the list represents one graded attempt with a score and max_score. The list manages complexity because it allows the program to store and process multiple values using a loop. Without the list, I would need to create separate variables for each attempt, which would require repeating code and make the program harder to modify or expand.

### 5) Procedure Explanation
The procedure `summarize_attempts(attempts, max_items, partial_floor)` takes a parameter called `partial_floor`, which represents the threshold used to label partial credit. The parameter affects the program because it changes how each element in the list is handled in the conditional statement.

### 6) Algorithm Explanation (Sequencing, Selection, Iteration)
Iteration: The procedure uses a loop to iterate through each element in the list. This allows the program to process multiple attempts instead of just one.

Selection: The procedure includes a conditional statement that checks whether `score == max_score`, else whether `score > partial_floor`. If the condition is true, the program labels the attempt as Perfect or Partial. Otherwise, it labels it as No credit.

Sequencing: Inside the procedure, the algorithm performs steps in order: it initializes a summary list, evaluates each element in the loop, appends a formatted line, and returns the final summary text.

### 7) Boolean Condition (If asked)
The Boolean expression `score > partial_floor` evaluates to true when the attempt score is greater than the parameter value provided by the caller. It evaluates to false otherwise.

### 8) What Happens If the List Changes (If asked)
If additional elements are added to the `RECENT_ATTEMPTS` list, the loop will automatically process those elements because it iterates through the entire length of the list. This allows the program to scale without requiring additional variables or repeated code.

### 9) What Happens If the Condition Changes (If asked)
If the Boolean condition evaluates to false, the program executes the else branch, which labels the attempt as No credit. This ensures the program handles multiple possible cases.
