---
toc: false
layout: post
title: GPU Assembly Simulator - Hardware Havoc
description: Learn Sequential, Parallel, and Distributed Computing by Building GPUs
permalink: /gpu-assembly-simulator
breadcrumb: true
image: /images/gpu-assembly.png
show_reading_time: false
---

<style>
/* ===== ROOT / LAYOUT ===== */
#gpu-simulator-app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Courier New', 'Consolas', monospace;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
              #0a0e14;
  color: #e0e6ed;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
  letter-spacing: 0.3px;
}

#gpu-simulator-app * {
  box-sizing: border-box;
}

/* ===== HEADER ROW ===== */
#gpu-simulator-app .header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: linear-gradient(90deg, #0f1419 0%, #1a2332 100%);
  border-bottom: 1px solid #00d4ff;
  flex-wrap: wrap;
  flex-shrink: 0;
}

#gpu-simulator-app .title-section {
  flex-shrink: 0;
}

#gpu-simulator-app .title-section h1 {
  font-size: 1.1rem;
  color: #00d4ff;
  text-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
  margin: 0;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 1.2;
}

#gpu-simulator-app .title-section p {
  font-size: 0.6rem;
  color: #7a8ba0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  margin: 0;
}

/* ===== STAGE TABS ===== */
#gpu-simulator-app .stage-tabs {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

#gpu-simulator-app .stage-tab {
  padding: 6px 14px;
  border-radius: 4px;
  background: #1a2332;
  border: 1px solid #2a3f5f;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: inherit;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

#gpu-simulator-app .stage-tab:hover:not(.locked) {
  background: #1e2d42;
  border-color: #00d4ff;
}

#gpu-simulator-app .stage-tab.active {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  border-color: #00d4ff;
  color: #000;
  box-shadow: 0 2px 8px rgba(0, 212, 255, 0.4);
}

#gpu-simulator-app .stage-tab.locked {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: #1e2936;
}

#gpu-simulator-app .stage-tab .stage-icon {
  font-size: 1rem;
}

/* ===== HEADER STATS ===== */
#gpu-simulator-app .header-stats {
  display: flex;
  gap: 14px;
  margin-left: auto;
  flex-shrink: 0;
}

#gpu-simulator-app .header-stat {
  text-align: center;
}

#gpu-simulator-app .header-stat-value {
  font-size: 1.1rem;
  font-weight: 900;
  color: #00ff88;
  line-height: 1;
  text-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
}

#gpu-simulator-app .header-stat-label {
  font-size: 0.55rem;
  color: #7a8ba0;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2px;
  font-weight: 600;
}

/* ===== HEADER CONTROLS ===== */
#gpu-simulator-app .header-controls {
  display: flex;
  gap: 4px;
  align-items: center;
  flex-shrink: 0;
}

#gpu-simulator-app .ctrl-btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.7rem;
  font-family: inherit;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

#gpu-simulator-app .ctrl-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

#gpu-simulator-app .ctrl-btn-start {
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  color: #000;
}

#gpu-simulator-app .ctrl-btn-reset {
  background: linear-gradient(135deg, #ff9500 0%, #cc7700 100%);
  color: #000;
}

#gpu-simulator-app .ctrl-btn-order {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: #000;
}

#gpu-simulator-app .ctrl-btn-auto {
  background: #1a2332;
  border: 1px solid #2a3f5f;
  color: #e0e0e0;
}

#gpu-simulator-app .ctrl-btn-auto.active {
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  color: #000;
  border-color: #00ff88;
}

#gpu-simulator-app .achievements-btn {
  position: relative;
  background: transparent;
  border: 1px solid #2a3f5f;
  border-radius: 4px;
  padding: 5px 8px;
  cursor: pointer;
  font-size: 1.1rem;
  color: #e0e0e0;
  transition: all 0.2s ease;
  line-height: 1;
}

#gpu-simulator-app .achievements-btn:hover {
  border-color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
}

/* ===== STAGE BRIEF ===== */
#gpu-simulator-app .stage-brief {
  padding: 5px 16px;
  font-size: 0.7rem;
  line-height: 1.4;
  color: #b8c5d6;
  background: rgba(0, 212, 255, 0.05);
  border-bottom: 1px solid #1e2936;
  flex-shrink: 0;
}

/* ===== MAIN AREA ===== */
#gpu-simulator-app .main-area {
  display: grid;
  grid-template-columns: 1fr 180px 260px;
  min-height: 0;
  overflow: hidden;
}

/* ===== ASSEMBLY AREA ===== */
#gpu-simulator-app .assembly-area {
  overflow-y: auto;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
}

#gpu-simulator-app .step-indicator {
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid #1e2936;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #7a8ba0;
  flex-shrink: 0;
}

#gpu-simulator-app .step-indicator .step {
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
}

#gpu-simulator-app .step-indicator .arrow {
  color: #00d4ff;
  font-weight: 700;
}

#gpu-simulator-app .workstations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  flex: 1;
  align-content: start;
}

/* ===== WORKSTATION ===== */
#gpu-simulator-app .workstation {
  background: #1a2332;
  border: 1px solid #2a3f5f;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

#gpu-simulator-app .workstation:hover {
  border-color: #00d4ff;
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.2);
}

#gpu-simulator-app .workstation-header {
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 8px;
  padding-bottom: 5px;
  border-bottom: 2px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #F0F0F0;
  flex-shrink: 0;
}

#gpu-simulator-app .station-load {
  font-size: 0.65rem;
  color: #4CAFEF;
  background: rgba(76, 175, 239, 0.1);
  padding: 3px 6px;
  border-radius: 10px;
}

/* ===== ROBOT ===== */
#gpu-simulator-app .robot {
  background: #0f1419;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 6px;
  border: 1px solid #1e2936;
  position: relative;
  overflow: hidden;
}

#gpu-simulator-app .robot.busy {
  border-color: #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

#gpu-simulator-app .robot.busy::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 255, 136, 0.15), transparent);
  animation: progress var(--duration) linear forwards;
}

#gpu-simulator-app .robot-name {
  font-weight: 700;
  font-size: 0.75rem;
  color: #00d4ff;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

#gpu-simulator-app .robot-status {
  font-size: 0.7rem;
  color: #b8c5d6;
  position: relative;
  z-index: 1;
  line-height: 1.3;
}

/* ===== TASK BUTTONS ===== */
#gpu-simulator-app .task-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-top: 6px;
  position: relative;
  z-index: 1;
}

#gpu-simulator-app .task-btn {
  padding: 8px 6px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 800;
  font-size: 0.7rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

#gpu-simulator-app .task-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 212, 255, 0.5);
}

#gpu-simulator-app .task-btn:not(:disabled) {
  animation: pulse-glow 2s ease-in-out infinite;
}

#gpu-simulator-app .task-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: #1e2936;
  color: #4a5568;
  animation: none;
}

/* ===== TESTING STATION ===== */
#gpu-simulator-app .testing-station {
  background: rgba(229, 62, 62, 0.1);
  border: 2px solid #E53E3E;
  border-radius: 6px;
  padding: 8px;
  margin-top: 6px;
}

