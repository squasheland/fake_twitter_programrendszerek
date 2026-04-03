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
    isLiked: boolean;
}
