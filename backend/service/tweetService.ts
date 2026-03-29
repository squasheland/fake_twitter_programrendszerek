import type { Tweet } from '../model/Tweet.js';
import tweetDao, { type TweetPageResult } from '../dao/tweetDao.js';
import { ObjectId } from 'mongodb';

export interface TweetResponse {
    id: string;
    userId: string;
    media: string[] | null;
    content: string;
    likesCount: number;
    retweetCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date | null;
    isDeleted: boolean;
}

export interface TweetPageResponse {
    tweets: TweetResponse[];
    hasMore: boolean;
    page: number;
}

class TweetService {
    private normalizePage(page: number): number {
        if (!Number.isInteger(page) || page < 1) {
            throw new Error('Page must be a positive integer');
        }

        return page;
    }

    private mapTweet(tweet: Tweet): TweetResponse {
        return {
            id: tweet._id.toHexString(),
            userId: tweet.userId.toHexString(),
            media: tweet.media,
            content: tweet.content,
            likesCount: tweet.likesCount,
            retweetCount: tweet.retweetCount,
            commentCount: tweet.commentCount,
            createdAt: tweet.createdAt,
            updatedAt: tweet.updatedAt,
            isDeleted: tweet.isDeleted,
        };
    }

    private mapTweetPage(page: number, result: TweetPageResult): TweetPageResponse {
        return {
            tweets: result.tweets.map((tweet) => this.mapTweet(tweet)),
            hasMore: result.hasMore,
            page,
        };
    }

    async createTweet(userId: string | undefined | null, content: string): Promise<TweetResponse> {
        if (!userId) {
            throw new Error('User ID is required to post a tweet');
        }

        if (!content) {
            throw new Error('Content is required to post a tweet');
        }

        const tweet = await tweetDao.createTweet(new ObjectId(userId), content);
        return this.mapTweet(tweet);
    }

    async getTweetsForFeed(page: number): Promise<TweetPageResponse> {
        const normalizedPage = this.normalizePage(page);
        const tweets = await tweetDao.getTweets(normalizedPage);

        return this.mapTweetPage(normalizedPage, tweets);
    }

    async getTweetsByUser(userId: string, page: number): Promise<TweetPageResponse> {
        if (!ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        const normalizedPage = this.normalizePage(page);
        const tweets = await tweetDao.getTweetsByUserId(new ObjectId(userId), normalizedPage);

        return this.mapTweetPage(normalizedPage, tweets);
    }
}

export default new TweetService();
