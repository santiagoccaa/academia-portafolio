import prisma from "@/lib/prisma"
import { ChapterPage } from "@/modules/Academy"

interface Params {
    params: Promise<{ courseId: string, chapterId: string }>
}

export default async function Chapter({ params }: Params) {

    const { chapterId, courseId } = await params

    const chapter = await prisma.chapter.findUnique({
        where: {
            id: chapterId,
            courseId
        }
    })

    if(!chapter){
        return <p>Este capitulo no existe</p>
    }

    return <ChapterPage courseId={courseId} chapter={chapter} />
}