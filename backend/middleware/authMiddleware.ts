import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface AuthRequest extends Request {
    user?: {
        id: ObjectId;
        username: string;
        email: string;
        role: 'user' | 'admin';
    };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access token required' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid or expired token' });
            return;
        }

        req.user = decoded as NonNullable<AuthRequest['user']>;
        next();
    });
};