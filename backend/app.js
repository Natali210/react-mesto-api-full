require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

// Берем порт из переменных окружения
const { PORT = 3001, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

// Мидлвэр для cors
app.use(cors);

// Мидлвэр, чтобы распознавать json
app.use(express.json());

// Мидлвэр, чтобы извлекать данные из заголовка cookie
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // Отображаем в консоли, какой порт приложение слушает
  console.log(`Listening on port ${PORT}`);
});
