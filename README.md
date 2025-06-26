# 🤖 AI Chatbot using GPT-3.5

This is a custom AI chatbot that interacts using OpenAI’s GPT-3.5 API. It features a React frontend, Node.js (or Python) backend, and supports real-time chat.

---

## 📅 Day 1 – Planning & Setup

### ✅ Goals:
- Finalized AI-based chatbot using OpenAI
- Chose React for frontend and Node for backend
- Created folder structure
- Initialized GitHub repo

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | React.js, Tailwind CSS   |
| Backend    | Node.js + Express |
| AI Engine  | OpenAI GPT-3.5 API       |
| Database   | MongoDB *(optional)*     |
| Hosting    | Vercel (frontend), Render (backend) |

---

## 📅 Day 2 – React UI Setup

### ✅ Done:
- Initialized React app inside `client/`
- Integrated Tailwind CSS
- Built a responsive chat interface
- Added message input & chat bubbles layout

---

## 📅 Day 3 – Backend + OpenAI API Setup

### ✅ Done:
- Created backend in `/server` using Express.js
- Installed OpenAI SDK and connected to GPT-3.5
- Created `/chat` POST endpoint to accept messages
- Used `.env` for storing API key securely

### 🔐 API:
- **POST** `/chat`
- Body: `{ "message": "your prompt here" }`
- Returns: `{ "reply": "AI response" }`




