import { ObjectId } from "mongodb";

export interface Retweet {
    _id: ObjectId;
    userId: ObjectId;
    tweetId: ObjectId;
    createdAt: Date;
}