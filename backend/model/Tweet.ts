import { ObjectId } from "mongodb";

export interface Tweet {
    _id: ObjectId;
    userId: ObjectId;
    media: string[] | null;
    content: string;
    likesCount: number;
    retweetCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}