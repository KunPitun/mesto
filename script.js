const profilePopup = document.querySelector('.popup_type_profile-popup');
const profilePopupFormElement = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputInfo = profilePopup.querySelector('.popup__input_type_user-info');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const btnEdit = document.querySelector('.profile__edit-btn');
const cardTemplate = document.querySelector('#place-card-template').content;
const placesContainer = document.querySelector('.places__container');
const btnAdd = document.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.popup_type_card-popup');
const cardPopupFormElement = cardPopup.querySelector('.popup__form');
const cardPopupInputPlace = cardPopup.querySelector('.popup__input_type_place');
const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_link');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-btn');
const placePopup = document.querySelector('.popup_type_place-popup');
const placePopupImg = placePopup.querySelector('.popup__image');
const placePopupTitle = placePopup.querySelector('.popup__title');
const placePopupCloseBtn = placePopup.querySelector('.popup__close-btn');
const initialCards = [
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

function popupOpenClose(popup) {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = profilePopupInputName.value;
  userInfo.textContent = profilePopupInputInfo.value;
  popupOpenClose(profilePopup);
}

function createCard(place, link) {
  const card = cardTemplate.querySelector('.place-card').cloneNode(true);
  const cardImage = card.querySelector('.place-card__image');
  const cardTitle = card.querySelector('.place-card__title');
  cardImage.src = link;
  cardTitle.textContent = place;
  card.querySelector('.place-card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('place-card__like-btn_active');
  });
  card.querySelector('.place-card__delete-btn').addEventListener('click', evt => {
    const cardItem = card.closest('.place-card');
    cardItem.remove();
  });
  cardImage.addEventListener('click', evt => {
    placePopupImg.src = evt.target.src;
    placePopupTitle.textContent = cardTitle.textContent;
    placePopupImg.alt = cardTitle.textContent;
    popupOpenClose(placePopup);
  });
  return card;
}

function formSubmitAddCard(evt) {
  evt.preventDefault();
  placesContainer.prepend(createCard(cardPopupInputPlace.value, cardPopupInputLink.value));
  popupOpenClose(cardPopup);
  cardPopupInputLink.value = '';
  cardPopupInputPlace.value = '';
}

initialCards.forEach(item => {
  placesContainer.append(createCard(item.name, item.link));
});
btnEdit.addEventListener('click', () => {
  profilePopupInputName.value = userName.textContent;
  profilePopupInputInfo.value = userInfo.textContent;
  popupOpenClose(profilePopup);
});
profilePopupCloseBtn.addEventListener('click', () => {
  popupOpenClose(profilePopup);
});
profilePopupFormElement.addEventListener('submit', formSubmitHandler);
btnAdd.addEventListener('click', () => {
  popupOpenClose(cardPopup);
});
cardPopupCloseBtn.addEventListener('click', () => {
  popupOpenClose(cardPopup);
});
cardPopupFormElement.addEventListener('submit', formSubmitAddCard);
placePopupCloseBtn.addEventListener('click', () => {
  popupOpenClose(placePopup);
});