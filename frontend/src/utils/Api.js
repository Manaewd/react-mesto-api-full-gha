export class Api {
  constructor({ url, headers, credentials }) {
      this._url = url;
      this._headers = headers;
      this._credentials = credentials;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Что-то пошло не так... Ошибка: ${res.status}`);
      }
    }

  // Метод запроса данных пользователя с сервера
  getUserInfo() {
      return fetch(`${this._url}/users/me`, {
          headers: this._headers,
          credentials: 'include',
      })
      .then(res => this._checkResponse(res));
  }

  // Метот передачи данных пользователя на сервер
  setUserInfo({ data }) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }) 
      })
      .then(res => this._checkResponse(res))
    }
  
  // метод запроса данных карточек с сервера
  getInitialCards() {
      return fetch(`${this._url}/cards`, {
          headers: this._headers,
          credentials: 'include',
      })
      .then(res => this._checkResponse(res));
  }

    // Метод передачи на сервер новых данных о пользователе 
  setUserAvatar( avatar ) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    credentials: 'include',
    headers: this._headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(res => this._checkResponse(res));
  }

  // Метод передачи на сервер новых данных о пользователе 
  addNewCard( name, link ) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({
              name,
              link
          })
      })
      .then(res => this._checkResponse(res));
  }

  // Метод удаления карточки с сервера
  deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      }).then(res => this._checkResponse(res));
    }
  
  // Метод отправки данных об установке/снятии лайка на сервер
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers,
      }).then(res => this._checkResponse(res));
    } else {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        }).then(res => this._checkResponse(res));
    }
  }
}

const api = new Api({
url: 'http://localhost:3001',
credentials: 'include',
headers: {
  'Content-Type': 'application/json'
}
});


export default api