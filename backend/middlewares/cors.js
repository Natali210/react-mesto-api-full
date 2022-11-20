// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://nsarycheva.nomoredomains.club',
  'https://nsarycheva.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];

const cors = (req, res, next) => {
  // Простой cors: устанавливаем заголовок, разрешающий запросы для проверенных источников
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  // Cors с предварительным запросом
  // Сохраняем тип запроса (HTTP-метод) в переменную
  const { method } = req;
  // Разрешаем все типы запросов
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // Сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];

  // Разрешаем кросс-доменные запросы любых типов
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = cors;
