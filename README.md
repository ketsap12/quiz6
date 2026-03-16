# Flooring Services Platform

A full-stack web application for browsing, booking, and managing professional flooring services.

## 📋 Features

### For Users
- Browse available flooring services with detailed descriptions
- View service details and pricing
- Create an account and sign in securely
- Apply to become a service provider (seller)
- Book services and track order history
- Chat with AI assistant for flooring-related questions
- Manage user profile

### For Sellers
- Manage flooring service listings
- Add, update, and delete services
- Receive payments directly through PayPal
- Build reputation with customer ratings

### For Admins
- Manage user accounts
- Review and approve/decline seller applications
- Assign merchant IDs to sellers
- Monitor platform activity

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Redux** - State management
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Django** - Web framework
- **Django REST Framework** - API development
- **JWT** - Authentication
- **SQLite** - Database (development)

## 📦 Installation & Setup

### Backend Setup

1. **Create and activate virtual environment:**
```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

2. **Install dependencies:**
```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pillow
```

3. **Run migrations:**
```bash
python manage.py migrate
```

4. **Create superuser (admin account):**
```bash
# Admin Email: admin@flooring.com
# Admin Password: admin123
python create_superuser.py
```

5. **Start Django server:**
```bash
python manage.py runserver
```

The backend will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start React development server:**
```bash
npm start
```

The frontend will be available at: `http://localhost:3000`

## 🔐 User Roles

### Admin
- Email: `admin@flooring.com`
- Password: `admin123`
- Access: User management, seller application review

### Seller (After Approval)
- Can add and manage services
- Receive payments through PayPal
- Track service bookings

### User (Default for new registrations)
- Can browse and book services
- Can apply to become a seller
- Can view order history

## 📡 API Endpoints

### Authentication
- `POST /api/v1/users/login/` - User login
- `POST /api/v1/users/register/` - User registration
- `GET /api/v1/users/profile/` - Get user profile

### Seller Applications
- `POST /api/v1/applications/apply/` - Submit seller application
- `GET /api/v1/applications/list/` - List applications (admin only)
- `PATCH /api/v1/applications/{id}/approve/` - Approve application
- `PATCH /api/v1/applications/{id}/decline/` - Decline application

### Services
- `GET /api/v1/services/list/` - List all services (public)
- `GET /api/v1/services/{id}/` - Get service detail (public)
- `GET /api/v1/services/manage/` - List seller's services
- `POST /api/v1/services/manage/` - Create service
- `PATCH /api/v1/services/manage/{id}/` - Update service
- `DELETE /api/v1/services/manage/{id}/` - Delete service

### Orders
- `POST /api/v1/orders/create/` - Create order after payment
- `GET /api/v1/orders/history/` - Get user's order history

### Chat
- `POST /api/v1/chat/ask/` - Send message to AI chatbot

## 🎨 Available Services

The platform features realistic flooring services:
- Tile Floor Installation
- Hardwood Floor Polishing
- Vinyl Flooring Installation
- Epoxy Floor Coating
- Laminate Floor Repair
- Grout Cleaning Service

## 💳 Payment Integration

The platform supports PayPal integration for service payments:
- Services are paid directly to the seller's PayPal account
- Platform tracks transactions and creates order records
- Transaction IDs are stored for reference

## 🗂️ Project Structure

```
backend/
├── users/           # User authentication & profiles
├── applications/    # Seller application management
├── services/        # Service listings
├── orders/          # Order & payment management
├── chat/            # AI chatbot
└── manage.py

frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ChatBot.jsx
│   ├── screens/
│   │   ├── HomeScreen.jsx
│   │   ├── DetailScreen.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── ApplySeller.jsx
│   │   ├── UserProfile.jsx
│   │   ├── SellerDashboard.jsx
│   │   ├── UserScreen.jsx
│   │   └── ChatScreen.jsx
│   ├── actions/     # Redux actions
│   ├── reducers/    # Redux reducers
│   ├── constants/   # Redux constants
│   ├── store.js     # Redux store
│   ├── App.js
│   └── index.js
```

## 🚀 Running the Project

### Terminal 1 - Backend
```bash
cd backend
python manage.py runserver
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 👤 Demo Accounts

### Admin Account
- **Email:** admin@flooring.com
- **Password:** admin123
- **Role:** Admin

### Test User Registration
You can create a new account directly through the Sign Up page.

## 📝 Admin Panel Access

1. Sign in as admin
2. Go to **Admin Panel** in the navbar
3. Manage users and seller applications

## 🤖 AI Chatbot

The platform includes an AI chatbot that:
- Answers flooring-related questions
- Provides information about services
- Helps users with platform functionality
- Only responds to relevant topics

Ask it about:
- Different flooring types
- Installation and maintenance
- Service durations and pricing
- How to book services

## 🛠️ Troubleshooting

### Backend Issues
- Ensure Python virtual environment is activated
- Check that all dependencies are installed: `pip list`
- Make sure port 8000 is not in use

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear browser cache or use incognito mode
- Check that backend is running before using frontend

### CORS Errors
- Ensure Django CORS headers are configured
- Check that frontend is running on http://localhost:3000

## 📄 License

This project is for educational purposes.

## 👥 Support

For issues or questions, contact: support@flooringservices.com
