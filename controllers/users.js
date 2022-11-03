// Модули
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// env
const { JWT_SECRET, NODE_ENV } = process.env;

// Ошибки
const AuthorizationError = require('../errors/AuthorizationError');
const NotFound = require('../errors/NotFound');
const ValidationError = require('../errors/ValidationError');
const RegisteredError = require('../errors/RegisteredError');

// Коды
const { SALT } = require('../utils/constants');

// Создание юзера
const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, SALT)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .then(({
          name, _id, createdAt, email,
        }) => res.send({
          name,
          _id,
          createdAt,
          email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new RegisteredError('Пользователь уже зарегистрирован'));
          } else if (err.name === 'ValidationError') {
            next(new ValidationError('Неверный логин или пароль'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// GET ME
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Обновление данных пользователя
const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  const ownerId = req.user._id;
  User.findByIdAndUpdate(
    ownerId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Логин
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError('Неверный логин или пароль'));
      }
      return bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return next(new AuthorizationError('Неверный логин или пароль'));
        }
        const token = jwt.sign(
          { _id: user._id },
          `${NODE_ENV === 'production' ? JWT_SECRET : 'placeholder'}`,
          { expiresIn: '7d' },
        );
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  patchUser,
  login,
  getCurrentUser,
};