#gpu-simulator-app .testing-station.busy {
  box-shadow: 0 0 12px rgba(229, 62, 62, 0.4);
}

#gpu-simulator-app .testing-status {
  font-weight: 700;
  font-size: 0.75rem;
  color: #E53E3E;
  margin-bottom: 6px;
}

/* ===== ORDERS PANEL ===== */
#gpu-simulator-app .orders-panel {
  border-left: 1px solid #1e2936;
  padding: 10px;
  overflow-y: auto;
  background: rgba(15, 20, 25, 0.5);
  min-height: 0;
}

#gpu-simulator-app .orders-panel h3 {
  font-size: 0.8rem;
  color: #4CAFEF;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

#gpu-simulator-app .order-card {
  background: rgba(42, 45, 45, 0.8);
  border: 2px solid #333;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

#gpu-simulator-app .order-card:hover {
  border-color: #4CAFEF;
}

#gpu-simulator-app .order-id {
  font-weight: 700;
  font-size: 0.8rem;
  color: #4CAFEF;
  margin-bottom: 4px;
}

#gpu-simulator-app .order-factory {
  font-size: 0.65rem;
  color: #888;
  margin-bottom: 4px;
}

#gpu-simulator-app .order-progress {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

#gpu-simulator-app .progress-step {
  aspect-ratio: 1;
  background: rgba(20, 20, 30, 0.9);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: 2px solid #333;
  transition: all 0.3s ease;
}

#gpu-simulator-app .progress-step.completed {
  background: rgba(52, 199, 89, 0.3);
  border-color: #34c759;
  box-shadow: 0 0 8px rgba(52, 199, 89, 0.4);
  animation: pulse 0.4s ease;
}

/* ===== EDUCATION PANEL ===== */
#gpu-simulator-app .education-panel {
  border-left: 1px solid rgba(0,255,170,0.2);
  padding: 12px;
  overflow-y: auto;
  background: linear-gradient(135deg, rgba(26,32,40,0.95), rgba(18,23,30,0.95));
  min-height: 0;
}

#gpu-simulator-app .edu-panel {
  display: none;
}

#gpu-simulator-app .edu-panel.active {
  display: block;
}

#gpu-simulator-app .edu-panel-header {
  padding-bottom: 8px;
  margin-bottom: 10px;
  border-bottom: 2px solid #00ffaa;
}

#gpu-simulator-app .edu-panel-header h3 {
  color: #00ffaa;
  font-size: 0.8rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0,255,170,0.5);
}

#gpu-simulator-app .edu-panel-content h4 {
  color: #00ffaa;
  font-size: 0.75rem;
  margin: 12px 0 6px 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(0,255,170,0.5);
}

#gpu-simulator-app .edu-panel-content p {
  font-size: 0.72rem;
  line-height: 1.5;
  color: #8b95a5;
  margin: 6px 0;
}

#gpu-simulator-app .edu-panel-content ul {
  margin: 8px 0;
  padding-left: 18px;
}

#gpu-simulator-app .edu-panel-content li {
  font-size: 0.72rem;
  line-height: 1.4;
  color: #b8c5d6;
  margin-bottom: 4px;
}

#gpu-simulator-app .edu-panel-content strong {
  color: #00ffaa;
}

#gpu-simulator-app .edu-highlight-box {
  background: rgba(0,255,170,0.08);
  border-left: 3px solid #00ffaa;
  padding: 10px;
  margin: 8px 0;
  border-radius: 2px;
}

#gpu-simulator-app .edu-comparison-table {
  width: 100%;
  margin: 8px 0;
  border-collapse: collapse;
  font-size: 0.7rem;
}

#gpu-simulator-app .edu-comparison-table th {
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  padding: 6px;
  text-align: left;
  border: 1px solid #2a3f5f;
}

#gpu-simulator-app .edu-comparison-table td {
  padding: 5px 6px;
  border: 1px solid #2a3f5f;
  color: #b8c5d6;
}

/* ===== ACHIEVEMENTS POPOVER ===== */
#gpu-simulator-app .achievements-wrapper {
  position: relative;
}

#gpu-simulator-app .achievements-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 260px;
  max-height: 380px;
  overflow-y: auto;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid #4CAFEF;
  border-radius: 8px;
  padding: 12px;
  display: none;
  z-index: 500;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
}

#gpu-simulator-app .achievements-popover.show {
  display: block;
}

#gpu-simulator-app .achievements-popover h3 {
  font-size: 0.8rem;
  color: #4CAFEF;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

#gpu-simulator-app .achievement {
  background: rgba(42, 45, 45, 0.5);
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 6px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

#gpu-simulator-app .achievement.unlocked {
  background: rgba(52, 199, 89, 0.15);
  border-color: #34c759;
}

#gpu-simulator-app .achievement-icon {
  font-size: 1.4rem;
  filter: grayscale(1) brightness(0.4);
  flex-shrink: 0;
}

#gpu-simulator-app .achievement.unlocked .achievement-icon {
  filter: grayscale(0) brightness(1);
  animation: bounce 0.5s ease;
}

#gpu-simulator-app .achievement-info {
  flex: 1;
  min-width: 0;
}

#gpu-simulator-app .achievement-name {
  font-size: 0.7rem;
  font-weight: 700;
  color: #F0F0F0;
}

#gpu-simulator-app .achievement-desc {
  font-size: 0.6rem;
  color: #888;
}

/* ===== MODAL ===== */
#gpu-simulator-app .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

#gpu-simulator-app .modal-overlay.show {
  display: flex;
}

#gpu-simulator-app .modal-content {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 3px solid #4CAFEF;
  border-radius: 16px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

#gpu-simulator-app .modal-emoji {
  font-size: 60px;
  margin-bottom: 15px;
}

#gpu-simulator-app .modal-content h2 {
  font-size: 1.6rem;
  color: #4CAFEF;
  margin-bottom: 15px;
}

#gpu-simulator-app .results-box {
  background: rgba(76, 175, 239, 0.1);
  border: 2px solid #4CAFEF;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
}

#gpu-simulator-app .result-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #333;
  font-size: 0.9rem;
}

#gpu-simulator-app .result-row:last-child {
  border-bottom: none;
}

#gpu-simulator-app .improvement-box {
  background: rgba(52, 199, 89, 0.1);
  border: 2px solid #34c759;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
}

#gpu-simulator-app .improvement-box h3 {
  color: #34c759;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

#gpu-simulator-app .improvement-value {
  font-size: 1.8rem;
  color: #34c759;
  font-weight: 900;
  margin: 10px 0;
}

#gpu-simulator-app .btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: #000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 800;
  font-family: inherit;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

#gpu-simulator-app .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.5);
}

#gpu-simulator-app .btn-success {
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  color: #000;
}

/* ===== TOAST ===== */
#gpu-simulator-app .toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(20, 20, 30, 0.95);
  color: #F0F0F0;
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid #4CAFEF;
  box-shadow: 0 4px 20px rgba(76, 175, 239, 0.4);
  animation: slideIn 0.3s ease;
  z-index: 2000;
  font-size: 0.85rem;
  font-weight: 700;
}

