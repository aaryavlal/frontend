---
toc: false
layout: post
title: "Core 2 - Module 3: Mutexes"
description: "What if you need shared data?"
permalink: /cores/core-2/mutexes
breadcrumbs: false
---

<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/ace.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-rust.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/theme-monokai.js"></script>

Let's say you want to write a document with a friend collaboratively (like Google Docs). In developing this model, you're likely to run into a few problems stemming from the fundamental idea of concurrency.

## Safety

Here's some food for thought:
- How would you program your computer to handle two people trying to write to the same file at the same time?
  - If you accept one edit, the accept the edit right after, wouldn't you get conflicts?
- What if someone wants the view the file at the same time someone else is writing to it?
  - How would you fix a lapse in the synced state of data?

There's actually a name for all these problems, which we'll run through now

<details>
    <summary>Race Conditions</summary>
    
    {% assign threads = 'use std::thread;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
    
    fn main() {
      let counter = Arc::new(AtomicUsize::new(0));
      let mut handles = vec![];
      
      for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
          for _ in 0..1000 {
            let current = counter.load(Ordering::SeqCst);
            counter.store(current + 1, Ordering::SeqCst);
          }
        });
        handles.push(handle);
      }
      
      for handle in handles {
        handle.join().unwrap()
      }
      
      println!("Final count: {}", counter.load(Ordering::SeqCst));
      println!("Expected count: 10000");
    }' %}
    {% include rust-editor.html code=threads %}
</details>
