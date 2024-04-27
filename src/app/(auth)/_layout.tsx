import { COLORS } from '@/constants';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/'} />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.secondary,
        },
        headerTitleStyle: {
          color: COLORS.white,
        },
        headerShadowVisible: false,
        title: 'Authorization',
      }}
    />
  );
}
