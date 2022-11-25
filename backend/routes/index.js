const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createNewUser } = require('../controllers/users');
const { login, logout } = require('../controllers/login');
const { auth } = require('../middlewares/auth');
const { newUserValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

// Роуты, которым авторизация не нужна
router.post('/signin', loginValidation, login);
router.post('/signup', newUserValidation, createNewUser);
router.post('/logout', logout);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

// Авторизация для всех других страниц приложения
router.use(auth);

// Применяем маршруты как мидлвэры
router.use(userRoutes);
router.use(cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
