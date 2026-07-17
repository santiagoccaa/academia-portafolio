"use client"

import { CoursePage, CourseData } from '@/modules/Academy'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Course() {

    const { courseSlug } = useParams()
    const [course, setCourse] = useState<CourseData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCourse = async () => {
            try {
                const course = await axios.get(`/api/courses/${courseSlug}`)
                setCourse(course.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        getCourse()
    }, [])

    if (loading) {
        return <p>Caragando informacion</p>
    }

    if (!course) {
        return <p className='text-xl font-medium'>Este curso no esta disponible</p>
    }


    return <CoursePage courseSeletect={course} />
}
