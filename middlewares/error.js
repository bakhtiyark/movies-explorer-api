module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({ message: statusCode === 500 ? 'Внутренняя ошибка сервера' : message });

  next();
});
