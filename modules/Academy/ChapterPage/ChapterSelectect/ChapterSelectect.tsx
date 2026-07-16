"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { ChaptersCourse, InfoCourse } from "./components"

interface ChapterSelectectProps {
    courseSlug: string
    chapterCourse: string
}

export const ChapterSelectect = ({ chapterCourse, courseSlug }: ChapterSelectectProps) => {

    const [infoCourse, setInfoCourse] = useState()

    useEffect(() => {
        const getCourse = async () => {
            const { data } = await axios.get(`/api/courses/${courseSlug}`)
            setInfoCourse(data)
        }
        getCourse()
    }, [])

    if (!infoCourse) {
        return <p>Buscando informacion</p>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[60%_1fr] gap-4">
            <InfoCourse
                slugChapter={chapterCourse}
                infoCourse={infoCourse}
            />

            <ChaptersCourse
                chapters={infoCourse}
                courseSlug={courseSlug}
                chapterCourse={chapterCourse}
            />
        </div>
    )
}
