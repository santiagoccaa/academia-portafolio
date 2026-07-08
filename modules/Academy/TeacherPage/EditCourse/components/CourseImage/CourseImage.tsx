"use client"

import { FileImage, ImageUp, Pencil } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import { useTranslations } from "next-intl"
import { TitlePage } from "@/components/Shared"
import { UploadButton } from "@/utils/uploadthing"

export type CourseImageProps = {
    idCourse: string
    imageCourse: string | null
}

export const CourseImage = ({ idCourse, imageCourse }: CourseImageProps) => {

    const t = useTranslations()

    const [isEditing, setIsEditing] = useState(false)
    const [image, setImage] = useState(imageCourse)

    const onChangeImage = async (imageUrl: string) => {
        try {
            axios.patch(`/api/course/${idCourse}`, {
                imageUrl
            })
            toast(t('alerts.alert13'))
        } catch (error) {
            toast.error(t('alerts.error'))
        }
    }

    return (
        <div className="space-y-4 h-fit ">
            <TitlePage icon={FileImage} title={t("editCourse.courseForm.titleImage")} />

            {
                isEditing ?
                    <div className="bg-slate-300 p-4 mt-2 rounded-lg flex flex-col items-center">
                        <ImageUp className="text-white" size={40} strokeWidth={1} />
                        <UploadButton
                            endpoint="imageUploader"
                            content={{
                                button({ ready }) {
                                    if (ready) return "Selecciona una imagen";
                                    return "Cargando..."
                                },
                                allowedContent: "(PNG, JPG, SVG, WEBP)",
                            }}
                            onClientUploadComplete={(res) => {
                                onChangeImage(res[0]?.ufsUrl)
                                setImage(res[0]?.ufsUrl)
                                setIsEditing(false)
                            }}
                            onUploadError={() => {
                                toast.error('Ha ocurrido un error')
                            }}
                        />
                    </div>
                    :
                    <Image
                        src={image || '/image-default-course.webp'}
                        alt="curso image"
                        width={500}
                        height={250}
                        className="w-full h-full rounded-md"
                    />
            }

            <Button
                className="w-full mt-4"
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
            >
                <Pencil className="h-4 w-4" />
                {t('editCourse.courseForm.buttonImage')}
            </Button>
        </div>
    )
}