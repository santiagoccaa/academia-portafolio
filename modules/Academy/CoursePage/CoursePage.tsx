"use client"

import { CourseData } from "@/types"
import { BreadCrumbCourse, CourseContent, Feedback, FeedbackeProps, HeroBlockCourse } from "./components"
import axios from "axios"
import { useEffect, useState } from "react"

interface CoursePageProps {
    courseSelected: CourseData
}
export const CoursePage = ({ courseSelected }: CoursePageProps) => {

    const { description, price, level, imageUrl, slug, title, chapters, purchaseCourse, updatedAt, id } = courseSelected

    const [feedback, setFeedback] = useState<FeedbackeProps[]>([])

    useEffect(
        () => {
            const fetchFeedback = async () => {
                try {
                    const { data } = await axios.get(`/api/courses/feedback/${id}`)
                    setFeedback(data)
                }
                catch (error) {
                    console.log("Error fetching feedback:", error)
                }

            }
        }, [])


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
                    updateAt={updatedAt}
                />
            </div>

            <div className="border rounded-md p-4">
                <CourseContent chapters={chapters} />
            </div>

            <Feedback feedback={feedback} />
        </div>
    )
}

