// routing/PrivateRoute.js
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {
    const Navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? children :Navigate('/login') ;
};

export default PrivateRoute;

