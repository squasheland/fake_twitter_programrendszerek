import type { TweetResponse } from './TweetResponse.js';

export interface TweetPage {
    tweets: TweetResponse[];
    hasMore: boolean;
    page: number;
}
