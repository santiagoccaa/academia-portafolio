import { CourseData } from '@/types';
import { create } from 'zustand'

interface AcademyState {
    // Todos los cursos
    allCourses: CourseData[];

    // Funcion para buscar en la DB todos los cursos
    getAllCourses: (courses: CourseData | CourseData[]) => void;

    // Course seleccionado por el usuario
    courseSelected: CourseData | null;

    // Funcion para seleccionar un curso
    getCourseSelected: (course: CourseData) => void;

}

export const useAcademy = create<AcademyState>((set) => ({
    allCourses: [],
    courseSelected: null,

    getAllCourses: (courses) => {
        set({
            allCourses: (Array.isArray(courses)
                ? courses
                : [courses]) as CourseData[],
        });
    },

    getCourseSelected: (course) => {
        set({ courseSelected: course });
    }

}));