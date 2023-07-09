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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        })
      })
      .then(res => this._checkResponse(res))
    }
    
    checkToken(token) {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(res => this._checkResponse(res))
    };
        
  }


const auth = new Auth({
url: 'https://auth.nomoreparties.co'
});


export default auth