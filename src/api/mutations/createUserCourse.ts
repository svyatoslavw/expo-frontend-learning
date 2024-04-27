import { useMutation } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;

export const useCreateUserCourse = (email: string, courseId: string) => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: [`create user course`, email, courseId],
    mutationFn: async () => {
      const mutation =
        gql`
        mutation MyMutation {
        createUserCourse(data: {userEmail: "` +
        email +
        `", courseId: "` +
        courseId +
        `", course: {connect: {id: "` +
        courseId +
        `"}}}) {
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
