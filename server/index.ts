require('dotenv').config();
const express = require('express');
const sequelize = require('./src/db');
const models = require('./src/models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./src/routes/index');
const errorHandler = require('./src/middleware/ErrorHandlingMiddleware');
const { application } = require('express');
const path = require('path');

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
