import { SIZES } from '@/constants';
import { ILesson } from '@/types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ILessonsItem {
  lesson: ILesson;
  index: number;
  color: string;
  courseId: string;
}

const LessonItem = ({ lesson, color, index, courseId }: ILessonsItem) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      // onPress={() => {
      //   router.replace({
      //     pathname: `/lessons/${lesson.id}`,
      //     params: {
      //       item: JSON.stringify(lesson),
      //       courseId: JSON.stringify(courseId),
      //     },
      //   });
      // }}
      style={{
        width: '100%',
        borderColor: color,
        borderWidth: 1,
        backgroundColor: color,
        borderRadius: SIZES.sm,
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}
    >
      <Text style={{ color: 'white' }}>
        {index + 1}. {lesson.heading}
      </Text>
    </TouchableOpacity>
  );
};

export default LessonItem;
