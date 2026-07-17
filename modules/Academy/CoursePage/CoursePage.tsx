import { BreadCrumbCourse, CourseContent, Feedback, HeroBlockCourse } from "./components"
import { AllInformationCourse } from "@/types";

export interface CoursePageProps {
    courseSeletect: AllInformationCourse
}

export const CoursePage = ({ courseSeletect }: CoursePageProps) => {

    const { description, price, level, imageUrl, updateAt, slug, feedback, title, chapters, purchaseCourse, id } = courseSeletect

    return (
        <div className="space-y-4">
            <div className="border rounded-md p-4">
                <BreadCrumbCourse title={title} />
            </div>

            <div className="border rounded-md p-4 space-y-4">
                <HeroBlockCourse
                    chapterId={id}
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

            {feedback && feedback.length > 0 && <Feedback feedback={feedback} />}
        </div>
    )
}

