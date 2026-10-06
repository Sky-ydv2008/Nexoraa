import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin as apiLogin, getAdminProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => sessionStorage.getItem('nexoraa_admin_token') || null);
  const [loading, setLoading] = useState(true);

  // Clear any persistent localStorage token so user is always logged out by default
  useEffect(() => {
    localStorage.removeItem('nexoraa_admin_token');
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await getAdminProfile();
          if (res.success) {
            setAdmin(res.admin);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('[Auth] Token expired or invalid');
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    if (res.success && res.token) {
      sessionStorage.setItem('nexoraa_admin_token', res.token);
      localStorage.removeItem('nexoraa_admin_token');
      setToken(res.token);
      setAdmin(res.admin);
      return { success: true };
    }
    return { success: false, error: res.error || 'Authentication failed' };
  };

  const logout = () => {
    sessionStorage.removeItem('nexoraa_admin_token');
    localStorage.removeItem('nexoraa_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
