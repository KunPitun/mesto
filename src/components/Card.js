export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleAddLike, handleDeleteLike, getUserData, handleDeleteCard) {
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
    this._handleDeleteCard = handleDeleteCard;
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
    this._card.remove();
    this._card = null;
    this._handleDeleteCard(this._id);
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {
      this._addLike();
      if (this._btnLike.classList.contains('place-card__like-btn_active')) {
        this._handleAddLike(this._id)
          .then((data) => {
            this._cardLike.textContent = data.likes.length;
          });
      }
      else {
        this._handleDeleteLike(this._id)
          .then((data) => {
            this._cardLike.textContent = data.likes.length;
          });
      }
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
    this._cardLike.textContent = this._likes.length;
    this._getUserData()
      .then((data) => {
        if (this._likes.find((like) => like._id === data._id)) {
          this._addLike();
        }
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