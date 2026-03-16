# 🚀 Quick Start Guide

## Start the Project in 2 Steps

### 1️⃣ Start Backend (Terminal 1)
```bash
cd backend
python manage.py runserver
```
✅ Backend runs on: http://localhost:8000

### 2️⃣ Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```
✅ Frontend runs on: http://localhost:3000

---

## 🔑 Admin Login
- **Email**: admin@flooring.com
- **Password**: admin123

## 🧪 Test the App

### As Admin:
1. Sign in with admin credentials
2. Go to **Admin Panel** to:
   - View all users
   - Review seller applications
   - Approve/decline applications with merchant ID

### As Regular User:
1. Sign up with new account
2. Browse flooring services on home page
3. Click service to view details
4. Click "Apply to be Seller" to submit application
5. View profile and order history
6. Chat with AI about flooring

### As Seller (After Approval):
1. Admin approves your application
2. Go to Dashboard
3. Add new flooring services
4. Manage existing services (edit/delete)

---

## 📱 Key Screens

| Screen | Path | Description |
|--------|------|-------------|
| Home | `/` | Browse all services (public) |
| Service Detail | `/service/:id` | View service info (public) |
| Sign In | `/signin` | Login page |
| Sign Up | `/signup` | Registration page |
| Profile | `/profile` | User profile & order history |
| Apply Seller | `/apply-seller` | Apply to become seller |
| Seller Dashboard | `/seller/dashboard` | Manage your services |
| Admin Panel | `/admin/users` | Admin user & app management |
| Chat Support | `/chat` | Talk to AI chatbot |

---

## 🤖 ChatBot

Ask it questions like:
- "What are the flooring types you service?"
- "How much does tile installation cost?"
- "How do I book a service?"
- "What is hardwood polishing?"

---

## 🛠️ Common Issues

### Backend won't start
```bash
# Make sure migrations are applied
python manage.py migrate

# Check port 8000 isn't in use
python manage.py runserver 8001  # Use different port
```

### Frontend shows blank page
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start
```

### CORS error
- Make sure backend is running
- Frontend must be on http://localhost:3000
- Backend must be on http://localhost:8000

---

## 📚 API Base URL
All API calls use: `http://localhost:8000/api/v1/`

Example:
- Login: `POST http://localhost:8000/api/v1/users/login/`
- Services: `GET http://localhost:8000/api/v1/services/list/`

---

## ✨ Features to Try

1. **Register & Login** - Create account and sign in
2. **Browse Services** - See all flooring services
3. **View Details** - Click service for more info
4. **Apply as Seller** - Submit seller application
5. **Admin Approval** - (As admin) approve/decline applications
6. **Manage Services** - (As seller) add/edit/delete services
7. **AI Chat** - Ask flooring questions
8. **Order History** - View your bookings

---

## 🎨 Customization

### Change Theme
Edit `frontend/src/App.css` or use different Bootswatch theme

### Add More Services
Edit dummy data in `frontend/src/screens/HomeScreen.jsx`

### Change Admin Credentials
Run backend and use Django admin at `/admin/`

---

## 📞 Support
For questions, check the main README.md file for detailed setup instructions.
