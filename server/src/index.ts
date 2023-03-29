import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';

import sequelize from './db';
import errorHandler from './middleware/ErrorHandlerMiddleware';
import router from './routes/index';
import getDirName from './utils/getDirName';

const __dirname = getDirName(import.meta.url);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler); // must be in the last 'app.use' (last middleware)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
