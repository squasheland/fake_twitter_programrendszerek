import type { Tweet } from '../model/Tweet.js';
import type { TweetResponse } from '../../common/tweet/TweetResponse.js';
import type { TweetPage } from '../../common/tweet/TweetPage.js';
import tweetDao, { type TweetPageResult } from '../dao/tweetDao.js';
import likeDao from '../dao/likeDao.js';
import { ObjectId } from 'mongodb';

class TweetService {
    private normalizePage(page: number): number {
        if (!Number.isInteger(page) || page < 1) {
            throw new Error('Page must be a positive integer');
        }

        return page;
    }

    private mapTweet(tweet: Tweet, isLiked = false): TweetResponse {
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
            isLiked,
        };
    }

    private async mapTweetPage(
        page: number,
        result: TweetPageResult,
        currentUserId: string
    ): Promise<TweetPage> {
        const tweetIds = result.tweets.map((t) => t._id);
        const likedSet = await likeDao.getLikedTweetIds(new ObjectId(currentUserId), tweetIds);

        return {
            tweets: result.tweets.map((tweet) =>
                this.mapTweet(tweet, likedSet.has(tweet._id.toString()))
            ),
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

    async getTweetsForFeed(page: number, currentUserId: string): Promise<TweetPage> {
        const normalizedPage = this.normalizePage(page);
        const tweets = await tweetDao.getTweets(normalizedPage);

        return this.mapTweetPage(normalizedPage, tweets, currentUserId);
    }

    async getTweetsByUser(userId: string, page: number): Promise<TweetPage> {
        if (!ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        const normalizedPage = this.normalizePage(page);
        const tweets = await tweetDao.getTweetsByUserId(new ObjectId(userId), normalizedPage);

        return this.mapTweetPage(normalizedPage, tweets, userId);
    }
}

export default new TweetService();
