import { ObjectId } from "mongodb";

export interface Comment {
    _id: ObjectId;
    tweetId: ObjectId;
    userId: ObjectId;
    content: string;
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}