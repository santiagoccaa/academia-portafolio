import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from 'axios'
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Chapter } from "@/app/generated/prisma/client"
import { Controller, Form, useForm } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"


export const formSchema = z.object({
    title: z.string().min(2).max(200)
})

export type FormChaterNameProps = {
    idCourse: string
    setShowInputChapter: React.Dispatch<React.SetStateAction<boolean>>
    setChapterList: React.Dispatch<React.SetStateAction<Chapter[]>>
    chapters: Chapter[]
}

export const FormChaterName = ({ idCourse, setShowInputChapter, setChapterList, chapters }: FormChaterNameProps) => {

    const t = useTranslations()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/course/${idCourse}/chapter`, {
                title: values.title
            })

            setChapterList([...chapters, res.data])
            toast(t('alerts.alert11'))
        } catch (error) {
            console.log(error);
            toast.error(t('alerts.error'))
        } finally {
            setShowInputChapter(false)
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
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
        </Form>
    )
}

export default FormChaterName