import { useSavedCourses } from '@/api/queries/getSavedCourses';
import PageContainer from '@/components/PageContainer';
import SavedCourseItem from '@/components/SavedCourseItem';
import { COLORS } from '@/constants';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default function Lessons() {
  const { user } = useUser();
  const { data, isError, error, isLoading } = useSavedCourses(
    user?.primaryEmailAddress?.emailAddress!
  );

  if (isLoading || isError) {
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
    <PageContainer title="Library">
      <View>
        <FlatList
          scrollEnabled={false}
          data={data.userCourses}
          renderItem={({ item }) => (
            <SavedCourseItem item={item} key={item.course.id} />
          )}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 15,
            marginTop: 10,
          }}
        />
      </View>
    </PageContainer>
  );
}
