// features/auth/authService.js
import axiosInstance from '../api/axiosInstance';

const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  // Ensure only token and user info are returned
  return response.data; // { token, user }
};

const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  // Ensure only token and user info are returne
  return response.data; // { token, user }
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh-token');
  // Ensure only token and user info are returned
  return response.data; // { token, user }
};

export default { login, register , logout, refreshToken};
