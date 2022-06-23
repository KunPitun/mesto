import './index.css';
import {
  initialCards, profilePopupSelector, placePopupSelector,
  cardPopupSelector, profilePopupInputName, profilePopupInputInfo,
  btnEdit, btnAdd, cardPopupInputPlace, config, cardPopupInputLink,
  placesContainer, placesContainerSelector, userNameSelector,
  userInfoSelector, formValidators
} from '../components/constants.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';

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
  imagePopup.open(place, link);
}

function createCard(data) {
  const card = new Card(data, '#place-card-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
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
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, placesContainerSelector);
cards.renderItems(initialCards);

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
    placesContainer.prepend(createCard(data));
  }
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(placePopupSelector);
imagePopup.setEventListeners();