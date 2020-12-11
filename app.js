const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index.js');
const { handlerErrors } = require('./middlewares/handler-error');
const { DB_URL, DB_OPTIONS, PORT } = require('./configs/index');
const limiter = require('./middlewares/rate-limit');

const app = express();

mongoose.connect(DB_URL, DB_OPTIONS);

app.use(limiter);
app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port localhost:${PORT}`);
});
