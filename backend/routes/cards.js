const cardRoutes = require('express').Router();
const {
  getCards,
  postNewCard,
  deleteCard,
  putLikeOnCard,
  deleteLikeFromCard,
} = require('../controllers/cards');
const { cardValidation, IdValidation } = require('../middlewares/validation');

// Получение всех карточек
cardRoutes.get('/cards', getCards);

// Cоздание новой карточки
cardRoutes.post('/cards', cardValidation, postNewCard);

// Удаление карточки по идентификатору
cardRoutes.delete('/cards/:cardId', IdValidation('cardId'), deleteCard);

// Лайк карточке по идентификатору
cardRoutes.put('/cards/:cardId/likes', IdValidation('cardId'), putLikeOnCard);

// Удаление лайка с карточки по идентификатору /:cardId/likes
cardRoutes.delete('/cards/:cardId/likes', IdValidation('cardId'), deleteLikeFromCard);

module.exports = cardRoutes;
