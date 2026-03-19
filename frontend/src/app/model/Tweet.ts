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
