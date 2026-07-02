import { tutors } from './tutors.data'
import { CardTutor } from './CardTutor'
import { useTranslations } from 'next-intl'
import { ContentPage } from '@/components/ContentPage'

export const Tutors = () => {

    const t = useTranslations('homePage.tutors')
    return (
        <ContentPage>
            <div className='flex flex-col my-8 items-center text-center'>
                <h2 className='text-sm font-medium text-primary'>{t('title')}</h2>
                <p className='text-2xl md:text-3xl font-medium text-gray-800 max-w-xl'>
                    {t('subtitle')}
                </p>
                <p className="text-sm text-gray-500 max-w-xl">
                    {t('subtitle2')}
                </p>
            </div>
            <div className='my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center'>
                {tutors.map((tutor, index) => (
                    <CardTutor key={index} {...tutor} />
                ))}
            </div>
        </ContentPage>
    )
}

