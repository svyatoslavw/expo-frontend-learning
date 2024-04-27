import PageContainer from '@/components/PageContainer';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut().then(() => router.push('/'));
        }}
      />
    </View>
  );
};

export default function Settings() {
  return (
    <PageContainer title="Settings">
      <View>
        <Text>Settings</Text>
        <SignOut />
      </View>
    </PageContainer>
  );
}
