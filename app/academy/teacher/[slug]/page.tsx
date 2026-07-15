
import { EditCoursePage } from "@/modules/Academy";

interface Params {
    params: Promise<{ slug: string }>
}

export default async function EditCourse({ params }: Params) {

    const { slug } = await params

    return <EditCoursePage courseSlug={slug} />
}