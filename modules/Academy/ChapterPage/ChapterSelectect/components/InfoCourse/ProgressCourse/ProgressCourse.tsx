"use client"

import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Chapter, Course, UserProgress } from "@/app/generated/prisma/client"

export type ProgressCourseProps = {
    chapterCourseId: string
    infoCourse: Course & { chapters: Chapter[] }
}

export const ProgressCourse = ({ chapterCourseId, infoCourse }: ProgressCourseProps) => {

    const t = useTranslations()

    const router = useRouter()

    const { id, slug, chapters } = infoCourse

    const [isCompleted, setIsCompleted] = useState(false)
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

        const progress = userProgress.find((progress) => progress.chapterId === chapterCourseId)
        if (progress) {
            setIsCompleted(progress.isCompleted)
        }
    }, [chapterCourseId])


    const totalChapters = chapters.length
    const completeChapters = chapters.filter((chapter) => userProgress.some((progress) => progress.chapterId === chapter.id && progress.isCompleted)).length

    const progressPercentage = totalChapters > 0 ? Math.round((completeChapters / totalChapters) * 100) : 0

    const handleViewChapters = async (isCompleted: boolean) => {
        try {
            await axios.patch(`/api/course/${id}/chapter/${chapterCourseId}/progress`, JSON.stringify({ isCompleted }))

            toast(isCompleted ? t('alerts.alert3') : t('alerts.alert4'))

            if (isCompleted) {
                const currentIndex = chapters.findIndex((chapter) => chapter.id === chapterCourseId)

                const nextChapter = chapters[currentIndex + 1]

                if (nextChapter) {
                    router.push(`/academy/courses/${slug}/${nextChapter.id}`)
                }

            }

            router.refresh()
        } catch (error) {
            console.log(error);
            toast.error(t('alerts.error'))
        }
    }

    return (
        <div className=''>
            <div className='my-4 p-2 w-full flex items-center gap-2 flex-col rounded-md border shadow-md bg-white'>
                <span className='text-sm'>{t('infoCourse.progress')} | {progressPercentage}%</span>
                <Progress value={progressPercentage} className='*:bg-violet-300' />
            </div>

            <div className='my-4 w-full'>
                <Button className='w-full' onClick={() => handleViewChapters(!isCompleted)} variant={isCompleted ? "outline" : 'default'}>
                    {!isCompleted ? 'Marcar como completado' : 'Marcar como no completado'}
                </Button>
            </div>
        </div>
    )
}
