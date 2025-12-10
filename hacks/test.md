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


You can also use sending and syncing:
{% assign msg = 'use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {received}");
    }
}' %}
{% include rust-editor.html code=msg %}


Passing threads between functions:

{% assign pass = 'use std::sync::mpsc::{self, Sender, Receiver};
use std::thread;

// This function takes a Sender<String> and moves it into a new thread.
// The thread sends a message through the channel.
fn sender_thread_function(tx: Sender<String>) {
    // Spawn a new thread to handle the sending logic
    thread::spawn(move || {
        let val = String::from("Hello from the sender function!");
        println!("Sender thread is sending: {}", val);
        
        // Use the passed-in sender to send the value
        // .unwrap() is used for simplicity, handling errors is better in production code.
        tx.send(val).unwrap(); 
    });
}

// This function takes a Receiver<String> and blocks until it receives a message.
fn receiver_thread_function(rx: Receiver<String>) -> String {
    println!("Receiver function is waiting for a message...");
    
    // Block until a value is received from the channel
    let received_value = rx.recv().unwrap(); 
    
    // Return the received value
    received_value
}

fn main() {
    // 1. Create a new mpsc channel
    // tx is the Sender (producer), rx is the Receiver (consumer)
    let (tx, rx) = mpsc::channel();

    // 2. Call the sender function, giving it the Sender end (tx)
    // The sender function will spawn a thread and send data on this channel.
    sender_thread_function(tx);

    // 3. Call the receiver function, giving it the Receiver end (rx)
    // This function will block the main thread until the data is received.
    let received_data = receiver_thread_function(rx);

    println!("Main thread successfully received: {}", received_data);
}' %}

{% include rust-editor.html code=pass %}
