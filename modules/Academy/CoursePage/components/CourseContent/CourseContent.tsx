import { useTranslations } from 'next-intl'

export type CourseContentProps = {
    chapters: {
        title: string,
        slug: string,
        duration: number
    }[]
}

export const CourseContent = ({ chapters }: CourseContentProps) => {
    const t = useTranslations()
    return (
        <div className=''>
            <h2 className='text-3xl font-semibold mb-4 pb-4'>{t('infoCourse.content')}</h2>
            <div className='space-y-6'>
                {chapters.map((chapter, index) => (
                    <div key={index} className='flex items-start space-x-4 border p-2 rounded-lg hover:bg-gray-100 transition-all'>
                        <div className='shrink-0 bg-primary text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center'>
                            {index + 1}
                        </div>

                        <div className='flex-1 '>
                            <h4 className='text-xl font-medium text-gray-800'>{chapter.title}</h4>
                        </div>

                        <div className='shrink-0 flex items-center justify-center'>
                            <span className='px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-800'>
                                {t('common.published')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
