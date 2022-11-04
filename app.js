require('dotenv').config();
// Модули
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

// Константы и утилиты
const limiter = require('./utils/limiter');

// Middlewares

const errorHandler = require('./middlewares/error');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Роуты
const routes = require('./routes');

// Порт
const { PORT = 3000 } = process.env;

// const NotFound = require('./errors/NotFound');

// Подключение базы данных
mongoose.connect('mongodb://localhost:27017/moviesdb');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

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
