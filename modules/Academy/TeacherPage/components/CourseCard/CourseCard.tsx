import Image from "next/image"
import { ChartNoAxesColumn, DollarSign } from "lucide-react"
import { useTranslations } from "next-intl"
import { Course } from "@/app/generated/prisma/client"
import { Actions } from "./Actions"

export const CourseCard = (course: Course) => {

    const t = useTranslations()

    const { title, id, price, level, imageUrl, description, isPublished } = course
    return (
        <div className="relative border border-gray-200 rounded-md p-4 w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                    <Image src={imageUrl || '/image-default-course.webp'} alt="img curso" width={150} height={150} className="rounded-md max-w-52" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-medium">{title}</h2>
                            {
                                isPublished ? <span className="inline-block bg-emerald-100 text-emerald-600 text-xs font-medium px-2 py-1 rounded-md mt-1">{t('common.published')}</span> : <span className="inline-block bg-gray-100 text-grat-600 text-xs font-medium px-2 py-1 rounded-md mt-1">{t('common.unpublished')}</span>
                            }
                        </div>
                        {description &&
                            <p className="text-gray-400 w-full max-w-lg line-clamp-1 text-sm">{description}
                            </p>
                        }

                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="flex gap-1 items-center text-sm mt-2">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">{t('common.price')}:</span>
                                <span className="font-semibold">{price || 0}</span>
                            </div>

                            <div className="flex gap-1 items-center text-sm mt-2">
                                <ChartNoAxesColumn className="w-4 h-4 text-gray-800" />
                                <span className="text-gray-400">{t('common.level')}:</span>
                                <span className="font-semibold">{level ? t(`common.${level.toLocaleLowerCase()}`) : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Actions courseId={id} />
            </div>
        </div>
    )
}

export default CourseCard