#gpu-simulator-app .toast.success { border-color: #34c759; }
#gpu-simulator-app .toast.warning { border-color: #FBBF24; }
#gpu-simulator-app .toast.info { border-color: #4CAFEF; }

/* ===== WELCOME BANNER ===== */
#gpu-simulator-app .welcome-banner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(300px, 85vw, 520px);
  background: linear-gradient(135deg, rgba(26,32,40,0.98), rgba(18,23,30,0.98));
  border: 3px solid #00ffaa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 50px rgba(0,255,170,0.4), 0 0 100px rgba(0,255,170,0.2);
  z-index: 3000;
  animation: fadeIn 0.5s ease;
}

#gpu-simulator-app .welcome-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00ffaa, #00d4ff, #00ffaa);
  animation: shimmer 2s ease-in-out infinite;
}

#gpu-simulator-app .welcome-banner h2 {
  color: #00ffaa;
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  margin: 0 0 0.8rem 0;
  text-align: center;
  text-shadow: 0 0 15px rgba(0,255,170,0.8);
}

#gpu-simulator-app .welcome-banner p {
  color: #b8c5d6;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.5;
}

#gpu-simulator-app .welcome-steps {
  background: rgba(0,255,170,0.08);
  border-left: 3px solid #00ffaa;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1.2rem;
  border-radius: 4px;
}

#gpu-simulator-app .welcome-steps strong {
  color: #00ffaa;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

#gpu-simulator-app .welcome-steps ol {
  margin: 0;
  padding-left: 1.2rem;
  color: #b8c5d6;
}

#gpu-simulator-app .welcome-steps li {
  margin: 0.4rem 0;
  line-height: 1.5;
  font-size: 0.8rem;
}

#gpu-simulator-app .welcome-banner-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

#gpu-simulator-app .welcome-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  font-family: inherit;
}

#gpu-simulator-app .welcome-btn-primary {
  background: rgba(0,255,170,0.2);
  color: #00ffaa;
  border: 2px solid #00ffaa;
}

#gpu-simulator-app .welcome-btn-primary:hover {
  background: rgba(0,255,170,0.3);
  box-shadow: 0 0 20px rgba(0,255,170,0.5);
}

#gpu-simulator-app .welcome-btn-secondary {
  background: transparent;
  color: #8b95a5;
  border: 2px solid #4a5568;
}

#gpu-simulator-app .welcome-btn-secondary:hover {
  border-color: #6b7280;
  color: #b8c5d6;
}

#gpu-simulator-app .dismiss-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: #8b95a5;
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 28px;
  height: 28px;
  transition: all 0.2s ease;
}

#gpu-simulator-app .dismiss-btn:hover {
  color: #00ffaa;
  transform: scale(1.2);
}

/* ===== HELP BUTTON ===== */
#gpu-simulator-app .help-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  border: 2px solid #00d4ff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #000;
  font-weight: 900;
  box-shadow: 0 3px 12px rgba(0, 212, 255, 0.5);
  transition: all 0.3s ease;
  z-index: 1500;
}

#gpu-simulator-app .help-button:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(0, 212, 255, 0.7);
}

#gpu-simulator-app .help-tooltip {
  position: fixed;
  bottom: 65px;
  right: 16px;
  width: 320px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid #00d4ff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1400;
  max-height: 450px;
  overflow-y: auto;
}

#gpu-simulator-app .help-tooltip.show,
#gpu-simulator-app .help-button:hover + .help-tooltip,
#gpu-simulator-app .help-tooltip:hover {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

#gpu-simulator-app .help-tooltip h3 {
  color: #00d4ff;
  font-size: 1rem;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

#gpu-simulator-app .help-tooltip h4 {
  color: #00ff88;
  font-size: 0.8rem;
  margin-top: 12px;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

#gpu-simulator-app .help-tooltip p {
  color: #b8c5d6;
  font-size: 0.75rem;
  line-height: 1.5;
  margin-bottom: 8px;
}

#gpu-simulator-app .help-tooltip ul {
  margin: 8px 0;
  padding-left: 16px;
}

#gpu-simulator-app .help-tooltip li {
  color: #b8c5d6;
  font-size: 0.7rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

/* ===== ANIMATIONS ===== */
@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(400px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 4px rgba(0, 212, 255, 0.2); }
  50% { box-shadow: 0 0 12px rgba(0, 212, 255, 0.5); }
}

/* ===== SCROLLBAR ===== */
#gpu-simulator-app ::-webkit-scrollbar {
  width: 6px;
}

#gpu-simulator-app ::-webkit-scrollbar-track {
  background: rgba(20, 20, 30, 0.5);
}

#gpu-simulator-app ::-webkit-scrollbar-thumb {
  background: #4CAFEF;
  border-radius: 3px;
}

#gpu-simulator-app ::-webkit-scrollbar-thumb:hover {
  background: #5CBFFF;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  #gpu-simulator-app .main-area {
    grid-template-columns: 1fr 160px;
  }

  #gpu-simulator-app .education-panel {
    display: none;
  }

  #gpu-simulator-app .education-panel.drawer-open {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    z-index: 800;
    border-left: 2px solid #00ffaa;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
  }

  #gpu-simulator-app .edu-toggle-btn {
    display: flex;
  }
}

@media (min-width: 1201px) {
  #gpu-simulator-app .edu-toggle-btn {
    display: none;
  }
}

#gpu-simulator-app .edu-toggle-btn {
  background: transparent;
  border: 1px solid #00ffaa;
  border-radius: 4px;
  padding: 5px 8px;
  cursor: pointer;
  font-size: 0.7rem;
  color: #00ffaa;
  font-family: inherit;
  font-weight: 700;
  transition: all 0.2s ease;
  display: none;
}

#gpu-simulator-app .edu-toggle-btn:hover {
  background: rgba(0, 255, 170, 0.1);
}

@media (max-width: 768px) {
  #gpu-simulator-app {
    height: auto;
    min-height: 100vh;
  }

  #gpu-simulator-app .header-row {
    padding: 6px 10px;
    gap: 8px;
  }

  #gpu-simulator-app .title-section h1 {
    font-size: 0.9rem;
  }

  #gpu-simulator-app .title-section p {
    display: none;
  }

  #gpu-simulator-app .stage-tab {
    padding: 4px 8px;
    font-size: 0.65rem;
  }

  #gpu-simulator-app .stage-tab .stage-icon {
    display: none;
  }

  #gpu-simulator-app .header-stats {
    gap: 8px;
  }

  #gpu-simulator-app .header-stat-value {
    font-size: 0.9rem;
  }

  #gpu-simulator-app .header-stat-label {
    font-size: 0.5rem;
  }

  #gpu-simulator-app .ctrl-btn {
    padding: 4px 8px;
    font-size: 0.6rem;
  }

  #gpu-simulator-app .main-area {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    overflow-y: auto;
  }

  #gpu-simulator-app .orders-panel {
    border-left: none;
    border-top: 1px solid #1e2936;
    max-height: 200px;
  }

  #gpu-simulator-app .workstations-grid {
    grid-template-columns: 1fr;
  }

  #gpu-simulator-app .welcome-banner {
    width: 90vw;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  #gpu-simulator-app .header-row {
    padding: 4px 8px;
    gap: 6px;
  }

  #gpu-simulator-app .header-stats {
    width: 100%;
    justify-content: space-between;
    order: 10;
  }

  #gpu-simulator-app .stage-tabs {
    order: 5;
  }

  #gpu-simulator-app .header-controls {
    order: 6;
  }
}
</style>

