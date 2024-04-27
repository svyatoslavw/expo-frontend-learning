import { COLORS, FONT, SIZES } from '@/constants';
import { ICourseCarouselResponse } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Carousel, {
  type ICarouselInstance,
} from 'react-native-reanimated-carousel';
import HomeCarouselItem from './HomeCarouselItem';

const HomeCarousel = ({ data }: { data: ICourseCarouselResponse }) => {
  const { width } = useWindowDimensions();

  const baseOptions = {
    width: (width * 0.85) / 2,
    height: width / 2,
  } as const;

  const ref = React.useRef<ICarouselInstance>(null);
  return (
    <>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
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
          Новые курсы
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ padding: 5 }}
            onPress={() => {
              ref.current?.scrollTo({ count: -1, animated: true });
            }}
          >
            <Ionicons name="arrow-back" color={'white'} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ padding: 5 }}
            onPress={() => {
              ref.current?.scrollTo({ count: 1, animated: true });
            }}
          >
            <Ionicons name="arrow-forward" color={'white'} size={28} />
          </TouchableOpacity>
        </View>
      </View>
      <Carousel
        loop={false}
        {...baseOptions}
        ref={ref}
        style={{ width: '100%', marginLeft: 15 }}
        data={data.courses}
        renderItem={({ item }) => (
          <View style={{ flex: 1, marginLeft: '2.5%' }}>
            <HomeCarouselItem item={item} key={item.name} />
          </View>
        )}
      />
    </>
  );
};

export default HomeCarousel;
