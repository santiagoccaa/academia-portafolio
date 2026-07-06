import prisma from '@/lib/prisma'
import { CreateCoursePayload } from '@/types'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    try {
        const { userId } = await auth()
        const client = await clerkClient()

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = await client.users.getUser(userId)

        const firstName = user.firstName ?? ""
        const lastName = user.lastName ?? ""
        const imageUrl = user.imageUrl ?? ""

        const body: CreateCoursePayload = await req.json()
        const { title, slug } = body

        const slugCourse = slug.replaceAll(' ', '-').toLocaleLowerCase()

        const course = await prisma.course.create({
            data: {
                title,
                slug: slugCourse,

                courseAuthor: {
                    connectOrCreate: {
                        where: {
                            userId
                        },

                        create: {
                            userId,
                            firstName,
                            lastName,
                            imageUrl
                        }
                    }
                }
            }
        })

        return NextResponse.json(course, { status: 200 })
    } catch (error) {
        console.log("POST COURSE", error);
        return new NextResponse('[POST-COURSE] Internal Error', { status: 500 })
    }
}