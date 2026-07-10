"use client"

import { CoursePage, CourseData } from '@/modules/Academy'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Course() {

    const { courseSlug } = useParams()

    const [course, setCourse] = useState<CourseData | null>(null)

    useEffect(() => {
        const getCourse = async () => {
            const course = await axios.get(`/api/courses/${courseSlug}`)
            setCourse(course.data)
        }

        getCourse()
    }, [])

    if (!course) {
        return <p>No hay curso disponible</p>
    }

    return <CoursePage courseSeletect={course} />
}
