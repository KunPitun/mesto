const profilePopup = document.querySelector('.popup_type_profile-popup');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputInfo = profilePopup.querySelector('.popup__input_type_user-info');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.popup_type_card-popup');
const cardPopupInputPlace = cardPopup.querySelector('.popup__input_type_place');
const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_link');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-btn');
const placePopup = document.querySelector('.popup_type_place-popup');
const placePopupImg = placePopup.querySelector('.popup__image');
const placePopupTitle = placePopup.querySelector('.popup__title');
const placePopupCloseBtn = placePopup.querySelector('.popup__close-btn');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const placesContainer = document.querySelector('.places__container');
const set = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const profilePopupFormValidator = new FormValidator(set, profilePopupForm);
const cardPopupFormValidator = new FormValidator(set, cardPopupForm);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = profilePopupInputName.value;
  userInfo.textContent = profilePopupInputInfo.value;
  preparationOfPopupForClosing(profilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(cardPopupInputPlace.value, cardPopupInputLink.value, '#place-card-template')
  placesContainer.prepend(card.createCard());
  preparationOfPopupForClosing(cardPopup);
  evt.target.reset();
}

function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

function haveForm(popup) {
  return Boolean(popup.querySelector('.popup__form'));
}

function checkForm(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    if (inputElement.value && popup === profilePopup) {
      profilePopupFormValidator._checkInputValidity(inputElement);
      profilePopupFormValidator._toggleButtonState(inputList, popup.querySelector('.popup__save-btn'));
    }
    if (inputElement.value === '' && popup === cardPopup) {
      cardPopupFormValidator._hideInputError(inputElement);
    }
  });
  /*
  Когда валидация была реализоана в виде функций, я использовал их здесь, что бы устранить баги:
  1) В попапе профиля если заполнить поля не верно, закрыть попап, а затем открыть, то поля автоматически заполнялись,
  а валидационные сообщения об ошибке их заполнения оставались;
  2) В попапе создания новой карточки если заполнить поле, затем очистить его и закрыть попап, то при открытии так же 
  оставались валидационные сообщения.
  Сейчас я переделал эту функцию с использованием методов конструктора, которые сделал публичными, но это скорее всего
  противоречит чеклисту. Просто я без понятия как ещё можно избежать этоти баги, не используя эти методы или не 
  продублировав код. Если это не верно, то надеюсь Вы мне намекнёте как лучше это реализовать :) 
  */
}

function preparationOfPopupForOpening(popup) {
  document.addEventListener('keydown', closePopupByEsc);
  if (haveForm(popup)) {
    checkForm(popup);
  }
  openPopup(popup);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    preparationOfPopupForClosing(findOpenedPopup());
  }
}

function preparationOfPopupForClosing(popup) {
  document.removeEventListener('keydown', closePopupByEsc);
  closePopup(popup);
}

initialCards.forEach(item => {
  const card = new Card(item.name, item.link, '#place-card-template');
  placesContainer.append(card.createCard());
});
btnEdit.addEventListener('click', () => {
  profilePopupInputName.value = userName.textContent;
  profilePopupInputInfo.value = userInfo.textContent;
  preparationOfPopupForOpening(profilePopup);
});
profilePopupCloseBtn.addEventListener('click', () => {
  preparationOfPopupForClosing(profilePopup);
});
btnAdd.addEventListener('click', () => {
  preparationOfPopupForOpening(cardPopup);
});
cardPopupCloseBtn.addEventListener('click', () => {
  preparationOfPopupForClosing(cardPopup);
});
placePopupCloseBtn.addEventListener('click', () => {
  preparationOfPopupForClosing(placePopup);
});
document.addEventListener('click', (evt) => {
  if (!Array.from(evt.target.classList).indexOf('popup')) {
    preparationOfPopupForClosing(findOpenedPopup());
  }
});

profilePopupFormValidator.enableValidation();
cardPopupFormValidator.enableValidation();

profilePopupForm.addEventListener('submit', handleProfileFormSubmit);
cardPopupForm.addEventListener('submit', handleAddCardFormSubmit);

export { placePopupImg, placePopupTitle, preparationOfPopupForOpening, placePopup, set };