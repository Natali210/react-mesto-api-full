class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Ответ в промисах различных методов в зависимости от наличия ошибки
  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    throw Promise.reject(`Ошибка: ${res.status}`);
  }

  //Метод, который вернет информацию о пользователе
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  //Метод, который сохранит измененные данные о пользователе
  setProfileInfo(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, который сохранит измененные данные о пользователе
  addNewAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, который вернет карточки
  getCards(){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  //Метод, добавляющий карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, удаляющий карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  changeLikeCardStatus(card, isLiked) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
        method: isLiked? 'PUT' : 'DELETE',
        credentials: 'include',
        headers:this._headers,
    }) 
    .then(this._getJsonOrError);
}}

export const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});