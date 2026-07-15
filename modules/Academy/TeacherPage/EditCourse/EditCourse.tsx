"use client"

import { CourseChapter, CourseForm, CourseImage, CoursePrice, HeaderCourse } from "./components"
import axios from "axios"
import { useEffect } from "react"
import { LoaderCircle } from "lucide-react"
import { useCourse } from "@/store"

interface EditCoursePageProp {
    courseSlug: string
}

export const EditCoursePage = ({ courseSlug }: EditCoursePageProp) => {

    const { saveCourseSelected, courseSelected, getChaptersByCourse } = useCourse()

    useEffect(() => {
        if (courseSlug === courseSelected?.slug) return;

        let cancelled = false;

        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`/api/teacher/course/${courseSlug}`);

                if (!cancelled) {
                    saveCourseSelected(data);
                    getChaptersByCourse(data.chapters)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourse();

        return () => {
            cancelled = true;
        };
    }, [courseSlug, courseSelected?.slug, saveCourseSelected]);

    if (!courseSelected || courseSelected.slug !== courseSlug) {
        return (
            <div className="w-full flex flex-col gap-2 justify-center items-center py-4">
                <LoaderCircle size={40} className="animate-spin" />
                <p className="text-xl font-medium">Cargando informacion del curso</p>
            </div>
        )
    }

    const chapters = courseSelected.chapters.length > 0 ? true : false

    return (
        <div className="space-y-4">
            <HeaderCourse
                containsChapter={chapters}
                idCourse={courseSelected.slug}
                isPublished={courseSelected.isPublished}
            />

            <CourseForm
                course={courseSelected}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                <CourseImage courseSlug={courseSelected.slug} imageCourse={courseSelected.imageUrl} />
                <CoursePrice courseSlug={courseSelected.slug} priceCourse={courseSelected.price} />
            </div>

            <CourseChapter courseSlug={courseSelected.slug} />
        </div>
    )
}