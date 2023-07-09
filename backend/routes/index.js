const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');
const { validateUserCreate, validationLogin } = require('../middlewares/validate');

router.post('/signin', validationLogin, login);
router.post('/signup', validateUserCreate, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Что-то пошло не так'));
});

module.exports = router;
