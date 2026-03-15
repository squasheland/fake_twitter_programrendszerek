import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

class Database {
     static db: Db;
     static conn: MongoClient;

     static async init(): Promise<void> {
          try {
               this.conn = await client.connect();
               console.log('Connected successfully to server');
               this.db = this.conn.db(process.env.DB_NAME!);
          } catch (error) {
              console.error('Error connecting to MongoDB:', error);
               process.exit(1);
          }
     }
}

export default Database;