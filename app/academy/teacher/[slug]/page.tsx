"use client";

import { useCourse } from "@/store";
import { useParams } from "next/navigation";

export default function EditCourse() {
    const params = useParams();

    const slug = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;

    const { coursesTeacherById } = useCourse();

    const courseSelected = coursesTeacherById.find(
        (course) => course.slug === slug
    );

    if (!courseSelected) {
        return (
            <p className="text-xl font-medium">
                Selecciona un curso
            </p>
        );
    }

    return (
        <div>
            Editando: {courseSelected.title}
        </div>
    );
}