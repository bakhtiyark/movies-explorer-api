const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateRegistration, validateLogin } = require('../middlewares/validators');

const NotFound = require('../errors/NotFound');

const { login, createUser } = require('../controllers/users');
const { errorMessages } = require('../utils/constants');

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
  next(new NotFound(errorMessages.pageNotFound));
});

module.exports = router;
