---
toc: false
layout: post
title: "Core 2 - Module 4: Why Rust?"
description: "Let's rewrite it in Rust!"
permalink: /cores/core-2/mutexes-rs
breadcrumbs: false
---

<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/ace.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-rust.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-c_cpp.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/theme-monokai.js"></script>
<script type="module" src="{{site.baseurl}}/assets/js/godbolt/godbolt.js"></script>

## TOCTOUs are Hard

The thing about race conditions is that they're 1) hard to find and 2) hard to debug. What if there was a language that could prevent this on the fly? Introducing: Rust!

Rust is a unique combination of:
- C's performance;
- Haskell's type systems and FP patterns;
- OCaml's immutability and pattern matching;
- and a special focus on memory safety.

There's a lot of examples that could be made here, but we'll focus first on Rust's specific approach to our previous concurrent implementation.

## Porting the Bank

We can try transpiling it naively first:

{% include editor.html code_path="rust/bank1.rs" lang="rust" %}

Now if you try running this, you'll notice that Rust fails to compile the code. The reason for this is Rust's ownership model for memory safety; global static variables would break that safety model, so we'll have to move this under `main()` instead:

{% include editor.html code_path="rust/bank2.rs" lang="rust" %}
