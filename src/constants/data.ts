import type { ImageSourcePropType } from 'react-native';

export interface ICoursesCarousel {
  title: string;
  count: number;
  image: ImageSourcePropType;
  color: string;
}

export const COURSES: ICoursesCarousel[] = [
  {
    title: 'HTML',
    count: 45,
    image: require('../../assets/html.png'),
    color: '#4f46e5',
  },
  {
    title: 'CSS',
    count: 38,
    image: require('../../assets/css.png'),
    color: '#7c3aed',
  },
  {
    title: 'JavaScript',
    count: 74,
    image: require('../../assets/javascript.png'),
    color: '#c026d3',
  },
  {
    title: 'TypeScript',
    count: 22,
    image: require('../../assets/typescript.png'),
    color: '#db2777',
  },
  {
    title: 'React.js',
    count: 24,
    image: require('../../assets/react.png'),
    color: '#e11d48',
  },
  // {
  //   title: 'Nest.js',
  //   count: 30,
  //   image: require('../../assets/nest.png'),
  //   color: '#dc2626',
  // },
];
