"use client"

import { TeacherPage } from "@/modules/Academy";
import { useCourse } from "@/store/teacher/useCourses";
import axios from "axios";
import { useEffect } from "react";

export default function teacher() {

    const { coursesTeacherById, getCoursesTeacherById } = useCourse()

    useEffect(() => {
        if (coursesTeacherById.length > 0) return

        try {
            axios.get('/api/teacher/course').then((res) => {
                getCoursesTeacherById(res.data)
            })
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }, [])

    return <TeacherPage courses={coursesTeacherById} />
}
