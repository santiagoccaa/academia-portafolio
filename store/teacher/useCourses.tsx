import { Chapter, Course } from '@/app/generated/prisma/client'
import { CourseWithRelations } from '@/modules/Academy/TeacherPage/EditCourse/components';
import { create } from 'zustand'

interface CourseState {
    // Todos los cursos que ha creado el profesor
    coursesTeacherById: Course[];

    // Capitulos del curso seleccionado
    chaptersByCourse: Chapter[]

    // Curso seleccionado para editar
    courseSelected: CourseWithRelations | null

    // Funcion para guardar curso seleccionado para editar
    saveCourseSelected: (course: CourseWithRelations) => void

    // Funcion para buscar en la DB todos los cursos del profesor
    getCoursesTeacherById: (courses: Course | Course[]) => void;

    // Actualizar la informacion de un curso (informacion del state)
    updateCourse: (slug: string, data: Partial<Course>) => void;

    // Remover un curso usando el slug
    removeCourseBySlug: (slug: string) => void;

    // Chapters

    // Funcion para añadir los capitulos del curso al store
    getChaptersByCourse: (chapters: Chapter[]) => void

    // Añadir un capitulo al array
    addChapter: (chapter: Chapter) => void;

    removeChapterBySlug: (slug: string) => void
}

export const useCourse = create<CourseState>((set) => ({
    coursesTeacherById: [],
    courseSelected: null,
    chaptersByCourse: [],

    saveCourseSelected: (course) => set({ courseSelected: course }),

    getCoursesTeacherById: (courses) => {
        set({
            coursesTeacherById: Array.isArray(courses)
                ? courses
                : [courses],
        });
    },

    getChaptersByCourse: (chapters) => {
        set({
            chaptersByCourse: Array.isArray(chapters)
                ? chapters
                : [chapters],
        });
    },

    addChapter: (chapter) =>
        set((state) => ({
            chaptersByCourse: [...state.chaptersByCourse, chapter],
        })),

    removeChapterBySlug: (slug) =>
        set((state) => ({
            chaptersByCourse: state.chaptersByCourse.filter(
                (chapter) => chapter.slug !== slug
            ),
        })),

    removeCourseBySlug: (slug) =>
        set((state) => ({
            coursesTeacherById: state.coursesTeacherById.filter(
                (course) => course.slug !== slug
            ),
        })),

    updateCourse: (slug, data) =>
        set((state) => ({
            coursesTeacherById: state.coursesTeacherById.map((course) =>
                course.slug === slug
                    ? { ...course, ...data }
                    : course
            ),
            courseSelected:
                state.courseSelected?.slug === slug
                    ? { ...state.courseSelected, ...data }
                    : state.courseSelected,
        })),
}));