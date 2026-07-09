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

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { courseId } = await params

        const course = await prisma.course.delete({
            where: {
                id: courseId,
                userId: userId
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        console.log(error);
        console.log('[DELETE_COURSE]', { status: 500 });

    }
}

export async function PATCH(req: Request, { params }: Params) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const values = await req.json()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const course = await prisma.course.update({
            where: {
                id: courseId,
                userId: userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log("[COURSE PATCH]", error);

        return new NextResponse('Internal Error', { status: 500 })
    }
}