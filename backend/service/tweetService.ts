import type { Tweet } from '../model/Tweet.js';
import tweetDao from '../dao/tweetDao.js';
import { ObjectId } from 'mongodb';


class TweetService {
    async createTweet(userId: string | undefined | null, content: string): Promise<Tweet> {
        if(!userId) {
            throw new Error('User ID is required to post a tweet');
        }

        if(!content) {
            throw new Error('Content is required to post a tweet');
        }

        return await tweetDao.createTweet(new ObjectId(userId), content);
    }
}

export default new TweetService();