<div id="gpu-simulator-app">

<!-- Welcome Banner -->
<div class="welcome-banner" id="welcomeBanner" style="display: none;">
  <button class="dismiss-btn" onclick="dismissWelcome()" aria-label="Dismiss">&times;</button>
  <h2>Welcome to GPU Assembly Simulator!</h2>
  <p>Learn computing models by building GPUs in this interactive simulation.</p>

  <div class="welcome-steps">
    <strong>How to play:</strong>
    <ol>
      <li><strong>Select a Stage</strong> — Sequential, Parallel, or Distributed</li>
      <li><strong>Click Start</strong> — Orders will appear automatically</li>
      <li><strong>Assign Tasks</strong> — Click PCB, Cores, Memory, Test buttons in order</li>
      <li><strong>Compare Performance</strong> — Watch how different models affect speed</li>
    </ol>
  </div>

  <div class="welcome-banner-actions">
    <button class="welcome-btn welcome-btn-primary" onclick="startFirstGame()">Get Started</button>
    <button class="welcome-btn welcome-btn-secondary" onclick="dismissWelcome()">I'll Explore</button>
  </div>
</div>

<!-- Header Row -->
<div class="header-row">
  <div class="title-section">
    <h1>GPU ASSEMBLY SIMULATOR</h1>
    <p>Hardware Havoc :: Computing Models Lab</p>
  </div>

  <div class="stage-tabs">
    <button class="stage-tab active" onclick="selectStage(1)">
      <span class="stage-icon">🤖</span> Sequential
    </button>
    <button class="stage-tab locked" id="stage2Btn" onclick="selectStage(2)">
      <span class="stage-icon">🤖🤖</span> Parallel
    </button>
    <button class="stage-tab locked" id="stage3Btn" onclick="selectStage(3)">
      <span class="stage-icon">🏭</span> Distributed
    </button>
  </div>

  <div class="header-stats">
    <div class="header-stat">
      <div class="header-stat-value" id="gpusCompleted">0</div>
      <div class="header-stat-label">GPUs Built</div>
    </div>
    <div class="header-stat">
      <div class="header-stat-value" id="timeElapsed">0.0s</div>
      <div class="header-stat-label">Time</div>
    </div>
    <div class="header-stat">
      <div class="header-stat-value" id="avgTime">--</div>
      <div class="header-stat-label">Avg/GPU</div>
    </div>
    <div class="header-stat">
      <div class="header-stat-value" id="throughput">0.0</div>
      <div class="header-stat-label">GPUs/Min</div>
    </div>
  </div>

  <div class="header-controls">
    <button class="ctrl-btn ctrl-btn-start" onclick="startGame()">▶ Start</button>
    <button class="ctrl-btn ctrl-btn-reset" onclick="resetGame()">↻ Reset</button>
    <button class="ctrl-btn ctrl-btn-order" onclick="addOrder()">+ Order</button>
    <button class="ctrl-btn ctrl-btn-auto" id="autoFillBtn" onclick="toggleAutoFill()" style="display: none;">🤖 Auto</button>
    <button class="edu-toggle-btn" onclick="toggleEducationDrawer()">📚 Learn</button>
    <div class="achievements-wrapper">
      <button class="achievements-btn" onclick="toggleAchievements()" title="Achievements">🏆</button>
      <div class="achievements-popover" id="achievementsPopover">
        <h3>Achievements</h3>
        <div id="achievementsList"></div>
      </div>
    </div>
  </div>
</div>

<!-- Stage Brief -->
<div class="stage-brief" id="stageBrief">Select a stage to begin assembly!</div>

<!-- Main Area -->
<div class="main-area">
  <!-- Assembly Area -->
  <div class="assembly-area">
    <div class="step-indicator">
      <span class="step">🔲 PCB</span>
      <span class="arrow">→</span>
      <span class="step">⚙️ Cores</span>
      <span class="arrow">→</span>
      <span class="step">💾 Memory</span>
      <span class="arrow">→</span>
      <span class="step">🔬 Test</span>
    </div>
    <div id="workstationsGrid" class="workstations-grid"></div>
  </div>

  <!-- Orders Queue -->
  <div class="orders-panel">
    <h3>📦 Orders</h3>
    <div id="ordersList"></div>
  </div>

  <!-- Education Panel -->
  <div class="education-panel" id="educationPanel">
    <div class="edu-panel active" id="sequentialPanel">
      <div class="edu-panel-header">
        <h3>Sequential Computing</h3>
      </div>
      <div class="edu-panel-content">
        <h4>What is it?</h4>
        <p>Tasks execute one after another in a single stream. Only one operation happens at a time.</p>

        <h4>Real-World Examples</h4>
        <ul>
          <li>Early computers (1940s-1990s)</li>
          <li>Single-core processors</li>
          <li>Assembly line with one worker</li>
        </ul>

        <div class="edu-highlight-box">
          <strong>Key Limitation:</strong> No matter how fast the worker, throughput is limited by processing one task at a time.
        </div>
      </div>
    </div>

    <div class="edu-panel" id="parallelPanel">
      <div class="edu-panel-header">
        <h3>Parallel Computing</h3>
      </div>
      <div class="edu-panel-content">
        <h4>What is it?</h4>
        <p>Multiple processing units work simultaneously on different parts of the same problem.</p>

        <h4>Real-World Examples</h4>
        <ul>
          <li>Multi-core CPUs (2-128 cores)</li>
          <li>GPU processing (thousands of cores)</li>
          <li>Team assembly line</li>
        </ul>

        <div class="edu-highlight-box">
          <strong>Bottleneck:</strong> Shared resources (memory, I/O, testing stations) create contention and limit speedup.
        </div>

        <table class="edu-comparison-table">
          <tr>
            <th>Cores</th>
            <th>Speedup</th>
            <th>Why Not Linear?</th>
          </tr>
          <tr>
            <td>2 cores</td>
            <td>~1.8x</td>
            <td>Coordination overhead</td>
          </tr>
          <tr>
            <td>4 cores</td>
            <td>~3.2x</td>
            <td>Shared cache/memory</td>
          </tr>
          <tr>
            <td>8 cores</td>
            <td>~5.5x</td>
            <td>Resource contention</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="edu-panel" id="distributedPanel">
      <div class="edu-panel-header">
        <h3>Distributed Computing</h3>
      </div>
      <div class="edu-panel-content">
        <h4>What is it?</h4>
        <p>Independent systems work on separate tasks without sharing resources. Near-linear scaling possible.</p>

        <h4>Real-World Examples</h4>
        <ul>
          <li>Cloud data centers</li>
          <li>CDNs (Content Delivery Networks)</li>
          <li>Blockchain networks</li>
          <li>Multi-factory manufacturing</li>
        </ul>

        <div class="edu-highlight-box">
          <strong>Key Advantage:</strong> Each node has dedicated resources, eliminating most bottlenecks. Scaling is limited mainly by coordination costs.
        </div>

        <h4>Trade-offs</h4>
        <p><strong>Pros:</strong> Near-linear scaling, fault tolerance, geographic distribution</p>
        <p><strong>Cons:</strong> Network latency, data consistency challenges, higher complexity</p>
      </div>
    </div>
  </div>
