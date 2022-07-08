import Popup from "./Popup";

export default class DeletePopup extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._btnSave = this._popupElement.querySelector('.popup__save-btn');
    this._handleSubmit = handleSubmit;
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._cardElement = card;
    super.open();
  }

  setEventListeners() {
    this._btnSave.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._btnSave.textContent = 'Удаление...';   
      this._handleSubmit(this._cardId, this._cardElement, this._btnSave);
      super.close();
    });
    super.setEventListeners();
  }
}