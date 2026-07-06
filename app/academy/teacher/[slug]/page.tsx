"use client"

import { useCourse } from "@/store"

export default function EditCourse() {

    const { courseTeacherSelected } = useCourse()

    if (!courseTeacherSelected) {
        return <p className="text-xl font-medium">Selecciona un curso</p>
    }
    return (
        <div>
            Editanto: {courseTeacherSelected.title}
        </div>
    )
}
