import express, { type Request, type Response } from 'express';
import { body, validationResult } from 'express-validator';
import authService from '../service/authService.js';

const router = express.Router();

router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('displayName').notEmpty().withMessage('Display name is required'),
], async (req: Request, res: Response): Promise<void> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, email, password, displayName } = req.body;

    try {
        const newUser = await authService.registerUser(username, email, password, displayName);
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error: any) {
        console.error('Registration error:', error);
        res.status(error.statusCode ?? 500).json({ message: error.message ?? 'Internal server error' });
    }
});

router.post('/login', [
    body('identifier').notEmpty().withMessage('Email or username is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { identifier, password } = req.body;

    try {
        const token = await authService.login(identifier, password);
        res.json({ message: 'Login successful', token });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(error.statusCode ?? 500).json({ message: error.message ?? 'Internal server error' });
    }
});

export default router;
