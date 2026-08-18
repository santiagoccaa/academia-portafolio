import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ courseId: string }>
}

export async function GET(req: Request, { params }: Params) {
    try {
        const { courseId } = await params

        const feedback = await prisma.feedbackCourse.findMany({
            where: {
                courseId
            },
            take: 10,
            select: {
                firstName: true,
                lastName: true,
                imageUrl: true,
                description: true,
                stars: true,
                createdAt: true
            }
        })

        return NextResponse.json(feedback, {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.error("Error fetching feedback:", error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}