require('dotenv').config();
// Модули
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

// Константы и утилиты
const { login, createUser } = require('./controllers/users');
const limiter = require('./utils/limiter');

// Middlewares

const errorHandler = require('./middlewares/error');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { validateLogin, validateRegistration } = require('./middlewares/validators');

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

app.use('/', routes);
// signin
app.use(requestLogger);

app.post('/signin', validateLogin, login);

// reg
app.post('/signup', validateRegistration, createUser);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
