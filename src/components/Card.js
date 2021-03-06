export default class Card {
  constructor({ data, cardTemplateSelector, handleCardClick, handleAddLike, handleDeleteLike, getUserData, handleDeleteClick }) {
    this._place = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._getUserData = getUserData;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardTemplateElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.place-card')
      .cloneNode(true);
    return cardTemplateElement;
  }

  _addLike() {
    this._btnLike.classList.toggle('place-card__like-btn_active');
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {
      if (this._btnLike.classList.contains('place-card__like-btn_active')) {
        this._handleDeleteLike(this._id)
          .then((data) => {
            this._addLike();
            this._cardLike.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        this._handleAddLike(this._id)
          .then((data) => {
            this._addLike();
            this._cardLike.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    this._btnDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._id, this._card);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._place, this._link);
    });
  }

  _fillCard() {
    this._btnLike = this._card.querySelector('.place-card__like-btn');
    this._btnDelete = this._card.querySelector('.place-card__delete-btn');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;
    this._cardTitle.textContent = this._place;
    this._getUserData()
      .then((data) => {
        if (data._id === this._owner._id) {
          this._btnDelete.classList.add('place-card__delete-btn_visible');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this._cardLike.textContent = this._likes.length;
    this._getUserData()
      .then((data) => {
        if (this._likes.find((like) => like._id === data._id)) {
          this._addLike();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.place-card__image');
    this._cardTitle = this._card.querySelector('.place-card__title');
    this._cardLike = this._card.querySelector('.place-card__like-count');
    this._fillCard();
    this._setEventListeners();
    return this._card;
  }
}