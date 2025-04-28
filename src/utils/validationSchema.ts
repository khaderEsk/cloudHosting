import { z } from "zod";
export const ArticleSchema = z.object({
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title should be string",
        })
        .min(2, { message: "String must contain at least 2 characters long" })
        .max(200, { message: "String must contain at less than 200 characters" }),
    description: z
        .string({
            required_error: "description is required",
            invalid_type_error: "description should be string",
        })
        .min(10),
});

export const RegisterSchema = z.object({
    firstName: z.string().min(2).max(100),
    email: z.string().max(100).email(),
    password: z.string().min(6)
});

export const LoginSchema = z.object({
    email: z.string().max(100).email(),
    password: z.string().min(6)
});

export const UpdateUserSchema = z.object({
    firstName: z.string().min(2).max(100).optional(),
    email: z.string().max(100).email().optional(),
    password: z.string().min(6).optional(),
});
export const createCommentSchema = z.object({
    text: z.string().min(2).max(500),
    articleId: z.number()
})