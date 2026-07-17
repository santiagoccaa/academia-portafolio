import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Params {
    params: Promise<{ courseId: string }>
}

export async function POST(req: Request, { params }: Params) {

    const { courseId } = await params

    const { description, stars } = await req.json()

    const { userId } = await auth()

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const res = await prisma.feedbackCourse.upsert({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            },
            update: {
                stars,
                description
            },
            create: {
                stars,
                userId,
                courseId,
                description
            }
        })

        return NextResponse.json(res, { status: 201 })
    } catch (error) {
        console.log("[CREATE FEEDBACK]", error);
        return NextResponse.json({ message: "[CREATE FEEDBACK]" }, { status: 500 })
    }
}