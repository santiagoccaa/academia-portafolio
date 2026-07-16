import { Chapter, Course, FeedbackCourse } from '@/app/generated/prisma/client'
import { create } from 'zustand'

export type CourseUser = Course & {
    chapters: Chapter[],
    feedback?:
    FeedbackCourse[],
    purchaseCourse: boolean
}


interface CreateUser {
    courseSelectect: CourseUser | null

    getCourse: (course: CourseUser) => void
}

export const useStudent = create<CreateUser>((set) => ({
    courseSelectect: null,
    getCourse: (course) => set({ courseSelectect: course })
}))