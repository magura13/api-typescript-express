import express from 'express';
import { DbConnection } from './database/dbConnect';
import userRoute from './routes/userRoutes';
import signinRoute from './routes/signInRoute';

const app = express();
const port = 8000;
const dbConnection = DbConnection.getInstance();

app.use('/user', userRoute);
app.use('/signin', signinRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port http://localhost${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error);
  });
