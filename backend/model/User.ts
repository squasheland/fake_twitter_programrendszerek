import { ObjectId } from "mongodb";

export interface User{
    _id: ObjectId;
    username:string;
    passwordHash: string;
    email: string;
    displayName: string;
    role: 'user' | 'admin';
    bio: string;
    pfp: string;
    followersCount: number;
    followingCount: number;
    tweetCount: number;
    isSuspended: boolean;
    createdAt: Date;
    updatedAt: Date;
}