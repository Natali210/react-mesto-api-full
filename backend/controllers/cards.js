const mongoose = require('mongoose');
const Card = require('../models/card');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');

// Получение карточек
const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

// Создание новой карточки
const postNewCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new RequestError('Некорректные данные карточки'));
    }
    return next(err);
  }
};

// Удаление карточки
const deleteCard = async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    const card = await Card.findById(req.params.cardId)
      .orFail(new NotFoundError('Карточка c данным _id не найдена'));
    if (card.owner.toString() !== req.user._id) {
      return next(new NoRightsError('Карточка принадлежит другому пользователю'));
    }
    const cardToDelete = await Card.findByIdAndRemove(req.params.cardId);
    return res.send(cardToDelete);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Некорректные данные карточки'));
    }
    return next(err);
  }
};

// Лайк на карточке
const putLikeOnCard = async (req, res, next) => {
  try {
    const likeOnCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).orFail(new NotFoundError('Карточка c данным _id не найдена'));
    return res.send(likeOnCard);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Некорректные данные карточки'));
    }
    return next(err);
  }
};

// Удаление лайка с карточки
const deleteLikeFromCard = async (req, res, next) => {
  try {
    const dislikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).orFail(new NotFoundError('Карточка c данным _id не найдена'));
    return res.send(dislikeCard);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Некорректные данные карточки'));
    }
    return next(err);
  }
};

module.exports = {
  getCards,
  postNewCard,
  deleteCard,
  putLikeOnCard,
  deleteLikeFromCard,
};
