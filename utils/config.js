const {
  dbMovies = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const allowedCors = ['http://localhost:3000',
  'http://api.moviesexplorerbk.nomoredomains.icu',
  'http://moviesexplorerbk.nomoredomains.icu',
  'https://api.moviesexplorerbk.nomoredomains.icu',
  'https://moviesexplorerbk.nomoredomains.icu'];

module.exports = {
  dbMovies, PORT, NODE_ENV, JWT_SECRET, allowedCors,
};
