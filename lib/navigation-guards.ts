import { useAuthStore } from '@/stores/auth-store';
import { router } from 'expo-router';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const state = useAuthStore.getState();
  return state.isAuthenticated;
};

/**
 * Get initial route based on auth state
 */
export const getInitialRoute = (): string => {
  const state = useAuthStore.getState();
  
  if (!state.isInitialized) {
    // Still initializing, wait
    return '/(auth)/sign-in';
  }
  
  return state.isAuthenticated ? '/(home)' : '/(auth)/sign-in';
};

/**
 * Check auth before navigating to protected route
 */
export const checkAuthBeforeNavigate = (targetRoute: string): boolean => {
  const state = useAuthStore.getState();
  
  // Routes that require authentication
  const protectedRoutes = ['/(home)', '/profile', '/settings'];
  
  // Check if target route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    targetRoute.startsWith(route)
  );
  
  if (isProtectedRoute && !state.isAuthenticated) {
    // Redirect to sign-in
    router.replace('/(auth)/sign-in');
    return false;
  }
  
  // Routes that should redirect authenticated users
  const authRoutes = ['/(auth)/sign-in', '/(auth)/sign-up'];
  
  const isAuthRoute = authRoutes.some(route => 
    targetRoute.startsWith(route)
  );
  
  if (isAuthRoute && state.isAuthenticated) {
    // Redirect to home
    router.replace('/(home)');
    return false;
  }
  
  return true;
};

/**
 * Require authentication - use in components
 */
export const requireAuth = (): void => {
  const state = useAuthStore.getState();
  
  if (!state.isAuthenticated && state.isInitialized) {
    router.replace('/(auth)/sign-in');
  }
};

/**
 * Redirect if authenticated - use in auth screens
 */
export const redirectIfAuthenticated = (): void => {
  const state = useAuthStore.getState();
  
  if (state.isAuthenticated && state.isInitialized) {
    router.replace('/(home)');
  }
};
