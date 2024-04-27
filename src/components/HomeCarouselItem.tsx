import { COLORS, FONT, SIZES } from '@/constants';
import type { ICourseCarousel } from '@/types';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const HomeCarouselItem = ({ item }: { item: ICourseCarousel }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/courses/${item.name}`,
          params: { item: JSON.stringify(item) },
        })
      }
      activeOpacity={0.75}
      style={[styles.container, { backgroundColor: item.color }]}
    >
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.description}>{item.lessons.length} уроков</Text>
      <Image
        cachePolicy={'memory-disk'}
        source={item.banner.url}
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
    width: 160,
    height: 160,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.md,
    letterSpacing: 0.25,
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
    right: -15,
    width: 140,
    height: 140,
    objectFit: 'cover',
  },
});

export default HomeCarouselItem;
