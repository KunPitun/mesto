import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._popupFormInputs = this._popupForm.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};
    this._popupFormInputs.forEach((inputElement) => {
      inputValues[inputElement.id] = inputElement.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();     
      this._handleFormSubmit(this._getInputValues());
      super.close();
      evt.target.reset();
    });
    super.setEventListeners();
  }
}