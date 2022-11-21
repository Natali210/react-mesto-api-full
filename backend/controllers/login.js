/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, SECRET_JWT } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      return next(new AuthorizationError('Некорректный email или пароль'));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new AuthorizationError('Ошибка авторизации: некорректные данные'));
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_JWT : 'dev-secret', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7, sameSite: 'None', httpOnly: true, secure: true,
    }).send({ message: 'Успешная авторизация' });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt', { sameSite: 'None', secure: 'true' }).send();
};

module.exports = {
  login,
  logout,
};
