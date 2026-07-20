import { getIsPurchasedCourse } from "@/actions";
import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Params {
    params: Promise<{ slug: string }>
}

export async function GET(req: Request, { params }: Params) {
    const { userId } = await auth();
    const client = await clerkClient();

    try {
        const { slug } = await params;

        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const course = await prisma.course.findUnique(
            {
                where: {
                    slug,
                    isPublished: true,
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    imageUrl: true,
                    userId: true,
                    level:true,
                    updateAt: true,
                    slug: true,
                    chapters: {
                        where: {
                            isPublised: true,
                        },
                        orderBy: {
                            position: "asc",
                        },
                        select: {
                            slug: true,
                            title: true,
                            duration: true,
                        },
                    },
                    feedback: {
                        orderBy: {
                            stars: "desc",
                        },
                        select: {
                            stars: true,
                            userId: true,
                            description: true,
                        }
                    }
                }
            });

        if (!course) {
            return NextResponse.json("COURSE NOT FOUND", { status: 404 });
        }

        const feedbackWithUser = await Promise.all(
            course.feedback.map(async (item) => {
                const user = await client.users.getUser(item.userId);

                return {
                    ...item,
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        imageUrl: user.imageUrl,
                    },
                };
            })
        );

        const purchaseCourse = await getIsPurchasedCourse(
            userId,
            course.id,
            course.userId
        );

        const allInformationCourse = {
            ...course,
            purchaseCourse,
            feedback: feedbackWithUser,
        }
        return NextResponse.json(
            allInformationCourse,
            { status: 200 }
        );
    } catch (error) {
        console.log("GET_COURSE_BY_SLUG", error);
        return NextResponse.json("GET COURSE BY SLUG", { status: 500 });
    }
}