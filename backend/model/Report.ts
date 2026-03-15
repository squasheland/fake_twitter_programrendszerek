import { ObjectId } from "mongodb";

export interface Report {
  _id: ObjectId,
  reporterId: ObjectId,
  tweetId: ObjectId,
  reason: 'spam' | 'abuse' | 'other',
  status: 'pending' | 'handled' | 'rejected',
  createdAt: Date,
  handledBy: ObjectId
}