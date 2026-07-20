import { Prisma } from "@/app/generated/prisma/client"

// Card course
export type CardCourseInformation = Prisma.CourseGetPayload<{
    select: {
        id: true
        category: true
        title: true
        createdAt: true
        userId: true
        price: true
        imageUrl: true
        description: true
        slug: true
        _count: {
            select: {
                purchases: true,
                feedback: true
            }
        }
        courseAuthor: {
            select: {
                firstName: true,
                lastName: true
                imageUrl: true
            }
        }
    }
}> & {
    avgStars: number,
    purchaseCourse: boolean
}

// Create course
export type CreateCoursePayload = {
    title: string
    slug: string
}

// Courses Card
export type CoursesCardHome = Prisma.CourseGetPayload<{
    select: {
        id: true
        category: true
        title: true
        createdAt: true
        userId: true
        price: true
        imageUrl: true
        description: true
        slug: true
        _count: {
            select: {
                purchases: true,
                feedback: true
            }
        }
        courseAuthor: {
            select: {
                firstName: true,
                lastName: true
                imageUrl: true
            }
        }
    }
}> & {
    avgStars: number,
    purchaseCourse: boolean
}

// Course Page

export interface CoursePageProps {
    purchaseCourse: boolean;
    feedback: {
        user: {
            firstName: string
            lastName: string
            imageUrl: string;
        };
        userId: string;
        title: never;
        description: string;
        stars: number;
    }[];
    level: string
    id: string;
    slug: string;
    userId: string;
    title: string;
    description: string
    imageUrl: string
    price: string
    updateAt: Date;
    chapters: {
        slug: string;
        title: string;
        duration: number;
    }[];
}
