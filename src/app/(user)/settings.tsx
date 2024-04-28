import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import { FONT, SIZES } from '@/constants';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <Button
      text="Sign Out"
      onPress={() => {
        signOut().then(() => router.push('/'));
      }}
    />
  );
};

export default function Settings() {
  const { user } = useUser();
  return (
    <PageContainer title="Settings">
      <View style={{ alignItems: 'center' }}>
        <Ionicons name="person-circle-outline" color="white" size={100} />
        <Text
          style={{
            color: 'white',
            fontFamily: FONT.medium,
            fontSize: SIZES.md,
          }}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <SignOut />
      </View>
    </PageContainer>
  );
}
