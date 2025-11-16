---
layout: post
title: Threads
permalink: /threads
---

<script type="module">
  import init, { run_rust_snippet_async } from 'https://mataiodoxion.github.io/csp-frontend-wasm-libs/pkg/snippets/snippets.js';

  async function loadExamples() {
    const url = 'https://mataiodoxion.github.io/csp-frontend-wasm-libs/pkg/examples.json';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const examples = await response.json();
      console.log('Loaded examples:', examples);
      return examples;
    } catch (err) {
      console.error('Error loading examples.json:', err);
      return [];
    }
  }

  async function run(code) {
    try {
      await init('https://mataiodoxion.github.io/csp-frontend-wasm-libs/pkg/snippets/snippets_bg.wasm');
      const result = await run_rust_snippet_async(code);
      console.log("Playground response:", result);
    } catch (err) {
      console.error("Error running Rust snippet:", err);
    }
  }

  (async () => {
    const examples = await loadExamples();
    if (examples.length > 0) {
      const code = examples[0].code;
      await run(code);
    } else {
      console.warn("No examples loaded.");
    }
  })();
</script>
