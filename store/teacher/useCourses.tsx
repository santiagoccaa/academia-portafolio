import { Course } from '@/app/generated/prisma/client'
import { create } from 'zustand'

interface CourseState {
    coursesTeacherById: Course[];
    courseTeacherSelected: Course | null

    getCoursesTeacherById: (courses: Course | Course[]) => void;
    getCourseTeacherSelected: (courses: Course) => void;


    removeCourseBySlug: (slug: string) => void;
}

export const useCourse = create<CourseState>((set) => ({
    coursesTeacherById: [],
    courseTeacherSelected: null,

    getCoursesTeacherById: (courses) => {
        set({
            coursesTeacherById: Array.isArray(courses)
                ? courses
                : [courses],
        });
    },

    getCourseTeacherSelected: (course) => set({ courseTeacherSelected: course }),

    removeCourseBySlug: (slug) =>
        set((state) => ({
            coursesTeacherById: state.coursesTeacherById.filter(
                (course) => course.slug !== slug
            ),
        })),
}));