import { ICourseCarouselResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;

export const useCoursesList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const query = gql`
        query CourseList {
          courses {
            id
            name
            level
            tags
            time
            color
            banner {
              url
            }
            lessons {
              id
            }
          }
        }
      `;

      const res = await request(SERVER_URL, query);
      return res;
    },
  });

  return { data: data as ICourseCarouselResponse, isLoading, isError };
};
