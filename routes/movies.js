const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexpLink } = require('../utils/constants');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

// Получение данных всех карточек
router.get('/', getMovies);

// Создание карточки
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().min(2).max(30).required(),
    image: Joi.string().required(true).pattern(regexpLink),
    trailer: Joi.string().required(true).pattern(regexpLink),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
    thumbnail: Joi.string().required(true).pattern(regexpLink),
    movieId: Joi.string().hex().required(true)
  }),
}), createMovie);

// Удаление фильма
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
