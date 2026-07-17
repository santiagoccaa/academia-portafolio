"use client"

import { ChapterSelectectInfo } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"

interface ChapterSelectectProps {
    courseSlug: string
    chapterCourse: string
}

export const ChapterSelectect = ({ chapterCourse, courseSlug }: ChapterSelectectProps) => {

    const [infoCourse, setInfoCourse] = useState<ChapterSelectectInfo>()

    useEffect(() => {
        const getCourse = async () => {
            const { data } = await axios.get(`/api/chapter/${chapterCourse}/${chapterCourse}`)
            setInfoCourse(data)
        }
        getCourse()
    }, [])

    if (!infoCourse) {
        return <p>Buscando informacion</p>
    }

    console.log("informacion:", infoCourse);


    return (
        <div className="grid grid-cols-1 md:grid-cols-[60%_1fr] gap-4">
            {/* <InfoCourse
                slugChapter={chapterCourse}
                infoCourse={infoCourse}
            />

            <ChaptersCourse
                chapters={infoCourse}
                courseSlug={courseSlug}
                chapterCourse={chapterCourse}
            /> */}
        </div>
    )
}
