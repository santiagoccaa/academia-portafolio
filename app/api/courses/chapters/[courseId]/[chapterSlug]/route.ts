import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ courseId: string, chapterSlug: string }>
}

export async function GET(req: Request, { params }: Params) {
    try {
        const { courseId, chapterSlug } = await params

        const chapter = await prisma.chapter.findFirst({
            where: {
                slug: chapterSlug,
                courseId,
                isPublised: true
            },
            select: {
                description: true,
                videoUrl: true,
                id: true,
                title: true,
                userProgrestss: {
                    select: {
                        isCompleted: true
                    }
                }
            }
        })

        return NextResponse.json(chapter, {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.error("Error fetching chapter:", error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}