import express from 'express';
import { DbConnection } from './database/dbConnect';
import userRoute from './routes/userRoutes';
import signinRoute from './routes/signInRoute';
import forumPostRoute from './routes/forumPostRoutes';
import commentsRoute from './routes/commentsRoutes'
import likeRoutes from './routes/likeRoutes'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import s3Router from './routes/s3Routes';

export const app = express();
export const port = 3001;
const dbConnection = DbConnection.getInstance();

const corsOptions = {
  origin: ['http://localhost:3000'], // Allow only this origin
  credentials: true, // Allow credentials (cookies, authentication, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())

app.use('/user', userRoute);
app.use('/signin', signinRoute);
app.use('/forumpost', forumPostRoute);
app.use('/comments', commentsRoute);
app.use('/like',likeRoutes )
app.use('/api/s3', s3Router)

dbConnection
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`)
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error);
  });

  module.exports = app