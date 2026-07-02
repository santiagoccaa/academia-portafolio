import { ContentPage } from '@/components/ContentPage'
import { LOGO } from '@/const/images'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export const FeedBack = () => {
    const t = useTranslations('homePage')
    return (
        <div className='bg-accent py-8 my-8'>
            <ContentPage>
                <div className='flex flex-col items-center gap-4 text-center'>
                    <div className="relative w-20 h-16">
                        <Image src={LOGO} fill alt="Logo" sizes='80px' />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-800 max-w-4xl'>{t('feedback')}</h2>

                    <div className='mt-6'>
                        <div className="w-full flex justify-center mb-2">
                            <div className="w-14 aspect-square rounded-full relative">
                                <Image src={`/persons/person5.png`} fill alt={"image user"} />
                            </div>
                        </div>
                        <h3 className="text-sm font-bold text-gray-800">Jacob Jones</h3>
                        <span className="text-gray-600 text-sm font-light">Student, National University</span>
                    </div>
                </div>
            </ContentPage>
        </div>
    )
}
