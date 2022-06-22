export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt); 
    });
    this._popupElement.classList.add('popup_opened');
  }
/* К сожалению я без понятия как снять слушатель без использования коллбэк функции,
но если все же использовать её, то мне не совсем понятно для чего нужен метод _handleEscClose().
Понимаю, что это не примите, поэтому надеюсь на подсказку как лучше всё это дело реализовать :) */
  close() {
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }
}