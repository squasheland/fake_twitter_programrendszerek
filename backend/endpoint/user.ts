import express, { type Request, type Response } from 'express';
import { authenticateToken, type AuthRequest } from '../middleware/authMiddleware.js';
import userService from '../service/authService.js';
import { ObjectId } from 'mongodb';
import { register } from 'node:module';

const router = express.Router();

router.get('/:userId', async (req: Request, res: Response): Promise<void> => {
});

export default router;