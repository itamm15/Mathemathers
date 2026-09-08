import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '@/types/user';

// TODO: settle this to the env variable
const API_BASE_URL = 'http://localhost:3000';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      setUserState(null);
      localStorage.removeItem('user');
      return;
    }

    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        if (cancelled) return;

        const profileUser: User = {
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
        };

        setUserState(profileUser);
        localStorage.setItem('user', JSON.stringify(profileUser));
      } catch {
        if (cancelled) return;
        setTokenState(null);
        setUserState(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
