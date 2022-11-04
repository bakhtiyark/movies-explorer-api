const router = require('express').Router();

const auth = require('../middlewares/auth');

const NotFound = require('../errors/NotFound');

// Авторизация

router.use(auth);

// Роутинг

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

// Заглушка
router.use('/*', (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

module.exports = router;
