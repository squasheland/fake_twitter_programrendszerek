import { Collection, ObjectId } from 'mongodb';
import Database from '../database/databse.js';
import type { Tweet } from '../model/Tweet.js';

class TweetDao {
    private readonly LIMIT_SIZE = 50;

    private get collection(): Collection<Tweet> {
        return Database.db.collection<Tweet>('tweets');
    }

    async createTweet(userId: ObjectId, content: string): Promise<Tweet> {
        const tweet: Tweet = {
            _id: new ObjectId(),
            userId,
            content,
            media: null,
            likesCount: 0,
            retweetCount: 0,
            commentCount: 0,
            createdAt: new Date(),
            updatedAt: null,
            isDeleted: false,
        };
        await this.collection.insertOne(tweet);
        return tweet;
    }

    async getTweetsByUserId(userId: ObjectId, page = 1): Promise<Tweet[]> {
        return await this.collection
            .find({ userId, isDeleted: false })
            .sort({ createdAt: -1 })
            .skip((page - 1) * this.LIMIT_SIZE)
            .limit(this.LIMIT_SIZE)
            .toArray();
    }

    async getTweets(page = 1): Promise<Tweet[]> {
        return await this.collection
            .find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .skip((page - 1) * this.LIMIT_SIZE)
            .limit(this.LIMIT_SIZE)
            .toArray();
    }

}

export default new TweetDao();