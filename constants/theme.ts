/**
 * Theme configuration - Light Mode Only
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#007AFF', // Deep Blue
  primaryForeground: '#FFFFFF',
  secondary: '#F1F5F9',
  secondaryForeground: '#0F172A',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  border: '#E2E8F0',
  text: '#1E293B',
  textSecondary: '#64748B',
  error: '#EF4444',
  success: '#22C55E',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const SCREEN = {
  width,
  height,
};
