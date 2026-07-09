import prisma from "@/lib/prisma"

export const getIsPurchasedCourse = async (userId: string, courseId: string, teacherId: string): Promise<boolean> => {
    try {
        if (teacherId === userId) {
            return true
        }

        const purchase = await prisma.purchase.findFirst({
            where: {
                userId,
                courseId
            }
        })

        return !!purchase
    } catch (error) {
        console.log("[GET_IS_PURCHASE_COURSE]", error);
        return false
    }
}