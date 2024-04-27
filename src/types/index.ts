export interface ICourseCarouselResponse {
  courses: ICourseCarousel[];
}

export interface ICourseDetalisResponse {
  id: string;
  course: ICourse;
  completedLesson: { lessonId: string }[];
}

export interface ISavedCourseResponse {
  userCourse: ICourseDetalisResponse;
}

export interface ISavedCoursesResponse {
  userCourses: ICourseDetalisResponse[];
}

export interface ICourseCarousel {
  id: string;
  name: string;
  level: string;
  tags: string;
  time: string;
  color: string;
  banner: {
    url: string;
  };
  lessons: { id: string }[];
}

export interface ICourse {
  id: string;
  name: string;
  level: string;
  tags: string;
  time: string;
  color: string;
  description: IDescription;
  banner: IBanner;
  lessons: ILesson[];
}

export interface ILesson {
  id: string;
  heading: string;
  description: IDescription;
  output: IOutput;
}

export interface IBanner {
  url: string;
}

export interface IDescription {
  markdown: string;
  html: string;
}

export interface IOutput {
  markdown: string;
  html: string;
}
