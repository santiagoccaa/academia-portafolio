"use client"

import { useAcademy } from "@/store"
import axios from "axios"
import { useEffect, useState } from "react"
import { ChaptersCourse, InfoCourse } from "./components"
import { ChapterData } from "@/types"

interface ChapterSelectectProps {
    courseSlug: string
    chapterCourse: string
}

export const ChapterSelectect = ({ chapterCourse, courseSlug }: ChapterSelectectProps) => {

    const { courseSelected } = useAcademy()

    const [chapter, setChapeter] = useState<ChapterData>()

    useEffect(() => {
        const getCourse = async () => {
            const { data } = await axios.get(`/api/courses/chapters/${courseSelected?.id}/${chapterCourse}`)

            setChapeter(data)

        }
        getCourse()
    }, [])

    if (!chapter || !courseSelected) {
        return <p>No hay informacion del chapter</p>
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-4">
            <InfoCourse
                chapterInformation={chapter}
            />

            <ChaptersCourse
                slug={courseSlug}
                chapters={courseSelected.chapters}
            />
        </div>
    )
}
