export default class Api {
  constructor({ baseUrl, headers, handleUserData, handleInitialCards }) {
    this._baseUrl = baseUrl;
    this._autorization = headers.authorization;
    this._contentType = headers['Content-Type'];
    this._handleUserData = handleUserData;
    this._handleInitialCards = handleInitialCards;
  }

  getUserData() {
    fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._autorization
      }
    }) //загрузка информации о пользователе с сервера
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Не удалось загрузить информацию о пользователе');
      })
      .then((res) => {
        this._handleUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      }
    }) //загрузка карточек с сервера
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Не удалось загрузить карточки');
      })
      .then((res) => {
        this._handleInitialCards(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  giveUserInfo(name, info) {
    fetch(`${this._baseUrl}/users/me`, {
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
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: place,
        link: link
      })
    });
  }
}