</div>

<!-- Game Over Modal -->
<div id="gameOverModal" class="modal-overlay">
  <div class="modal-content">
    <div class="modal-emoji">⚡</div>
    <h2>STAGE COMPLETE!</h2>
    <div id="resultsContent"></div>
    <button class="btn btn-success" onclick="nextStage()" style="margin-top: 20px;">Next Stage →</button>
  </div>
</div>

<!-- Help Button -->
<div class="help-button">?</div>
<div class="help-tooltip">
  <h3>How to Play</h3>

  <h4>Goal</h4>
  <p>Build 5 GPUs as fast as possible by completing all assembly steps for each order.</p>

  <h4>Controls</h4>
  <ul>
    <li><strong>Start:</strong> Begin production and spawn orders</li>
    <li><strong>Reset:</strong> Clear current stage and restart</li>
    <li><strong>+ Order:</strong> Manually add an order to the queue</li>
  </ul>

  <h4>Stage 1 - Sequential</h4>
  <p>One robot processes each GPU step-by-step. Click the task buttons (PCB, Cores, Memory) in order, then Test.</p>

  <h4>Stage 2 - Parallel</h4>
  <p>Three robots work simultaneously! Assign tasks to any available robot. The shared testing station is a bottleneck.</p>

  <h4>Stage 3 - Distributed</h4>
  <p>Three independent factories with dedicated testers. Fully automated — orders auto-route to the least busy factory.</p>

  <h4>Tips</h4>
  <ul>
    <li>Complete tasks in order: PCB → Cores → Memory → Test</li>
    <li>Watch for bottlenecks (red indicators)</li>
    <li>Track progress in the Orders panel</li>
    <li>Click 🏆 to see your achievements</li>
  </ul>
</div>

</div>

<script type="module">
// Import API configuration
import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

// ===== GAME STATE =====
let currentStage = 1;
let gameRunning = false;
let orders = [];
let completedGPUs = 0;
let startTime = null;
let timeElapsed = 0;
let orderCounter = 1;
let workstations = [];
let totalGPUsAllTime = 0;
let fastestGPU = Infinity;
let sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
const API_URL = pythonURI;
let autoFillEnabled = false;
let autoFillInterval = null;

let stageStats = {
  1: { completed: 0, time: 0, avgTime: 0 },
  2: { completed: 0, time: 0, avgTime: 0 },
  3: { completed: 0, time: 0, avgTime: 0 }
};

const achievements = [
  { id: 'first', name: 'First Build', desc: 'Assemble 1 GPU', icon: '💎', unlocked: false, check: () => totalGPUsAllTime >= 1 },
  { id: 'speed', name: 'Speed Demon', desc: 'GPU in under 10s', icon: '⚡', unlocked: false, check: () => false },
  { id: 'stage1', name: 'Sequential Master', desc: 'Complete Stage 1', icon: '🥇', unlocked: false, check: () => stageStats[1].completed >= 5 },
  { id: 'stage2', name: 'Parallel Expert', desc: 'Complete Stage 2', icon: '🥈', unlocked: false, check: () => stageStats[2].completed >= 5 },
  { id: 'stage3', name: 'Factory Mogul', desc: 'Complete Stage 3', icon: '🥉', unlocked: false, check: () => stageStats[3].completed >= 5 },
  { id: 'efficiency', name: 'Peak Efficiency', desc: '10+ GPUs/min', icon: '📈', unlocked: false, check: () => false },
  { id: 'marathon', name: 'Production Pro', desc: '20 Total GPUs', icon: '🏭', unlocked: false, check: () => totalGPUsAllTime >= 20 }
];

const TASK_DURATIONS = {
  pcb: 2000,
  cores: 1500,
  memory: 1500,
  test: 3000
};

const TASK_ICONS = {
  pcb: '🔲',
  cores: '⚙️',
  memory: '💾',
  test: '🔬'
};

const TASK_NAMES = {
  pcb: 'PCB',
  cores: 'Cores',
  memory: 'Memory',
  test: 'Test'
};

// ===== AUDIO =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

  const freqs = {
    click: [800, 400],
    complete: [523, 659, 784],
    achievement: [659, 784, 1047],
    stage: [440, 554, 659]
  };

  if (freqs[type]) {
    osc.frequency.setValueAtTime(freqs[type][0], audioCtx.currentTime);
  }

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.2);
}

// ===== UI HELPERS =====
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function checkAchievements() {
  achievements.forEach(ach => {
    if (!ach.unlocked && ach.check()) {
      ach.unlocked = true;
      playSound('achievement');
      showToast(`🏆 ${ach.name}!`, 'success');
      renderAchievements();
    }
  });

  const throughput = timeElapsed > 0 ? ((completedGPUs / timeElapsed) * 60) : 0;
  if (throughput >= 10 && !achievements.find(a => a.id === 'efficiency').unlocked) {
    achievements.find(a => a.id === 'efficiency').unlocked = true;
    playSound('achievement');
    showToast('🏆 Peak Efficiency!', 'success');
    renderAchievements();
  }

  if (fastestGPU < 10 && !achievements.find(a => a.id === 'speed').unlocked) {
    achievements.find(a => a.id === 'speed').unlocked = true;
    playSound('achievement');
    showToast('🏆 Speed Demon!', 'success');
    renderAchievements();
  }
}

function renderAchievements() {
  const list = document.getElementById('achievementsList');
  list.innerHTML = achievements.map(a => `
    <div class="achievement ${a.unlocked ? 'unlocked' : ''}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-info">
        <div class="achievement-name">${a.name}</div>
        <div class="achievement-desc">${a.desc}</div>
      </div>
    </div>
  `).join('');
}

function toggleAchievements() {
  const popover = document.getElementById('achievementsPopover');
  popover.classList.toggle('show');
  playSound('click');
}

