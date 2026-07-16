"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Star } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import axios from "axios"
import { toast } from "sonner"
import React from "react"
import { useTranslations } from "next-intl"
import { formSchema } from "./feedbackCourse.form"
import { Field } from "@/components/ui/field"

interface FormFedbackProps {
    id: string
    stars?: number
    description?: string
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setDescription: React.Dispatch<React.SetStateAction<string>>
    setStarts: React.Dispatch<React.SetStateAction<number>>
}

export const FormFedbackCourse = ({ id, description, stars, setEdit, setStarts, setDescription }: FormFedbackProps) => {

    const t = useTranslations()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stars: stars || 0,
            description: description || "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { description, stars } = values
        try {
            await axios.post(`/api/course/${id}/feedback`, { description, stars })
            toast(t('alerts.alert1'))
        } catch (error) {
            toast.error(t('alerts.alert1'))
        } finally {
            setDescription(description)
            setStarts(stars)
            setEdit(false)
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{t('infoCourse.titleForm')}</h2>
            <Controller
                control={form.control}
                name="stars"
                render={({ field }) => (
                    <Field>
                        <div className="flex gap-4 mb-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => field.onChange(item)}
                                    className="cursor-pointer"
                                >
                                    {item <= field.value ? (
                                        <Star key={item} fill="#20B486" strokeWidth={0} size={30} />
                                    ) : (
                                        <Star key={item} size={30} strokeWidth={1} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="description"
                render={({ field }) => (
                    <Field>
                        <Textarea
                            maxLength={500}
                            className="max-h-40"
                            placeholder="Deja tu comentario sobre el curso"
                            {...field}
                        />
                    </Field>
                )}
            />

            {form.formState.isDirty && form.formState.isValid
                ?
                <Button className="mt-6" type="submit" >
                    {t('infoCourse.buttonSave')}
                </Button>
                :
                <Button className="mt-6" type="button" onClick={() => setEdit(false)} >
                    {t('common.cancel')}
                </Button>
            }
        </form>
    )
}
