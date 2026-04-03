import { ObjectId, MongoServerError } from 'mongodb';
import likeDao from '../dao/likeDao.js';
import tweetDao from '../dao/tweetDao.js';

export interface LikeResponse {
    tweetId: string;
    isLiked: boolean;
    likesCount: number;
}

class LikeService {
    async handleLike(userId: string, tweetId: string): Promise<LikeResponse> {
        if (!ObjectId.isValid(tweetId)) {
            throw new Error('Invalid tweet ID');
        }

        const userObjectId = new ObjectId(userId);
        const tweetObjectId = new ObjectId(tweetId);

        const existingLike = await likeDao.findLike(userObjectId, tweetObjectId);

        if (!existingLike) {
            return this.addLike(userObjectId, tweetObjectId, tweetId);
        } else {
            return this.removeLike(userObjectId, tweetObjectId, tweetId);
        }
    }

    private async addLike(userObjectId: ObjectId, tweetObjectId: ObjectId, tweetId: string): Promise<LikeResponse> {
        try {
            await likeDao.createLike(userObjectId, tweetObjectId);
        } catch (error) {
            if (error instanceof MongoServerError && error.code === 11000) {
                // Race condition: already liked — fall through to unlike
                return this.removeLike(userObjectId, tweetObjectId, tweetId);
            }
            throw error;
        }

        const tweet = await tweetDao.updateLikesCount(tweetObjectId, 1);
        if (!tweet) {
            await likeDao.deleteLike(userObjectId, tweetObjectId);
            throw new Error('Tweet not found');
        }

        return { tweetId, isLiked: true, likesCount: tweet.likesCount };
    }

    private async removeLike(userObjectId: ObjectId, tweetObjectId: ObjectId, tweetId: string): Promise<LikeResponse> {
        const deleted = await likeDao.deleteLike(userObjectId, tweetObjectId);
        if (!deleted) {
            throw new Error('Like not found');
        }

        const tweet = await tweetDao.updateLikesCount(tweetObjectId, -1);

        return {
            tweetId,
            isLiked: false,
            likesCount: tweet?.likesCount ?? 0,
        };
    }
}

export default new LikeService();
