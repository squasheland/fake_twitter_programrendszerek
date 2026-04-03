import { Collection, ObjectId } from 'mongodb';
import Database from '../database/databse.js';
import type { Like } from '../model/Like.js';

class LikeDao {
    private get collection(): Collection<Like> {
        return Database.db.collection<Like>('likes');
    }

    async createLike(userId: ObjectId, tweetId: ObjectId): Promise<Like> {
        const like: Like = {
            _id: new ObjectId(),
            userId,
            tweetId,
            commentId: null,
            createdAt: new Date(),
        };
        await this.collection.insertOne(like);
        return like;
    }

    async deleteLike(userId: ObjectId, tweetId: ObjectId): Promise<boolean> {
        const result = await this.collection.deleteOne({ userId, tweetId });
        return result.deletedCount === 1;
    }

    async findLike(userId: ObjectId, tweetId: ObjectId): Promise<Like | null> {
        return await this.collection.findOne({ userId, tweetId });
    }

    async getLikedTweetIds(userId: ObjectId, tweetIds: ObjectId[]): Promise<Set<string>> {
        const likes = await this.collection
            .find({ userId, tweetId: { $in: tweetIds } })
            .toArray();
        return new Set(likes.map((like) => like.tweetId!.toString()));
    }
}

export default new LikeDao();
