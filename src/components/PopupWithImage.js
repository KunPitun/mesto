import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._placePopupImg = this._popupElement.querySelector('.popup__image');
    this._placePopupTitle = this._popupElement.querySelector('.popup__title');
  }

  open(place, link) {
    this._placePopupImg.src = link;
    this._placePopupImg.alt = place;
    this._placePopupTitle.textContent = place;
    super.open();
  }
}