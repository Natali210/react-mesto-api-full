const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { MONGO_DB_CODE } = require('../utils/constants');
const RequestError = require('../errors/RequestError');
const RepeatingDataError = require('../errors/RepeatingDataError');
const NotFoundError = require('../errors/NotFoundError');

// Создание пользователя
const createNewUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // eslint-disable-next-line no-unused-vars
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword, // хеш записан в базу
    });
    return res.status(201).send({
      data: {
        name, about, avatar, email,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new RequestError('Некорректные данные пользователя'));
    }
    if (err.code === MONGO_DB_CODE) {
      return next(new RepeatingDataError('Такой пользователь уже существует'));
    }
    return next(err);
  }
};

// Получение списка пользователей
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

// Получение пользователя по его _id
const getUserById = async (req, res, next) => {
  try {
    const selectedUser = await User.findById(req.params.userId)
      .orFail(new NotFoundError('Пользователь c данным _id не найден'));
    return res.send(selectedUser);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Указан некорректный _id'));
    }
    return next(err);
  }
};

// Обновление информации о пользователе - проверка, что пользователь есть + обновление информации
const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

// Обновление информации о пользователе - проверка, что пользователь есть + обновление информации
const changeUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    // eslint-disable-next-line max-len
    const changedProfile = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .orFail(new NotFoundError('Пользователь c данным _id не найден'));
    return res.send(changedProfile);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new RequestError('Некорректные данные для обновления профиля'));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Указан некорректный _id'));
    }
    return next(err);
  }
};

// Обновление аватара пользователя
const changeUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    // eslint-disable-next-line max-len
    const changedAvatar = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .orFail(new NotFoundError('Пользователь c данным _id не найден'));
    return res.send(changedAvatar);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Указан некорректный _id'));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new RequestError('Некорректные данные для обновления профиля'));
    }
    return next(err);
  }
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  currentUser,
  changeUserInfo,
  changeUserAvatar,
};
