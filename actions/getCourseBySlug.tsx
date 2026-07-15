"use server"

import { Chapter, Course, FeedbackCourse } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getCourseBySlug = async (slug: string): Promise<Course & { chapters: Chapter[], feedback?: FeedbackCourse[] } | null> => {

    const { userId } = await auth()

    if (!userId) {
        return null
    }
    try {
        const course = await prisma.course.findUnique({
            where: {
                slug,
                isPublished: true
            },
            include: {
                chapters: {
                    where: {
                        isPublised: true
                    },
                    orderBy: {
                        position: "asc"
                    }
                },
                feedback: {
                    orderBy: {
                        stars:"desc"
                    }
                }
            }
        })

        return course
    } catch (error) {
        console.log("GET_COURSE_BY_SLUG", error);
        return null
    }
}