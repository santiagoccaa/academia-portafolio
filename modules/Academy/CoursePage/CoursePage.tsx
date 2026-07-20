import { CoursePageProps } from "@/types"
import { BreadCrumbCourse, CourseContent, Feedback, HeroBlockCourse } from "./components"


export const CoursePage = (courseSeletect: CoursePageProps) => {

    const { description, price, level, imageUrl, updateAt, slug, feedback, title, chapters, purchaseCourse } = courseSeletect

    return (
        <div className="space-y-4">
            <div className="border rounded-md p-4">
                <BreadCrumbCourse title={title} />
            </div>

            <div className="border rounded-md p-4 space-y-4">
                <HeroBlockCourse
                    chapters={chapters}
                    description={description ?? ''}
                    imageUrl={imageUrl ?? ''}
                    level={level ?? ''}
                    price={price ?? ''}
                    purchaseCourse={purchaseCourse}
                    slug={slug}
                    title={title}
                    updateAt={updateAt}
                />
            </div>

            <div className="border rounded-md p-4">
                <CourseContent chapters={chapters} />
            </div>

            {/* {feedback && feedback.length > 0 && <Feedback feedback={feedback} />} */}
        </div>
    )
}

