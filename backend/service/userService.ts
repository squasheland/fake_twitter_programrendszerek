import { ObjectId } from 'mongodb';
import userDao from '../dao/userDao.js';
import type { UserResponse } from '../../common/user/UserResponse.js';
import type { User } from '../model/User.js';
import BackendError from '../error/backendError.js';

class UserService {
    private mapUser(user: User): UserResponse {
        return {
            id: user._id.toHexString(),
            username: user.username,
            displayName: user.displayName,
            bio: user.bio,
            pfp: user.pfp,
            followersCount: user.followersCount,
            followingCount: user.followingCount,
            tweetCount: user.tweetCount,
        };
    }

    async getUserProfile(username: string): Promise<UserResponse> {
        const user = await userDao.findUserByUsername(username);
        if (!user) {
            throw new BackendError('User not found', 404);
        }

        return this.mapUser(user);
    }
}

export default new UserService();
