export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._autorization = headers.authorization;
    this._contentType = headers['Content-Type'];
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._autorization
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Не удалось загрузить информацию о пользователе');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Не удалось загрузить карточки');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  giveUserInfo(name, info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        about: info
      })
    });
  }

  giveCardInfo(place, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: place,
        link: link,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Не удалось отправить информацию о карточке');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Не удалось поставить лайк');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Не удалось убрать лайк');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Не удалось удалить карточку');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}