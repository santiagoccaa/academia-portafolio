import prisma from "@/lib/prisma"
import { ChapterPage } from "@/modules/Academy"

interface Params {
    params: Promise<{ slug: string, chapterSlug: string }>
}

export default async function Chapter({ params }: Params) {

    const { chapterSlug, slug } = await params

    const chapter = await prisma.chapter.findUnique({
        where: {
            slug: chapterSlug,
        }
    })

    if (!chapter) {
        return <p>Este capitulo no existe</p>
    }

    return <ChapterPage courseId={slug} chapter={chapter} />
}