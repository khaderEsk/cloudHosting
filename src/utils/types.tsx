import { Article, User, Comment } from "@prisma/client"

export type JWTPayload = {
    id: number;
    isAdmin: boolean;
    firstName: string;
}
export type CommentWithUser = Comment & { User: User }

export type SingleArticle = Article & { comments: CommentWithUser[] }