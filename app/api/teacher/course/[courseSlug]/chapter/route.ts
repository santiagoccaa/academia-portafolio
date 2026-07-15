import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ courseSlug: string }>
}

export async function POST(req: Request, { params }: Params) {

    try {
        const { userId } = await auth()

        const { title } = await req.json()
        const { courseSlug } = await params

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const course = await prisma.course.findFirst({
            where: {
                slug: courseSlug,
                userId,
            }
        })

        if (!course) {
            return new NextResponse("Course not found", { status: 404 })
        }

        const chapterCount = await prisma.chapter.count({
            where: {
                courseId: course.id
            }
        })

        const slugCourse = title.replaceAll(' ', '-').toLocaleLowerCase()

        const chapter = await prisma.chapter.create({
            data: {
                title,
                courseId: course.id,
                position: chapterCount + 1,
                slug: slugCourse
            }
        })

        return NextResponse.json(chapter)
    } catch (error) {
        console.log("[COURSE CHAPTER]", error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}