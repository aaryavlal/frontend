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


Application? Ok.

{% assign work = 'use std::sync::mpsc::{self, Sender, Receiver};
use std::thread;

// The data we will be processing
const DATA_LIST: [i32; 10] = [1, 5, 2, 8, 3, 9, 4, 7, 6, 10];

/// This function takes a slice of integers and processes them
/// to find the sum of all even numbers.
fn process_data(data: &[i32]) -> i32 {
    let mut even_sum = 0; // Sequencing: Start with initialization

    println!("    -> Processor is iterating through the list: {:?}", data);
    
    // Iteration: Loop through every number in the slice
    for num in data {
        // Selection: Check if the number is even
        if num % 2 == 0 {
            // Sequencing: Add the number to the running sum
            even_sum += num;
            print!("{} + ", num); // Optional: show the numbers being summed
        }
    }
    
    // Cleanup the output line and return the result
    println!("\n    -> Processing complete.");
    even_sum
}

// This function moves the processing logic into a separate thread.
fn sender_thread_function(tx: Sender<i32>) {
    // 1. Spawn a new thread
    thread::spawn(move || {
        println!("\n[Sender Thread] Starting data processing...");
        
        // 2. Execute the algorithmic function
        let result = process_data(&DATA_LIST);
        
        println!("[Sender Thread] Calculated sum: {}", result);
        
        // 3. Send the final result (the sum) through the channel
        tx.send(result).unwrap(); 
    });
}

// This function waits for the result from the sender thread.
fn receiver_thread_function(rx: Receiver<i32>) -> i32 {
    println!("\n[Receiver Function] Waiting for the processed data...");
    
    // Block until the value is received
    let received_sum = rx.recv().unwrap(); 
    
    received_sum
}

fn main() {
    // Create the channel for i32 data
    let (tx, rx) = mpsc::channel();

    // The sender function initiates the processing in a separate thread
    sender_thread_function(tx);

    // The receiver function waits for the result to come back
    let final_sum = receiver_thread_function(rx);

    println!("[Main Thread] Received Final Sum: {}", final_sum);
}' %}
{% include rust-editor.html code=work %}
