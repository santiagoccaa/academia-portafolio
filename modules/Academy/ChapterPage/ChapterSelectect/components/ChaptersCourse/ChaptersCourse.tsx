"use client"

import { useTranslations } from 'next-intl'
import { Chapter, Course, FeedbackCourse, UserProgress } from "@/app/generated/prisma/client"
import { ChapterList } from './ChapterList'
import axios from 'axios'
import { useEffect, useState } from 'react'

export type ChaptersCourseProps = {
    chapters: Course & { chapters: Chapter[], feedback?: FeedbackCourse[], purchaseCourse: boolean }
    courseSlug: string
    chapterCourse: string
}

export const ChaptersCourse = ({ chapterCourse, chapters, courseSlug }: ChaptersCourseProps) => {

    const t = useTranslations()
    const [userProgress, setUserProgress] = useState<UserProgress[] | []>([])


    useEffect(() => {
        const getUserProgress = async () => {
            try {
                const { data } = await axios.get('/api/student/progress')

                setUserProgress(data)
            } catch (error) {
                console.log("USER PROGRESS:", error);
            }
        }

        getUserProgress()

    }, [])

    return (
        <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 h-fit'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{t('common.chapters')}</h2>
            <ChapterList
                chapters={chapters.chapters}
                courseSlug={courseSlug}
                currentChapter={chapterCourse}
                userProgress={userProgress}
            />
        </div>
    )
}
