import { ObjectId } from "mongodb";

export interface Follow {
    _id: ObjectId;
    followerId: ObjectId;
    followingId: ObjectId;
    createdAt: Date;
} 