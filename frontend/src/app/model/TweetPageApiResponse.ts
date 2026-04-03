import type { TweetApiResponse } from './TweetApiResponse';

export interface TweetPageApiResponse {
    tweets: TweetApiResponse[];
    hasMore: boolean;
    page: number;
}
