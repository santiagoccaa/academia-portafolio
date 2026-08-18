import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ courseId: string, chapterSlug: string }>
}

export async function PATCH(req: Request, { params }: Params) {
    const { userId } = await auth()
    const { chapterSlug, courseId } = await params

    const { isCompleted } = await req.json()

    try {
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const chapter = await prisma.chapter.findUnique({
            where: {
                slug: chapterSlug
            },
            select: {
                id: true,
                courseId: true
            }
        })

        if (!chapter || chapter.courseId !== courseId) {
            return NextResponse.json(
                { message: "Chapter Not Found" },
                { status: 404 }
            )
        }

        const userProgress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: chapter.id
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                chapterId: chapter.id,
                isCompleted
            }
        })

        return NextResponse.json(userProgress)

    } catch (error) {
        console.log("[COURSE_PROGRESS]", error)

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}