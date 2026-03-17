import { Collection, ObjectId } from 'mongodb';
import Database from '../database/databse.js';
import type { User } from '../model/User.js';

class UserDao {
    private get collection(): Collection<User> {
        return Database.db.collection<User>('users');
    }

    async createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const now = new Date();
        const user: User = {
            ...userData,
            _id: new ObjectId(),
            createdAt: now,
            updatedAt: now,
        };
        await this.collection.insertOne(user);
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.collection.findOne({ email });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.collection.findOne({ username });
    }

    async findUserById(id: ObjectId): Promise<User | null> {
        return await this.collection.findOne({ _id: id });
    }
}

export default new UserDao();