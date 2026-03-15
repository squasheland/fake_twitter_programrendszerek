import express, { type Request, type Response } from 'express';
import Database from './database/databse.js';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

async function startServer() {
  await Database.init();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();