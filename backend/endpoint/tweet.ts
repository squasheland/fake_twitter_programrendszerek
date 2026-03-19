import type { AuthRequest } from '../middleware/authMiddleware.js';
import authService from '../service/authService.js';
import { body, validationResult } from 'express-validator';
import express, { type Request, type Response } from 'express';
import tweetService from '../service/tweetService.js';


const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
});

router.post('/create', async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const content = req.body.content;
    console.log('In creating new tweet');
    try {
        const newTweet = await tweetService.createTweet(userId, content);
        res.status(201).json(newTweet);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

router.get('/:userId', async (req: Request, res: Response): Promise<void> => {
});


export default router;