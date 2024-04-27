import { useSavedCourseDetails } from '@/api/queries/getSavedCourseById';
import Button from '@/components/Button';
import SavedLessonItem from '@/components/SavedLessonItem';
import { COLORS, FONT, SIZES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useGlobalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SavedCoursesPage() {
  const item = useGlobalSearchParams();
  const params = JSON.parse(item.courseId as string);
  const { data, isError, isLoading } = useSavedCourseDetails(params);

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
    <ScrollView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.secondary,
      }}
    >
      <Stack.Screen
        options={{
          title: item.name?.toString(),
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
        }}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          style={[
            styles.container,
            { backgroundColor: data.userCourse.course.color },
          ]}
        >
          <Text style={styles.text}>{item.name}</Text>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Ionicons size={20} name="time" color={COLORS.white} />
            <Text style={styles.description}>
              {data.userCourse.course.lessons.length} уроков
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Ionicons size={20} name="cellular" color={COLORS.white} />
            <Text style={styles.description}>
              {data.userCourse.course.level}
            </Text>
          </View>
          <Image
            cachePolicy={'memory-disk'}
            source={data.userCourse.course.banner.url}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Button text="Remove from library" />
      </View>
      <View
        style={{
          backgroundColor: COLORS.gray2,
          borderTopLeftRadius: SIZES.lg,
          borderTopRightRadius: SIZES.lg,
          height: '200%',
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          <Text style={{ color: COLORS.white }}>
            {data.userCourse.course.description.markdown}
          </Text>
        </View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.xl,
            textDecorationLine: 'underline',
            fontFamily: FONT.bold,
            paddingHorizontal: 15,
          }}
        >
          Lessons
        </Text>
        <FlatList
          scrollEnabled={false}
          data={data.userCourse.course.lessons}
          renderItem={({ item, index }) => (
            <SavedLessonItem
              completedLesson={data.userCourse.completedLesson}
              courseId={data.userCourse.id}
              lesson={item}
              color={data.userCourse.course.color}
              index={index}
              key={item.id}
            />
          )}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 15,
            marginTop: 10,
          }}
        />
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
    fontSize: SIZES.xxl,
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
