# 🛒 MEAN Stack E-commerce API

This is a full-featured backend API built with the **MEAN** stack:  
**MongoDB**, **Express.js**, **Angular (frontend)**, and **Node.js**.

It includes secure **JWT authentication**, **role-based access control** (admin & customer), and full **CRUD management** for e-commerce resources like **products**, **brands**, **categories**, and **orders**.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB** + **Mongoose** – NoSQL database and ODM  
- **JWT** – Secure token-based authentication  
- **bcrypt** – Password hashing  
- **CORS** – Cross-origin resource sharing

---

## 🔐 Features

- 🔑 User registration & login with JWT
- 👤 Role-based access control (Admin & Customer)
- 📦 Product, Category, and Brand Management (CRUD)
- 🛒 Cart & Wishlist APIs
- 📃 Order Placement & Management
- 🌐 RESTful API design

---

## ⚙️ Installation

```bash
# Clone the repository
git https://github.com/mdsajalali/bazario-server.git

# Navigate into the directory
cd bazario-server

# Install dependencies
npm install

# Create a .env file and configure your environment variables
cp .env.example .env

# Start the server
npm start