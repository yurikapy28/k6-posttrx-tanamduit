# 🚀 K6 Stress Test – PostTrx Tanamduit

## 📌 Overview

This repository contains a stress testing implementation using **k6**
to evaluate the performance of:

- `POST /api/Auth`
- `POST /api/PostTrx`

Environment: Development  
Test Type: Stress Test  
Tool: Grafana k6  
Database: SQL Server  

---

## 🧪 Test Configuration

| Parameter | Value |
|------------|--------|
| Max Virtual Users | 100 |
| Duration | 3 Minutes |
| Ramp Strategy | Gradual Ramp-Up |
| Threshold p95 | < 1 second |
| Error Rate Target | < 1% |

### Scenario Configuration

- Ramp up to 100 VUs
- Maintain peak load
- Gradual ramp down
- Concurrent transaction simulation
- Unique `transId` per VU
- Product name aligned with `TDProductMaster`

---

## 📊 Test Results Summary

| Metric | Result |
|---------|---------|
| Total Requests | ~3000 |
| Throughput | ~15 req/s |
| p95 Response Time | ~8 seconds |
| Error Rate | ~33% |

⚠ **Threshold NOT MET**

- `p(95) < 1s` ❌
- `error rate < 1%` ❌

---

## 📈 Result Screenshots

### Dashboard Overview
![Overview](screenshots/overview.png)

### Summary Metrics
![Summary](screenshots/summary.png)

### Timing Breakdown
![Timings](screenshots/timings.png)

---

## 🔎 Performance Analysis

During stress testing at 100 VUs:

- Failure rate increased significantly (~33%)
- p95 latency exceeded 8 seconds
- No recent insert detected in `TDProductTrx` during peak failure period
- Requests likely failing at API layer before reaching DB insert

### Possible Bottlenecks

- Application worker/thread saturation
- Connection pool exhaustion
- Timeout configuration too aggressive
- Business logic validation under high concurrency

---

## 🗂 Project Structure
