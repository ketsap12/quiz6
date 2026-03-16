# Project Structure Map

## 📁 Backend Structure

```
backend/
├── manage.py                 # Django management command
├── db.sqlite3               # SQLite database
│
├── backend/                 # Main Django config
│   ├── __init__.py
│   ├── settings.py          # ✅ Configured with all apps & JWT
│   ├── urls.py              # ✅ All app URLs included
│   ├── asgi.py
│   └── wsgi.py
│
├── users/                   # User authentication app
│   ├── models.py            # ✅ CustomUser model
│   ├── views.py             # ✅ Login, Register, Profile views
│   ├── serializers.py       # ✅ User serializers
│   ├── urls.py              # ✅ User routes
│   ├── admin.py             # ✅ User admin panel
│   └── migrations/
│
├── applications/            # Seller application app
│   ├── models.py            # ✅ SellerApplication model
│   ├── views.py             # ✅ Apply, List, Approve, Decline views
│   ├── serializers.py       # ✅ Application serializers
│   ├── urls.py              # ✅ Application routes
│   ├── admin.py             # ✅ Application admin panel
│   └── migrations/
│
├── services/                # Flooring services app
│   ├── models.py            # ✅ Service model
│   ├── views.py             # ✅ Service CRUD views
│   ├── serializers.py       # ✅ Service serializers
│   ├── urls.py              # ✅ Service routes
│   ├── admin.py             # ✅ Service admin panel
│   └── migrations/
│
├── orders/                  # Orders app
│   ├── models.py            # ✅ Order model
│   ├── views.py             # ✅ Create, Get history views
│   ├── serializers.py       # ✅ Order serializers
│   ├── urls.py              # ✅ Order routes
│   ├── admin.py             # ✅ Order admin panel
│   └── migrations/
│
└── chat/                    # AI Chatbot app
    ├── models.py
    ├── views.py             # ✅ Chatbot view
    ├── urls.py              # ✅ Chat route
    └── migrations/
```

## 🎨 Frontend Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
└── src/
    ├── components/          # Reusable components
    │   ├── Navbar.jsx       # ✅ Navigation bar (role-based)
    │   ├── Footer.jsx       # ✅ Footer component
    │   ├── ProtectedRoute.jsx # ✅ Route protection
    │   └── ChatBot.jsx      # ✅ AI chatbot component
    │
    ├── screens/             # Page components
    │   ├── HomeScreen.jsx   # ✅ Browse services
    │   ├── DetailScreen.jsx # ✅ Service details
    │   ├── SignIn.jsx       # ✅ Login page
    │   ├── SignUp.jsx       # ✅ Registration page
    │   ├── ApplySeller.jsx  # ✅ Seller application
    │   ├── UserProfile.jsx  # ✅ User profile & orders
    │   ├── SellerDashboard.jsx # ✅ Seller service management
    │   ├── UserScreen.jsx   # ✅ Admin panel
    │   └── ChatScreen.jsx   # ✅ Chat page
    │
    ├── actions/             # Redux actions
    │   ├── userActions.js   # ✅ User auth actions
    │   ├── serviceActions.js # ✅ Service actions
    │   ├── applicationActions.js # ✅ Application actions
    │   ├── orderActions.js  # ✅ Order actions
    │   └── chatActions.js   # ✅ Chat actions
    │
    ├── reducers/            # Redux reducers
    │   ├── userReducers.js  # ✅ User state
    │   ├── serviceReducers.js # ✅ Service state
    │   ├── applicationReducers.js # ✅ Application state
    │   ├── orderReducers.js # ✅ Order state
    │   └── chatReducers.js  # ✅ Chat state
    │
    ├── constants/           # Redux constants
    │   └── actionTypes.js   # ✅ All action type constants
    │
    ├── store.js             # ✅ Redux store configuration
    ├── App.js               # ✅ Main app with router
    ├── App.css              # ✅ App styling
    ├── index.js             # ✅ Entry point with Redux Provider
    ├── index.css
    └── package.json         # ✅ Dependencies configured
