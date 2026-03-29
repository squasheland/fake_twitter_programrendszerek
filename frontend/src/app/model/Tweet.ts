export interface Tweet {
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

export interface TweetPage {
    tweets: Tweet[];
    hasMore: boolean;
    page: number;
}

export interface TweetApiResponse {
    id: string;
    userId: string;
    media: string[] | null;
    content: string;
    likesCount: number;
    retweetCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string | null;
    isDeleted: boolean;
}

export interface TweetPageApiResponse {
    tweets: TweetApiResponse[];
    hasMore: boolean;
    page: number;
}
