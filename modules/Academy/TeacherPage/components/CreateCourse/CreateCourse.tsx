"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { formSchema } from "./createcourse.form";
import { CreateCoursePayload } from "@/types";

export const FormCreateCourse = () => {
    const t = useTranslations();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
        },
    });

    const onSubmit = async (values: CreateCoursePayload) => {

        try {
            const course = await axios.post("/api/teacher/course", values);

            // router.push(`/academy/teacher/${course.data.id}`);

            toast.success(t("alerts.alert18"));
        } catch (error) {
            console.log(error);
            toast.error(t("alerts.error"));
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-6"
        >
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                    Nombre del curso
                </label>

                <Input
                    id="title"
                    placeholder="Curso de NextJS"
                    autoComplete="off"
                    {...form.register("title")}
                />

                {form.formState.errors.title && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.title.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium">
                    Slug del curso
                </label>

                <Input
                    id="slug"
                    placeholder="curso-nextjs"
                    autoComplete="off"
                    {...form.register("slug")}
                />

                {form.formState.errors.slug && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.slug.message}
                    </p>
                )}
            </div>

            <Button type="submit">{t("common.create")}</Button>
        </form>
    );
};