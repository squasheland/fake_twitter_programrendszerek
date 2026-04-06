import express, { type Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import userService from '../service/userService.js';

const router = express.Router();

router.get('/:username', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const username = req.params['username'];
        if (typeof username !== 'string') {
            res.status(400).json({ message: 'Username is required' });
            return;
        }
        const profile = await userService.getUserProfile(username);
        res.status(200).json(profile);
    } catch (error: unknown) {
        const err = error as { statusCode?: number; message?: string };
        res.status(err.statusCode ?? 500).json({ message: err.message ?? 'Internal server error' });
    }
});

export default router;
