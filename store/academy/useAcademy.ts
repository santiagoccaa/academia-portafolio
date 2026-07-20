import { CoursesCardHome } from '@/types';
import { create } from 'zustand'

interface AcademyState {
    // Todos los cursos
    allCourses: CoursesCardHome[];

    // Funcion para buscar en la DB todos los cursos
    getAllCourses: (courses: CoursesCardHome | CoursesCardHome[]) => void;

    // Course seleccionado por el usuario
    courseSelected: CoursesCardHome | null;

    // Funcion para seleccionar un curso
    getCourseSelected: (course: CoursesCardHome) => void;

}

export const useAcademy = create<AcademyState>((set) => ({
    allCourses: [],
    courseSelected: null,

    getAllCourses: (courses) => {
        set({
            allCourses: Array.isArray(courses)
                ? courses
                : [courses],
        });
    },

    getCourseSelected: (course) => {
        set({ courseSelected: course });
    }

}));