import { COLORS, FONT, SIZES } from '@/constants';
import { ICourse } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SavedCourseItem = ({
  course,
  courseId,
}: {
  course: ICourse;
  courseId: string;
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/my-courses/${course.name}`,
          params: {
            item: JSON.stringify(course),
            courseId: JSON.stringify(courseId),
          },
        })
      }
      activeOpacity={0.75}
      style={[styles.container, { backgroundColor: course.color }]}
    >
      <Text style={styles.text}>{course.name}</Text>
      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
        <Ionicons size={16} name="time" color={COLORS.white} />
        <Text style={styles.description}>{course.lessons.length} уроков</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
        <Ionicons size={16} name="cellular" color={COLORS.white} />
        <Text style={styles.description}>{course.level}</Text>
      </View>
      <Image
        cachePolicy={'memory-disk'}
        source={course.banner.url}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 100,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.xl,
    fontFamily: FONT.bold,
  },
  description: {
    color: COLORS.white,
    fontSize: SIZES.sm,
    fontFamily: FONT.regular,
  },
  image: {
    position: 'absolute',
    bottom: -25,
    right: -20,
    width: 130,
    height: 130,
    objectFit: 'cover',
  },
});

export default SavedCourseItem;
