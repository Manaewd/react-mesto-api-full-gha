const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Слишком короткое имя'],
    maxlength: [30, 'Слишком длинное имя'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Слишком мало символов'],
    maxlength: [30, 'Слишком много символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Обязательно для заполненения'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный адрес почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательно для заполненения'],
    select: false,
  },
}, { versionKey: false });

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
