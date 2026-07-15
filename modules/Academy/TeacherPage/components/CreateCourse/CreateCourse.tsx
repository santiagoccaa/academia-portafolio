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
import { useCourse } from "@/store";
import { preGenerateObjectId } from "@/utils";
import { useAuth } from "@clerk/nextjs";

export const FormCreateCourse = () => {
    const t = useTranslations();
    const router = useRouter();

    const { userId } = useAuth()
    const { getCoursesTeacherById, coursesTeacherById } = useCourse();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
        },
    });

    const onSubmit = async (values: CreateCoursePayload) => {

        const slug = values.slug.replaceAll(' ', '-').toLocaleLowerCase()

        if (!userId) {
            return toast('Unathorized')
        }

        const courseExists = coursesTeacherById.some(
            (course) => course.slug === slug
        );

        if (courseExists) {
            return toast("Este curso ya existe");
        }

        const newCourse = {
            id: preGenerateObjectId(),
            userId,
            title: values.title,
            slug,
            description: "",
            imageUrl: "",
            price: "",
            isPublished: false,
            level: "",
            category: "",
            createdAt: new Date(),
            updateAt: new Date(),
        }

        getCoursesTeacherById(newCourse);

        toast.success(t("alerts.alert18"));

        // TODO
        // router.push(`/academy/teacher/${slug}`);

        try {
            await axios.post("/api/teacher/course", values);
        } catch (error) {
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