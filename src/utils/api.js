class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  customFetch(url, headers) {
    return fetch(url, headers)
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
  }

  getInitialCards() {
    const token = localStorage.getItem('token');
    return this.customFetch(`${this._baseUrl}/cards`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
    })
  }

  loadUserInfo() {
    const token = localStorage.getItem('token');
    return this.customFetch(`${this._baseUrl}/users/me`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
    })
  }

  createCard(data) {
    const token = localStorage.getItem('token');
    console.log(data, 'data');
    return this.customFetch(`${this._baseUrl}/cards`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
  }

  editProfile(name, about) {
    const token = localStorage.getItem('token');
    return this.customFetch(`${this._baseUrl}/users/me`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
      method: "PATCH",
      body: JSON.stringify({name, about})
    })
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return this.customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
      method: "DELETE",
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem('token');
    return this.customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
      method: isLiked ? "DELETE" : "PUT",
    })
  }

  disLikeCard(cardId) {
    const token = localStorage.getItem('token');
    return this.customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
      method: "DELETE",
    })
  }
  setUserAvatar(link) {
    const token = localStorage.getItem('token');
    return this.customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {...this._headers, authorization: `Bearer ${token}`},
      method: "PATCH",
      body: JSON.stringify({ avatar: link})
    })
  }
}

const api = new Api({
  /**baseUrl:"https://api.project15.strangled.net",*/
  baseUrl:"http://localhost:3000/",
  // headers: {
  //   "authorization": "Bearer 8458544b-9413-4e1b-a96c-c8cb18c89656",
  //   "Content-Type": "application/json"
  // }
});

export default api;