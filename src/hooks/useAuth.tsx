
import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - in real app, this would validate against backend
    if (credentials.username && credentials.password) {
      const mockUser: User = {
        id: Math.random().toString(36),
        username: credentials.username,
        email: `${credentials.username}@octa-network.com`,
        role: credentials.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.username}`,
        isOnline: true,
        lastLogin: new Date(),
        preferences: {
          language: 'ar',
          theme: 'dark',
          notifications: true
        }
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });

      // Save to localStorage
      localStorage.setItem('octa_user', JSON.stringify(mockUser));
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = () => {
    localStorage.removeItem('octa_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('octa_user', JSON.stringify(updatedUser));
    }
  };

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('octa_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('octa_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
