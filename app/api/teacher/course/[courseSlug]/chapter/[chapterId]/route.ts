import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ courseId: string, chapterId: string }>
}

export async function PATCH(req: Request, { params }: { params: Promise<{ courseId: string, chapterId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId, chapterId } = await params

        const values = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const chapter = await prisma.chapter.update({
            where: {
                id: chapterId,
                courseId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json({ message: chapter }, { status: 200 })
    } catch (error) {
        console.log("[COURSE_CHAPTER_ERROR]", { status: 500 });

    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { userId } = await auth()
        const { courseId, chapterId } = await params

        if (!userId) {
            return new NextResponse('Unathorized', { status: 401 })
        }

        const chapter = await prisma.chapter.delete({
            where: {
                id: chapterId,
                courseId
            }
        })

        return NextResponse.json(chapter)
    } catch (error) {
        console.log("[DELETE CHAPTER]", error);
        return new NextResponse('Internal server error', { status: 500 })
    }
}