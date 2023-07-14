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
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
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
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(res => this._checkResponse(res))
    };
        
  }


const auth = new Auth({
  url: 'http://localhost:3000',
  credentials: 'include'
});


export default auth