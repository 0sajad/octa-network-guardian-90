
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'client' | 'developer';
  avatar?: string;
  isOnline: boolean;
  lastLogin: Date;
  preferences: {
    language: 'ar' | 'en';
    theme: 'dark' | 'light';
    notifications: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
  role: 'client' | 'developer';
}
