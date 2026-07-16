import Link from 'next/link'
import { Eye, Lock } from 'lucide-react'
import { Chapter, UserProgress } from "@/app/generated/prisma/client"

export type ChapterListProps = {
    chapters: Chapter[] | null
    courseSlug: string
    currentChapter: string
    userProgress: UserProgress[]
}

export const ChapterList = ({ chapters, courseSlug, currentChapter, userProgress }: ChapterListProps) => {

    if (!chapters) {
        return null
    }
    return (
        <div className='grid gap-4'>
            {chapters.map((chapter) => {

                const isCurrent = chapter.id === currentChapter
                const isCompleted = userProgress?.some((progress) => progress.chapterId === chapter.id && progress.isCompleted)

                return (
                    <Link href={`/academy/courses/${courseSlug}/${chapter.slug}`} key={chapter.id} className={`flex items-center justify-between border-gray-200 rounded-md transition-all duration-300 ${isCurrent ? 'bg-primary text-white' : 'hover:bg-violet-200 hover:shadow-lg'}`}>
                        <div className='flex items-center gap-2  border shadow-md w-full justify-between rounded-md p-2'>
                            <span>{chapter.title}</span>
                            {
                                isCompleted ?
                                    <Eye className='w-4 h-4 shrink-0' />
                                    :
                                    <Lock className='w-4 h-4 shrink-0' />
                            }
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}