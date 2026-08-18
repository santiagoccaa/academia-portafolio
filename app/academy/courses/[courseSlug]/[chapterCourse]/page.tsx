"use client"

import { InfoCourse } from "@/modules/Academy/ChapterPage/ChapterSelectect/components";
import { useAcademy } from "@/store";
import { ChapterData } from "@/types";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChapterSelectPage() {

    const { chapterCourse } = useParams<{ chapterCourse: string }>()

    const { courseSelected } = useAcademy()

    const [chapter, setChapeter] = useState<ChapterData>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        const getCourse = async () => {
            try {
                const { data } = await axios.get(`/api/courses/chapters/${courseSelected?.id}/${chapterCourse}`)
                setChapeter(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        getCourse()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col justify-center  items-center">
                <LoaderCircle className="animate-spin size-12" />
                <h3 className="text-2xl font-medium">
                    Buscando informacion
                </h3>
            </div>
        )
    }

    if (!chapter || !courseSelected) {
        return <p>No hay informacion del chapter</p>
    }

    return <InfoCourse
        chapterInformation={chapter}
    />
}
