import { Course } from '@/app/generated/prisma/client'
import { CourseWithRelations } from '@/modules/Academy/TeacherPage/EditCourse/components';
import { create } from 'zustand'

interface CourseState {
    // Todos los cursos que ha creado el profesor
    coursesTeacherById: Course[];

    // Curso seleccionado para editar
    courseSelected: CourseWithRelations | null

    // Funcion para guardar curso seleccionado para editar
    saveCourseSelected: (course: CourseWithRelations) => void

    // Funcion para buscar en la DB todos los cursos del profesor
    getCoursesTeacherById: (courses: Course | Course[]) => void;

    // Actualizar la informacion de un curso (informacion del state)
    updateCourse: (id: string, data: Partial<Course>) => void;

    // Remover un curso usando el slug
    removeCourseBySlug: (slug: string) => void;
}

export const useCourse = create<CourseState>((set) => ({
    coursesTeacherById: [],
    courseSelected: null,

    saveCourseSelected: (course) => set({ courseSelected: course }),

    getCoursesTeacherById: (courses) => {
        set({
            coursesTeacherById: Array.isArray(courses)
                ? courses
                : [courses],
        });
    },

    removeCourseBySlug: (slug) =>
        set((state) => ({
            coursesTeacherById: state.coursesTeacherById.filter(
                (course) => course.slug !== slug
            ),
        })),

    updateCourse: (id, data) =>
        set((state) => ({
            coursesTeacherById: state.coursesTeacherById.map((course) =>
                course.id === id
                    ? { ...course, ...data }
                    : course
            )
        })),
}));