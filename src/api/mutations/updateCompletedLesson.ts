import { useMutation } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;

export const useUpdateCompletedLesson = (
  lessonId: string,
  courseId: string
) => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: [`update completed lesson`, lessonId, courseId],
    mutationFn: async () => {
      const mutation = gql`
        mutation MyMutation {
        updateUserCourse(
            data: {completedLesson: {create: {data: {lessonId: "${lessonId}"}}}}
            where: {id: "${courseId}"}
        ) {
            id
        }
        
        publishManyUserCoursesConnection(to: PUBLISHED) {
            edges {
            node {
                id
            }
            }
        }
        }

      `;

      const res = await request(SERVER_URL, mutation);
      return res;
    },
  });

  return { data, mutate, isPending, isError, error };
};
