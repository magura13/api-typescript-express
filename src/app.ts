import express from 'express';
import { DbConnection } from './database/dbConnect';
import userRoute from './routes/userRoutes';
import signinRoute from './routes/signInRoute';
import forumPostRoute from './routes/forumPostRoutes';
import commentsRoute from './routes/commentsRoutes'
import likeRoutes from './routes/likeRoutes'
import cors from 'cors';

export const app = express();
const port = 8000;
const dbConnection = DbConnection.getInstance();

app.use(cors({origin:'*'}));

app.use(express.json());

app.use('/user', userRoute);
app.use('/signin', signinRoute);
app.use('/forumpost', forumPostRoute);
app.use('/comments', commentsRoute);
app.use('/like',likeRoutes )

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