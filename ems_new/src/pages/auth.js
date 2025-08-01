// src/auth.js
import { createContext, useEffect, useState } from 'react';
import api from '../services/api';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const me = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(me.data);
        } catch (err) {
          console.error("Token invalid or expired");
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, [token]);


  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });

    const { token: receivedToken } = response.data;

    if (receivedToken) {
      setToken(receivedToken);
      localStorage.setItem('token', receivedToken);

      // Fetch user profile
      const me = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${receivedToken}`
        }
      });

      setUser(me.data);
    }
  };

  const register = async (formData) => {
    const response = await api.post('/auth/register', formData);
    // you can choose to auto-login here too, or redirect
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
