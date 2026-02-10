# 🏨 Hotel Management System

A web-based **Hotel Management System** built to make hotel operations less chaotic and way more organised.  
It brings together **bookings**, **check-ins/outs**, **housekeeping rotas**, **pricing/deals**, and **stock/inventory** in one place — instead of staff juggling spreadsheets, paper checklists, and “just ask reception”.

---

## 📌 Project Overview

Hotels don’t just manage rooms — they manage **time**, **people**, and **resources** every single day.  
This system supports the full flow:

**Booking → Check-in → Stay → Check-out → Cleaning → Restock**

The project is designed around real hotel roles like:
- **Reception / Front Desk** (bookings, guest info, check-in/out)
- **Housekeeping / Cleaners** (room status + rota)
- **Managers / Owners** (pricing, stock, overview/reporting)

---

## ✅ Core Features

### 🗓️ Bookings & Guest Flow
- Create, view, and update bookings
- Track **check-in / check-out** times
- Manage room status (available / occupied / needs cleaning / out of service)

### 🧹 Housekeeping & Cleaner Rotas
- Assign cleaning tasks based on check-outs
- Track progress per room (e.g., pending / in progress / done)
- Build rotas so rooms get turned around faster

### 🏷️ Pricing & Deals
- Update room prices
- Create deals/promotions (weekend rates, seasonal discounts, etc.)

### 📦 Stock & Inventory
- Track hotel supplies (towels, bedsheets, toiletries, complimentary items, food stock, etc.)
- Set low-stock thresholds (so you don’t randomly run out mid-week)
- Optional: log deliveries and usage history

### 💷 Basic Finance Tracking (High-level)
- Track simple costs vs revenue
- Quick summaries for performance snapshots

---

## 🧰 Tech Stack

### Frontend
- ⚛️ **React**
- 🟩 **Node.js** (npm, tooling, dev server)
- 🌬️ **Tailwind CSS**

### Backend
- 🐍 **Flask (Python)**

### Database
- 🗄️ **SQL**

---

## 🏗️ High-Level Architecture

- **React + Tailwind** = UI dashboards, tables, forms, and booking/stock views  
- **Flask API** = business logic + endpoints for bookings, rotas, pricing, inventory  
- **SQL Database** = stores rooms, bookings, users, stock items, rota schedules, etc.

---

## 🎯 Why this project exists

The point is to make hotel operations smoother:
- ✅ fewer missed cleanings
- ✅ faster room turnover
- ✅ better stock control (no running out of essentials)
- ✅ clearer overview for staff + management

---

## 👥 Project Context

Built for **COMP2411 Systems Analysis & Design (A2)** by **Group: 5 Guys**.

---
