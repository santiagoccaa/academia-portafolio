import { Lock } from 'lucide-react'
import { Chapter, Course, FeedbackCourse } from "@/app/generated/prisma/client";
import { VideoCourse } from './VideoCourse';
import { ProgressCourse } from './ProgressCourse';
import { FeedbackUserCourse } from './FeedbackUserCourse';

export type InfoCourseProps = {
    infoCourse: Course & { chapters: Chapter[], feedback?: FeedbackCourse[], purchaseCourse: boolean }
    slugChapter: string
}

export const InfoCourse = ({ infoCourse, slugChapter}: InfoCourseProps) => {

    const { title, category, description, id, feedback } = infoCourse

    const videoUrl = infoCourse.chapters.find((chapter) => chapter.slug === slugChapter)?.videoUrl
    const chapterCourseId  = infoCourse.chapters.find((chapter) => chapter.slug === slugChapter)?.id

    return (
        <div className='w-full relative'>
            {!infoCourse.purchaseCourse && (
                <div className='absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md gap-y-2 h-full z-30 rounded-md text-secondary'>
                    <Lock className='w-8 h-8' />
                    <p className='text-sm'>Capitulo bloqueado, compra el curso para desbloquear</p>
                </div>
            )}

            {videoUrl && (
                <VideoCourse videoUrl={videoUrl} />
            )}

            <ProgressCourse
                chapterCourseId={chapterCourseId!!}
                infoCourse={infoCourse}
            />

            <div className='mt-4 bg-white rounded-md p-6 shadow-md'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{title}</h2>
                <div className='w-fit mb-4 px-2 py-1 bg-primary text-white rounded-full text-xs shadow-md'>{category}</div>
                <p className='text-gray-600 text-sm'>{description}</p>
            </div>

            <FeedbackUserCourse id={id} feedback={feedback && feedback[0]} />
        </div>
    )
}