function syncEducationPanel(stage) {
  const panelMap = { 1: 'sequentialPanel', 2: 'parallelPanel', 3: 'distributedPanel' };
  document.querySelectorAll('#gpu-simulator-app .edu-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(panelMap[stage]);
  if (panel) panel.classList.add('active');
}

function toggleEducationDrawer() {
  const panel = document.getElementById('educationPanel');
  panel.classList.toggle('drawer-open');
  playSound('click');
}

// ===== WELCOME =====
function dismissWelcome() {
  const banner = document.getElementById('welcomeBanner');
  if (banner) {
    banner.style.display = 'none';
    localStorage.setItem('gpuSimWelcomeDismissed', 'true');
  }
}

function startFirstGame() {
  dismissWelcome();
  if (!gameRunning && currentStage === 1) {
    startGame();
    showToast('🚀 Let\'s build some GPUs!', 'success');
  }
}

function checkWelcomeBanner() {
  const banner = document.getElementById('welcomeBanner');
  const dismissed = localStorage.getItem('gpuSimWelcomeDismissed');

  if (!dismissed && banner) {
    setTimeout(() => {
      banner.style.display = 'block';
    }, 500);
  }
}

// ===== GAME INIT =====
function initGame() {
  renderAchievements();
  selectStage(1);
}

// ===== STAGE MANAGEMENT =====
function selectStage(stage) {
  const btn = document.getElementById(`stage${stage}Btn`);
  if (stage > 1 && btn && btn.classList.contains('locked')) {
    showToast('Complete previous stage first!', 'warning');
    return;
  }

  currentStage = stage;
  playSound('click');

  document.querySelectorAll('.stage-tab').forEach((b, i) => {
    b.classList.remove('active');
    if (i + 1 === stage) b.classList.add('active');
  });

  syncEducationPanel(stage);
  resetGame();
  setupStage(stage);
}

function setupStage(stage) {
  workstations = [];
  const stageBrief = document.getElementById('stageBrief');
  const autoFillBtn = document.getElementById('autoFillBtn');

  // Show auto-fill button only for stages 1 and 2
  if (stage === 1 || stage === 2) {
    autoFillBtn.style.display = 'inline-block';
  } else {
    autoFillBtn.style.display = 'none';
    if (autoFillEnabled) {
      toggleAutoFill(); // Turn off if it was on
    }
  }

  if (stage === 1) {
    stageBrief.textContent = 'SEQUENTIAL: One robot processes GPUs step-by-step. Click PCB → Cores → Memory → Test in order.';
    workstations.push({
      id: 1,
      name: 'Assembly Line',
      robots: [{ id: 1, name: 'Robot-01', busy: false, task: null, timer: null }],
      tester: { busy: false, timer: null, orderId: null }
    });
  } else if (stage === 2) {
    stageBrief.textContent = 'PARALLEL: Three robots work together! But they share ONE testing station—this creates a bottleneck!';
    workstations.push({
      id: 1,
      name: 'Assembly Line',
      robots: [
        { id: 1, name: 'Robot-01', busy: false, task: null, timer: null },
        { id: 2, name: 'Robot-02', busy: false, task: null, timer: null },
        { id: 3, name: 'Robot-03', busy: false, task: null, timer: null }
      ],
      tester: { busy: false, timer: null, orderId: null }
    });
  } else if (stage === 3) {
    stageBrief.textContent = 'DISTRIBUTED: Three independent factories with their own testing! Orders auto-route to least busy factory.';
    for (let i = 1; i <= 3; i++) {
      workstations.push({
        id: i,
        name: `Factory ${String.fromCharCode(64 + i)}`,
        robots: [{ id: 1, name: `Bot-${i}`, busy: false, task: null, timer: null }],
        tester: { busy: false, timer: null, orderId: null }
      });
    }
  }

  renderWorkstations();
}

// ===== RENDERING =====
function renderWorkstations() {
  const grid = document.getElementById('workstationsGrid');
  grid.innerHTML = workstations.map(station => `
    <div class="workstation">
      <div class="workstation-header">
        <span>${station.name}</span>
        <span class="station-load">${getStationLoad(station)}</span>
      </div>
      ${station.robots.map(robot => `
        <div class="robot ${robot.busy ? 'busy' : ''}" ${robot.busy ? `style="--duration: ${TASK_DURATIONS[robot.task]}ms"` : ''}>
          <div class="robot-name">${robot.name}</div>
          <div class="robot-status">${robot.busy ? `[${TASK_NAMES[robot.task]}] GPU #${robot.orderId || '?'}` : '[IDLE]'}</div>
          ${currentStage !== 3 ? `
            <div class="task-buttons">
              ${Object.keys(TASK_DURATIONS).filter(t => t !== 'test').map(task => `
                <button class="task-btn" onclick="assignTask(${station.id}, ${robot.id}, '${task}')" ${robot.busy ? 'disabled' : ''}>
                  ${TASK_ICONS[task]}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `).join('')}
      <div class="testing-station ${station.tester.busy ? 'busy' : ''}">
        <div class="testing-status">🔬 ${station.tester.busy ? `Testing #${station.tester.orderId}` : 'Ready'}</div>
        ${currentStage !== 3 ? `
          <button class="task-btn" onclick="assignTest(${station.id})" ${station.tester.busy ? 'disabled' : ''} style="width: 100%;">
            ${TASK_ICONS.test} Test
          </button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function getStationLoad(station) {
  const busy = station.robots.filter(r => r.busy).length;
  const total = station.robots.length;
  return `${busy}/${total} ${station.tester.busy ? '🔴' : '🟢'}`;
}

function renderOrders() {
  const list = document.getElementById('ordersList');

  if (orders.length === 0) {
    list.innerHTML = '<div style="opacity: 0.6; font-size: 0.8rem; text-align: center;">No orders</div>';
    return;
  }

  list.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-id">GPU #${order.id}</div>
      ${currentStage === 3 ? `<div class="order-factory">Factory ${String.fromCharCode(64 + order.stationId)}</div>` : ''}
      <div class="order-progress">
        ${Object.keys(TASK_DURATIONS).map(task => `
          <div class="progress-step ${order.steps[task] ? 'completed' : ''}">
            ${TASK_ICONS[task]}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ===== ORDER MANAGEMENT =====
function addOrder() {
  const stationId = currentStage === 3 ? findLeastBusyStation() : 1;

  const order = {
    id: orderCounter++,
    steps: { pcb: false, cores: false, memory: false, test: false },
    stationId: stationId,
    startTime: Date.now()
  };

  orders.push(order);
  playSound('click');
  renderOrders();

  if (currentStage === 3) {
    autoProcessOrder(order);
  }
}

function findLeastBusyStation() {
  let min = Infinity;
  let best = workstations[0];
  workstations.forEach(s => {
    const load = s.robots.filter(r => r.busy).length + (s.tester.busy ? 1 : 0);
    if (load < min) {
      min = load;
      best = s;
    }
  });
  return best.id;
}

function autoProcessOrder(order) {
  const station = workstations.find(s => s.id === order.stationId);
  const robot = station.robots[0];

  const processStep = (step) => {
    if (order.steps[step]) return;

    if (step === 'test') {
      if (!station.tester.busy && order.steps.pcb && order.steps.cores && order.steps.memory) {
        station.tester.busy = true;
        station.tester.orderId = order.id;
        station.tester.timer = setTimeout(() => {
          order.steps.test = true;
          station.tester.busy = false;
          station.tester.orderId = null;
          checkOrderComplete(order);
          renderOrders();
          renderWorkstations();
        }, TASK_DURATIONS.test);
        renderWorkstations();
      }
    } else {
      if (!robot.busy) {
        robot.busy = true;
        robot.task = step;
        playSound('click');
        robot.timer = setTimeout(() => {
          order.steps[step] = true;
          robot.busy = false;
          robot.task = null;
          renderOrders();
          renderWorkstations();

          const steps = ['pcb', 'cores', 'memory', 'test'];
          const idx = steps.indexOf(step);
          if (idx < steps.length - 1) {
            setTimeout(() => processStep(steps[idx + 1]), 100);
          }
        }, TASK_DURATIONS[step]);
        renderWorkstations();
      }
    }
  };

  processStep('pcb');
}

// ===== TASK ASSIGNMENT (PPR - PRESERVED EXACTLY) =====
// Helper: Find eligible order (ITERATION + SELECTION)
function findEligibleOrder(task, stationId) {
  for (let order of orders) {
    // Selection: Filter by station
    if (order.stationId !== stationId && currentStage !== 3) continue;

    // Selection: Check if task needed
    if (!order.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // Selection: Verify prerequisites
      if (idx === 0 || order.steps[steps[idx - 1]]) {
        return order;  // Return first eligible order
      }
    }
  }
  return null;  // No eligible order found
}

// Helper: Validate prerequisites (SELECTION)
function validateTaskPrerequisites(order, task) {
  const steps = ['pcb', 'cores', 'memory'];
  const idx = steps.indexOf(task);

  // Selection: First task has no prerequisites
  if (idx === 0) return true;

  // Selection: Check previous task completed
  return order.steps[steps[idx - 1]];
}

// Helper: Calculate task duration (SELECTION)
function getTaskDuration(task) {
  // Selection: Parallel stage is faster
  return currentStage === 2 ? TASK_DURATIONS[task] * 0.6 : TASK_DURATIONS[task];
}

// Main procedure: Assign task to robot (SEQUENCING)
function assignTask(stationId, robotId, task) {
  const station = workstations.find(s => s.id === stationId);
  const robot = station.robots.find(r => r.id === robotId);

  // Selection: Validate robot available
  if (robot.busy || orders.length === 0) return;

  // Sequencing Step 1: Find eligible order (uses ITERATION)
  const order = findEligibleOrder(task, stationId);
  if (!order) {
    showToast('No orders need this task!', 'warning');
    return;
  }

  // Sequencing Step 2: Validate prerequisites (uses SELECTION)
  if (!validateTaskPrerequisites(order, task)) {
    const steps = ['pcb', 'cores', 'memory'];
    const idx = steps.indexOf(task);
    showToast(`Complete ${steps[idx - 1].toUpperCase()} first!`, 'warning');
    return;
  }

  // Sequencing Step 3: Assign task to robot
  robot.busy = true;
  robot.task = task;
  robot.orderId = order.id;
  playSound('click');

  // Sequencing Step 4: Schedule completion (uses SELECTION for duration)
  const duration = getTaskDuration(task);
  robot.timer = setTimeout(() => {
    order.steps[task] = true;
    robot.busy = false;
    robot.task = null;
    robot.orderId = null;
    playSound('complete');
    renderOrders();
    renderWorkstations();
  }, duration);

  renderWorkstations();
}

function assignTest(stationId) {
  const station = workstations.find(s => s.id === stationId);

  if (station.tester.busy || orders.length === 0) return;

  // Find first order ready for testing
  let order = null;
  for (let o of orders) {
    if (o.stationId !== stationId && currentStage !== 3) continue;

    if (!o.steps.test && o.steps.pcb && o.steps.cores && o.steps.memory) {
      order = o;
      break;
    }
  }

  if (!order) {
    showToast('No orders ready for testing!', 'warning');
    return;
  }

  if (order.steps.test) {
    showToast('Already tested!', 'warning');
    return;
  }

  station.tester.busy = true;
  station.tester.orderId = order.id;
  playSound('click');

  // Faster test times for Stage 2
  const duration = currentStage === 2 ? TASK_DURATIONS.test * 0.6 : TASK_DURATIONS.test;

  station.tester.timer = setTimeout(() => {
    order.steps.test = true;
    station.tester.busy = false;
    station.tester.orderId = null;
    playSound('complete');
    checkOrderComplete(order);
    renderOrders();
    renderWorkstations();
  }, duration);

  renderWorkstations();
}

function checkOrderComplete(order) {
  if (order.steps.pcb && order.steps.cores && order.steps.memory && order.steps.test) {
    completedGPUs++;
    totalGPUsAllTime++;
    const time = (Date.now() - order.startTime) / 1000;

    if (time < fastestGPU) {
      fastestGPU = time;
    }

    orders = orders.filter(o => o.id !== order.id);
    playSound('stage');
    showToast(`✅ GPU #${order.id} done in ${time.toFixed(1)}s!`, 'success');

    updateStats();
    checkAchievements();
    logGameData();

    if (completedGPUs >= 5) {
      completeStage();
    }
  }
}

// ===== GAME FLOW =====
function startGame() {
  if (gameRunning) {
    showToast('Already running!', 'info');
    return;
  }

  gameRunning = true;
  startTime = Date.now();
  playSound('stage');
  showToast('🚀 Production started!', 'info');

  for (let i = 0; i < 3; i++) {
    setTimeout(() => addOrder(), i * 500);
  }

  const addInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(addInterval);
      return;
    }
    if (orders.length < 5) {
      addOrder();
    }
  }, currentStage === 1 ? 8000 : currentStage === 2 ? 5000 : 4000);

  const updateInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(updateInterval);
      return;
    }
    updateStats();
  }, 100);
}

