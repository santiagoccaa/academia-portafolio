import { ChapterPage } from "@/modules/Academy"

interface Params {
    params: Promise<{ courseId: string, chapterId: string }>
}

export default async function Chapter({ params }: Params) {

    return <ChapterPage  />
}