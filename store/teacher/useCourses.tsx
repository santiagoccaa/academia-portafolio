import { Course } from '@/app/generated/prisma/client'
import { create } from 'zustand'

interface CourseState {
    coursesTeacherById: Course[]
    getCoursesTeacherById: (courses: Course[]) => void
}

export const useCourse = create<CourseState>((set, get) => ({
    coursesTeacherById: [],

    getCoursesTeacherById: (courses) => {
        set({ coursesTeacherById: courses })
    }
}))