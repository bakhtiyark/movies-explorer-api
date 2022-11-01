//  Импорт модели
const Movie = require('../models/movie');

// Ошибки
const NotFound = require('../errors/NotFound');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');

//  Создание тайла с фильмов
const createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Movie.create({ name, link, owner: ownerId })
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм с указанным _id не найден.');
      }
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

//  Получить все фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

//  Удалить карточку
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFound('Фильм не найдена'))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        movie.delete()
          .then(() => res.status(200).json({ message: 'Фильм удален' }))
          .catch(next);
      } else { throw new UnauthorizedError('Удалять можно только свои карты.'); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Некорректный ID'));
      } else {
        next(err);
      }
    });
};

// Поставить лайк карточке
const likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => { throw new NotFound('Фильм с указанным ID не найден'); })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Фильм с указанным ID не найден'));
      } else {
        next(err);
      }
    });
};
// Удаления лайка с карты
const removeLike = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => { throw new NotFound('Фильм с указанным ID не найден'); })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Фильм с указанным ID не найден'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  likeMovie,
  removeLike,
};
