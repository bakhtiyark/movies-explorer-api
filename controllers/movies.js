//  Импорт модели
const Movie = require('../models/movie');

// Ошибки
const NotFound = require('../errors/NotFound');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');
const { errorMessages } = require('../utils/constants');

//  Создание тайла с фильмом
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: ownerId,
    movieId,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFound(errorMessages.movieNotFound);
      }
      res.send({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        owner: movie.ownerId,
        movieId: movie._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorMessages.dataInvalid));
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

//  Удалить тайл с фильмом
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFound(errorMessages.movieNotFound))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        movie
          .delete()
          .then(() => res.status(200).json({ message: 'Фильм удален' }))
          .catch(next);
      } else {
        throw new UnauthorizedError(errorMessages.unauthorizedDeletion);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound(errorMessages.idInvalid));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
