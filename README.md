# 🧸 Mister Toy

> A **full-stack toy management platform** featuring real-time chat, reviews, authentication, dynamic charts, and a fully responsive UI — built with **MongoDB**, **Express**, **React**, and **Node.js**.

---

### 🚀 Live Demo
- 🧪 [Launch Mister Toy](https://mistertoy-backend-2oeq.onrender.com)

---

### 🏷️ Tech Highlights
- 🎨 Pixel-perfect design with SCSS architecture
- 🔒 Secure Auth with role-based access
- 🗺️ Interactive map with multiple shop locations
- 📈 Real-time charts and WebSocket chat

---

## 📸 Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1752773355/mistertoy3_z72s5p.png" width="1000" /><br/>
  <img src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1752773200/mistertoy1_ibscqn.png" width="1000" /><br/>
  <img src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1752773199/mistertoy2_cuu6qc.png" width="1000"  />
</p>

---

## 🏗️ Project Structure

mistertoy-proj/
├── mistertoy-frontend/
├── mistertoy-backend/

Each part is stored in a **separate GitHub repo**, one for frontend and one for backend.

---

## 🚀 Features Overview

### 🛍️ Toy Management (CRUD)
- Full CRUD for toys
- Sorting, filtering, and multi-label search
- Responsive toy cards and detail views
- Pagination & dynamic charts

### 💬 Messages & Reviews
- Users can leave **messages** and **Mongo-aggregated reviews**
- <ToyDetails> shows both
- Admin can moderate content

### 🧑‍💼 Authentication & Authorization
- Secure login/signup (with hashed passwords)
- Admin can edit/delete toys
- Users can only manage their own reviews

### 🧠 Real-Time Chat
- Dedicated chatroom per toy via WebSockets
- Live typing indicator
- Persistent chat history saved to toy

### 🌍 Maps
- Google Maps with shop locations (Tel Aviv, Jerusalem, Haifa)


### 📊 Dashboard
- Charts: Prices per label, in-stock ratios, trends over time
- Built with `react-chartjs-2`

### 🌈 UI & UX
- Built with full **SCSS architecture**
- Dark/light themes, transitions, mobile responsive
- Form validation, modals, popups, animations

---

## 🧪 Tech Stack

| Frontend   | Backend          | DB & Infra       |
|------------|------------------|------------------|
| React      | Node.js + Express | MongoDB (Atlas)  |
| SCSS       | REST API         | Render.com       |
| Axios      | CORS             | Cloudinary       |
| Socket.IO  | JWT Auth         | —                |
---
