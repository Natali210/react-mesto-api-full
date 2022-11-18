const router = require('express').Router();
const {
  getUsers,
  getUserById,
  changeUserInfo,
  changeUserAvatar,
  currentUser,
} = require('../controllers/users');
const { IdValidation, profileValidation, avatarValidation } = require('../middlewares/validation');

// Получение всех пользователей
router.get('/users', getUsers);

// Получение информации о пользователе
router.get('/users/me', currentUser);

// Получение пользователя по _id
router.get('/users/:userId', IdValidation('userId'), getUserById);

// Обновление профиля пользователя
router.patch('/users/me', profileValidation, changeUserInfo);

// Обновление аватара пользователя
router.patch('/users/me/avatar', avatarValidation, changeUserAvatar);

module.exports = router;
