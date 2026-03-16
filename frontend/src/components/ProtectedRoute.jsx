import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly, sellerOnly }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    return <Navigate to="/signin" />;
  }

  if (adminOnly && userInfo.role !== 'Admin') {
    return <Navigate to="/" />;
  }

  if (sellerOnly && userInfo.role !== 'Seller') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