```

## 🔌 API Routes Map

```
/api/v1/

├── users/
│   ├── login/               POST - User login
│   ├── register/            POST - User registration
│   ├── profile/             GET  - Get user profile
│   │                        PUT  - Update user profile
│   └── admin/users/         GET  - Admin list users
│                            DELETE - Admin delete user
│
├── applications/
│   ├── apply/               POST - Submit seller application
│   ├── list/                GET  - Admin list applications
│   ├── {id}/approve/        PATCH - Admin approve
│   └── {id}/decline/        PATCH - Admin decline
│
├── services/
│   ├── list/                GET  - List all services (public)
│   ├── {id}/                GET  - Get service detail (public)
│   ├── manage/              GET  - List seller's services
│   │                        POST - Create service
│   └── manage/{id}/         PATCH - Update service
│                            DELETE - Delete service
│
├── orders/
│   ├── create/              POST - Create order
│   └── history/             GET  - Get user's orders
│
└── chat/
    └── ask/                 POST - Send message to chatbot
```

## 🔐 Route Protection

```
Public Routes (No auth required):
  ✅ GET  /                  - HomeScreen
  ✅ GET  /service/:id       - DetailScreen
  ✅ GET  /signin            - SignIn page
  ✅ GET  /signup            - SignUp page
  ✅ GET  /chat              - ChatScreen

Protected Routes (Auth required):
  ✅ GET  /profile           - UserProfile
  ✅ GET  /apply-seller      - ApplySeller

Seller Only Routes:
  ✅ GET  /seller/dashboard  - SellerDashboard

Admin Only Routes:
  ✅ GET  /admin/users       - UserScreen (Admin Panel)
```

## 🗄️ Database Models

```
CustomUser
  ├── email
  ├── username
  ├── first_name
  ├── last_name
  ├── phone_number
  ├── location
  ├── gender
  ├── role (User/Seller/Admin)
  └── merchant_id

SellerApplication
  ├── user (FK to CustomUser)
  ├── status (Pending/Approved/Declined)
  ├── decline_reason
  ├── created_at
  └── updated_at

Service
  ├── seller (FK to CustomUser)
  ├── service_name
  ├── description
  ├── price
  ├── duration_of_service
  ├── sample_image
  ├── created_at
  └── updated_at

Order
  ├── buyer (FK to CustomUser)
  ├── service (FK to Service)
  ├── paypal_transaction_id
  ├── price_paid
  └── date_purchased
```

## 🔄 Redux State Structure

```
{
  userLogin: {
    userInfo,
    loading,
    success,
    error
  },
  
  userRegister: {
    loading,
    success,
    error
  },
  
  userProfile: {
    userInfo,
    loading,
    error
  },
  
  usersList: {
    users,
    loading,
    error
  },
  
  servicesList: {
    services,
    loading,
    error
  },
  
  serviceDetail: {
    service,
    loading,
    error
  },
  
  sellerServices: {
    services,
    loading,
    error
  },
  
  sellerApplication: {
    application,
    success,
    loading,
    error
  },
  
  sellerApplicationsList: {
    applications,
    loading,
    error
  },
  
  orders: {
    orders,
    loading,
    error
  },
  
  chat: {
    response,
    loading,
    error
  }
}
```

## ✅ Implementation Checklist

- ✅ Backend fully built & integrated
- ✅ Frontend fully built & integrated
- ✅ All 9 screens created
- ✅ Redux store configured
- ✅ API endpoints fully implemented
- ✅ Authentication system (JWT)
- ✅ Role-based access control
- ✅ Admin panel with tabs
- ✅ Seller dashboard
- ✅ AI Chatbot
- ✅ Responsive design
- ✅ Error handling
- ✅ Route protection
- ✅ Dummy data for testing
- ✅ Complete documentation

## 🎯 Project Completion Status: 100%
