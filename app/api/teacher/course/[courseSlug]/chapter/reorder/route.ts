import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ courseSlug: string }>
}
export async function PUT(req: Request, { params }: Params) {
    console.log("[REORDER]");

    try {
        const { userId } = await auth()
        const { courseSlug } = await params

        const { list } = await req.json()

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const course = await prisma.course.findUnique({
            where: {
                slug: courseSlug,
                userId: userId
            }
        })

        if (!course) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 })
        }

        for (const item of list) {
            await prisma.chapter.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            })
        }

        return NextResponse.json({ message: "Succes" }, { status: 200 })
    } catch (error) {
        console.log("[COURSE_CHAPTER_REORDER]", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}