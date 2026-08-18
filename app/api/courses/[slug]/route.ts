import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ slug: string }>
}


export async function GET(
    req: Request,
    { params }: Params
) {
    try {

        const { slug } = await params

        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ message: "USER_NOT_AUTHENTICATED" }, { status: 401 })
        }

        const course = await prisma.course.findUnique({
            where: {
                slug
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

        if (!course) {
            return NextResponse.json(null, { status: 401 })
        }

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

        const coursesWithPurchaseInfo = {
            ...course,
            purchaseCourse: course.userId === userId || purchasedIds.has(course.id)
        }

        return NextResponse.json(coursesWithPurchaseInfo, { status: 200 })

    } catch (error) {
        console.log("GET UNIQUE COURSE", error)
        return NextResponse.json({ message: "GET_COURSES" }, { status: 500 })
    }
}