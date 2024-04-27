import { COLORS } from '@/constants';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.secondary },
        }}
      />
      <SignedIn>
        <Redirect href={'/home'} />
      </SignedIn>
      <SignedOut>
        <Redirect href={'/auth'} />
      </SignedOut>
    </>
  );
}
