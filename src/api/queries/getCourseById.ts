import type { ICourseDetalisResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;

export const useCourseDetails = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`course details`, id],
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
              description {
                markdown
              }
              output {
                html
              }
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
