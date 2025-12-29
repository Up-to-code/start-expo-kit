import { authClient } from '@/lib/auth/client';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<{ error?: { message: string } }>;
  signup: (email: string, password: string, name?: string) => Promise<{ error?: { message: string } }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  initialize: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  // Initialize auth state on app start
  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Try to restore user from secure storage
      const storedUser = await SecureStore.getItemAsync(USER_KEY);
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      
      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        set({ 
          user, 
          isAuthenticated: true,
          isInitialized: true,
          isLoading: false 
        });
      } else {
        set({ 
          isInitialized: true,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ 
        isInitialized: true,
        isLoading: false 
      });
    }
  },

  // Check current auth status
  checkAuth: async () => {
    try {
      const session = await authClient.getSession();
      
      if (session?.data?.user) {
        const user = session.data.user as User;
        
        // Store user data
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        
        set({ 
          user, 
          isAuthenticated: true 
        });
      } else {
        // Clear stored data if no session
        await SecureStore.deleteItemAsync(USER_KEY);
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      }
    } catch (error) {
      console.error('Failed to check auth:', error);
      set({ 
        user: null, 
        isAuthenticated: false 
      });
    }
  },

  // Login action
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      
      const result = await authClient.signIn.email({ 
        email, 
        password 
      });

      if (result.error) {
        set({ isLoading: false });
        return { error: result.error };
      }

      // Get session after successful login
      const session = await authClient.getSession();
      
      if (session?.data?.user) {
        const user = session.data.user as User;
        
        // Store user data
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        
        set({ 
          user, 
          isAuthenticated: true,
          isLoading: false 
        });

        // Navigate to home
        router.replace('/(home)');
        
        return {};
      }

      set({ isLoading: false });
      return { error: { message: 'Failed to get session' } };
    } catch (error: any) {
      set({ isLoading: false });
      return { 
        error: { 
          message: error?.message || 'An error occurred during login' 
        } 
      };
    }
  },

  // Signup action
  signup: async (email: string, password: string, name?: string) => {
    try {
      set({ isLoading: true });
      
      const result = await authClient.signUp.email({ 
        email, 
        password,
        name 
      });

      if (result.error) {
        set({ isLoading: false });
        return { error: result.error };
      }

      // Get session after successful signup
      const session = await authClient.getSession();
      
      if (session?.data?.user) {
        const user = session.data.user as User;
        
        // Store user data
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        
        set({ 
          user, 
          isAuthenticated: true,
          isLoading: false 
        });

        // Navigate to home
        router.replace('/(home)');
        
        return {};
      }

      set({ isLoading: false });
      return { error: { message: 'Failed to get session' } };
    } catch (error: any) {
      set({ isLoading: false });
      return { 
        error: { 
          message: error?.message || 'An error occurred during signup' 
        } 
      };
    }
  },

  // Logout action
  logout: async () => {
    try {
      set({ isLoading: true });
      
      await authClient.signOut();
      
      // Clear stored data
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });

      // Navigate to sign-in
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Failed to logout:', error);
      set({ isLoading: false });
    }
  },
}));
