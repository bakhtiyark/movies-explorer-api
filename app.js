require('dotenv').config();
// Модули
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// Константы и утилиты
const limiter = require('./utils/limiter');
const { PORT, dbMovies } = require('./utils/config');

// Middlewares

const errorHandler = require('./middlewares/error');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Роуты
const routes = require('./routes');

// const NotFound = require('./errors/NotFound');

// Подключение базы данных
mongoose.connect(dbMovies);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(helmet());
app.use(cors);

app.use(limiter);

// Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
