// routing/PublicRoute.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const Navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? Navigate('/') : children;
};

export default PublicRoute;
