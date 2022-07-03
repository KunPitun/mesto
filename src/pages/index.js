import './index.css';
import {
  profilePopupSelector, placePopupSelector, cardPopupSelector,
  profilePopupInputName, profilePopupInputInfo, btnEdit, btnAdd,
  cardPopupInputPlace, config, cardPopupInputLink, placesContainer,
  placesContainerSelector, userNameSelector, userInfoSelector,
  userAvatarSelector, formValidators, deletePopupSelector,
  likeCountSelector
} from '../components/constants.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import Api from '../components/Api.js';

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

function handleLikeClick(likes) {
  console.log(likes);
}

function createCard(data) {
  const card = new Card(data, '#place-card-template', handleCardClick, handleLikeClick);
  const cardElement = card.createCard();
  return cardElement;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'a36e0e0d-a48a-4afd-9e5d-855c3e7f30f4',
    'Content-Type': 'application/json'
  },
  handleUserData: (data) => {
    document.querySelector(userNameSelector).textContent = data.name;
    document.querySelector(userInfoSelector).textContent = data.about;
    document.querySelector(userAvatarSelector).src = data.avatar;
  },
  handleInitialCards: (data) => {
    cards.renderItems(data);
  }
})

api.getUserData();
api.getInitialCards();

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

const userInfo = new UserInfo({ name: userNameSelector, info: userInfoSelector });

const profilePopup = new PopupWithForm(profilePopupSelector, {
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues[profilePopupInputName.id], inputValues[profilePopupInputInfo.id]);
    api.giveUserInfo(inputValues[profilePopupInputName.id], inputValues[profilePopupInputInfo.id]);
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
    api.giveCardInfo(inputValues[cardPopupInputPlace.id], inputValues[cardPopupInputLink.id]);
    api.getInitialCards();
  }
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(placePopupSelector);
imagePopup.setEventListeners();

const deletePopup = new PopupWithForm(deletePopupSelector, {
  handleFormSubmit: () => {
    
  }
})