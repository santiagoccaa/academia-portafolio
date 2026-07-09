"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useCourse } from "@/store"

interface HeaderCourseProps {
    idCourse: string
    isPublished: boolean
}

export const HeaderCourse = ({ idCourse, isPublished }: HeaderCourseProps) => {

    const t = useTranslations()
    const { updateCourse } = useCourse()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const onPublish = async (state: boolean) => {

        setIsLoading(true)
        updateCourse(idCourse, { isPublished: state })

        try {
            axios.patch(`/api/teacher/course/${idCourse}`, { isPublished: state })
            toast(state ? t('alerts.alert15') : t('alerts.alert16'))

            router.refresh()

        } catch {
            toast.error(t('alerts.error'))
            router.refresh()

        } finally {
            setIsLoading(false)
        }
    }

    const onRemoveCourse = async () => {
        axios.delete(`/api/teacher/course/${idCourse}`)
        toast(t('alerts.alert17'))
        router.push('/teacher')
    }

    return (
        <div className="mb-4 border shadow rounded-md p-2">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <Button asChild>
                    <Link href={"/academy/teacher"}>
                        <MoveLeft className="h-4 w-4" /> {t('editCourse.header.button')}
                    </Link>
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
