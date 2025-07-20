/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FF6B6B';
const tintColorDark = '#4ECDC4';

export const Colors = {
  light: {
    text: '#1E293B',
    background: '#F8FAFC',
    tint: tintColorLight,
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F8FAFC',
    background: '#1E293B',
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorDark,
  },
};

// App specific colors
export const AppColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#45B7D1',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Nutrition colors
  protein: '#FF6B6B',
  carbs: '#45B7D1',
  fat: '#4ECDC4',
  calories: '#FFA726',
  
  // Grays
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
};
