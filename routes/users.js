const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');

// Получение данных текущего
router.get('/me', getCurrentUser);

// Обновление данных пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

module.exports = router;
