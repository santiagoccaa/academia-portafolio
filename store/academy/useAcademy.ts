import { CoursesCardHome } from '@/types';
import { create } from 'zustand'

interface AcademyState {
    // Todos los cursos que ha creado el profesor
    allCourses: CoursesCardHome[];

    // Funcion para buscar en la DB todos los cursos del profesor
    getAllCourses: (courses: CoursesCardHome | CoursesCardHome[]) => void;

}

export const useAcademy = create<AcademyState>((set) => ({
    allCourses: [],

    getAllCourses: (courses) => {
        set({
            allCourses: Array.isArray(courses)
                ? courses
                : [courses],
        });
    },

}));