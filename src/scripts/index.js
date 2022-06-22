import '../pages/index.css';
import {
  initialCards, profilePopupSelector, placePopupSelector,
  cardPopupSelector, profilePopupInputName, profilePopupInputInfo,
  btnEdit, btnAdd, cardPopupInputPlace, config, cardPopupInputLink,
  placesContainer, placesContainerSelector, userNameSelector,
  userInfoSelector, formValidators
} from './constants.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

function handleCardClick(place, link) {
  const popup = new PopupWithImage(placePopupSelector);
  popup.open(place, link);
  popup.setEventListeners();
}

btnEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profilePopupInputName.value = userData.name;
  profilePopupInputInfo.value = userData.info;
  formValidators['profile-form'].resetValidation();
  profilePopup.open();
});

btnAdd.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  cardPopup.open();
});

enableValidation(config);

const cards = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#place-card-template', handleCardClick);
    const cardElement = card.createCard();
    cards.addItem(cardElement);
  }
}, placesContainerSelector);
cards.renderItems();

const userInfo = new UserInfo({ name: userNameSelector, info: userInfoSelector });

const profilePopup = new PopupWithForm(profilePopupSelector, {
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues[profilePopupInputName.id], inputValues[profilePopupInputInfo.id]);
  }
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(cardPopupSelector, {
  handleFormSubmit: (inputValues) => {
    const data = {
      name: inputValues[cardPopupInputPlace.id],
      link: inputValues[cardPopupInputLink.id]
    }
    const card = new Card(data, '#place-card-template', handleCardClick);
    const cardElement = card.createCard();
    placesContainer.prepend(cardElement);
  }
});
cardPopup.setEventListeners();