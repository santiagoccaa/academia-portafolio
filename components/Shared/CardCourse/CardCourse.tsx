import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { DEFAULT_IMAGE_COURSE } from "@/const/images"
import Link from "next/link"
import { StarRating } from "../StarRating"
import { useTranslations } from "next-intl"
import { formatPrice } from "@/lib/formatPrice"
import { CoursesCardHome } from "@/types"
import { useAcademy } from "@/store/academy/useAcademy"

export const CardCourse = (course: CoursesCardHome) => {

    const t = useTranslations()

    const { getCourseSelected } = useAcademy()

    const { _count, imageUrl, category, description, slug, createdAt, title, price, avgStars, courseAuthor, purchaseCourse } = course
    const { firstName, lastName } = courseAuthor

    // TODO cambiar el link y eliminar /courses/
    return (
        <Link
            href={`/academy/courses/${slug}`}
            className="group" onClick={() =>
                getCourseSelected(course)}
        >
            <Card>
                <CardHeader className="relative">

                    <div className="relative w-full h-50 rounded-sm overflow-hidden">
                        <Image src={imageUrl || DEFAULT_IMAGE_COURSE} fill alt="image courses" className="w-full" />
                    </div>

                </CardHeader>
                <CardContent className="space-y-2">
                    <span className="text-xs font-medium text-primary">{category}</span>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl text-gray-800 font-bold w-full truncate line-clamp-1">{title}</h3>
                        <span className="">
                            <ArrowUpRight />
                        </span>
                    </div>
                    <h2 className="text-xs font-medium text-primary">{t('cardCourse.createdAt')}: <span className="text-gray-400 font-light">{new Date(createdAt).toLocaleDateString()}</span></h2>

                    <p className="text-xs font-light text-gray-400 line-clamp-3">{description}</p>

                    <div className="flex items-end gap-2 mt-2">
                        <span className="text-xs font-medium text-primary">{avgStars}</span>
                        <div className="flex items-center gap-1">
                            <StarRating rating={avgStars} />
                        </div>
                        <span className="text-xs font-light text-gray-400">{_count.feedback}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <h2 className="text-xs font-medium text-primary">{t('cardCourse.subs')}: <span className="text-gray-400 font-light">{_count.purchases}</span></h2>
                    </div>

                </CardContent>
                <CardFooter className="justify-between items-end">
                    <div className="flex items-center gap-2">
                        <div className="w-10 aspect-square bg-red-500 rounded-full relative overflow-hidden">
                            <Image src={courseAuthor.imageUrl} fill alt={firstName || 'teacher'} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800 capitalize">{firstName}</span>
                            <span className="text-xs font-bold text-gray-800 capitalize">{lastName}</span>
                        </div>
                    </div>
                    {purchaseCourse ? (
                        <h3 className="bg-accent text-primary font-semibold text-xs p-1 rounded-md">{t('cardCourse.message')}</h3>
                    ) : (
                        <h3 className="text-xl font-bold text-primary capitalize">{!price ? t('common.free') : price === "Gratis" ? t('common.free') : formatPrice(price)}</h3>
                    )}
                </CardFooter>
            </Card>
        </Link>
    )
}
