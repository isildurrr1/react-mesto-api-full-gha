class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  setProfileInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`
      })
    })
    .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`
      })
    })
    .then(this._checkResponse)
  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._checkResponse)
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers,
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers,
      })
      .then(this._checkResponse)
    }
  }
  changeAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: `${data.avatar}`
      })
    })
    .then(this._checkResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'bbe8cda5-f620-40b5-b414-da957e140ed7',
    'Content-Type': 'application/json'
  }
})

// 'bbe8cda5-f620-40b5-b414-da957e140ed7'