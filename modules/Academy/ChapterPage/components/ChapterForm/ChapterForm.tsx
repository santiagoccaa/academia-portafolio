"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Cog, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { ChapterTitleForm } from "./ChapterTitleForm"
import { ChapterVideoForm } from "./ChapterVideoForm"
import { useTranslations } from "next-intl"
import { TitlePage } from "@/components/Shared"

import { Chapter } from "@/app/generated/prisma/client"

export type ChapterFormProps = {
    courseId: string
    chapter: Chapter | null
}

export const ChapterForm = ({ chapter, courseId }: ChapterFormProps) => {

    const t = useTranslations()

    const router = useRouter()
    if (!chapter) {
        return null
    }

    const onPublis = async (state: boolean) => {
        try {
            axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
                isPublised: state
            })
            router.refresh()
            toast(state ? t('alerts.alert6') : t('alerts.alert7'))
        } catch (error) {
            toast.error(t('alerts.error'))
        }
    }

    const onRemoveChapter = async () => {
        try {
            axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`)
            router.push(`/academy/teacher/${courseId}`)
            toast(t('alerts.alert8'))
        } catch (error) {
            toast.error(t('alerts.alert4'))
        }
    }

    return (
        <>
            <div className="py-6 bg-white rounded-md flex justify-between items-center">
                <Button variant="outline" onClick={() => router.push(`/academy/teacher/${courseId}`)}>
                    <ArrowLeft />
                    {t('editCourse.chapterForm.buttonHeader')}
                </Button>

                <div className="flex items-center gap-2">
                    {chapter.isPublised
                        ?
                        (
                            <Button variant={"outline"} onClick={() => onPublis(false)}>
                                {t('common.hide')}
                            </Button>
                        )
                        :
                        (
                            <Button onClick={() => onPublis(true)}>
                                {t('common.post')}
                            </Button>
                        )
                    }

                    <Button variant={"destructive"} onClick={onRemoveChapter}>
                        <Trash />
                    </Button>
                </div>
            </div>
            <div className="my-4 bg-white rounded-md flex justify-between items-center">
                <TitlePage title={t("editCourse.chapterForm.title")} icon={Cog} />
            </div>

            <ChapterTitleForm courseId={courseId} chapter={chapter} />

            <ChapterVideoForm chapterId={chapter.id} courseId={courseId} videoUrl={chapter.videoUrl} />
        </>
    )
}
