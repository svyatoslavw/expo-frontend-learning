import { COLORS, FONT, SIZES } from '@/constants';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

interface IPageContainer {
  title: string;
  children: React.ReactNode;
}

const PageContainer = ({ children, title }: IPageContainer) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.secondary }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.white,
            fontSize: SIZES.md,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: COLORS.gray2,
          borderRadius: 12,
          height: '100%',
          justifyContent: 'flex-start',
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default PageContainer;
