import './index.css';
import {
  profilePopupSelector, placePopupSelector, cardPopupSelector,
  profilePopupInputName, profilePopupInputInfo, btnEdit, btnAdd,
  cardPopupInputPlace, config, cardPopupInputLink, placesContainer,
  placesContainerSelector, userNameSelector, userInfoSelector,
  userAvatarSelector, formValidators, deletePopupSelector
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

function handleLikeClick(id, likes, counter) {
  api.getUserData()
    .then((data) => {
      if (likes.find((like) => like._id === data._id)) {
        api.deleteLike(id)
          .then((data) => {
            console.log(data.likes);
          });
      }
      else {
        api.addLike(id)
          .then((data) => {
            console.log(data.likes);
          });
      }
    });
}

function handleLikeData() {
  return api.getUserData();
}

function createCard(data) {
  const card = new Card(data, '#place-card-template', handleCardClick, handleLikeClick, handleLikeData);
  const cardElement = card.createCard();
  return cardElement;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'a36e0e0d-a48a-4afd-9e5d-855c3e7f30f4',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({ name: userNameSelector, info: userInfoSelector, avatar: userAvatarSelector });

api.getUserData()
  .then((data) => {
    console.log(data);
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
  });

btnEdit.addEventListener('click', () => {
  const userProfileInfo = userInfo.getUserInfo();
  profilePopupInputName.value = userProfileInfo.name;
  profilePopupInputInfo.value = userProfileInfo.about;
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

api.getInitialCards()
  .then((data) => {
    console.log(data);
    cards.renderItems(data);
  })

const profilePopup = new PopupWithForm(profilePopupSelector, {
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo({ name: inputValues[profilePopupInputName.id], about: inputValues[profilePopupInputInfo.id] });
    api.giveUserInfo(inputValues[profilePopupInputName.id], inputValues[profilePopupInputInfo.id]);
  }
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(cardPopupSelector, {
  handleFormSubmit: (inputValues) => {
    placesContainer.prepend(createCard({ name: inputValues[cardPopupInputPlace.id], link: inputValues[cardPopupInputLink.id] }));
    api.giveCardInfo(inputValues[cardPopupInputPlace.id], inputValues[cardPopupInputLink.id]);
  }
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(placePopupSelector);
imagePopup.setEventListeners();