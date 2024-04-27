import type { ICourseDetalisResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;

export const useLessonDetails = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`lesson details`, id],
    queryFn: async () => {
      const query = gql`
        query CourseItem {
          course(where: { id: "${id}" }) {
            id
            name
            level
            tags
            time
            color
            banner {
              url
            }
            description {
              markdown
            }
            lessons {
              id
              heading
            }
          }
        }
      `;

      const res = await request(SERVER_URL, query, { id });
      return res;
    },
  });

  return { data: data as ICourseDetalisResponse, isLoading, isError };
};
