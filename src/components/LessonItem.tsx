import { SIZES } from '@/constants';
import { ILesson } from '@/types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ILessonsItem {
  lesson: ILesson;
  index: number;
  color: string;
}

const LessonItem = ({ lesson, color, index }: ILessonsItem) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        width: '100%',
        borderColor: color,
        borderWidth: 1,
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
