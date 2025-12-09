---
toc: true
layout: post
title: Intro to Concurrency
description: A (ferrous) intro to concurrency in programming
permalink: /concurrency/1
breadcrumbs: true
---

## Introduction 
*Concurrency* is a way of structuring a program so that it can handle multiple tasks seemingly *at the same time* by interleaving their execution.

> Imagine a single chef (the processor core) juggling cooking different dishes (tasks), pausing one to stir another, and then going back to the first. It's about **managing** multiple tasks that are in progress to make progress on all of them, which is crucial for high performance systems like web servers that handle many user requests simultaneously.

## Concurrency vs. Parallelism

While often used interchangeably, concurrency and parallelism have a key distinction:
- **Concurrency** is about *dealing with many things at once (composition)* by interleaving execution. 
- **Parallelism** is about *doing many things at once (execution)* by physically executing multiple tasks simultaneously on multiple processor cores or machines.
