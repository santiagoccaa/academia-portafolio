import { ContentPage } from '@/components/ContentPage'
import { CardBlog } from './CardBlog'
import { blogs } from './blog.data'
import { useTranslations } from 'next-intl'

export const Blog = () => {
    const t = useTranslations('homePage.blog')
    return (
        <ContentPage>
            <div className='flex flex-col my-8 mb-16'>
                <h2 className='text-sm font-medium text-primary'>
                    {t('title')}
                </h2>
                <p className='text-3xl font-medium text-gray-800 max-w-xl'>
                    {t('subtitle')}
                </p>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-4 mt-8'>
                    <div className='w-full lg:w-1/2 flex flex-col space-y-8 lg:space-x-4'>
                        <CardBlog {...blogs[0]} />
                        <CardBlog {...blogs[1]} />
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <CardBlog {...blogs[2]} />
                    </div>
                </div>
            </div>
        </ContentPage>
    )
}
