import type { AuthRequest } from '../middleware/authMiddleware.js';
import express, { type Request, type Response } from 'express';
import tweetService from '../service/tweetService.js';

const router = express.Router();

const parseRouteParam = (value: string | string[] | undefined, fieldName: string): string => {
    if (typeof value !== 'string') {
        throw new Error(fieldName + ' must be provided');
    }

    return value;
};

const parsePage = (pageParam: string | string[] | undefined): number => {
    return Number.parseInt(parseRouteParam(pageParam, 'Page'), 10);
};

router.get('/:page', async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parsePage(req.params.page);
        const tweets = await tweetService.getTweetsForFeed(page);
        res.status(200).json(tweets);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

router.post('/create', async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const content = req.body.content;

    try {
        const newTweet = await tweetService.createTweet(userId, content);
        res.status(201).json(newTweet);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

router.get('/user/:userId/:page', async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseRouteParam(req.params.userId, 'User ID');
        const page = parsePage(req.params.page);
        const tweets = await tweetService.getTweetsByUser(userId, page);
        res.status(200).json(tweets);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

router.get('/user/:userId', async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseRouteParam(req.params.userId, 'User ID');
        const tweets = await tweetService.getTweetsByUser(userId, 1);
        res.status(200).json(tweets);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

export default router;
