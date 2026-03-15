import { ObjectId } from "mongodb";

export interface Like {
    _id: ObjectId;
    userId: ObjectId;
    tweetId: ObjectId | null;
    commentId: ObjectId | null;
    createdAt: Date;
}