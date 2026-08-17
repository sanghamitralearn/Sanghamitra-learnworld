import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [checked, setChecked] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const response = await apiFetch('/check-auth');
      if (!response.ok) throw new Error(`Failed to check authentication: ${response.status}`);
      const data = await response.json();
      setAuthenticated(Boolean(data.authenticated));
      setRole(data.role || null);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setAuthenticated(false);
      setRole(null);
    } finally {
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    const response = await apiFetch('/logout');
    if (response.ok) {
      document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=None';
      setAuthenticated(false);
      setRole(null);
    }
    return response.ok;
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, checked, role, isAdmin: role === 'admin', checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
