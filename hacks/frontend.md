---
toc: true
layout: post
title: Prototype of a Room Code system
description: This is a prototype to test the join code feature
permalink: /prototyperoomcode
breadcrumbs: true
---

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
    min-height: 100vh;
    padding: 20px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-radius: 15px;
    border: 2px solid #38bdf8;
  }

  .header h1 {
    color: #38bdf8;
    font-size: 2.5em;
    margin-bottom: 10px;
  }

  .section {
    background: #1e293b;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 25px;
    border-left: 4px solid #38bdf8;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  .section h2 {
    color: #38bdf8;
    margin-bottom: 20px;
    font-size: 1.8em;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #94a3b8;
    font-weight: 500;
  }

  .form-group input {
    width: 100%;
    padding: 12px;
    background: #0f172a;
    border: 2px solid #334155;
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #38bdf8;
  }

  .btn {
    padding: 12px 30px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    color: #0f172a;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(56, 189, 248, 0.4);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-secondary {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    color: #e2e8f0;
  }

  .btn-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
  }

  .btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .status {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .status.success {
    background: rgba(34, 197, 94, 0.2);
    border: 2px solid #22c55e;
    color: #86efac;
  }

  .status.error {
    background: rgba(239, 68, 68, 0.2);
    border: 2px solid #ef4444;
    color: #fca5a5;
  }

  .status.info {
    background: rgba(56, 189, 248, 0.2);
    border: 2px solid #38bdf8;
    color: #7dd3fc;
  }

  .hidden {
    display: none;
  }

  .room-info {
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .room-info h3 {
    color: #38bdf8;
    margin-bottom: 15px;
  }

  .room-info p {
    margin: 10px 0;
    color: #cbd5e1;
  }

  .room-code {
    font-size: 2em;
    font-weight: bold;
    color: #38bdf8;
    text-align: center;
    padding: 20px;
    background: #0f172a;
    border-radius: 8px;
    letter-spacing: 8px;
    margin: 20px 0;
  }

  .members-list {
    list-style: none;
    margin-top: 15px;
  }

  .member-item {
    background: #334155;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .member-name {
    font-weight: bold;
    color: #e2e8f0;
  }

  .member-progress {
    color: #94a3b8;
    font-size: 0.9em;
  }

  .progress-modules {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .module-badge {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 2px solid #334155;
    background: #1e293b;
    color: #64748b;
  }

  .module-badge.completed {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    border-color: #22c55e;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
  }

  /* CPU Chip Layout */
  .cpu-container {
    position: relative;
    max-width: 600px;
    margin: 30px auto;
    padding: 40px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 20px;
    border: 3px solid #334155;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease;
  }

  .cpu-container.all-active {
    border-color: #38bdf8;
    background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
    box-shadow: 0 0 60px rgba(56, 189, 248, 0.8), 0 10px 40px rgba(0, 0, 0, 0.5);
    animation: cpuGlow 2s infinite;
  }

  @keyframes cpuGlow {
    0%, 100% { 
      box-shadow: 0 0 60px rgba(56, 189, 248, 0.8), 0 10px 40px rgba(0, 0, 0, 0.5);
    }
    50% { 
      box-shadow: 0 0 80px rgba(56, 189, 248, 1), 0 10px 40px rgba(0, 0, 0, 0.5);
    }
  }

  .cpu-label {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9em;
    font-weight: bold;
    color: #64748b;
    letter-spacing: 2px;
    transition: color 0.5s;
  }

  .cpu-container.all-active .cpu-label {
    color: #38bdf8;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
  }

  .cpu-visualization {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    position: relative;
  }

  /* Pin connectors on sides */
  .cpu-pins {
    position: absolute;
    display: flex;
    gap: 8px;
  }

  .cpu-pins.left {
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }

  .cpu-pins.right {
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }

  .cpu-pins.top {
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
  }

  .cpu-pins.bottom {
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
  }

  .pin {
    width: 4px;
    height: 15px;
    background: #334155;
    border-radius: 2px;
    transition: background 0.5s;
  }

  .cpu-pins.left .pin,
  .cpu-pins.right .pin {
    width: 15px;
    height: 4px;
  }

  .cpu-container.all-active .pin {
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    box-shadow: 0 0 5px rgba(56, 189, 248, 0.8);
  }

  .node {
    background: #1e293b;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: 2px solid #334155;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .node::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(56, 189, 248, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .node.active::before {
    opacity: 1;
  }

  .node.active {
    border-color: #38bdf8;
    background: linear-gradient(135deg, #1e293b 0%, #0c4a6e 100%);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
  }

  .node-icon {
    font-size: 2.5em;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }

  .node.active .node-icon {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  .node-label {
    color: #94a3b8;
    font-weight: bold;
    font-size: 0.9em;
    position: relative;
    z-index: 1;
  }

  .node.active .node-label {
    color: #38bdf8;
  }

  /* Circuit traces connecting nodes */
  .circuit-trace {
    position: absolute;
    background: #334155;
    transition: background 0.5s, box-shadow 0.5s;
    z-index: 0;
  }

  .cpu-container.all-active .circuit-trace {
    background: linear-gradient(90deg, #38bdf8 0%, #3b82f6 100%);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
  }

  .trace-horizontal {
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
  }

  .trace-vertical {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
  }

  .module-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 20px;
  }

  .module-btn {
    padding: 15px;
    background: #334155;
    border: 2px solid #475569;
    border-radius: 8px;
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.3s;
  }

  .module-btn:hover {
    background: #475569;
    border-color: #38bdf8;
  }

  .module-btn.completed {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    border-color: #22c55e;
  }

  .config-section {
    background: rgba(245, 158, 11, 0.1);
    border-left-color: #f59e0b;
  }

  .config-section h2 {
    color: #f59e0b;
  }

  .inline-inputs {
    display: flex;
    gap: 15px;
    align-items: flex-end;
  }

  .inline-inputs .form-group {
    flex: 1;
  }

  /* Celebration Animations */
  .celebration-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .celebration-card {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border: 3px solid;
    border-radius: 20px;
    padding: 40px;
    max-width: 500px;
    text-align: center;
    animation: slideUp 0.5s ease-out;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .celebration-card.personal {
    border-color: #38bdf8;
  }

  .celebration-card.room-module {
    border-color: #22c55e;
  }

  .celebration-card.room-complete {
    border-color: #f59e0b;
    background: linear-gradient(135deg, #1e293b 0%, #451a03 100%);
  }

  .celebration-icon {
    font-size: 5em;
    margin-bottom: 20px;
    animation: bounce 0.6s ease-in-out;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .celebration-title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .celebration-card.room-module .celebration-title {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .celebration-card.room-complete .celebration-title {
    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .celebration-message {
    color: #cbd5e1;
    font-size: 1.1em;
    margin-bottom: 25px;
    line-height: 1.6;
  }

  .celebration-btn {
    padding: 15px 40px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    color: #0f172a;
    border: none;
    border-radius: 10px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .celebration-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(56, 189, 248, 0.5);
  }

  /* Confetti Animation */
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    background: #38bdf8;
    position: absolute;
    animation: confetti-fall 3s linear forwards;
  }

  @keyframes confetti-fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }

  /* Toast Notification */
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    color: #0f172a;
    padding: 20px 30px;
    border-radius: 12px;
    font-weight: bold;
    z-index: 999;
    animation: slideInRight 0.5s ease-out, slideOutRight 0.5s ease-out 2.5s forwards;
    box-shadow: 0 10px 30px rgba(56, 189, 248, 0.4);
  }

  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  /* Confirmation Modal */
  .confirm-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 40000;
    animation: fadeIn 0.2s ease-out;
  }

  .confirm-modal.show {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .confirm-dialog {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border: 3px solid #ef4444;
    border-radius: 15px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(239, 68, 68, 0.3);
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .confirm-icon {
    font-size: 4em;
    text-align: center;
    margin-bottom: 20px;
  }

  .confirm-title {
    font-size: 1.8em;
    font-weight: bold;
    color: #ef4444;
    text-align: center;
    margin-bottom: 15px;
  }

  .confirm-message {
    color: #cbd5e1;
    font-size: 1.1em;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 25px;
  }

  .confirm-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .confirm-btn {
    padding: 12px 30px;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .confirm-btn:hover {
    transform: translateY(-2px);
  }

  .confirm-btn.cancel {
    background: #475569;
    color: #e2e8f0;
  }

  .confirm-btn.cancel:hover {
    background: #64748b;
    box-shadow: 0 5px 15px rgba(71, 85, 105, 0.4);
  }

  .confirm-btn.confirm {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .confirm-btn.confirm:hover {
    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.5);
  }

  /* Module Button Completion Animation */
  .module-btn.completing {
    animation: moduleComplete 0.6s ease-out;
  }

  @keyframes moduleComplete {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
    100% { transform: scale(1); }
  }

  /* Node Activation Animation */
  .node.activating {
    animation: nodeActivate 0.8s ease-out;
  }

  @keyframes nodeActivate {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(56, 189, 248, 0);
    }
    50% {
      transform: scale(1.15);
      box-shadow: 0 0 50px rgba(56, 189, 248, 0.8);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 30px rgba(56, 189, 248, 0.5);
    }
  }

  /* Glossary Styles */
  .glossary-entry {
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 15px;
    border-left: 4px solid #38bdf8;
    transition: all 0.3s;
  }

  .glossary-entry:hover {
    background: #1e293b;
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2);
  }

  .glossary-term {
    font-size: 1.3em;
    font-weight: bold;
    color: #38bdf8;
    margin-bottom: 10px;
  }

  .glossary-definition {
    color: #e2e8f0;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .glossary-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #94a3b8;
    font-size: 0.85em;
    padding-top: 10px;
    border-top: 1px solid #334155;
  }

  .glossary-actions {
    display: flex;
    gap: 10px;
  }

  .glossary-action-btn {
    padding: 5px 12px;
    font-size: 0.85em;
    background: #334155;
    border: 1px solid #475569;
    border-radius: 5px;
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
  }

  .glossary-action-btn:hover {
    background: #475569;
    border-color: #38bdf8;
  }

  .glossary-action-btn.delete {
    border-color: #ef4444;
  }

  .glossary-action-btn.delete:hover {
    background: #ef4444;
    border-color: #ef4444;
  }

  .glossary-empty {
    text-align: center;
    padding: 40px;
    color: #94a3b8;
  }

  .glossary-empty-icon {
    font-size: 3em;
    margin-bottom: 15px;
  }

  textarea {
    width: 100%;
    padding: 12px;
    background: #0f172a;
    border: 2px solid #334155;
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  textarea:focus {
    outline: none;
    border-color: #38bdf8;
  }

  /* Edit Form Styles */
  .edit-form {
    background: #1e293b;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
  }

  .edit-form .form-group {
    margin-bottom: 15px;
  }

  .edit-form-actions {
    display: flex;
    gap: 10px;
  }

  /* Admin Rooms Modal */
  .admin-rooms-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 30000;
    overflow-y: auto;
    animation: fadeIn 0.3s ease-out;
  }

  .admin-rooms-modal.show {
    display: block;
  }

  .admin-rooms-dialog {
    max-width: 1200px;
    margin: 40px auto;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-radius: 15px;
    border: 3px solid #38bdf8;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .admin-rooms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #334155;
  }

  .admin-rooms-header h2 {
    color: #38bdf8;
    margin: 0;
  }

  .admin-rooms-actions {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  .room-card {
    background: #0f172a;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    border-left: 4px solid #334155;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
  }

  .room-card:hover {
    background: #1e293b;
    border-left-color: #38bdf8;
  }

  .room-card.demo {
    border-left-color: #22c55e;
  }

  .room-card-info {
    flex: 1;
  }

  .room-card-title {
    font-size: 1.3em;
    font-weight: bold;
    color: #e2e8f0;
    margin-bottom: 10px;
  }

  .room-card-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    color: #94a3b8;
    font-size: 0.95em;
  }

  .room-card-detail {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .room-card-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .btn-small {
    padding: 8px 16px;
    font-size: 0.9em;
  }

  .room-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .room-stats-summary {
    background: #0f172a;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .stat-item {
    text-align: center;
  }

  .stat-value {
    font-size: 2.5em;
    font-weight: bold;
    color: #38bdf8;
  }

  .stat-label {
    color: #94a3b8;
    margin-top: 5px;
  }
</style>

<div class="container">
  <div class="header">
    <h2>🖥️ Room System Test</h2>
    <p>Parallel Computing Education Platform</p>
  </div>

  <!-- Configuration Section -->
  <div class="section config-section">
    <h2>⚙️ Configuration</h2>
    <div class="form-group">
      <label for="apiUrl">Backend API URL:</label>
      <input type="text" id="apiUrl" value="http://localhost:5000" placeholder="http://localhost:5000">
    </div>
  </div>

  <!-- Authentication Section -->
  <div class="section">
    <h2>🔐 Step 1: Authentication</h2>
    <div id="authStatus" class="status info">
      Not logged in
    </div>

    <div id="loginForm">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter username">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter password">
      </div>
      <div style="display: flex; gap: 15px;">
        <button class="btn" onclick="login()">Login</button>
        <button class="btn btn-secondary" onclick="register()">Register</button>
      </div>
    </div>

    <div id="loggedInInfo" class="hidden">
      <p>Logged in as: <strong id="currentUsername"></strong></p>
      <p>Role: <strong id="currentRole"></strong></p>
      <div style="display: flex; gap: 15px;">
        <button class="btn btn-secondary" onclick="testToken()">🔍 Test Token</button>
        <button class="btn btn-secondary" onclick="logout()">Logout</button>
      </div>
    </div>
  </div>

  <!-- Room Management Section -->
  <div class="section" id="roomSection" style="display: none;">
    <h2>🏠 Step 2: Room Management</h2>

    <!-- Admin: Create Room -->
    <div id="createRoomSection" class="hidden">
      <h3>Create New Room (Admin Only)</h3>
      <div class="inline-inputs">
        <div class="form-group">
          <label for="roomName">Room Name:</label>
          <input type="text" id="roomName" placeholder="e.g., Computer Science 101">
        </div>
        <button class="btn" onclick="createRoom()">Create Room</button>
      </div>

      <!-- Admin: Manage Active Rooms -->
      <div style="margin-top: 30px;">
        <h3>Manage Active Rooms</h3>
        <button class="btn" onclick="showActiveRoomsModal()">📊 View & Delete Rooms</button>
      </div>
    </div>

    <!-- Join Room -->
    <div id="joinRoomSection">
      <h3>Join Room</h3>
      
      <!-- Quick Join Demo Room -->
      <div style="background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #22c55e;">
        <h4 style="color: #22c55e; margin: 0 0 10px 0;">🎯 Try the Demo Room!</h4>
        <p style="color: #94a3b8; margin-bottom: 15px;">
          Join our permanent demo room - always available and auto-resets when complete!
        </p>
        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="background: #0f172a; padding: 15px 25px; border-radius: 8px; font-size: 1.5em; font-weight: bold; color: #22c55e; letter-spacing: 3px;">
            DEMO01
          </div>
          <button class="btn" onclick="joinDemoRoom()" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);">
            Quick Join Demo Room
          </button>
        </div>
      </div>
      
      <!-- Regular Room Join -->
      <h4 style="color: #94a3b8; margin-bottom: 15px;">Or join another room:</h4>
      <div class="inline-inputs">
        <div class="form-group">
          <label for="roomCode">Room Code:</label>
          <input type="text" id="roomCode" placeholder="Enter 6-character code" maxlength="6" style="text-transform: uppercase;">
        </div>
        <button class="btn" onclick="joinRoom()">Join Room</button>
      </div>
    </div>

    <!-- Current Room Info -->
    <div id="currentRoomInfo" class="hidden">
      <div class="room-info">
        <h3>Current Room</h3>
        <div class="room-code" id="displayRoomCode">------</div>
        <p><strong>Room Name:</strong> <span id="displayRoomName"></span></p>
        <p><strong>Members:</strong> <span id="displayMemberCount"></span></p>
        <button class="btn btn-danger" onclick="leaveRoom()">Leave Room</button>
      </div>
    </div>
  </div>

  <!-- CPU Visualization -->
  <div class="section" id="cpuSection" style="display: none;">
    <h2>🖥️ Step 3: CPU Core Status</h2>
    <p style="color: #94a3b8; margin-bottom: 20px; text-align: center;">
      Each core lights up when ALL members complete the corresponding module
    </p>
    
    <div class="cpu-container" id="cpuContainer">
      <div class="cpu-label">PARALLEL PROCESSOR</div>
      
      <!-- CPU Pins -->
      <div class="cpu-pins left">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      <div class="cpu-pins right">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      <div class="cpu-pins top">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      <div class="cpu-pins bottom">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      
      <div class="cpu-visualization">
        <div class="node" id="node1">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 1</div>
        </div>
        <div class="node" id="node2">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 2</div>
        </div>
        <div class="node" id="node3">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 3</div>
        </div>
        <div class="node" id="node4">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 4</div>
        </div>
        <div class="node" id="node5">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 5</div>
        </div>
        <div class="node" id="node6">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 6</div>
        </div>
      </div>
    </div>

    <!-- Reset Button (only shows when CPU is fully lit) -->
    <div id="resetSection" class="hidden" style="text-align: center; margin-top: 30px;">
      <button class="btn btn-danger" onclick="resetProgress()">
        🔄 Reset All Progress
      </button>
      <p style="color: #94a3b8; margin-top: 10px; font-size: 0.9em;">
        This will clear all completed modules for everyone in the room
      </p>
    </div>
  </div>

  <!-- Module Completion Section -->
  <div class="section" id="moduleSection" style="display: none;">
    <h2>📚 Step 4: Complete Modules</h2>
    <p style="color: #94a3b8; margin-bottom: 20px;">
      Complete modules to see nodes light up when ALL room members finish!
    </p>
    <div class="module-controls">
      <button class="module-btn" data-permalink="/cores/core-1" data-module="1" onclick="openModule(this)">
        <div style="font-size: 1.5em;">📖</div>
        Module 1
      </button>
      <button class="module-btn" data-permalink="/cores/core-2" data-module="2" onclick="openModule(this)">
        <div style="font-size: 1.5em;">💻</div>
        Module 2
      </button>
      <button class="module-btn" data-permalink="/cores/core-3" data-module="3" onclick="openModule(this)">
        <div style="font-size: 1.5em;">⚙️</div>
        Module 3
      </button>
      <button class="module-btn" data-permalink="/cores/core-4" data-module="4" onclick="openModule(this)">
        <div style="font-size: 1.5em;">📊</div>
        Module 4
      </button>
      <button class="module-btn" data-permalink="/cores/core-5" data-module="5" onclick="openModule(this)">
        <div style="font-size: 1.5em;">🚀</div>
        Module 5
      </button>
      <button class="module-btn" data-permalink="/cores/core-6" data-module="6" onclick="openModule(this)">
        <div style="font-size: 1.5em;">🎯</div>
        Module 6
      </button>
    </div>

    <!-- Full-page Module Overlay -->
    <div id="modulePanel" style="position:fixed; inset:0; background:rgba(6,10,14,0.92); color:#e2e8f0; z-index:20000; display:none; overflow:auto;">
      <div style="max-width:1100px; margin:36px auto; background:#0b1220; border-radius:10px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.6);">
        <div style="padding:18px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; background:linear-gradient(90deg,#071226,#0b1220);">
          <div style="font-weight:700; color:#38bdf8;">Module</div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="btn btn-secondary" id="moduleMarkBtn">Mark Complete</button>
            <button class="btn" id="moduleCloseBtn">Close</button>
          </div>
        </div>
        <div id="modulePanelContent" style="padding:22px; min-height:320px;">
          <!-- content loaded via AJAX -->
          <p style="color:#94a3b8">Loading...</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Members Progress Section -->
  <div class="section" id="membersSection" style="display: none;">
    <h2>👥 Room Members Progress</h2>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <button id="refreshProgressBtn" class="btn btn-danger" onclick="resetProgressMidGame()">🔄 Reset Room Progress</button>
      <div id="lastRefresh" style="color: #94a3b8; font-size: 0.9em;">
        Click to reset all progress
      </div>
    </div>
    <ul class="members-list" id="membersList"></ul>
  </div>

  <!-- Glossary Section -->
  <div class="section" id="glossarySection" style="display: none;">
    <h2>📖 Step 5: Room Glossary</h2>
    <p style="color: #94a3b8; margin-bottom: 20px;">
      Build a shared knowledge base with your team! Add terms and definitions as you learn.
    </p>

    <!-- Glossary Stats -->
    <div class="glossary-stats" style="background: #0f172a; padding: 15px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-around;">
      <div style="text-align: center;">
        <div style="font-size: 2em; color: #38bdf8; font-weight: bold;" id="glossaryTotalEntries">0</div>
        <div style="color: #94a3b8; font-size: 0.9em;">Total Entries</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 2em; color: #22c55e; font-weight: bold;" id="glossaryContributors">0</div>
        <div style="color: #94a3b8; font-size: 0.9em;">Contributors</div>
      </div>
    </div>

    <!-- Add Entry Form -->
    <div class="glossary-form" style="background: #0f172a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="color: #38bdf8; margin-bottom: 15px;">Add New Entry</h3>
      <form id="addGlossaryForm" onsubmit="addGlossaryEntry(event)">
        <div class="form-group">
          <label for="glossaryTerm">Term:</label>
          <input type="text" id="glossaryTerm" placeholder="e.g., Race Condition" required>
        </div>
        <div class="form-group">
          <label for="glossaryDefinition">Definition:</label>
          <textarea id="glossaryDefinition" placeholder="Enter a clear definition..." required style="min-height: 100px; resize: vertical; font-family: inherit;"></textarea>
        </div>
        <button type="submit" class="btn">Add to Glossary</button>
      </form>
    </div>

    <!-- Search Box -->
    <div class="form-group">
      <label for="glossarySearch">Search Glossary:</label>
      <input type="text" id="glossarySearch" placeholder="Search terms and definitions..." oninput="searchGlossary()">
    </div>

    <!-- Glossary Entries List -->
    <div id="glossaryList" style="margin-top: 20px;">
      <!-- Entries will be dynamically inserted here -->
    </div>
  </div>
</div>

<!-- Confirmation Modal -->
<div id="confirmModal" class="confirm-modal">
  <div class="confirm-dialog">
    <div class="confirm-icon">⚠️</div>
    <div class="confirm-title" id="confirmTitle">Confirm Action</div>
    <div class="confirm-message" id="confirmMessage">Are you sure?</div>
    <div class="confirm-buttons">
      <button class="confirm-btn cancel" onclick="closeConfirm()">Cancel</button>
      <button class="confirm-btn confirm" id="confirmButton">Confirm</button>
    </div>
  </div>
</div>

<!-- Admin Rooms Management Modal -->
<div id="adminRoomsModal" class="admin-rooms-modal">
  <div class="admin-rooms-dialog">
    <div class="admin-rooms-header">
      <h2>🔧 Manage Active Rooms</h2>
      <button class="btn btn-secondary" onclick="closeAdminRoomsModal()">✖ Close</button>
    </div>

    <!-- Stats Summary -->
    <div class="room-stats-summary" id="roomStatsSummary">
      <div class="stat-item">
        <div class="stat-value" id="totalRooms">0</div>
        <div class="stat-label">Total Rooms</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="deletableRooms">0</div>
        <div class="stat-label">Deletable Rooms</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="totalMembers">0</div>
        <div class="stat-label">Total Members</div>
      </div>
    </div>

    <!-- Actions -->
    <div class="admin-rooms-actions">
      <button class="btn" onclick="refreshActiveRooms()">🔄 Refresh</button>
      <button class="btn btn-danger" onclick="deleteSelectedRooms()">🗑️ Delete Selected</button>
      <button class="btn btn-danger" onclick="deleteAllNonDemoRooms()">🗑️ Delete All Non-Demo</button>
    </div>

    <!-- Rooms List -->
    <div id="adminRoomsList">
      <p style="color: #94a3b8; text-align: center;">Loading rooms...</p>
    </div>
  </div>
</div>

<script>
  let authToken = null;
  let currentUser = null;
  let currentRoomId = null;
  let currentRoomData = null;
  let cpuFullyLit = false; // Track if all cores are active

  function getApiUrl() {
    return document.getElementById('apiUrl').value.trim();
  }

  function showStatus(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `status ${type}`;
  }

  // Animation Helper Functions
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Confirmation Modal Functions
  function showConfirm(title, message, onConfirm) {
    console.log('🔔 showConfirm called:', title);
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmTitle');
    const messageEl = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmButton');

    if (!modal) {
      console.error('❌ Modal element not found!');
      // Fallback to confirm() if modal doesn't exist
      if (confirm(`${title}\n\n${message}`)) {
        onConfirm();
      }
      return;
    }

    console.log('✅ Modal found, showing...');
    titleEl.textContent = title;
    messageEl.textContent = message;
    modal.classList.add('show');

    // Remove old listeners and add new one
    const newConfirmBtn = confirmBtn.cloneNode(true);
    newConfirmBtn.id = 'confirmButton';  // Set ID BEFORE replacing
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener('click', () => {
      console.log('✅ Confirm clicked, executing callback');
      closeConfirm();
      onConfirm();
    });
  }

  function closeConfirm() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('show');
  }

  // Close modal on background click
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeConfirm();
        }
      });
    }
  });

  function showCelebration(type, moduleNumber, message) {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    
    let icon, title, cardClass;
    
    if (type === 'personal') {
      icon = '✅';
      title = `Module ${moduleNumber} Complete!`;
      cardClass = 'personal';
    } else if (type === 'room-module') {
      icon = '✨';
      title = `Room Module ${moduleNumber} Complete!`;
      cardClass = 'room-module';
    } else if (type === 'room-complete') {
      icon = '🎉';
      title = 'ALL MODULES COMPLETE!';
      cardClass = 'room-complete';
    }
    
    overlay.innerHTML = `
      <div class="celebration-card ${cardClass}">
        <div class="celebration-icon">${icon}</div>
        <div class="celebration-title">${title}</div>
        <div class="celebration-message">${message}</div>
        <button class="celebration-btn" onclick="closeCelebration()">Continue</button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add confetti for room completions
    if (type === 'room-module' || type === 'room-complete') {
      createConfetti();
    }
  }

  function closeCelebration() {
    const overlay = document.querySelector('.celebration-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  function createConfetti() {
    const colors = ['#38bdf8', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
      }, i * 30);
    }
  }

  function animateModuleButton(moduleNumber) {
    const buttons = document.querySelectorAll('.module-btn');
    const button = buttons[moduleNumber - 1];
    button.classList.add('completing');
    
    setTimeout(() => {
      button.classList.remove('completing');
      button.classList.add('completed');
    }, 600);
  }

  function animateNode(nodeNumber) {
    const node = document.getElementById(`node${nodeNumber}`);
    node.classList.add('activating');
    
    setTimeout(() => {
      node.classList.remove('activating');
      node.classList.add('active');
    }, 800);
  }

  async function apiCall(endpoint, method = 'GET', body = null) {
    const url = `${getApiUrl()}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', endpoint, data);
      throw new Error(data.error || 'Request failed');
    }

    // Log progress refresh specifically
    if (endpoint.includes('/progress')) {
      console.log('Progress data received:', data);
    }

    return data;
  }

  async function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      showStatus('authStatus', 'Please enter username and password', 'error');
      return;
    }

    try {
      const data = await apiCall('/api/auth/register', 'POST', {
        username,
        email: `${username}@example.com`,
        password
      });

      authToken = data.access_token;
      currentUser = data.user;
      showStatus('authStatus', `Registered and logged in as ${username}!`, 'success');
      updateUIAfterLogin();
    } catch (error) {
      showStatus('authStatus', `Registration failed: ${error.message}`, 'error');
    }
  }

  async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      showStatus('authStatus', 'Please enter username and password', 'error');
      return;
    }

    try {
      const data = await apiCall('/api/auth/login', 'POST', { username, password });

      authToken = data.access_token;
      currentUser = data.user;
      console.log('Login successful! Token:', authToken ? 'Token received' : 'NO TOKEN');
      console.log('User:', currentUser);
      showStatus('authStatus', `Logged in as ${username}!`, 'success');
      updateUIAfterLogin();
      
      // If user is in a room, load it
      if (currentUser.current_room_id) {
        await loadCurrentRoom();
      }
    } catch (error) {
      console.error('Login error:', error);
      showStatus('authStatus', `Login failed: ${error.message}`, 'error');
    }
  }

  function logout() {
    // Leave room before logging out
    if (currentRoomId) {
      leaveRoomSilently();
    }
    
    authToken = null;
    currentUser = null;
    currentRoomId = null;
    currentRoomData = null;
    cpuFullyLit = false;

    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loggedInInfo').classList.add('hidden');
    document.getElementById('roomSection').style.display = 'none';
    document.getElementById('cpuSection').style.display = 'none';
    document.getElementById('moduleSection').style.display = 'none';
    document.getElementById('membersSection').style.display = 'none';
    document.getElementById('glossarySection').style.display = 'none';

    showStatus('authStatus', 'Logged out', 'info');
  }

  async function leaveRoomSilently() {
    // Leave room without confirmation or alerts
    if (!currentRoomId) return;
    
    try {
      await apiCall(`/api/rooms/${currentRoomId}/leave`, 'POST');
      console.log('Left room automatically');
    } catch (error) {
      console.error('Failed to auto-leave room:', error);
    }
  }

  // Auto-leave room when closing tab/window
  function cleanupOnExit() {
    if (currentRoomId && authToken) {
      const url = `${getApiUrl()}/api/rooms/${currentRoomId}/leave`;

      // Try fetch with keepalive first (most reliable with auth headers)
      try {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({}),
          keepalive: true  // Ensures request completes even if page closes
        }).catch(err => console.log('Cleanup request sent via fetch'));
      } catch (e) {
        console.log('Fetch failed, user will be removed on next cleanup cycle');
      }
    }
  }

  // Multiple event listeners for better cross-browser support
  window.addEventListener('beforeunload', cleanupOnExit);
  window.addEventListener('pagehide', cleanupOnExit);

  async function testToken() {
    console.log('Testing token...');
    console.log('Current authToken:', authToken);
    
    try {
      const data = await apiCall('/api/test-auth', 'GET');
      showToast('✅ Token is valid!');
      console.log('Token test success:', data);
    } catch (error) {
      showToast('❌ Token is invalid!');
      console.error('Token test failed:', error);
    }
  }

  function updateUIAfterLogin() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('loggedInInfo').classList.remove('hidden');
    document.getElementById('currentUsername').textContent = currentUser.username;
    document.getElementById('currentRole').textContent = currentUser.role;

    document.getElementById('roomSection').style.display = 'block';

    if (currentUser.role === 'admin') {
      document.getElementById('createRoomSection').classList.remove('hidden');
    }
  }

  async function createRoom() {
    const roomName = document.getElementById('roomName').value.trim();

    if (!roomName) {
      showToast('⚠️ Please enter a room name');
      return;
    }

    try {
      const data = await apiCall('/api/rooms', 'POST', { name: roomName });
      showToast(`✅ Room created! Code: ${data.room.room_code}`);
      document.getElementById('roomName').value = '';
    } catch (error) {
      showToast(`❌ Failed to create room: ${error.message}`);
    }
  }

  async function joinRoom() {
    const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();

    if (!roomCode || roomCode.length !== 6) {
      showToast('⚠️ Please enter a valid 6-character room code');
      return;
    }

    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: roomCode });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      
      showToast(`✅ Joined room: ${data.room.name}`);
      await loadCurrentRoom();
    } catch (error) {
      showToast(`❌ Failed to join room: ${error.message}`);
    }
  }

  async function joinDemoRoom() {
    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: 'DEMO01' });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      
      showToast('✅ Joined Demo Room!');
      await loadCurrentRoom();
    } catch (error) {
      showToast(`❌ Failed to join demo room: ${error.message}`);
    }
  }

  async function loadCurrentRoom() {
    if (!currentRoomId) return;

    try {
      const data = await apiCall(`/api/rooms/${currentRoomId}`);
      currentRoomData = data.room;

      document.getElementById('joinRoomSection').classList.add('hidden');
      document.getElementById('currentRoomInfo').classList.remove('hidden');
      document.getElementById('displayRoomCode').textContent = currentRoomData.room_code;
      document.getElementById('displayRoomName').textContent = currentRoomData.name;
      document.getElementById('displayMemberCount').textContent = currentRoomData.stats.total_members;

      document.getElementById('cpuSection').style.display = 'block';
      document.getElementById('moduleSection').style.display = 'block';
      document.getElementById('membersSection').style.display = 'block';
      document.getElementById('glossarySection').style.display = 'block';

      await loadRoomProgress();
      await loadGlossary();
    } catch (error) {
      // Room doesn't exist or user is not a member - clear room state
      console.log('⚠️ Failed to load room, clearing state:', error.message);
      currentRoomId = null;
      currentRoomData = null;
      showToast(`⚠️ Room no longer available`);
    }
  }

  async function leaveRoom() {
    if (!currentRoomId) return;

    showConfirm(
      'Leave Room?',
      'Are you sure you want to leave this room? You will lose your current session.',
      async () => {
        try {
          await apiCall(`/api/rooms/${currentRoomId}/leave`, 'POST');
        } catch (error) {
          console.log('Leave room API call failed (might already be removed):', error.message);
          // Continue anyway - user might have been kicked out already
        }

        // Always clear the UI regardless of API success/failure
        currentRoomId = null;
        currentRoomData = null;
        cpuFullyLit = false;

        document.getElementById('joinRoomSection').classList.remove('hidden');
        document.getElementById('currentRoomInfo').classList.add('hidden');
        document.getElementById('cpuSection').style.display = 'none';
        document.getElementById('moduleSection').style.display = 'none';
        document.getElementById('membersSection').style.display = 'none';
        document.getElementById('glossarySection').style.display = 'none';
        document.getElementById('resetSection').classList.add('hidden');

        // Reset CPU visualization
        const cpuContainer = document.getElementById('cpuContainer');
        cpuContainer.classList.remove('all-active');
        for (let i = 1; i <= 6; i++) {
          document.getElementById(`node${i}`).classList.remove('active');
        }

        showToast('✅ Left room successfully');
      }
    );
  }

  async function resetProgress() {
    showConfirm(
      'RESET ALL PROGRESS?',
      'This will delete ALL completed modules for EVERYONE in the room. This cannot be undone!',
      async () => {
        try {
          // Call backend reset endpoint
          await apiCall(`/api/rooms/${currentRoomId}/reset-progress`, 'POST');
          
          console.log('🔄 Backend reset successful, clearing UI...');
          
          // Reset local state
          cpuFullyLit = false;
          
          // Reset CPU visualization
          const cpuContainer = document.getElementById('cpuContainer');
          cpuContainer.classList.remove('all-active');
          
          for (let i = 1; i <= 6; i++) {
            document.getElementById(`node${i}`).classList.remove('active');
          }
          
          // Hide reset button
          document.getElementById('resetSection').classList.add('hidden');
          
          // FORCE CLEAR all module buttons BEFORE reload
          const buttons = document.querySelectorAll('.module-btn');
          buttons.forEach(btn => btn.classList.remove('completed'));
          
          // FORCE CLEAR members list
          const membersList = document.getElementById('membersList');
          membersList.innerHTML = '';
          
          console.log('✅ UI cleared, reloading fresh data...');
          
          showToast('🔄 Progress reset for all members!');
          
          // Wait a moment for backend to process, then reload
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Reload progress with cache-busting timestamp
          await loadRoomProgress();
          
          console.log('✅ Reset complete!');
        } catch (error) {
          showToast(`❌ Failed to reset progress: ${error.message}`);
          console.error('Reset error:', error);
        }
      }
    );
  }

  async function resetProgressMidGame() {
    showConfirm(
      'RESET ALL PROGRESS?',
      'This will delete ALL completed modules for EVERYONE in the room. Are you absolutely sure?',
      async () => {
        const refreshBtn = document.getElementById('refreshProgressBtn');
        const originalText = refreshBtn ? refreshBtn.innerHTML : '';
        
        if (refreshBtn) {
          refreshBtn.innerHTML = '⏳ Resetting...';
          refreshBtn.disabled = true;
        }

        try {
          // Call backend reset endpoint
          await apiCall(`/api/rooms/${currentRoomId}/reset-progress`, 'POST');
          
          // Reset local state
          cpuFullyLit = false;
          
          // Reset CPU visualization
          const cpuContainer = document.getElementById('cpuContainer');
          cpuContainer.classList.remove('all-active');
          
          for (let i = 1; i <= 6; i++) {
            document.getElementById(`node${i}`).classList.remove('active');
          }
          
          // Hide the post-completion reset button if it's showing
          const resetSection = document.getElementById('resetSection');
          if (resetSection) {
            resetSection.classList.add('hidden');
          }
          
          // Reset all module buttons
          const buttons = document.querySelectorAll('.module-btn');
          buttons.forEach(btn => btn.classList.remove('completed'));
          
          showToast('🔄 All progress reset!');
          
          // Wait for backend to process
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Reload progress to sync with backend
          await loadRoomProgress();
        } catch (error) {
          showToast(`❌ Failed to reset: ${error.message}`);
        } finally {
          if (refreshBtn) {
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
          }
        }
      }
    );
  }

  async function completeModule(moduleNumber) {
    try {
      const data = await apiCall('/api/progress/complete', 'POST', { module_number: moduleNumber });
      
      // Animate the button
      animateModuleButton(moduleNumber);

      // Show appropriate celebration
      if (data.room_progress) {
        if (data.room_progress.room_complete) {
          if (data.room_progress.is_demo) {
            // Demo room - just celebrate, DON'T auto-reset
            showCelebration('room-complete', moduleNumber, 
              '🎊 CONGRATULATIONS!\n\nAll modules completed by everyone!\n\n✨ The CPU is fully lit!\n\nUse the Reset button below to start over.');
            
            // DON'T clear anything - let the CPU stay lit!
            // The reset button will appear via loadRoomProgress()
            await loadRoomProgress();
          } else {
            // Regular room - gets deleted
            showCelebration('room-complete', moduleNumber,
              '🎊 CONGRATULATIONS!\n\nAll modules completed by everyone!\n\nThe room has been closed.');
            
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } else if (data.room_progress.module_complete) {
          showCelebration('room-module', moduleNumber,
            `🌟 Everyone in the room has completed Module ${moduleNumber}!\n\nNode ${moduleNumber} is now lit up!`);
          
          // Animate the corresponding node
          setTimeout(() => {
            animateNode(moduleNumber);
          }, 500);
          
          await loadRoomProgress();
        } else {
          showCelebration('personal', moduleNumber,
            `Great job! You completed Module ${moduleNumber}.\n\nWaiting for other members to finish...`);
          await loadRoomProgress();
        }
      } else {
        showCelebration('personal', moduleNumber,
          `Module ${moduleNumber} completed!`);
        await loadRoomProgress();
      }
    } catch (error) {
      showToast(`❌ Failed to complete module: ${error.message}`);
    }
  }

  async function loadRoomProgress() {
    if (!currentRoomId) return;

    console.log('🔍 Loading room progress...');
    
    // Show loading indicator - use ID for more reliable selection
    const refreshBtn = document.getElementById('refreshProgressBtn');
    const originalText = refreshBtn ? refreshBtn.innerHTML : '';
    if (refreshBtn) {
      refreshBtn.innerHTML = '⏳ Refreshing...';
      refreshBtn.disabled = true;
    }

    try {
      // Add timestamp to prevent caching
      const data = await apiCall(`/api/rooms/${currentRoomId}/progress?t=${Date.now()}`);

      console.log('📊 Room Progress Data:', {
        total_members: data.total_members,
        completed_modules: data.completed_modules,
        member_progress: data.member_progress
      });

      // Check if current user is still a member of this room
      const currentUserId = currentUser.id;
      console.log('🔍 Checking membership - Current User ID:', currentUserId);
      console.log('🔍 Member Progress IDs:', data.member_progress.map(m => m.id));
      const isStillMember = data.member_progress.some(m => m.id === currentUserId);
      console.log('✅ Is Still Member?', isStillMember);

      if (!isStillMember) {
        console.log('⚠️ User is no longer a member of this room - forcing leave');
        showToast('🚪 You have been removed from this room');

        // Force leave without API call (already removed server-side)
        currentRoomId = null;
        currentRoomData = null;
        cpuFullyLit = false;

        document.getElementById('joinRoomSection').classList.remove('hidden');
        document.getElementById('currentRoomInfo').classList.add('hidden');
        document.getElementById('cpuSection').style.display = 'none';
        document.getElementById('moduleSection').style.display = 'none';
        document.getElementById('membersSection').style.display = 'none';
        document.getElementById('glossarySection').style.display = 'none';
        document.getElementById('resetSection').classList.add('hidden');

        return; // Exit early
      }

      // Update member count in room info
      document.getElementById('displayMemberCount').textContent = data.total_members;

      // Only update CPU if not fully lit or if explicitly resetting
      if (!cpuFullyLit) {
        // Update CPU nodes - RESET FIRST
        console.log('💡 Resetting all CPU cores...');
        for (let i = 1; i <= 6; i++) {
          const node = document.getElementById(`node${i}`);
          node.classList.remove('active');
        }
        
        // Then add active ones
        console.log('⚡ Lighting up cores:', data.completed_modules);
        data.completed_modules.forEach(moduleNum => {
          const node = document.getElementById(`node${moduleNum}`);
          node.classList.add('active');
          console.log(`  ✅ Core ${moduleNum} lit`);
        });

        // Check if all 6 modules are complete
        if (data.completed_modules.length === 6) {
          cpuFullyLit = true;
          const cpuContainer = document.getElementById('cpuContainer');
          cpuContainer.classList.add('all-active');
          document.getElementById('resetSection').classList.remove('hidden');
          console.log('🎉 CPU FULLY LIT!');
        }
      } else {
        console.log('🔒 CPU is fully lit - maintaining state until reset');
      }

      // ALWAYS update members list and buttons (even when CPU is lit)
      // This allows refresh button to show new members joining
      
      // Update members list
      const membersList = document.getElementById('membersList');
      membersList.innerHTML = '';

      data.member_progress.forEach(member => {
        const li = document.createElement('li');
        li.className = 'member-item';
        
        const info = document.createElement('div');
        info.innerHTML = `
          <div class="member-name">${member.username}</div>
          <div class="member-progress">${member.completed_modules.length}/6 modules</div>
        `;

        const modules = document.createElement('div');
        modules.className = 'progress-modules';
        for (let i = 1; i <= 6; i++) {
          const badge = document.createElement('div');
          badge.className = 'module-badge';
          badge.textContent = i;
          if (member.completed_modules.includes(i)) {
            badge.classList.add('completed');
          }
          modules.appendChild(badge);
        }

        li.appendChild(info);
        li.appendChild(modules);
        membersList.appendChild(li);
      });

      // Update my completed modules - RESET FIRST
      const myProgress = await apiCall('/api/progress/my-progress');
      console.log('👤 My Progress:', myProgress.completed_modules);
      
      const buttons = document.querySelectorAll('.module-btn');
      
      // Reset ALL buttons first
      console.log('🔄 Resetting all module buttons...');
      buttons.forEach(btn => btn.classList.remove('completed'));
      
      // Mark only the completed ones
      console.log('✅ Marking completed modules:', myProgress.completed_modules);
      myProgress.completed_modules.forEach(moduleNum => {
        buttons[moduleNum - 1].classList.add('completed');
        console.log(`  ✅ Button ${moduleNum} marked complete`);
      });

      // Update last refresh time
      const now = new Date().toLocaleTimeString();
      const lastRefreshEl = document.getElementById('lastRefresh');
      if (lastRefreshEl) {
        lastRefreshEl.textContent = `Last updated: ${now}`;
      }
      console.log(`✅ Refresh complete at ${now}`);
      console.log('='.repeat(60));

    } catch (error) {
      console.error('Failed to load room progress:', error);

      // If room was deleted or user was removed, clear the UI
      if (error.message.includes('Room not found') || error.message.includes('not found')) {
        console.log('⚠️ Room no longer exists - forcing leave');
        showToast('🚪 This room has been deleted');

        // Force leave without API call
        currentRoomId = null;
        currentRoomData = null;
        cpuFullyLit = false;

        document.getElementById('joinRoomSection').classList.remove('hidden');
        document.getElementById('currentRoomInfo').classList.add('hidden');
        document.getElementById('cpuSection').style.display = 'none';
        document.getElementById('moduleSection').style.display = 'none';
        document.getElementById('membersSection').style.display = 'none';
        document.getElementById('glossarySection').style.display = 'none';
        document.getElementById('resetSection').classList.add('hidden');

        return; // Exit early, skip the finally block restoration
      }

      showToast(`❌ Failed to refresh: ${error.message}`);
    } finally {
      // ALWAYS restore button, even if there was an error
      console.log('🔄 Restoring refresh button...');
      if (refreshBtn) {
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        console.log('✅ Button restored');
      } else {
        console.error('❌ Could not find refresh button to restore!');
      }
    }
  }

  // Auto-refresh progress and glossary every 5 seconds if in a room
  setInterval(() => {
    if (currentRoomId && authToken) {
      loadRoomProgress();
      loadGlossary();
    }
  }, 5000);

  // --- Full-page Module Overlay functions (AJAX load, stays on same permalink) ---
  function openModule(btn) {
    try {
      const permalink = btn.getAttribute('data-permalink') || '/cores/core-1';
      const moduleNumber = parseInt(btn.getAttribute('data-module')) || 0;

      // compute base prefix: if site served under /frontend, include it
      const firstSeg = window.location.pathname.split('/')[1];
      const base = firstSeg === 'frontend' ? '/frontend' : '';
      const url = base + permalink;

      const panel = document.getElementById('modulePanel');
      const content = document.getElementById('modulePanelContent');
      const markBtn = document.getElementById('moduleMarkBtn');
      const closeBtn = document.getElementById('moduleCloseBtn');

      // show loading and display overlay
      content.innerHTML = '<p style="color:#94a3b8">Loading...</p>';
      panel.style.display = 'block';

      // wire mark complete
      markBtn.onclick = async () => {
        try {
          await completeModule(moduleNumber);
          showToast('Marked complete');
        } catch (e) {
          console.error('Mark complete failed', e);
          showToast('Login required to mark complete');
        }
      };

      // wire close
      if (closeBtn) closeBtn.onclick = closeModule;

      fetch(url, { credentials: 'same-origin' })
        .then(r => r.text())
        .then(html => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            // try common content containers
            const article = doc.querySelector('article') || doc.querySelector('.container') || doc.querySelector('#content') || doc.body;
            content.innerHTML = article ? article.innerHTML : html;
          } catch (e) {
            content.innerHTML = html;
          }
        }).catch(err => {
          content.innerHTML = `<p style="color:#ef4444">Failed to load module: ${err.message}</p>`;
        });
    } catch (err) {
      console.error('openModule error', err);
    }
  }

  function closeModule() {
    const panel = document.getElementById('modulePanel');
    panel.style.display = 'none';
  }

  // ===== GLOSSARY FUNCTIONS =====

  let currentEditingEntryId = null;

  async function loadGlossary(searchTerm = '') {
    if (!currentRoomId) return;

    try {
      const url = searchTerm
        ? `/api/glossary/room/${currentRoomId}?search=${encodeURIComponent(searchTerm)}`
        : `/api/glossary/room/${currentRoomId}`;

      const data = await apiCall(url);

      // Update stats
      document.getElementById('glossaryTotalEntries').textContent = data.stats.total_entries;
      document.getElementById('glossaryContributors').textContent = data.stats.contributors;

      // Display entries
      const glossaryList = document.getElementById('glossaryList');

      if (data.entries.length === 0) {
        glossaryList.innerHTML = `
          <div class="glossary-empty">
            <div class="glossary-empty-icon">📚</div>
            <p>${searchTerm ? 'No entries found matching your search.' : 'No glossary entries yet. Be the first to add one!'}</p>
          </div>
        `;
        return;
      }

      glossaryList.innerHTML = data.entries.map(entry => createGlossaryEntryHTML(entry)).join('');
    } catch (error) {
      showToast(`❌ Failed to load glossary: ${error.message}`);
    }
  }

  function createGlossaryEntryHTML(entry) {
    const isAuthor = currentUser && entry.author_id === currentUser.id;
    const isAdmin = currentUser && currentUser.role === 'admin';
    const canEdit = isAuthor || isAdmin;

    return `
      <div class="glossary-entry" id="entry-${entry.id}">
        <div class="glossary-term">${escapeHtml(entry.term)}</div>
        <div class="glossary-definition">${escapeHtml(entry.definition)}</div>
        <div class="glossary-meta">
          <span>Added by ${escapeHtml(entry.author_name)} on ${formatDate(entry.created_at)}</span>
          ${canEdit ? `
            <div class="glossary-actions">
              <button class="glossary-action-btn" onclick="startEditEntry(${entry.id})">✏️ Edit</button>
              <button class="glossary-action-btn delete" onclick="deleteGlossaryEntry(${entry.id})">🗑️ Delete</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  async function addGlossaryEntry(event) {
    event.preventDefault();

    const term = document.getElementById('glossaryTerm').value.trim();
    const definition = document.getElementById('glossaryDefinition').value.trim();

    if (!term || !definition) {
      showToast('⚠️ Please fill in both term and definition');
      return;
    }

    try {
      await apiCall(`/api/glossary/room/${currentRoomId}`, 'POST', { term, definition });

      showToast('✅ Entry added to glossary!');

      // Clear form
      document.getElementById('glossaryTerm').value = '';
      document.getElementById('glossaryDefinition').value = '';

      // Reload glossary
      await loadGlossary();
    } catch (error) {
      showToast(`❌ Failed to add entry: ${error.message}`);
    }
  }

  async function startEditEntry(entryId) {
    if (currentEditingEntryId) {
      cancelEdit();
    }

    currentEditingEntryId = entryId;

    try {
      const data = await apiCall(`/api/glossary/${entryId}`);
      const entry = data.entry;

      const entryElement = document.getElementById(`entry-${entryId}`);
      const term = entryElement.querySelector('.glossary-term').textContent;
      const definition = entryElement.querySelector('.glossary-definition').textContent;

      entryElement.innerHTML = `
        <div class="edit-form">
          <div class="form-group">
            <label>Term:</label>
            <input type="text" id="editTerm-${entryId}" value="${escapeHtml(term)}" class="form-control">
          </div>
          <div class="form-group">
            <label>Definition:</label>
            <textarea id="editDefinition-${entryId}" rows="4">${escapeHtml(definition)}</textarea>
          </div>
          <div class="edit-form-actions">
            <button class="btn" onclick="saveEdit(${entryId})">💾 Save</button>
            <button class="btn btn-secondary" onclick="cancelEdit()">❌ Cancel</button>
          </div>
        </div>
      `;
    } catch (error) {
      showToast(`❌ Failed to load entry: ${error.message}`);
    }
  }

  async function saveEdit(entryId) {
    const term = document.getElementById(`editTerm-${entryId}`).value.trim();
    const definition = document.getElementById(`editDefinition-${entryId}`).value.trim();

    if (!term || !definition) {
      showToast('⚠️ Term and definition cannot be empty');
      return;
    }

    try {
      await apiCall(`/api/glossary/${entryId}`, 'PUT', { term, definition });

      showToast('✅ Entry updated successfully!');
      currentEditingEntryId = null;

      // Reload glossary
      await loadGlossary();
    } catch (error) {
      showToast(`❌ Failed to update entry: ${error.message}`);
    }
  }

  function cancelEdit() {
    currentEditingEntryId = null;
    loadGlossary();
  }

  async function deleteGlossaryEntry(entryId) {
    showConfirm(
      'Delete Entry?',
      'Are you sure you want to delete this glossary entry? This cannot be undone.',
      async () => {
        try {
          await apiCall(`/api/glossary/${entryId}`, 'DELETE');

          showToast('✅ Entry deleted successfully!');

          // Reload glossary
          await loadGlossary();
        } catch (error) {
          showToast(`❌ Failed to delete entry: ${error.message}`);
        }
      }
    );
  }

  function searchGlossary() {
    const searchTerm = document.getElementById('glossarySearch').value.trim();
    loadGlossary(searchTerm);
  }

  // ===== ADMIN ROOMS MANAGEMENT =====

  let adminRoomsData = [];

  async function showActiveRoomsModal() {
    const modal = document.getElementById('adminRoomsModal');
    modal.classList.add('show');
    await loadActiveRooms();
  }

  function closeAdminRoomsModal() {
    const modal = document.getElementById('adminRoomsModal');
    modal.classList.remove('show');
  }

  async function loadActiveRooms() {
    try {
      const data = await apiCall('/api/rooms/active');
      adminRoomsData = data.rooms;
      displayAdminRooms(adminRoomsData);
    } catch (error) {
      const roomsList = document.getElementById('adminRoomsList');
      roomsList.innerHTML = `<p style="color: #ef4444; text-align: center;">❌ Failed to load rooms: ${error.message}</p>`;
    }
  }

  function displayAdminRooms(rooms) {
    // Update stats
    const totalRooms = rooms.length;
    const deletableRooms = rooms.filter(r => r.can_delete).length;
    const totalMembers = rooms.reduce((sum, r) => sum + r.member_count, 0);

    document.getElementById('totalRooms').textContent = totalRooms;
    document.getElementById('deletableRooms').textContent = deletableRooms;
    document.getElementById('totalMembers').textContent = totalMembers;

    // Display rooms
    const roomsList = document.getElementById('adminRoomsList');

    if (rooms.length === 0) {
      roomsList.innerHTML = '<p style="color: #94a3b8; text-align: center;">No rooms found.</p>';
      return;
    }

    roomsList.innerHTML = rooms.map(room => {
      const isDemo = room.is_demo;
      const checkboxHtml = room.can_delete
        ? `<input type="checkbox" class="room-checkbox" data-room-id="${room.id}">`
        : '';

      return `
        <div class="room-card ${isDemo ? 'demo' : ''}">
          <div class="room-card-info">
            <div class="room-card-title">
              ${escapeHtml(room.name)}
              ${isDemo ? '<span style="color: #22c55e; margin-left: 10px;">🔒 DEMO</span>' : ''}
            </div>
            <div class="room-card-details">
              <div class="room-card-detail">
                <strong>Code:</strong> ${room.room_code}
              </div>
              <div class="room-card-detail">
                <strong>Members:</strong> ${room.member_count}
              </div>
              <div class="room-card-detail">
                <strong>Progress:</strong> ${room.progress_percentage.toFixed(0)}% (${room.completed_modules.length}/6)
              </div>
              <div class="room-card-detail">
                <strong>Creator:</strong> ${escapeHtml(room.creator_name)}
              </div>
              <div class="room-card-detail">
                <strong>Created:</strong> ${new Date(room.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div class="room-card-actions">
            ${checkboxHtml}
            <button class="btn btn-warning btn-small" onclick="shutdownRoom(${room.id})">
              🚪 Shutdown
            </button>
            ${room.can_delete ? `
              <button class="btn btn-danger btn-small" onclick="deleteSingleRoom(${room.id})">
                🗑️ Delete
              </button>
            ` : `
              <span style="color: #22c55e; font-weight: bold;">Protected</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  async function refreshActiveRooms() {
    showToast('🔄 Refreshing rooms...');
    await loadActiveRooms();
    showToast('✅ Rooms refreshed!');
  }

  async function deleteSingleRoom(roomId) {
    const room = adminRoomsData.find(r => r.id === roomId);
    if (!room) return;

    showConfirm(
      'Delete Room?',
      `Are you sure you want to delete "${room.name}" (${room.room_code})? This will remove all members and progress.`,
      async () => {
        try {
          await apiCall(`/api/rooms/${roomId}`, 'DELETE');
          showToast(`✅ Room "${room.name}" deleted successfully!`);
          await loadActiveRooms();
        } catch (error) {
          showToast(`❌ Failed to delete room: ${error.message}`);
        }
      }
    );
  }

  async function shutdownRoom(roomId) {
    const room = adminRoomsData.find(r => r.id === roomId);
    if (!room) return;

    showConfirm(
      'Shutdown Room?',
      `Are you sure you want to shutdown "${room.name}" (${room.room_code})? This will kick out all ${room.member_count} member(s) from the room.`,
      async () => {
        try {
          const result = await apiCall(`/api/rooms/${roomId}/shutdown`, 'POST');
          showToast(`✅ ${result.message}`);
          await loadActiveRooms();
        } catch (error) {
          showToast(`❌ Failed to shutdown room: ${error.message}`);
        }
      }
    );
  }

  async function deleteSelectedRooms() {
    const checkboxes = document.querySelectorAll('.room-checkbox:checked');
    const roomIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.roomId));

    if (roomIds.length === 0) {
      showToast('⚠️ No rooms selected');
      return;
    }

    showConfirm(
      'Delete Selected Rooms?',
      `Are you sure you want to delete ${roomIds.length} selected room(s)? This cannot be undone.`,
      async () => {
        try {
          const result = await apiCall('/api/rooms/bulk-delete', 'POST', { room_ids: roomIds });

          let message = `✅ ${result.message}\n`;
          message += `Deleted: ${result.summary.deleted_count}, `;
          message += `Protected: ${result.summary.protected_count}, `;
          message += `Failed: ${result.summary.failed_count}`;

          showToast(message);
          await loadActiveRooms();
        } catch (error) {
          showToast(`❌ Bulk delete failed: ${error.message}`);
        }
      }
    );
  }

  async function deleteAllNonDemoRooms() {
    const deletableRooms = adminRoomsData.filter(r => r.can_delete);

    if (deletableRooms.length === 0) {
      showToast('✅ No deletable rooms found');
      return;
    }

    showConfirm(
      'DELETE ALL NON-DEMO ROOMS?',
      `⚠️ WARNING: This will DELETE ALL ${deletableRooms.length} non-demo room(s)! This action CANNOT be undone!`,
      async () => {
        try {
          const roomIds = deletableRooms.map(r => r.id);
          const result = await apiCall('/api/rooms/bulk-delete', 'POST', { room_ids: roomIds });

          let message = `✅ ${result.message}\n`;
          message += `Deleted: ${result.summary.deleted_count} room(s)`;

          showToast(message);
          await loadActiveRooms();
        } catch (error) {
          showToast(`❌ Failed to delete rooms: ${error.message}`);
        }
      }
    );
  }

</script>
