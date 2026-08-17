import { Lock } from 'lucide-react'
import { Chapter, Course, FeedbackCourse } from "@/app/generated/prisma/client";
import { VideoCourse } from './VideoCourse';
import { ProgressCourse } from './ProgressCourse';
import { FeedbackUserCourse } from './FeedbackUserCourse';
import { useAcademy } from '@/store';
import { ChapterData } from '@/types';

interface InfoCourseProps {
    chapterInformation: ChapterData
}

export const InfoCourse = ({ chapterInformation }: InfoCourseProps) => {

    const { courseSelected } = useAcademy()

    const { description, id, title, videoUrl } = chapterInformation

    if (!courseSelected) {
        return (
            <div>
                No hay informacion relacionada a este curso
            </div>
        )
    }

    return (
        <div className='relative min-w-0'>
            {!courseSelected?.purchaseCourse && (
                <div className='absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md gap-y-2 h-full z-30 rounded-md text-secondary'>
                    <Lock className='w-8 h-8' />
                    <p className='text-sm'>Capitulo bloqueado, compra el curso para desbloquear</p>
                </div>
            )}

            <VideoCourse videoUrl={videoUrl} />

            <ProgressCourse
                chapterCourseId={id}
                chapters={courseSelected?.chapters}
                courseId={courseSelected?.id}
                slug={courseSelected?.slug}
            />

            <div className='mt-4 rounded-md p-4 shadow-md w-full'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{title}</h2>
                <div className='w-fit mb-4 px-2 py-1 bg-primary text-white rounded-full text-xs shadow-md'>{courseSelected?.category}</div>
                <div
                    className="min-w-0 text-sm text-gray-600 wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>

            {/* {feedback ?
                <FeedbackUserCourse id={id} feedback={feedback && feedback[0]} />
                : <p>hola</p>
            } */}
        </div>
    )
}