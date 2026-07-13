"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./ChapterTitleForm.form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Chapter } from "@/app/generated/prisma/client"
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field"
import { EditorDescription } from "@/components/Shared"

export type ChapterTitleFormProps = {
    courseId: string,
    chapter: Chapter
}

export const ChapterTitleForm = ({ chapter, courseId }: ChapterTitleFormProps) => {

    const t = useTranslations()

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: chapter.title || "",
            description: chapter.description || "",
            isFree: chapter.isFree || false
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            axios.patch(`/api/teacher/course/${courseId}/chapter/${chapter.id}`, {
                title: values.title,
                description: values.description,
                isFree: values.isFree
            })
            router.refresh()
            toast(t('alerts.alert9'))
        } catch (error) {
            console.log(error);
            toast.error(t('error'))
        }
    }

    return (
        <div className='rounded-md border p-2'>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-start justify-start">
                <div className="space-y-2">
                    <Controller
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <Field>
                                <FieldTitle>{t('editCourse.chapterForm.formName')}</FieldTitle>
                                <Input placeholder="Introduccion..." {...field} />
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                            <Field orientation="horizontal" className="rounded-md border p-2">
                                
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                <div className="space-y-1 leading-none">
                                    <FieldTitle>{t('editCourse.chapterForm.check')}</FieldTitle>
                                    <FieldDescription>
                                        {t('editCourse.chapterForm.message')}
                                    </FieldDescription>
                                </div>
                            </Field>
                        )}
                    />

                    <Button type="submit" disabled={!form.formState.isValid} className="mt-4 w-full">{t('common.save')}</Button>
                </div>
                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <Field>
                            <FieldTitle>{t('editCourse.chapterForm.formDescription')}</FieldTitle>
                            <EditorDescription  {...field} />
                        </Field>
                    )}
                />
                <div />
            </form>
        </div>
    )
}
