"use client";

import { EditCoursePage } from "@/modules/Academy";
import { useParams } from "next/navigation";

export default function EditCourse() {

    const { slug } = useParams()

    return <EditCoursePage id={slug as string} />
}