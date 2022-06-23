export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const profilePopupSelector = '.popup_type_profile-popup';
export const placePopupSelector = '.popup_type_place-popup';
export const cardPopupSelector = '.popup_type_card-popup';
export const profilePopupInputName = document.querySelector('.popup__input_type_name');
export const profilePopupInputInfo = document.querySelector('.popup__input_type_user-info');
export const btnEdit = document.querySelector('.profile__edit-btn');
export const btnAdd = document.querySelector('.profile__add-btn');
export const cardPopupInputPlace = document.querySelector('.popup__input_type_place');
export const cardPopupInputLink = document.querySelector('.popup__input_type_link');
export const placesContainer = document.querySelector('.places__container');
export const placesContainerSelector = '.places__container';
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
export const userNameSelector = '.profile__user-name';
export const userInfoSelector = '.profile__user-info';
export const formValidators = {};