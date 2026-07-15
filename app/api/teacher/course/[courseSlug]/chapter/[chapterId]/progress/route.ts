import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"



interface Params {
    params: Promise<{ courseId: string, chapterId: string }>
}

export async function PATCH(req: Request, { params }: Params) {

    const { userId } = await auth()
    const { chapterId, courseId } = await params

    const { isCompleted } = await req.json()

    try {
        if (!userId) {
            return NextResponse.json({ message: "Unathorized" }, { status: 401 })
        }

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            }, select: {
                courseId: true
            }
        })

        if (!chapter || chapter.courseId != courseId) {
            return NextResponse.json({ message: "Chapter Not Found" }, { status: 404 })
        }

        const userProgress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId
                }
            }, update: {
                isCompleted: isCompleted
            }, create: {
                userId,
                chapterId,
                isCompleted
            }
        })

        return NextResponse.json(userProgress)
    } catch (error) {
        console.log("[COURSE_PROGRESS]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}