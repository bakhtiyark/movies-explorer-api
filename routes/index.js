const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateRegistration, validateLogin } = require('../middlewares/validators');

const NotFound = require('../errors/NotFound');

const { login, createUser } = require('../controllers/users');

// Login
router.post('/signin', validateLogin, login);

// Registration
router.post('/signup', validateRegistration, createUser);

// Защищенные маршруты

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

// Заглушка
router.use('/*', (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

module.exports = router;
