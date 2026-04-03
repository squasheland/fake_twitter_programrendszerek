import { Collection, type Filter, ObjectId } from 'mongodb';
import Database from '../database/databse.js';
import type { Tweet } from '../model/Tweet.js';

export interface TweetPageResult {
    tweets: Tweet[];
    hasMore: boolean;
}

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

    private async getPagedTweets(filter: Filter<Tweet>, page = 1): Promise<TweetPageResult> {
        const tweets = await this.collection
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * this.LIMIT_SIZE)
            .limit(this.LIMIT_SIZE + 1)
            .toArray();

        const hasMore = tweets.length > this.LIMIT_SIZE;

        if (hasMore) {
            tweets.pop();
        }

        return { tweets, hasMore };
    }

    async getTweetsByUserId(userId: ObjectId, page = 1): Promise<TweetPageResult> {
        return await this.getPagedTweets({ userId, isDeleted: false }, page);
    }

    async getTweets(page = 1): Promise<TweetPageResult> {
        return await this.getPagedTweets({ isDeleted: false }, page);
    }

    async updateLikesCount(tweetId: ObjectId, delta: 1 | -1): Promise<Tweet | null> {
        const result = await this.collection.findOneAndUpdate(
            { _id: tweetId },
            { $inc: { likesCount: delta } },
            { returnDocument: 'after' }
        );
        return result ?? null;
    }
}

export default new TweetDao();
