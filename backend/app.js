require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./errors/error-handler');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');

const { PORT = 3000, MONGO = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGO, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser()); // подключаем парсер cookie (для извлечения данных из куков)

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3001',
}));

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
