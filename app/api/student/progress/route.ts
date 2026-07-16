import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(reques: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw Error("Unauthorized")
        }

        const progress = await prisma.userProgress.findMany({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(progress, { status: 200 })
    } catch (error) {
        console.log("[GET_USER_PROGRESS]", error);
        return NextResponse.json(null, { status: 500 })
    }
}