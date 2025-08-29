import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../utils/storage';
import type { AuthState } from '../types';

type AuthContextType = {
  auth: AuthState;
  login: (token: string, userId: number) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const KEY = 'auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => storage.get<AuthState>(KEY, { token: null, userId: null }) || { token: null, userId: null });

  useEffect(() => {
    storage.set(KEY, auth);
  }, [auth]);

  const value = useMemo(() => ({
    auth,
    login: (token: string, userId: number) => setAuth({ token, userId }),
    logout: () => setAuth({ token: null, userId: null })
  }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
