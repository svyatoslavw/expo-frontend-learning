import { COLORS } from '@/constants';
import { ClerkProvider } from '@clerk/clerk-expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const tokenCache = {
    getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key)!;
      } catch (err) {
        return null!;
      }
    },
    saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value)!;
      } catch (err) {
        return null!;
      }
    },
  };

  const KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

  const client = new QueryClient();

  const [loaded, error] = useFonts({
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={KEY}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: COLORS.secondary },
            headerStyle: { backgroundColor: COLORS.secondary },
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default StackLayout;
