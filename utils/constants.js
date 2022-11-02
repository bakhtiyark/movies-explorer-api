// Error codes
const NOT_FOUND = 404;
const UNAUTHORIZED_ERROR = 403;
const REGISTERED_ERROR = 409;
const INCORRECT_DATA = 400;
const SERVER_ERROR = 500;

// Regex
const REGEXURL = /^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/;

// bcrypt-linked
const SALT = 10;

module.exports = {
  NOT_FOUND,
  INCORRECT_DATA,
  SERVER_ERROR,
  REGISTERED_ERROR,
  UNAUTHORIZED_ERROR,
  REGEXURL,
  SALT
};
