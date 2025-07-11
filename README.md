# 💬 Dev Connect – MERN Stack Forum

Welcome to **Dev Connect**, a fully responsive forum web app built with the **MERN** stack. It’s a platform where developers can connect, post, vote, comment, and collaborate in a structured, interactive way.

🔗 **Live Site**: [https://dev-connect-t7.web.app/](https://dev-connect-t7.web.app/)

---

## 📌 Features at a Glance

### 🎯 Purpose

To build a fully responsive forum that showcases core full-stack development skills including:

- REST API design
- MongoDB data modeling
- JWT-based authentication
- Firebase social login integration
- User and admin dashboard roles
- Voting, commenting, reporting features
- UI/UX best practices

---

### 🧑‍💻 User Experience

- 🔐 **Firebase Auth**: Email & social login (Google)
- 🏷️ **Tag-based Search**: Search posts by tag (backend-powered)
- 📤 **Share Posts**: Share via Facebook or WhatsApp
- ✍️ **Upvote/Downvote**: Toggle like/dislike logic
- 💬 **Comments**: With modal preview and reporting
- 🪪 **Membership System**: 5 post limit lifted after payment
- 🏅 **Badges**: Bronze (on register), Gold (on membership)
- 📱 **Responsive**: Mobile, tablet, and desktop support

### 📊 Admin Tools

- 🔧 **Admin Dashboard** with:
  - Manage Users (Make admin, search)
  - View & act on **Reported Comments**
  - Post **Announcements**
  - Manage **Tags**
  - Visual **Pie Chart Stats** (Posts, Comments, Users)

---

## 🚀 Tech Stack

### 🖥️ Frontend

- `React 19` + `React Router`
- `Tailwind CSS 4` + `AOS` for animation
- `Firebase` (auth)
- `React Hook Form` for forms
- `React Select`, `React Share`
- `Axios`, `React Query`, `SweetAlert2`
- `Pagination`, `Day.js`, `date-fns`

### 🌐 Backend

- `Node.js`, `Express`
- `MongoDB` (native driver)
- `dotenv`, `CORS`

---

## 📁 Pages & Routes

### 🔓 Public

- `/` – Home with all posts + tags + search
- `/post/:id` – Post Details + Comments + Share
- `/membership` – Payment to unlock premium
- `/join` – Login/Register with Firebase

### 🔐 Authenticated Users

- `/dashboard/profile` – My Profile + badges + About Me
- `/dashboard/add-post` – Add Post (limit check)
- `/dashboard/my-posts` – View/Edit/Delete/Report Comments

### 🛡️ Admin Only

- `/admin/manage-users` – Search, make admin
- `/admin/announcements` – Create announcements
- `/admin/reports` – Manage reported comments
- `/admin/profile` – Admin stats + tag manager

---

## 🛠️ Getting Started

### 🧬 Clone & Install
