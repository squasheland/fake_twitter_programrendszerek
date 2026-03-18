import bcrypt from 'bcryptjs';
import type { User } from '../model/User.js';
import userDao from '../dao/userDao.js';
import jwt from 'jsonwebtoken';
import AuthError from '../error/authError.js';
import AuthEnum from '../enum/authEnum.js';

class AuthService {
    async registerUser(username: string, email: string, password: string, displayName: string): Promise<User> {
            const existingUser = await userDao.findUserByEmail(email) || await userDao.findUserByUsername(username);
            if (existingUser) { //TODO: would be better to give back both errors if both email and username are taken
                if(existingUser.email === email) {
                    throw new AuthError(AuthEnum.EMAIL_IN_USE);
                } else if(existingUser.username === username) {
                    throw new AuthError(AuthEnum.USERNAME_IN_USE);
                }
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
    }

    async login(identifier: string, password: string): Promise<string> {
        const user = await userDao.findUserByEmail(identifier) || await userDao.findUserByUsername(identifier);
        if (!user) {
            throw new AuthError(AuthEnum.INVALID_CREDENTIALS);
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new AuthError(AuthEnum.INVALID_CREDENTIALS);
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return token;
}
}

export default new AuthService();