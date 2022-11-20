export const BASE_URL = 'https://api.nsarycheva.nomoredomains.club';

function request({ url, method = "POST", token, data }) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
    mode: 'cors',
  }).then((res) => {
      return res.json();
  });
}

// Регистрация
export const register = (email, password ) => {
  return request({
    url: "/signup",
    data: { email, password },
  });
};

// Авторизация
export const authorize = (email, password) => {
  return request({
    url: "/signin",
    data: { email, password },
  });
};

// Проверка токена и получение данных пользователя
export const getContent = (token) => {
  return request({
    url: "/users/me",
    method: "GET",
    token,
  });
};

// Выход
export const logout = () => {
  return request({
    url: '/logout',
  });
};