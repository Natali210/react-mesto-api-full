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
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  //Метод, который сохранит измененные данные о пользователе
  setProfileInfo(data){
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
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
      credentials: 'include',
      method: 'PATCH',
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
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  //Метод, добавляющий карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'POST',
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
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  changeLikeCardStatus(card, isLiked) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
        method: isLiked? 'PUT' : 'DELETE',
        headers:this._headers,
        credentials: 'include',
    }) 
    .then(this._getJsonOrError);
}

/* Метод, собирающий лайки
  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getJsonOrError);
  }

  //Метод, удаляющий лайк
  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getJsonOrError);
  }

  changeLikeCardStatus(card, isLiked) {
    return isLiked ? this.putLike(card._id) : this.removeLike(card._id)} */
}

export const api = new Api({
  baseUrl: 'http://localhost:3001',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});