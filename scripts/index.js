const profilePopup = document.querySelector('.popup_type_profile-popup');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputInfo = profilePopup.querySelector('.popup__input_type_user-info');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.popup_type_card-popup');
const cardPopupInputPlace = cardPopup.querySelector('.popup__input_type_place');
const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_link');
const placePopup = document.querySelector('.popup_type_place-popup');
const placePopupImg = placePopup.querySelector('.popup__image');
const placePopupTitle = placePopup.querySelector('.popup__title');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const placesContainer = document.querySelector('.places__container');
const popups = document.querySelectorAll('.popup');
const config = {
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
const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_opened');
}

function handleCardClick(place, link) {
  placePopupImg.src = link;
  placePopup.alt = place;
  placePopupTitle.textContent = place;
  openPopup(placePopup);
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = profilePopupInputName.value;
  userInfo.textContent = profilePopupInputInfo.value;
  closePopup(profilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  placesContainer.prepend(createCard(cardPopupInputPlace.value, cardPopupInputLink.value));
  closePopup(cardPopup);
  evt.target.reset();
}

function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(findOpenedPopup());
  }
}

function createCard(place, link) {
  const data = {
    place: place,
    link: link
  }
  const card = new Card (data, '#place-card-template', handleCardClick);
  return card.createCard();
}

initialCards.forEach(item => {
  placesContainer.append(createCard(item.name, item.link));
});

btnEdit.addEventListener('click', () => {
  profilePopupInputName.value = userName.textContent;
  profilePopupInputInfo.value = userInfo.textContent;
  formValidators['profile-form'].resetValidation();
  openPopup(profilePopup);
});

btnAdd.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  openPopup(cardPopup);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  })
})

enableValidation(config);

profilePopupForm.addEventListener('submit', handleProfileFormSubmit);
cardPopupForm.addEventListener('submit', handleAddCardFormSubmit);