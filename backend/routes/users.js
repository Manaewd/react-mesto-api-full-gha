const router = require('express').Router();
const { validateUserID, validationUpdateUser, validationUpdateAvatarUser } = require('../middlewares/validate');
const {
  getUsers, getUserById, getUserInfo, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateUserID, getUserById);
router.patch('/me', validationUpdateUser, updateUserProfile);
router.patch('/me/avatar', validationUpdateAvatarUser, updateUserAvatar);

module.exports = router;
