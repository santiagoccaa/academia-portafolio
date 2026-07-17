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

// Course /academy/courses/[slug]
export interface AllInformationCourse {
    purchaseCourse: boolean;
    feedback: {
        user: {
            firstName: string;
            lastName: string;
            imageUrl: string;
        };
        userId: string;
        description: string;
        stars: number;
        createdAt: Date;
    }[];
    chapters: {
        title: string;
        slug: string;
        duration: number;
    }[];
    level: string;
    id: string;
    slug: string;
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    isPublished: boolean;
    category: string;
    createdAt: Date;
    updateAt: Date;
}

// Chapter selectect

export interface ChapterSelectectInfo {
    title: string;
    slug: string;
    description: string;
    videoUrl: string;
} 