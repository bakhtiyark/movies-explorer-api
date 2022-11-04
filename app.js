require('dotenv').config();
// Модули
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors, Joi } = require('celebrate');
const bodyParser = require('body-parser');

// Константы
const { login, createUser } = require('./controllers/users');

// Middlewares

const errorHandler = require('./middlewares/error');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

// Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// signin
app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

// reg
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
