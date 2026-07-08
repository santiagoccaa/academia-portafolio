"use client"

import { Course } from "@/app/generated/prisma/client"
import { CourseChapter, CourseForm, CourseFormProps, CourseImage, CoursePrice, CourseWithRelations, HeaderCourse } from "./components"
import axios from "axios"
import { useEffect, useState } from "react"

interface EditCourseProp {
    course: Course
}

export const EditCoursePage = ({ course }: EditCourseProp) => {

    const { id } = course

    const [courseInformation, setCourseInformation] = useState<CourseWithRelations>()

    useEffect(() => {
        const fetchCourse = async () => {
            const dataCourse = await axios.get(`/api/teacher/course/${id}`)
            setCourseInformation(dataCourse.data)
        }

        fetchCourse()
    }, [course])


    if (!courseInformation) {
        return <p>Este curso no existe.</p>
    }

    return (
        <div className="space-y-4">
            <HeaderCourse idCourse={course.id} isPublished={course.isPublished} />
            <CourseForm course={courseInformation} />

            <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                <CourseImage idCourse={course.id} imageCourse={course.imageUrl} />
                <CoursePrice idCourse={course.id} priceCourse={course.price} />
            </div>

            <CourseChapter idCourse={course.id} chapters={courseInformation.chapters} />
        </div>
    )
}