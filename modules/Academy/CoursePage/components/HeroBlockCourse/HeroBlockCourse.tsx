import { IconBadge } from '@/components/Shared'
import { Calendar, ChartNoAxesColumn, Timer } from 'lucide-react'
import { formatPrice } from '@/lib/formatPrice'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { formatDuration } from '@/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeroBlockCourse {
    description: string
    price: string
    level: string
    imageUrl: string
    updateAt: Date
    slug: string
    title: string
    chapters: {
        slug: string;
        title: string;
        duration: number;
    }[];
    purchaseCourse: boolean
}


export const HeroBlockCourse = ({ description, price, level, imageUrl, updateAt, slug, title, chapters, purchaseCourse }: HeroBlockCourse) => {

    const t = useTranslations()

    const duration = chapters.reduce((acc, chapter) => {
        return acc + (chapter.duration ?? 0)
    }, 0)

    const formatted = formatDuration(duration)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <h2 className='text-3xl font-semibold'>{title}</h2>
                <p className='text-balance mt-2'>{description}</p>

                <div className='flex flex-col gap-3 my-4 text-gray-600'>
                    <IconBadge icon={Timer} text={formatted} />
                    <IconBadge icon={Calendar} text={`${t('infoCourse.lastUpdate')}: ${new Date(updateAt).toLocaleDateString("es-ES")}`} />
                    <IconBadge icon={ChartNoAxesColumn} text={level ? t(`common.${level.toLocaleLowerCase()}`) : ''} />
                </div>

                {!purchaseCourse &&
                    <h2 className='text-xl font-semibold mb-4'>{!price ? t('common.free') : formatPrice(price)}</h2>
                }

                {
                    purchaseCourse ? (
                        <Button
                            className='hover:bg-primary text-white font-semibold'
                            asChild
                        >
                            <Link href={`/academy/courses/${slug}/${chapters[0].slug}`}>
                                {t('infoCourse.viewCourse')}
                            </Link>
                        </Button>
                    ) : (

                        <Button
                            className='hover:bg-primary text-white font-semibold'
                        >
                            {t('infoCourse.enroll')}
                        </Button>
                    )
                }
            </div>

            <Image
                src={imageUrl || '/image-default-course.webp'}
                alt={title}
                width={500}
                height={400}
                className='rounded-md'
            />
        </div>
    )
}
