import { COLORS, FONT, SIZES } from '@/constants';
import { ICourseDetalisResponse } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SavedCourseItem = ({ item }: { item: ICourseDetalisResponse }) => {
  const width =
    (item.completedLesson.length / item.course.lessons.length) * 100;

  console.log('@width', width);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/my-courses/${item.course.name}`,
          params: {
            item: JSON.stringify(item.course),
            courseId: JSON.stringify(item.id),
          },
        })
      }
      activeOpacity={0.75}
      style={[styles.container, { backgroundColor: item.course.color }]}
    >
      <Text style={styles.text}>{item.course.name}</Text>
      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
        <Ionicons size={16} name="time" color={COLORS.white} />
        <Text style={styles.description}>
          {item.course.lessons.length} уроков
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
        <Ionicons size={16} name="cellular" color={COLORS.white} />
        <Text style={styles.description}>{item.course.level}</Text>
      </View>
      <Image
        cachePolicy={'memory-disk'}
        source={item.course.banner.url}
        style={styles.image}
      />
      <View
        style={{
          width: '60%',
          marginTop: 10,
          backgroundColor: COLORS.gray,
          borderRadius: SIZES.xl,
          height: 5,
        }}
      >
        <View
          style={{
            width: `${width}%`,
            height: 5,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.lg,
          }}
        ></View>
      </View>
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
