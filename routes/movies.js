const router = require('express').Router();

const { validatePostMovie, validateDeleteMovie } = require('../middlewares/validators');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

// GET Получение данных всех фильмов
router.get('/', getMovies);

// POST Создание карточки
router.post('/', validatePostMovie, createMovie);

// DELETE Удаление фильма
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