function updateStats() {
  timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;

  document.getElementById('gpusCompleted').textContent = completedGPUs;
  document.getElementById('timeElapsed').textContent = timeElapsed.toFixed(1) + 's';

  const avg = completedGPUs > 0 ? (timeElapsed / completedGPUs).toFixed(1) + 's' : '--';
  document.getElementById('avgTime').textContent = avg;

  const throughput = timeElapsed > 0 ? ((completedGPUs / timeElapsed) * 60).toFixed(1) : '0.0';
  document.getElementById('throughput').textContent = throughput;
}

function completeStage() {
  gameRunning = false;
  playSound('achievement');

  stageStats[currentStage] = {
    completed: completedGPUs,
    time: timeElapsed,
    avgTime: timeElapsed / completedGPUs
  };

  // Log game data to backend
  logGameData();

  const results = document.getElementById('resultsContent');
  const improvement = currentStage > 1 ?
    ((stageStats[currentStage - 1].avgTime / stageStats[currentStage].avgTime - 1) * 100).toFixed(0) : 0;

  results.innerHTML = `
    <div class="results-box">
      <div class="result-row">
        <span>GPUs Built:</span>
        <strong>${completedGPUs}</strong>
      </div>
      <div class="result-row">
        <span>Total Time:</span>
        <strong>${timeElapsed.toFixed(1)}s</strong>
      </div>
      <div class="result-row">
        <span>Avg Time/GPU:</span>
        <strong>${(timeElapsed / completedGPUs).toFixed(1)}s</strong>
      </div>
      <div class="result-row">
        <span>Throughput:</span>
        <strong>${((completedGPUs / timeElapsed) * 60).toFixed(1)} GPUs/min</strong>
      </div>
    </div>

    ${currentStage > 1 ? `
      <div class="improvement-box">
        <h3>⚡ Performance Boost</h3>
        <div class="improvement-value">+${improvement}% FASTER</div>
        <p style="font-size: 0.85rem; line-height: 1.5; color: #ddd;">
          ${currentStage === 2 ?
            'Parallel processing increased speed, but the shared test station became a bottleneck!' :
            'Distributed computing eliminated all bottlenecks with independent resources!'}
        </p>
      </div>
    ` : `
      <p style="margin-top: 15px; font-size: 0.85rem; line-height: 1.5; color: #ddd;">
        Sequential processing is simple but slow. Ready for parallelism?
      </p>
    `}
  `;

  if (currentStage < 3) {
    document.getElementById(`stage${currentStage + 1}Btn`).classList.remove('locked');
  }

  checkAchievements();
  document.getElementById('gameOverModal').classList.add('show');
}

