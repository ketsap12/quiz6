# 🏠 Flooring Services Platform (Solo Quiz Submission)

A comprehensive full-stack web application designed for browsing, booking, and managing professional flooring services, featuring an AI-powered chatbot and secure PayPal integration.

## 📝 Project Overview

This project is a unified repository containing both the **Frontend (React)** and **Backend (Django)**. It serves as a complete solution for a flooring service marketplace where users can hire experts, and experts can manage their service listings.

## 🚀 Quick Start (Setup Instructions)

### 1. Backend Setup (Django)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # Windows:
    venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure Environment Variables:**
    - Copy `.env.sample` to a new file named `.env`.
    - **CRITICAL:** Fill in your actual PayPal REST API credentials in the `.env` file.
    ```bash
    cp .env.sample .env
    ```
5.  **Run Migrations:**
    ```bash
    python manage.py migrate
    ```
6.  **Create Superuser (Admin):**
    ```bash
    # Use the script to create the default admin (admin@flooring.com / admin123)
    python create_superuser.py
    ```
7.  **Start the Backend Server:**
    ```bash
    python manage.py runserver
    ```
    *Backend runs on: `http://localhost:8000`*

### 2. Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the React application:**
    ```bash
    npm start
    ```
    *Frontend runs on: `http://localhost:3000`*

---

## 🔐 Demo Credentials

-   **Admin Account:** `admin@flooring.com` / `admin123`
-   **Test Buyer Account:** (Create via Sign Up or use `buyer@example.com` / `pass123` if already created)

---

## 🛠️ Key Features & Content

### 💳 PayPal Payment Integration
- **Fully Automated Flow**: Users can pay for services directly via PayPal Sandbox.
- **Dynamic Pricing**: Calculates totals based on the specific service selected.
- **Secure Execution**: Payments are verified on the backend before an order is created.
- **Transaction Tracking**: Stores PayPal Transaction IDs for every successful order.

### 🤖 AI Flooring Assistant
- **Context-Aware**: Provides expert advice on flooring types (Tile, Hardwood, Vinyl, etc.).
- **Smart Support**: Helps users navigate the booking process.
- **Domain Restricted**: Only responds to flooring and platform-related inquiries.

### 👤 Multi-Role Dashboard
- **Users**: Browse services, view details, and book via PayPal.
- **Sellers**: Manage their own services (Create/Update/Delete) and view earnings.
- **Admins**: Review seller applications and manage the user database.

---

## 🗂️ Project Structure

```
.
├── backend/                # Django Backend
│   ├── .env.sample         # Template for environment variables
│   ├── requirements.txt    # Python dependencies
│   ├── orders/             # PayPal integration & Order logic
│   ├── services/           # Service marketplace logic
│   ├── users/              # JWT Auth & Profile management
│   └── chat/               # AI Chatbot logic
└── frontend/               # React Frontend
    ├── package.json        # Node dependencies
    ├── src/
    │   ├── components/     # Reusable UI (PayPal Button, Navbar)
    │   ├── screens/        # Page components (Home, Success, Dashboard)
    │   ├── actions/        # Redux state logic
    │   └── store.js        # Global state management
```

## ⚠️ Important Notes for Submission
- **Environment Variables**: The actual `.env` file is **not included** in this repository to comply with security standards. Please use the `.env.sample` to set up your local credentials.
- **Combined Repository**: Both frontend and backend are maintained in this single repository for easy evaluation.
- **CORS Configuration**: The backend is configured to allow requests from `http://localhost:3000`.

---
*This project was developed as a solo quiz submission.*
