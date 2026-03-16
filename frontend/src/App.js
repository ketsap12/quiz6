import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ApplySeller from './screens/ApplySeller';
import UserProfile from './screens/UserProfile';
import SellerDashboard from './screens/SellerDashboard';
import UserScreen from './screens/UserScreen';
import ChatScreen from './screens/ChatScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import OrderCancelledScreen from './screens/OrderCancelledScreen';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <NavigationBar />

        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/service/:id" element={<DetailScreen />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/order-success" element={<OrderSuccessScreen />} />
            <Route path="/order-cancelled" element={<OrderCancelledScreen />} />

            {/* Protected Routes */}
            <Route path="/apply-seller" element={<ApplySeller />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/admin/users" element={<UserScreen />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
