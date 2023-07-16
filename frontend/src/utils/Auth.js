class Auth {
  constructor({ url }) {
      this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Что-то пошло не так... Ошибка: ${res.status}`);
    }
  }

    register({ email, password }) {
      return fetch(`${this._url}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          password })
      })
      .then(res => this._checkResponse(res))
    }
    
    
    login({ email, password }) {
      return fetch(`${this._url}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        })
      })
      .then(res => this._checkResponse(res))
    }

    logout() {
      return fetch(`${this._url}/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => this._checkResponse(res))
    }
    
    checkToken() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => this._checkResponse(res))
    };
        
  }


const auth = new Auth({
url: 'https://api.manaewd.nomoredomains.work',
credentials: 'include',
});


export default auth