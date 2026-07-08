import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Params {
    params: Promise<{ courseId: string }>
}

export async function GET(req: Request, { params }: Params) {
    const { userId } = await auth()

    try {
        const { courseId } = await params
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const courseEdit = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId
            },
            include: {
                chapters: {
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        })

        return NextResponse.json(courseEdit, { status: 200 })
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}