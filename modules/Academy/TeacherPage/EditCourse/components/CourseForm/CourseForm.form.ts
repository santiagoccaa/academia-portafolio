import { z } from "zod";

export const formSchema = z.object({
    title: z
        .string("El título es obligatorio")
        .min(2, "El título debe tener al menos 2 caracteres")
        .max(200, "El título no puede superar los 200 caracteres"),

    slug: z
        .string("El slug es obligatorio")
        .min(2, "El slug debe tener al menos 2 caracteres")
        .max(200, "El slug no puede superar los 200 caracteres"),

    description: z
        .string()
        .trim()
        .min(2, "La descripción debe tener al menos 2 caracteres")
        .max(600, "La descripción no puede superar los 500 caracteres")
        .optional(),

    category: z
        .string("La categoría es obligatoria")
        .min(2, "La categoría debe tener al menos 2 caracteres")
        .max(200, "La categoría no puede superar los 200 caracteres"),

    level: z
        .string("El nivel es obligatorio")
        .min(2, "El nivel debe tener al menos 2 caracteres")
        .max(200, "El nivel no puede superar los 200 caracteres"),
});
