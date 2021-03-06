import './index.css';
import {
  profilePopupSelector, placePopupSelector, cardPopupSelector,
  profilePopupInputName, profilePopupInputInfo, btnEdit,
  btnAdd, cardPopupInputPlace, config, cardPopupInputLink,
  placesContainerSelector, userNameSelector, userInfoSelector,
  userAvatarSelector, formValidators, deletePopupSelector,
  avatarPopupSelector, avatarPopupInputLink, userAvatarContainer
} from '../components/constants.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import DeletePopup from '../components/DeletePopup';
import Api from '../components/Api.js';

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function createCard(data) {
  const card = new Card({
    data: data, cardTemplateSelector: '#place-card-template', handleCardClick: (place, link) => {
      imagePopup.open(place, link);
    }, handleAddLike: (cardId) => {
      return api.addLike(cardId);
    }, handleDeleteLike: (cardId) => {
      return api.deleteLike(cardId);
    }, getUserData: () => {
      return api.getUserData();
    }, handleDeleteClick: (cardId, card) => {
      deletePopup.open(cardId, card)
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'a36e0e0d-a48a-4afd-9e5d-855c3e7f30f4',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    cards.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({ name: userNameSelector, info: userInfoSelector, avatar: userAvatarSelector });

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

userAvatarContainer.addEventListener('click', () => {
  avatarPopupInputLink.value = '';
  formValidators['avatar-form'].resetValidation();
  avatarPopup.open();
})

enableValidation(config);

const cards = new Section({
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, placesContainerSelector);

const profilePopup = new PopupWithForm(profilePopupSelector, {
  handleFormSubmit: (inputValues, btnSave) => {
    api.giveUserInfo(inputValues[profilePopupInputName.id], inputValues[profilePopupInputInfo.id])
      .then(() => {
        userInfo.setUserInfo({ name: inputValues[profilePopupInputName.id], about: inputValues[profilePopupInputInfo.id] });
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnSave.textContent = '??????????????????';
      });
  }
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(cardPopupSelector, {
  handleFormSubmit: (inputValues, btnSave) => {
    api.giveCardInfo(inputValues[cardPopupInputPlace.id], inputValues[cardPopupInputLink.id])
      .then((data) => {
        cards.addNewItem(createCard(data));
        cardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnSave.textContent = '??????????????';
      });
  }
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(placePopupSelector);
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, {
  handleFormSubmit: (inputValues, btnSave) => {
    api.giveAvatarInfo(inputValues[avatarPopupInputLink.id])
      .then(() => {
        userInfo.setUserAvatar(inputValues[avatarPopupInputLink.id]);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnSave.textContent = '??????????????????';
      });
  }
})
avatarPopup.setEventListeners();

const deletePopup = new DeletePopup(deletePopupSelector, {
  handleSubmit: (cardId, cardElement, btnSave) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        cardElement = null;
        deletePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnSave.textContent = '????';
      });
  }
});
deletePopup.setEventListeners();