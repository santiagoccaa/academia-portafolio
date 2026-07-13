"use client"

import { Chapter } from "@/app/generated/prisma/client"
import { TitlePage } from "@/components/Shared"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { ArrowLeft, Cog, Eye, EyeOff, Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChapterTitleForm, ChapterVideoForm } from "./components"

interface ChapterProps {
    chapter: Chapter
    courseId: string
}
export const ChapterPage = ({ chapter, courseId }: ChapterProps) => {

    const router = useRouter()
    const t = useTranslations()

    const onPublis = async (state: boolean) => {
        try {
            await axios.patch(`/api/teacher/course/${courseId}/chapter/${chapter.id}`, {
                isPublised: state
            })

            toast(state ? t('alerts.alert6') : t('alerts.alert7'))

            router.refresh()
        } catch (error) {
            toast.error(t('alerts.error'))
        }
    }

    const onRemoveChapter = async () => {
        try {
            await axios.delete(`/api/teacher/course/${courseId}/chapter/${chapter.id}`)
            toast(t('alerts.alert8'))

            router.push(`/academy/teacher/${courseId}`)

        } catch (error) {
            toast.error(t('alerts.alert4'))
        }
    }

    return (
        <div className="space-y-4">
            <div className="border shadow p-2 rounded-md flex justify-between items-center">
                <Button onClick={() => router.push(`/academy/teacher/${courseId}`)}>
                    <ArrowLeft />
                    {t('editCourse.chapterForm.buttonHeader')}
                </Button>

                <div className="flex items-center gap-2">
                    {chapter.isPublised
                        ?
                        (
                            <Button variant={"outline"} onClick={() => onPublis(false)}>
                                {t('common.hidden')} <EyeOff />
                            </Button>
                        )
                        :
                        (
                            <Button onClick={() => onPublis(true)}>
                                {t('common.post')} <Eye />
                            </Button>
                        )
                    }

                    <Button variant={"destructive"} onClick={onRemoveChapter}>
                        <Trash />
                    </Button>
                </div>
            </div>

            <TitlePage title={t("editCourse.chapterForm.title")} icon={Cog} />

            <ChapterTitleForm courseId={courseId} chapter={chapter} />

            <ChapterVideoForm chapterId={chapter.id} courseId={courseId} videoUrl={chapter.videoUrl} />
        </div>
    )
}