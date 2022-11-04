const router = require('express').Router();

const { validatePatchUser } = require('../middlewares/validators');

const { getCurrentUser, patchUser } = require('../controllers/users');

// GET Получение данных текущего пользователя
router.get('/me', getCurrentUser);

// PATCH Обновление данных пользователя
router.patch('/me', validatePatchUser, patchUser);

module.exports = router;
