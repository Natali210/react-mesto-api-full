export const BASE_URL = "http://localhost:3001";

function request({ url, method = "POST", data, token }) {
  return fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    mode: 'cors',
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
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