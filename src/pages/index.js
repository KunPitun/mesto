import './index.css';
import {
  profilePopupSelector, placePopupSelector, cardPopupSelector,
  profilePopupInputName, profilePopupInputInfo, btnEdit, btnAdd,
  cardPopupInputPlace, config, cardPopupInputLink, placesContainer,
  placesContainerSelector, userNameSelector, userInfoSelector,
  userAvatarSelector, formValidators, groupID, token
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

fetch(`https://nomoreparties.co/v1/${groupID}/users/me`, {
  headers: {
    authorization: token
  }
}) //загрузка информации о пользователе с сервера
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Не удалось загрузить информацию о пользователе');
  })
  .then((res) => {
    document.querySelector(userNameSelector).textContent = res.name;
    document.querySelector(userInfoSelector).textContent = res.about;
    document.querySelector(userAvatarSelector).src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

fetch(`https://mesto.nomoreparties.co/v1/${groupID}/cards`, {
  headers: {
    authorization: token
  }
}) //загрузка карточек с сервера
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Не удалось загрузить карточки');
  })
  .then((res) => {
    cards.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  });

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
    fetch(`https://mesto.nomoreparties.co/v1/${groupID}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues[profilePopupInputName.id],
        about: inputValues[profilePopupInputInfo.id]
      })
    });
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
    fetch(`https://mesto.nomoreparties.co/v1/${groupID}/cards`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues[cardPopupInputPlace.id],
        link: inputValues[cardPopupInputLink.id]
      })
    })
  }
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(placePopupSelector);
imagePopup.setEventListeners();