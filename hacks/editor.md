---
layout: post
title: Ace Editor
permalink: /editor
---

<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/ace.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-rust.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/theme-monokai.js"></script>

<style>
    #editor-container {
        position: relative;
    }
    #editor {
        height: 800px;
        width: 100%;
    }
    #editor-buttons {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
        display: flex;
        gap: 5px;
    }
    #output {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        white-space: pre-wrap;
        font-size: 14pt;
    }
</style>

<div id="editor-container">
    <div id="editor"></div>
    <div id="editor-buttons">
        <button id="copy-btn">Copy</button>
        <button id="run-btn">Run</button>
    </div>
</div>
<div id="output"></div>

<script>
    // Initialize Ace Editor
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/rust");
    editor.setOptions({
      fontSize: "14pt"
    });

    // Set some default Rust code
    editor.setValue(`fn main() {
    println!("Hello, world!");
}`);

    document.getElementById('copy-btn').addEventListener('click', function() {
        navigator.clipboard.writeText(editor.getValue()).then(function() {
            console.log('Code copied to clipboard');
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
        });
    });

    document.getElementById('run-btn').addEventListener('click', async function() {
        const code = editor.getValue();
        const outputDiv = document.getElementById('output');
        
        outputDiv.textContent = 'Sending to Rust Playground...\n\n';
    
        try {
            const response = await fetch('https://play.rust-lang.org/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channel: "stable",
                    mode: "debug",
                    edition: "2021",
                    crateType: "bin",
                    code: code,
                    tests: false
                })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                outputDiv.textContent = 
                    `Execution successful!\n\n` +
                    `Output:\n${result.stdout || '(no stdout)'}\n` +
                    (result.stderr ? `\nWarnings:\n${result.stderr}` : '');
            } else {
                outputDiv.textContent = 
                    `Execution failed!\n\n` +
                    `Error:\n${result.stderr || result.stdout || 'Unknown error'}`;
            }
    
        } catch (err) {
            outputDiv.textContent = `Request failed: ${err.message}\n\nUnknown error I was unbothered to write a catch for`;
        }
    });
</script>
