
// Information course
export interface CourseData {
    purchaseCourse: boolean;
    id: string;
    category: string;
    title: string;
    createdAt: Date;
    price: string;
    imageUrl: string;
    userId: string;
    description: string;
    slug: string;
    updatedAt: Date;

    courseAuthor: {
        imageUrl: string;
        firstName: string;
        lastName: string;
    };

    level: string;
    averageRating: number;
    feedbackCount: number;

    chapters: ChaptersArray[]

    _count: {
        purchases: number;
    };
}


export interface ChapterData {
    id: string;
    title: string;
    description: string
    videoUrl: string
    userProgrestss: {
        isCompleted: boolean;
    }[];
}

// Create course
export type CreateCoursePayload = {
    title: string
    slug: string
}

export interface ChaptersArray {
    title: string;
    slug: string;
    duration: number;
    userProgrestss: boolean
    id: string
}
