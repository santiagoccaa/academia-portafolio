"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface HeaderCourseProps {
    idCourse: string
    isPublished: boolean
}

export const HeaderCourse = ({ idCourse, isPublished }: HeaderCourseProps) => {

    const t = useTranslations()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const onPublish = async (state: boolean) => {
        setIsLoading(true)
        try {
            axios.patch(`/api/course/${idCourse}`, { isPublished: state })
            router.refresh()
            toast(state ? t('alerts.alert15') : t('alerts.alert16'))
        } catch {
            router.refresh()
            toast.error(t('alerts.error'))
        }
        setIsLoading(false)
    }

    const onRemoveCourse = async () => {
        axios.delete(`/api/course/${idCourse}`)
        router.push('/teacher')
        toast(t('alerts.alert17'))
    }

    return (
        <div className="mb-4 border shadow rounded-md p-2">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <Button onClick={() => router.push("/academy/teacher")}>
                    <MoveLeft className="h-4 w-4" /> {t('editCourse.header.button')}
                </Button>

                <div className="flex gap-2 items-center">
                    {
                        isPublished ?
                            <Button
                                variant="outline"
                                disabled={isLoading}
                                onClick={() => onPublish(false)}
                            >
                                {t('common.unpublish')} <EyeOff />
                            </Button>
                            :
                            <Button
                                disabled={isLoading}
                                onClick={() => onPublish(true)}
                            >
                                {t('common.post')} <Eye />
                            </Button>
                    }

                    <Button variant="destructive" onClick={onRemoveCourse}>
                        <Trash />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeaderCourse
