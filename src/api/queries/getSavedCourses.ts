import { ISavedCoursesResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;

export const useSavedCourses = (userEmail: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get saved courses'],
    queryFn: async () => {
      const query = gql`
        query UserCourses {
          userCourses(where: {userEmail: "${userEmail}"}) {
            id
            course {
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
        }
      `;

      const res = await request(SERVER_URL, query, { userEmail });
      return res;
    },
  });

  return { data: data as ISavedCoursesResponse, isLoading, isError, error };
};
