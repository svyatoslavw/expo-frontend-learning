import { COLORS, FONT, SIZES } from '@/constants';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1 + 0.5,
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: COLORS.secondary,
      }}
    >
      <View
        style={{
          height: 400,
          backgroundColor: COLORS.gray2,
          borderRadius: SIZES.lg,
          paddingVertical: 15,
          paddingHorizontal: 10,
          justifyContent: 'flex-start',
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.75}
          style={{
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 10,
            borderRadius: SIZES.sm,
          }}
        >
          <AntDesign name="google" color={COLORS.primary} size={28} />
          <Text
            style={{
              color: COLORS.gray2,
              fontSize: SIZES.md,
              fontFamily: FONT.bold,
            }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignIn;
