"use client"

import { CourseChapter, CourseForm, CourseImage, CoursePrice, HeaderCourse } from "./components"
import axios from "axios"
import { useEffect } from "react"
import { LoaderCircle } from "lucide-react"
import { useCourse } from "@/store"

interface EditCoursePageProp {
    id: string
}

export const EditCoursePage = ({ id }: EditCoursePageProp) => {

    const { saveCourseSelected, courseSelected } = useCourse()

    useEffect(() => {
        if (id === courseSelected?.id) return;

        let cancelled = false;

        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`/api/teacher/course/${id}`);

                if (!cancelled) {
                    saveCourseSelected(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourse();

        return () => {
            cancelled = true;
        };
    }, [id, courseSelected?.id, saveCourseSelected]);

    if (!courseSelected || courseSelected.id !== id) {
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
            <HeaderCourse containsChapter={chapters} idCourse={courseSelected.id} isPublished={courseSelected.isPublished} />
            <CourseForm course={courseSelected} />

            <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                <CourseImage idCourse={courseSelected.id} imageCourse={courseSelected.imageUrl} />
                <CoursePrice idCourse={courseSelected.id} priceCourse={courseSelected.price} />
            </div>

            <CourseChapter idCourse={courseSelected.id} chapters={courseSelected.chapters} />
        </div>
    )
}