import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from 'axios'
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError } from "@/components/ui/field"
import { useCourse } from "@/store"
import { preGenerateObjectId } from "@/utils"


export const formSchema = z.object({
    title: z.string().min(2).max(200)
})

export type FormChaterNameProps = {
    idCourse: string
    setShowInputChapter: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormChaterName = ({ idCourse, setShowInputChapter }: FormChaterNameProps) => {

    const t = useTranslations()

    const { addChapter, chaptersByCourse } = useCourse()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    })

    const lastChapter = chaptersByCourse[chaptersByCourse.length - 1];
    const position = lastChapter ? lastChapter.position : 0;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        setLoading(true)

        addChapter({
            courseId: idCourse,
            id: preGenerateObjectId(),
            title: values.title,
            createdAt: new Date(),
            description: "",
            duration: 0,
            isFree: false,
            isPublised: false,
            position: position + 1,
            updateAt: new Date(),
            videoUrl: ""
        })
        toast(t('alerts.alert11'))

        try {
            await axios.post(`/api/teacher/course/${idCourse}/chapter`, {
                title: values.title
            })

        } catch (error) {
            console.log(error);
            toast.error(t('alerts.error'))
        } finally {
            setShowInputChapter(false)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
            <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <Input placeholder="Ej: Introduccion a la programacion" {...field} />

                        {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                        )}
                    </Field>
                )}
            />
            <Button type="submit" disabled={!form.formState.isValid || loading}>{t('common.save')}</Button>
        </form>
    )
}

export default FormChaterName