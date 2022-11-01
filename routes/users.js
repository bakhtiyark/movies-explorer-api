const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');

// GET Получение данных текущего пользователя
router.get('/me', getCurrentUser);

// PATCH Обновление данных пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

module.exports = router;
