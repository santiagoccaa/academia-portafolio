import { Chapter, Course, FeedbackCourse } from "@/app/generated/prisma/client"
import { BreadCrumbCourse, HeroBlockCourse } from "./components"

export type CourseData = Course & {
    chapters: Chapter[]
    feedback?: FeedbackCourse[]
    purchaseCourse: boolean
}

export interface CoursePageProps {
    courseSeletect: CourseData
}

export const CoursePage = ({ courseSeletect }: CoursePageProps) => {

    const { description, price, level, imageUrl, updateAt, slug, id, title, chapters, purchaseCourse } = courseSeletect

    return (
        <div className="space-y-4">
            <div className="border rounded-md p-4 space-y-4">
                <BreadCrumbCourse title={title} />
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
                {/* <CourseContent chapters={chapters} /> */}
            </div>
            {/* {feedback &&
                <div className="my-4 mx-6 border rounded-lg bg-white p-6">
                    <h2 className='text-3xl font-semibold mb-4'>{t('opinions')}</h2>
                    {feedback.map(async (item, index) => {
                        const user = await client.users.getUser(item.userId)
                        return (
                            <div key={index} className="py-2 border-b space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 aspect-square rounded-full relative overflow-hidden">
                                        <Image src={user.imageUrl} fill alt={user.firstName || 'teacher'} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800 capitalize">{user.firstName} {user.lastName}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <StarRating rating={item.stars} />
                                    <span className="text-xs font-light text-gray-600">{item.createdAt.toLocaleDateString()}</span>
                                </div>
                                <Accordion type="single" collapsible defaultValue="item-1" className="relative">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-left absolute bottom-full right-0 aspect-square flex items-center justify-center" />

                                        <AccordionContent className="text-sm text-gray-700">
                                            {item.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        )
                    })}
                </div>
            } */}
        </div>
    )
}

