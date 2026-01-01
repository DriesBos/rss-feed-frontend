'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FreshRSSAPI } from '@/lib/freshrss-api';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  api: FreshRSSAPI | null;
  login: (username: string, authToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  api: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [api, setApi] = useState<FreshRSSAPI | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    
    if (storedToken && storedUsername) {
      const freshAPI = new FreshRSSAPI(storedToken);
      setApi(freshAPI);
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: string, authToken: string) => {
    const freshAPI = new FreshRSSAPI(authToken);
    setApi(freshAPI);
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('username', user);
  };

  const logout = () => {
    setApi(null);
    setUsername(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, api, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

