import { COLORS, SIZES } from '@/constants';
import { ILesson } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ILessonsItem {
  lesson: ILesson;
  index: number;
  color: string;
  courseId: string;
  completedLesson: { lessonId: string }[];
}

const SavedLessonItem = ({
  lesson,
  color,
  index,
  completedLesson,
  courseId,
}: ILessonsItem) => {
  const isExist = completedLesson.some(
    (completed) => completed.lessonId === lesson.id
  );

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        router.replace({
          pathname: `/my-lessons/${lesson.id}`,
          params: {
            item: JSON.stringify(lesson),
            courseId: JSON.stringify(courseId),
          },
        });
      }}
      style={
        isExist
          ? {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderColor: color,
              borderWidth: 1,
              backgroundColor: color,
              borderRadius: SIZES.sm,
              paddingHorizontal: 10,
              paddingVertical: 15,
            }
          : {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderColor: color,
              borderWidth: 1,
              borderRadius: SIZES.sm,
              paddingHorizontal: 10,
              paddingVertical: 15,
            }
      }
    >
      <Text style={{ color: 'white' }}>
        {index + 1}. {lesson.heading}
      </Text>
      {isExist ? (
        <Ionicons size={24} color={COLORS.white} name="checkmark-done" />
      ) : (
        <Ionicons size={24} color={COLORS.white} name="lock-open-outline" />
      )}
    </TouchableOpacity>
  );
};

export default SavedLessonItem;
