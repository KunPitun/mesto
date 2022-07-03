export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleLikeClick) {
    this._place = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._like = data.likes;
    this._handleLikeClick = handleLikeClick;
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
    if(this._btnLike.classList.contains('place-card__like-btn_active')){
      this._handleLikeClick(this._like.length + 1);
    }
    else {
      this._handleLikeClick(this._like.length - 1);
    }
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._btnLike = this._card.querySelector('.place-card__like-btn');
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;
    this._cardTitle.textContent = this._place;
    this._cardLike.textContent = this._like.length;
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