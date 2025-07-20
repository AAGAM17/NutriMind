import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';

// Import both Clerk providers
import { ClerkProvider as ClerkExpoProvider } from '@clerk/clerk-expo';
import { ClerkProvider as ClerkWebProvider } from '@clerk/clerk-react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const CLERK_PUBLISHABLE_KEY = 'pk_test_cG93ZXJmdWwtZHJha2UtMzguY2xlcmsuYWNjb3VudHMuZGV2JA';

  // Use the correct ClerkProvider for each platform
  const AppContent = (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );

  if (Platform.OS === 'web') {
    return (
      <ClerkWebProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        {AppContent}
      </ClerkWebProvider>
    );
  }

  return (
    <ClerkExpoProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      {AppContent}
    </ClerkExpoProvider>
  );
}
