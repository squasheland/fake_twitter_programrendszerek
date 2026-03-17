import bcrypt from 'bcryptjs';
import type { User } from '../model/User.js';
import userDao from '../dao/userDao.js';
import jwt from 'jsonwebtoken';

class AuthService {
    async registerUser(username: string, email: string, password: string, displayName: string): Promise<User> {
        try {
                const existingUser = await userDao.findUserByEmail(email) || await userDao.findUserByUsername(username);
                if (existingUser) {
                    throw new Error('User already exists');
                }
        
                const saltRounds = 10;
                const passwordHash = await bcrypt.hash(password, saltRounds);
        
                const newUser = await userDao.createUser({
                    username,
                    passwordHash,
                    email,
                    displayName,
                    role: 'user',
                    bio: '',
                    pfp: '',
                    followersCount: 0,
                    followingCount: 0,
                    tweetCount: 0,
                    isSuspended: false,
                });
        
                return newUser;
            } catch (error) {
                console.error('Registration error:', error);
                throw new Error('Internal server error');
            }
    }

    async login(identifier: string, password: string): Promise<string> {
        try {
            const user = await userDao.findUserByEmail(identifier) || await userDao.findUserByUsername(identifier);
            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign(
                { id: user._id, username: user.username, email: user.email, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
            );

            return token;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Internal server error');
        }
    }
}

export default new AuthService();