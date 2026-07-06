import { z } from "zod"

export const formSchema = z.object({
    title: z.string().min(2, {
        message: "courseName must be at least 2 characters.",
    }),
    slug: z.string().min(2, {
        message: "courseName must be at least 2 characters.",
    }),
})