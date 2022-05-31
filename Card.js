import { placePopupImg, placePopupTitle, preparationOfPopupForOpening, placePopup } from './index.js';

class Card {
  constructor(place, link, cardTemplateSelector) {
    this._place = place;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
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
    this._card.querySelector('.place-card__like-btn').classList.toggle('place-card__like-btn_active');
  }

  _deleteCard() {
    const cardItem = this._card.closest('.place-card');
    cardItem.remove();
  }

  _handleOpenPopup() {
    placePopupImg.src = this._cardImage.src;
    placePopupTitle.textContent = this._cardTitle.textContent;
    placePopupImg.alt = this._cardTitle.textContent;
    preparationOfPopupForOpening(placePopup);
  }

  _setEventListeners() {
    this._card.querySelector('.place-card__like-btn').addEventListener('click', () => {
      this._addLike();
    });
    this._card.querySelector('.place-card__delete-btn').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
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