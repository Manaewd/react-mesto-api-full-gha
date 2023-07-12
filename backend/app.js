require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./errors/error-handler');

const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGO, {
  useNewUrlParser: true,
});

app.use(express.json()); // входящие запросы переводит в JSON
app.use(cookieParser()); // подключаем парсер cookie (для извлечения данных из куков)
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
