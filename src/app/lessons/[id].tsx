import { useUpdateCompletedLesson } from '@/api/mutations/updateCompletedLesson';
import Button from '@/components/Button';
import { COLORS, FONT, SIZES } from '@/constants';
import { ILesson } from '@/types';
import { Stack, useGlobalSearchParams } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

export default function LessonsPage() {
  const item = useGlobalSearchParams();
  const lesson = JSON.parse(item.item as string) as ILesson;
  const courseId = JSON.parse(item.courseId as string) as string;

  const { width } = useWindowDimensions();

  const { mutate, isError, error } = useUpdateCompletedLesson(
    lesson.id,
    courseId
  );

  return (
    <ScrollView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.secondary,
      }}
    >
      <Stack.Screen
        options={{
          title: item.id?.toString(),
          headerStyle: { backgroundColor: COLORS.secondary },
          headerTitleStyle: { color: COLORS.white },
          headerShadowVisible: false,
          headerTintColor: COLORS.white,
        }}
      />
      <View
        style={{
          paddingHorizontal: 15,
          backgroundColor: COLORS.secondary,
          paddingVertical: 15,
        }}
      >
        <Text style={styles.text}>{lesson.heading}</Text>
      </View>
      <View
        style={{
          backgroundColor: COLORS.gray2,
          height: '200%',
          borderTopLeftRadius: SIZES.lg,
          borderTopRightRadius: SIZES.lg,
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: SIZES.md }}>
            {lesson.description.markdown}
          </Text>
        </View>
        <RenderHTML
          contentWidth={width}
          source={{ html: lesson.output.html }}
          tagsStyles={{
            body: {
              fontFamily: FONT.medium,
              fontSize: 14,
            },
            code: {
              backgroundColor: COLORS.secondary,
              color: COLORS.white,
              padding: 20,
              marginHorizontal: 15,
              borderRadius: 16,
            },
          }}
        />
        <View style={{ paddingHorizontal: 15, marginBottom: 50 }}>
          <Button text="Next step (TEST)" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 160,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.xl,
    fontFamily: FONT.bold,
    textDecorationLine: 'underline',
  },
  description: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontFamily: FONT.regular,
  },
  image: {
    position: 'absolute',
    bottom: -25,
    right: -20,
    width: 180,
    height: 180,
    objectFit: 'cover',
  },
});
