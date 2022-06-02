class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._place = data.place;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
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

  _deleteCard() {
    const cardItem = this._card.closest('.place-card');
    cardItem.remove();
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
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.place-card__image');
    this._cardTitle = this._card.querySelector('.place-card__title');
    this._fillCard();
    this._setEventListeners();
    return this._card;
  }
}

export { Card };