import 'dotenv/config';

import path from 'path';

import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';

import { sequelize } from './db';
import { errorHandler } from './middleware/ErrorHandlingMiddleware';
import { router } from './routes/index';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
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
