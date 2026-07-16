import { getIsPurchasedCourse } from "@/actions";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Params {
    params: Promise<{ slug: string }>
}

export async function GET(req: Request, { params }: Params) {

    const { userId } = await auth()

    try {

        const { slug } = await params
        
        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }
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
                        stars: "desc"
                    }
                }
            }
        })

        if (!course) {
            return NextResponse.json('COURSE NOT FOUND', { status: 500 })
        }
        const purchaseCourse = await getIsPurchasedCourse(
            userId,
            course.id,
            course.userId
        )

        const newCourse = {...course, purchaseCourse}

        return NextResponse.json(newCourse, { status: 200 })

    } catch (error) {
        console.log("GET_COURSE_BY_SLUG", error);
        return NextResponse.json('GET COURSE BY SLUG', { status: 500 })
    }
}