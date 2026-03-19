import { authenticateToken } from './middleware/authMiddleware.js';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import Database from './database/databse.js';
import authRoutes from './endpoint/auth.js';
import userRoutes from './endpoint/user.js';
import tweetRoutes from './endpoint/tweet.js';

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authenticateToken, userRoutes);
app.use('/api/tweet', authenticateToken, tweetRoutes);

async function startServer() {
  await Database.init();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();