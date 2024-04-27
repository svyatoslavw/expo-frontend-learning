import type { ISavedCourseResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;

export const useSavedCourseDetails = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`user course details`, id],
    queryFn: async () => {
      const query = gql`
        query CourseItem {
          userCourse(where: { id: "${id}" }) {
            id
            courseId
            completedLesson {
              lessonId
            }
            course {
              id
              name
              level
              tags
              time
              color
              description {
                markdown
              }
              banner {
                url
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
        }
      `;

      const res = await request(SERVER_URL, query, { id });
      return res;
    },
  });

  return {
    data: data as ISavedCourseResponse,
    isLoading,
    isError,
    error,
  };
};
