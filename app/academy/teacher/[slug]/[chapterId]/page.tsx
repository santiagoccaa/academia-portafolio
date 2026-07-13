import prisma from "@/lib/prisma"
import { ChapterPage } from "@/modules/Academy"

interface Params {
    params: Promise<{ slug: string, chapterId: string }>
}

export default async function Chapter({ params }: Params) {

    const { chapterId, slug } = await params

    const chapter = await prisma.chapter.findUnique({
        where: {
            id: chapterId,
            courseId: slug
        }
    })

    if (!chapter) {
        return <p>Este capitulo no existe</p>
    }

    return <ChapterPage courseId={slug} chapter={chapter} />
}