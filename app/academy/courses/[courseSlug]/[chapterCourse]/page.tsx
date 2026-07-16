import { ChapterSelectect } from "@/modules/Academy";

interface Params {
    params: Promise<{ courseSlug: string, chapterCourse: string }>
}

export default async function ChapterSelectPage({ params }: Params) {

    const { chapterCourse, courseSlug } = await params

    return <ChapterSelectect chapterCourse={chapterCourse} courseSlug={courseSlug} />
}
