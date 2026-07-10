import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext(null);

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }

    setLoading(false);
  }, []);

  const persistAuth = useCallback((authData) => {
    const userData = {
      email: authData.email,
      name: authData.name,
      role: authData.role,
    };

    localStorage.setItem(TOKEN_KEY, authData.token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setToken(authData.token);
    setUser(userData);
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await authApi.login(credentials);
    if (response.success) {
      persistAuth(response.data);
    }
    return response;
  }, [persistAuth]);

  const register = useCallback(async (payload) => {
    const response = await authApi.register(payload);
    if (response.success) {
      persistAuth(response.data);
    }
    return response;
  }, [persistAuth]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
