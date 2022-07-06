export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleLikeClick, handleLikeData) {
    this._place = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._id = data._id;
    this._handleLikeClick = handleLikeClick;
    this._handleLikeData = handleLikeData;
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
    this._handleLikeClick(this._id, this._likes, this._cardLike);
    this._handleLikeData(this._id)
      .then((data) => {
        console.log(data);
      })
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._btnDelete = this._card.querySelector('.place-card__delete-btn');
    this._btnLike.addEventListener('click', () => {
      this._addLike();
    });
    this._btnDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._place, this._link);
    });
  }

  _fillCard() {
    this._btnLike = this._card.querySelector('.place-card__like-btn');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;
    this._cardTitle.textContent = this._place;
    this._handleLikeData()
    .then((data) => {
      if(this._likes.find((like) => like._id === data._id)) {
        this._btnLike.classList.toggle('place-card__like-btn_active');
      }
    })
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