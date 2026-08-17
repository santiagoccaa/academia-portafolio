"use client"

import { ChaptersArray } from '@/types';
import { Eye, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl'
import Link from 'next/link';

export type ChaptersCourseProps = {
    chapters: ChaptersArray[]
    slug: string
}

export const ChaptersCourse = ({ chapters, slug }: ChaptersCourseProps) => {

    const t = useTranslations()

    return (
        <div className='p-4 rounded-lg shadow-md border border-gray-200 h-fit min-w-0'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{t('common.chapters')}</h2>
            <div className='grid gap-4'>
                {chapters.map((chapter, index) => {
                    return (
                        <Link href={`/academy/courses/${slug}/${chapter.slug}`} key={index} className={`flex items-center justify-between border-gray-200 rounded-md transition-all duration-300 ${chapter.userProgrestss ? 'bg-primary text-white' : 'hover:bg-violet-200 hover:shadow-lg'}`}>
                            <div className='flex items-center gap-2  border shadow-md w-full justify-between rounded-md p-2'>
                                <span>{chapter.title}</span>
                                {
                                    chapter.userProgrestss ?
                                        <Eye className='w-4 h-4 shrink-0' />
                                        :
                                        <Lock className='w-4 h-4 shrink-0' />
                                }
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
