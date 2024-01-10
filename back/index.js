import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postsRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/posts', postsRoutes);
app.use('/user', userRoutes);

const PORT = process.env.SERVER_PORT || 5001;

console.log('process.env.SERVER_PORT', process.env.SERVER_PORT);
console.log(
  'process.env.MONGODB_CONNECTION_URL',
  process.env.MONGODB_CONNECTION_URL,
);
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected successfully');
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
