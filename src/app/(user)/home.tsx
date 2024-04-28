import { useCoursesList } from '@/api/queries/getAllCourses';
import { useSavedCourses } from '@/api/queries/getSavedCourses';
import HomeCarousel from '@/components/HomeCarousel';
import PageContainer from '@/components/PageContainer';
import SavedCourseItem from '@/components/SavedCourseItem';
import { COLORS, FONT, SIZES } from '@/constants';
import { ICourseCarouselResponse } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function Home() {
  const { user } = useUser();
  const { data, isLoading, isError } = useCoursesList();
  const {
    data: savedCourses,
    isError: isSavedError,
    isLoading: isSavedLoading,
  } = useSavedCourses(user?.primaryEmailAddress?.emailAddress!);

  if (isLoading || isError || isSavedError || isSavedLoading) {
    return (
      <ActivityIndicator
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.secondary,
        }}
      />
    );
  }

  return (
    <PageContainer title="Welcome">
      <HomeCarousel data={data as ICourseCarouselResponse} />
      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.lg,
            fontFamily: FONT.bold,
            textDecorationLine: 'underline',
            textDecorationStyle: 'double',
            textDecorationColor: COLORS.white,
          }}
        >
          Продолжить обучение
        </Text>
        <FlatList
          scrollEnabled={false}
          data={savedCourses.userCourses}
          renderItem={({ item }) => (
            <SavedCourseItem item={item} key={item.course.id} />
          )}
          contentContainerStyle={{
            gap: 10,
            marginTop: 10,
          }}
        />
      </View>
    </PageContainer>
  );
}
