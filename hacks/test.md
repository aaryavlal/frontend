---
layout: post
title: Test
permalink: /test
---

<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/ace.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-rust.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/theme-monokai.js"></script>

Some text!

try the code example below:

{% include rust-editor.html %}


For example, we could have this code:

{% assign threads = 'use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }
}' %}
{% include rust-editor.html code=threads %}
