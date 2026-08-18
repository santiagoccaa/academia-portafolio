"use client"

import { CoursePage } from "@/modules/Academy"
import { useAcademy } from "@/store/academy/useAcademy"


export default function Course() {

    const { courseSelected } = useAcademy()

    if (!courseSelected) {
        return (
            <div className="flex justify-center items-center h-screen">
                Este curso no existe
            </div>

        )
    }

    return <CoursePage courseSelected={courseSelected} />

}
