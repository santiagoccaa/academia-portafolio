"use client"

import { Pencil, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UploadButton } from "@/utils/uploadthing"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { TitlePage } from "@/components/Shared"

export type ChapterVideoFormProps = {
    chapterId: string
    courseId: string
    videoUrl: string | null
}

export const ChapterVideoForm = ({ chapterId, courseId, videoUrl }: ChapterVideoFormProps) => {

    const t = useTranslations()

    const router = useRouter()
    const [onEditVideo, setOnEditVideo] = useState(false)

    const onSubmit = async (url: string, duration: number) => {
        try {
            await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
                videoUrl: url,
                duration
            })

            toast(t('alerts.alert10'))
            router.refresh()
        } catch {
            toast.error(t('alerts.error'))
        }
    }

    return (
        <div className="mt-6 bg-white rounded-md">
            <TitlePage title={t("editCourse.chapterForm.titleVideo")} icon={Video} />

            {videoUrl ?
                (
                    <video src={videoUrl} controls className="rounded-md max-w-96" />
                )
                :
                (
                    <p>{t('editCourse.chapterForm.messageVideo')}</p>
                )
            }

            <div className="mt-4 p-2 rounded-md border">
                <Button onClick={() => setOnEditVideo(true)}>
                    {onEditVideo ? t('editCourse.chapterForm.selectVideo') : t('editCourse.chapterForm.button')}
                    <Pencil className="w-4 h-4" />
                </Button>

                {
                    onEditVideo && (
                        <UploadButton
                            className="w-full bg-slate-200 rounded-mdp-2 mt-2"
                            endpoint="chapterVideo"
                            onClientUploadComplete={(res) => {
                                if (res) {
                                    const videoUrl = res[0].serverData.url

                                    const video = document.createElement("video")
                                    video.src = videoUrl

                                    video.onloadedmetadata = () => {
                                        const duration = Math.floor(video.duration)

                                        onSubmit(videoUrl, duration)
                                    }
                                }
                            }}
                        />
                    )
                }
            </div>
        </div>
    )
}