import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Params {
    params: Promise<{ courseId: string, chapterSlug: string }>
}

export async function GET(req: Request, { params }: Params) {
    const { userId } = await auth();
    try {
        const { courseId, chapterSlug } = await params;

        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const course = await prisma.chapter.findUnique({
            where: {
                slug: courseId
            },
            select: {
                courseId: true
            }
        })

        if (!course) {
            return NextResponse.json(null, { status: 500 })
        }
        
        const chapter = await prisma.chapter.findFirst({
            where: {
                slug: chapterSlug,
                courseId: course.courseId
            },
            select: {
                videoUrl: true,
                slug: true,
                title: true,
                description: true
            }
        })

        return NextResponse.json(chapter, { status: 200 })
    } catch (error) {
        console.log("GET CHAPTER:", error);

        return NextResponse.json(null, { status: 500 })
    }
}
