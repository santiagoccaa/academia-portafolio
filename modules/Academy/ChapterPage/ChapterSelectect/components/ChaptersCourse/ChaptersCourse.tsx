"use client"

import { useAcademy } from '@/store';
import { ChaptersArray } from '@/types';
import axios from 'axios';
import { Eye, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type ChaptersCourseProps = {
    slug: string
}

export const ChaptersCourse = ({ slug }: ChaptersCourseProps) => {

    const t = useTranslations()

    const { courseSelected, getCourseSelected } = useAcademy()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        const getCourse = async () => {
            const { data } = await axios.get(`/api/courses/${slug}`)

            getCourseSelected(data)

            setLoading(false)

        }
        getCourse()
    }, [])

    if (!courseSelected) {
        return (
            <div>No hay capitulos que mostrar</div>
        )
    }

    return (
        <div className='p-4 rounded-lg shadow-md border border-gray-200 h-fit min-w-0'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{t('common.chapters')}</h2>
            <div className='grid gap-4'>
                {courseSelected.chapters.map((chapter, index) => {
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
