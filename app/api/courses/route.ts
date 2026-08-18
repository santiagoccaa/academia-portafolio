import { getIsPurchasedCourse } from "@/actions"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
    req: Request
) {
    try {

        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ message: "USER_NOT_AUTHENTICATED" }, { status: 401 })
        }

        const courses = await prisma.course.findMany({
            take: 9,
            where: {
                isPublished: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                imageUrl: true,
                price: true,
                createdAt: true,
                level: true,
                category: true,
                userId: true,

                feedbackCount: true,
                averageRating: true,

                updatedAt: true,

                courseAuthor: {
                    select: {
                        firstName: true,
                        lastName: true,
                        imageUrl: true
                    }
                },

                chapters: {
                    where: {
                        isPublised: true
                    },
                    orderBy: {
                        position: "asc"
                    },
                    select: {
                        slug: true,
                        title: true,
                        duration: true,
                        userProgrestss: true,
                        id: true,
                    }
                },
                _count: {
                    select: {
                        purchases: true
                    }
                },
            }
        })

        const purchases = await prisma.purchase.findMany({
            where: {
                userId
            },
            select: {
                courseId: true
            }
        });

        const purchasedIds = new Set(
            purchases.map(p => p.courseId)
        );

        const coursesWithPurchaseInfo = courses.map(course => ({
            ...course,
            purchaseCourse: course.userId === userId || purchasedIds.has(course.id)
        }));

        return NextResponse.json(coursesWithPurchaseInfo, { status: 200 })

    } catch (error) {
        console.log("GET ALL COURSES", error)
        return NextResponse.json({ message: "GET_COURSES" }, { status: 500 })
    }
}