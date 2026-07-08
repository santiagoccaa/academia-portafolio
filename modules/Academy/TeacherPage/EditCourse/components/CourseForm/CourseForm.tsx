"use client"

import { Cog } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formSchema } from "./CourseForm.form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Chapter, Course } from "@/app/generated/prisma/client"
import { TitlePage } from "@/components/Shared"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

export type CourseWithRelations = Course & { chapters: Chapter[] }

export type CourseFormProps = {
    course: CourseWithRelations
}

export const CourseForm = ({ course }: CourseFormProps) => {

    const t = useTranslations()

    const [charactersDescription, setCharactersDescription] = useState(course.description?.length)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course.title || "",
            slug: course.slug || "",
            description: course.description || "",
            category: course.category || "",
            level: course.level || ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (!form.formState.isDirty) {
                return
            }
            axios.patch(`/api/teacher/course/${course.id}`, values)
            form.reset(values)

            toast(t('alerts.alert12'))
        } catch (error) {
            toast.error(t('alerts.error'))
        }
    }

    return (
        <div className="space-y-4">
            <TitlePage title={t("editCourse.courseForm.title")} icon={Cog} />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Titulo */}
                    <Controller
                        control={form.control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>{t("editCourse.courseForm.formTitle")}</FieldLabel>

                                <Input
                                    placeholder="Curso de ReactJS"
                                    {...field}
                                />

                                <FieldDescription>
                                    {t("editCourse.courseForm.msTitle")}
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError>{fieldState.error.message}</FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Slug */}
                    <Controller
                        control={form.control}
                        name="slug"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Slug</FieldLabel>

                                <Input
                                    placeholder="curso-de-react-js"
                                    disabled
                                    {...field}
                                />

                                <FieldDescription>
                                    {t("editCourse.courseForm.msSlug")}
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError>{fieldState.error.message}</FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Category */}
                    <Controller
                        control={form.control}
                        name="category"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {t("editCourse.courseForm.formCategory")}
                                </FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>

                                    <SelectContent position="popper">
                                        <SelectGroup>
                                            <SelectItem value="Frontend">Frontend</SelectItem>
                                            <SelectItem value="Backend">Backend</SelectItem>
                                            <SelectItem value="Full Stack">Full Stack</SelectItem>
                                            <SelectItem value="Infraestructura">Infraestructura</SelectItem>
                                            <SelectItem value="Diseño UX/UI">Diseño UX/UI</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {fieldState.error && (
                                    <FieldError>{fieldState.error.message}</FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Level */}
                    <Controller
                        control={form.control}
                        name="level"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>{t("common.level")}</FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el nivel" />
                                    </SelectTrigger>

                                    <SelectContent position="popper">
                                        <SelectGroup>
                                            <SelectItem value="Principiante">
                                                {t("common.principiante")}
                                            </SelectItem>
                                            <SelectItem value="Intermedio">
                                                {t("common.intermedio")}
                                            </SelectItem>
                                            <SelectItem value="Avanzado">
                                                {t("common.avanzado")}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {fieldState.error && (
                                    <FieldError>{fieldState.error.message}</FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Description */}
                    <Controller
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {t("editCourse.courseForm.formDescription")}
                                </FieldLabel>

                                <Textarea
                                    placeholder="Descripción del curso"
                                    className="resize-none"
                                    maxLength={600}
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCharactersDescription(value.length);
                                        field.onChange(value);
                                    }}
                                />

                                <FieldDescription>
                                    {charactersDescription} / 600 {t("common.characters")}
                                </FieldDescription>

                                <FieldDescription>
                                    {t("editCourse.courseForm.msDescription")}
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError>{fieldState.error.message}</FieldError>
                                )}
                            </Field>
                        )}
                    />

                </div>
                <Button type="submit" disabled={!form.formState.isDirty}>{t('editCourse.courseForm.button')}</Button>
            </form>
        </div>
    )
}
