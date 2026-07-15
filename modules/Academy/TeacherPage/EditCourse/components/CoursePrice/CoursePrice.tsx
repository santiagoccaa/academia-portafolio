"use client"

import { DollarSign } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { TitlePage } from "@/components/Shared"
import { useCourse } from "@/store"

export type CoursePriceProps = {
    courseSlug: string
    priceCourse: string | null
}

export const CoursePrice = ({ courseSlug, priceCourse }: CoursePriceProps) => {

    const t = useTranslations()
    const { updateCourse } = useCourse()

    const [price, setPrice] = useState<string | undefined>(priceCourse || "Gratis")

    const onChangePrice = async () => {
        updateCourse(courseSlug, {
            price
        })
        try {
            axios.patch(`/api/teacher/course/${courseSlug}`, {
                price
            })

            toast(t('alerts.alert14'))
        } catch (error) {
            toast(t('alerts.error'))
        }
    }
    return (
        <div className="space-y-4 h-fit">
            <TitlePage title={t("editCourse.courseForm.titlePrice")} icon={DollarSign} />

            <Select value={price} onValueChange={setPrice} >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el precio del curso" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start">
                    <SelectGroup>
                        <SelectLabel>
                            {t('editCourse.courseForm.titlePrice')}
                        </SelectLabel>
                        <SelectItem value="Gratis">
                            {t('common.free')}
                        </SelectItem>
                        <SelectItem value="19.99">
                            19.99$
                        </SelectItem>
                        <SelectItem value="29.99">
                            29.99$
                        </SelectItem>
                        <SelectItem value="39.99">
                            39.99$
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
                <Button onClick={onChangePrice} disabled={!price} className="mt-3">
                    {t('editCourse.courseForm.buttonPrice')}
                </Button>
            </Select>
        </div>
    )
}