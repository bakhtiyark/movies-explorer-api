// Error codes
const NOT_FOUND = 404;
const UNAUTHORIZED_ERROR = 403;
const REGISTERED_ERROR = 409;
const INCORRECT_DATA = 400;
const SERVER_ERROR = 500;

const errorMessages = {
  userNotFound: 'Пользователь не найден',
  movieNotFound: 'Фильм с указанным _id не найден.',
  dataInvalid: 'Переданы некорректные данные',
  unauthorizedDeletion: 'Удалять можно только свои карты.',
  idInvalid: 'Некорректный ID',
  loginErr: 'Неверный логин или пароль',
  dejaEn: 'Пользователь уже зарегистрирован',
  emailConflict: 'Email уже используется',
  authErr: 'Необходима авторизация',
  serverErr: 'Внутренняя ошибка сервера',
  pageNotFound: 'Запрашиваемая страница не найдена',
};

const statusMessages = {
  movieDeleted: 'Файл удален',
  serverCrash: 'Сервер сейчас упадёт',
};

const MONGO_DUPLICATE_KEY_ERROR = 11000;
// Regex
const REGEXURL = /^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/;

/*
const REGEXCYRILLIC = /[\а-я\sё]/gi
*/

// bcrypt-linked
const SALT = 10;

module.exports = {
  NOT_FOUND,
  INCORRECT_DATA,
  SERVER_ERROR,
  REGISTERED_ERROR,
  UNAUTHORIZED_ERROR,
  MONGO_DUPLICATE_KEY_ERROR,
  REGEXURL,
  SALT,
  errorMessages,
  statusMessages,
};