function nextStage() {
  document.getElementById('gameOverModal').classList.remove('show');
  playSound('click');

  if (currentStage < 3) {
    selectStage(currentStage + 1);
  } else {
    showToast('🎉 All stages complete!', 'success');
  }
}

function resetGame() {
  gameRunning = false;
  orders = [];
  completedGPUs = 0;
  timeElapsed = 0;
  orderCounter = 1;

  // Stop auto-fill if running
  if (autoFillEnabled) {
    stopAutoFill();
    autoFillEnabled = false;
    const btn = document.getElementById('autoFillBtn');
    if (btn) {
      btn.textContent = '🤖 Auto';
      btn.classList.remove('active');
    }
  }

  workstations.forEach(station => {
    station.robots.forEach(robot => {
      if (robot.timer) clearTimeout(robot.timer);
      robot.busy = false;
      robot.task = null;
      robot.timer = null;
    });
    if (station.tester.timer) clearTimeout(station.tester.timer);
    station.tester.busy = false;
    station.tester.timer = null;
    station.tester.orderId = null;
  });

  updateStats();
  renderOrders();
  renderWorkstations();
  showToast('↻ Reset complete', 'info');
}

// ===== AUTO-FILL =====
function toggleAutoFill() {
  autoFillEnabled = !autoFillEnabled;
  const btn = document.getElementById('autoFillBtn');

  if (autoFillEnabled) {
    btn.textContent = '🤖 Auto: ON';
    btn.classList.add('active');
    showToast('🤖 Auto-fill enabled!', 'info');
    startAutoFill();
  } else {
    btn.textContent = '🤖 Auto';
    btn.classList.remove('active');
    showToast('🤖 Auto-fill disabled', 'info');
    stopAutoFill();
  }
}

function startAutoFill() {
  if (currentStage === 3) return;

  autoFillInterval = setInterval(() => {
    if (!gameRunning || !autoFillEnabled) {
      stopAutoFill();
      return;
    }

    processAutoFillTasks();
  }, 100);
}

function stopAutoFill() {
  if (autoFillInterval) {
    clearInterval(autoFillInterval);
    autoFillInterval = null;
  }
}

function processAutoFillTasks() {
  const station = workstations[0];

  // Try to assign test tasks first (highest priority)
  if (!station.tester.busy) {
    for (let order of orders) {
      if (!order.steps.test && order.steps.pcb && order.steps.cores && order.steps.memory) {
        assignTest(1);
        return;
      }
    }
  }

  // Try to assign assembly tasks to idle robots
  const tasks = ['pcb', 'cores', 'memory'];

  for (let robot of station.robots) {
    if (robot.busy) continue;

    for (let order of orders) {
      for (let task of tasks) {
        if (!order.steps[task]) {
          const taskIndex = tasks.indexOf(task);
          if (taskIndex === 0 || order.steps[tasks[taskIndex - 1]]) {
            assignTask(1, robot.id, task);
            return;
          }
        }
      }
    }
  }
}

// ===== BACKEND LOGGING =====
async function logGameData() {
  try {
    const unlockedAchievements = achievements.filter(a => a.unlocked).map(a => a.id);
    const throughput = timeElapsed > 0 ? ((completedGPUs / timeElapsed) * 60) : 0;

    const gameData = {
      sessionId: sessionId,
      stage: currentStage,
      gpusCompleted: completedGPUs,
      timeElapsed: parseFloat(timeElapsed.toFixed(2)),
      avgTime: parseFloat((timeElapsed / completedGPUs).toFixed(2)),
      throughput: parseFloat(throughput.toFixed(2)),
      achievements: unlockedAchievements,
      fastestGPU: fastestGPU !== Infinity ? parseFloat(fastestGPU.toFixed(2)) : null
    };

    console.log('📊 Logging game data:', gameData);

    const response = await fetch(`${API_URL}/api/game-logs/gpu-simulator`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(gameData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Game data logged successfully:', result);
    } else {
      console.warn('⚠️ Failed to log game data:', response.status);
    }
  } catch (error) {
    console.error('❌ Error logging game data:', error);
  }
}

// ===== EXPOSE FUNCTIONS TO GLOBAL SCOPE =====
window.selectStage = selectStage;
window.startGame = startGame;
window.resetGame = resetGame;
window.addOrder = addOrder;
window.assignTask = assignTask;
window.assignTest = assignTest;
window.nextStage = nextStage;
window.toggleAutoFill = toggleAutoFill;
window.dismissWelcome = dismissWelcome;
window.startFirstGame = startFirstGame;
window.toggleAchievements = toggleAchievements;
window.toggleEducationDrawer = toggleEducationDrawer;

// ===== INITIALIZE =====
initGame();
checkWelcomeBanner();

// Close achievements popover when clicking outside
document.addEventListener('click', (e) => {
  const wrapper = document.querySelector('.achievements-wrapper');
  const popover = document.getElementById('achievementsPopover');
  if (wrapper && popover && !wrapper.contains(e.target)) {
    popover.classList.remove('show');
  }
});

// Close education drawer when clicking outside (mobile)
document.addEventListener('click', (e) => {
  const panel = document.getElementById('educationPanel');
  const toggleBtn = document.querySelector('.edu-toggle-btn');
  if (panel && panel.classList.contains('drawer-open') &&
      !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
    panel.classList.remove('drawer-open');
  }
});

// Help tooltip toggle
const helpButton = document.querySelector('.help-button');
const helpTooltip = document.querySelector('.help-tooltip');
let helpTooltipTimeout;

if (helpButton && helpTooltip) {
  helpButton.addEventListener('click', (e) => {
    e.stopPropagation();
    helpTooltip.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!helpButton.contains(e.target) && !helpTooltip.contains(e.target)) {
      helpTooltip.classList.remove('show');
    }
  });

  helpTooltip.addEventListener('mouseenter', () => {
    clearTimeout(helpTooltipTimeout);
  });

  helpTooltip.addEventListener('mouseleave', () => {
    helpTooltipTimeout = setTimeout(() => {
      helpTooltip.classList.remove('show');
    }, 300);
  });
}
</script>
