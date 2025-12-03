---
layout: post
title: "Dummy Quiz"
permalink: /dummy-quiz
---

<h1>Dummy Quiz</h1>

<p><strong>Question:</strong></p>
<p>
  In your own words, explain what parallel computing is and give one real-world
  example where it would be beneficial. Answer in 3–5 sentences.
</p>

<label for="answer"><strong>Your answer:</strong></label><br>
<textarea id="answer" rows="8" style="width:100%; max-width:700px;"
          placeholder="Type your answer here..."></textarea>
<br><br>
<button id="submit-btn">Submit Answer</button>

<pre id="result" style="margin-top:1rem; white-space:pre-wrap;"></pre>

<script>
  const API_URL = "http://localhost:5000/api/quiz/grade"; // change for production

  document.getElementById("submit-btn").addEventListener("click", async () => {
    const answerEl = document.getElementById("answer");
    const resultEl = document.getElementById("result");
    const answer = answerEl.value.trim();

    if (!answer) {
      resultEl.textContent = "Please enter an answer before submitting.";
      return;
    }

    resultEl.textContent = "Grading your answer...";

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer })
      });

      const data = await resp.json();

      if (!resp.ok) {
        resultEl.textContent =
          "Error: " + (data.error || resp.statusText);
        if (data.details) {
          resultEl.textContent += "\nDetails: " + data.details;
        }
        return;
      }

      const score = data.score ?? "N/A";
      const maxScore = data.max_score ?? "?";
      const feedback = data.feedback ?? data.raw_response ?? "";

      resultEl.textContent = `Score: ${score}/${maxScore}\n\nFeedback:\n${feedback}`;
    } catch (err) {
      console.error(err);
      resultEl.textContent = "Network or server error.";
    }
  });
</script>
