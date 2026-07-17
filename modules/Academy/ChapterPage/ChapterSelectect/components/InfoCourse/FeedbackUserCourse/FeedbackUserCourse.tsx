"use client"

import { useEffect, useState } from "react"
import { FeedbackCourse } from "@/app/generated/prisma/client"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { FormFedbackCourse } from "./FeedbackCourse"

export interface FeedbackCourseProps {
    id: string
    feedback: FeedbackCourse
}

export const FeedbackUserCourse = ({ id, feedback }: FeedbackCourseProps) => {

    const t = useTranslations()

    const [edit, setEdit] = useState(false)

    const [stars, setStars] = useState<number>(feedback.stars)
    const [description, setDescription] = useState<string>(feedback.description)

    useEffect(() => {
        setDescription(feedback.description)
        setStars(feedback.stars)

    }, [stars, description])

    return (
        <div className='mt-4 bg-white rounded-md p-6 shadow-md'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{t('infoCourse.opinion')}</h2>
            <div>
                <div className="flex gap-4 mb-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        item <= stars ? (
                            <Star key={item} fill="#20B486" strokeWidth={0} size={30} />
                        ) : (
                            <Star key={item} size={30} strokeWidth={1} />
                        )
                    ))}
                </div>
                <p className="text-sm font-light text-gray-600">{description}</p>

                <Button className="mt-8" onClick={() => setEdit(true)}>
                    {t('infoCourse.button')}
                </Button>
            </div>

        </div>
    )
}
