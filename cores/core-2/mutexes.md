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
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-c_cpp.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/theme-monokai.js"></script>
<script type="module" src="{{site.baseurl}}/assets/js/godbolt/godbolt.js"></script>

Let's say you want to write a document with a friend collaboratively (like Google Docs). In developing this model, you're likely to run into a few problems stemming from the fundamental idea of concurrency.

## Safety

Here's some food for thought:
- How would you program your computer to handle two people trying to write to the same file at the same time?
  - If you accept one edit, the accept the edit right after, wouldn't you get conflicts?
- What if someone wants the view the file at the same time someone else is writing to it?
  - How would you fix a lapse in the synced state of data?

There's actually a name for all these problems, which we'll run through now

## Race Conditions

Let's model this with a bank.
{% include editor.html code_path="c/bank1.c" lang="c" %}

Now let's assume that the customer has multiple people accessing their account at once; we can simulate this with multiple threads attempting `deposit();` and `withdraw();` actions:

{% include editor.html code_path="c/bank2.c" lang="c" %}

Running this multiple times, we might see final balances `!= 0` because of race conditions occurring.

The problem is that multiple threads are simultaneously trying to access the same data while one mutates it.

For example, the statement `the_bank.cash += n` expands to:

```c
int cur_cash += the_bank.cash;
the_bank.cash = cur_cash + n;
```

The line performs both a read and write operation, but what if between the first and second line, a change to `the_bank.cash` occurs? That is, what if

```c
int cur_cash += the_bank.cash;
// the_bank.cash is mutated by another thread
the_bank.cash = cur_cash + n;
```

The same race condition occurs for the withdrawal action: `the_bank.cash -= n`.

## Mutexes!

Now we'll introduce the idea of mutexes. A mutex is a **mu**tually **ex**clusive flag, which basically ensures that if a process is already performing some operation on a data object, then no other process is allowed to access or modify that object until the operation is complete. In short, you're locking a piece of data from other threads so that you can safely mutate that data without a race condition. In code:

{% include editor.html code_path="c/bank3.c" lang="c" %}
(The amount of operations has been decreased to run properly on Godbolt's hardware allocations; still, the idea remains)

Now, you might be asking: why can't we just add a separate lock for deposit and concurrent operations? Wouldn't that be better? Well, you'd still run into the simultaneous read/write problem. By locking each operation separately, you still run into the problem of each operation potentially overwriting the other.

For example, one thread might hold the lock to withdraw (maybe `n = 2`), while another thread with its own lock to deposit might be trying to deposit `n = 2`.
```c
// Starting with n = 2

/* Ideal order of operations */ 
// Thread 1 START
// the_bank.cash = 2
int cur_cash += the_bank.cash;
the_bank.cash = cur_cash - n;
// the_bank.cash = 0
// Thread 1 END

// Thread 2 START
int cur_cash += the_bank.cash;
the_bank.cash = cur_cash + n;
// the_bank.cash = 2
// Thread 2 END
    
/* Potential TOCTOU */
// the_bank.cash = 2
// Thread 1 START
int cur_cash += the_bank.cash;
// ...
// Thread 2 START
int cur_cash += the_bank.cash;
the_bank.cash = cur_cash - n;
// the_bank.cash = 0
// Thread 2 END
// ...
// Thread 1 still thinks cur_cash = 2
the_bank.cash = cur_cash + n;
// the_bank.cash = 4
```

***

<div style="text-align: center; width: 100%; height: 100px;">
    <a href="{{site.baseurl}}/cores/core-2/mutexes-rs">Next Up: Rewrite it in Rust!</a>
</div>
