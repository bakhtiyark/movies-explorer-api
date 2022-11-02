const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEXURL } = require('../utils/constants');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

// GET Получение данных всех фильмов
router.get('/', getMovies);

// POST Создание карточки
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(REGEXURL),
      trailerLink: Joi.string().required().pattern(REGEXURL),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(REGEXURL),
    }),
  }),
  createMovie,
);

// DELETE Удаление фильма
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
