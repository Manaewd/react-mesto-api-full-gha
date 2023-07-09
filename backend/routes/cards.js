const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCardID, validationCreateCard } = require('../middlewares/validate');

router.get('/', getCards);

router.post('/', validationCreateCard, createCard);

router.delete('/:cardId', validateCardID, deleteCard);

router.put('/:cardId/likes', validateCardID, likeCard);

router.delete('/:cardId/likes', validateCardID, dislikeCard);

module.exports = router;
