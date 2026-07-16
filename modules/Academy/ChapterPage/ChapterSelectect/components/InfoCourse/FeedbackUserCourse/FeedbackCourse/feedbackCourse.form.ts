import { z } from "zod"

export const formSchema = z.object({
    stars: z.number().max(5),
    description: z.string().min(2).max(500),
})