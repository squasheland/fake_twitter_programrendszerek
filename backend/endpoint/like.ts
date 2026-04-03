import type { AuthRequest } from '../middleware/authMiddleware.js';
import express, { type Response } from 'express';
import likeService from '../service/likeService.js';

const router = express.Router();

router.post('/tweet/:tweetId', async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const tweetId = req.params['tweetId'];
    if (typeof tweetId !== 'string') {
        res.status(400).json({ message: 'Tweet ID must be provided' });
        return;
    }

    try {
        const result = await likeService.handleLike(userId, tweetId);
        res.status(200).json(result);
    } catch (error) {
        const message = (error as Error).message;
        if (message === 'Invalid tweet ID' || message === 'Tweet not found' || message === 'Like not found') {
            res.status(400).json({ message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

export default router;
