import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import { saveToken, getToken, removeToken } from '../utils/auth.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      // Optionally, fetch user data here if needed
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/user/login', { email, password });
      const { token } = response.data;
      saveToken(token);
      setIsAuthenticated(true);
      // Optionally set user data
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.msg || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      await axiosInstance.post('/user/signup', { name, email, password });
      // After signup, optionally auto-login or just return success
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.msg || 'Signup failed' };
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};