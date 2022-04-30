const profilePopup = document.querySelectorAll('.popup')[0];
const profilePopupFormElement = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputInfo = profilePopup.querySelector('.popup__input_type_user-info');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-info');
const editBtn = document.querySelector('.profile__edit-btn');
const cardTemplate = document.querySelector('#place-card-template').content;
const placesContainer = document.querySelector('.places__container');
const addBtn = document.querySelector('.profile__add-btn');
const cardPopup = document.querySelectorAll('.popup')[1];
const cardPopupFormElement = cardPopup.querySelector('.popup__form');
const cardPopupInputPlace = cardPopup.querySelector('.popup__input_type_place');
const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_link');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-btn');
const placePopup = document.querySelector('.place-popup');
const placePopupImg = placePopup.querySelector('.place-popup__image');
const placePopupTitle = placePopup.querySelector('.place-popup__title');
const placePopupCloseBtn = placePopup.querySelector('.place-popup__close-btn');
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
const cards = initialCards.map(elem => {
  const card = cardTemplate.querySelector('.place-card').cloneNode(true);
  card.querySelector('.place-card__image').src = elem.link;
  card.querySelector('.place-card__title').textContent = elem.name;
  return card;
});

function popupOpenClose(evt) {
  if (evt.target === editBtn || evt.target === profilePopupCloseBtn || evt.target === profilePopupFormElement) {
    profilePopup.classList.toggle('popup_closed');
    if (profilePopup.className === 'popup') {
      profilePopupInputName.value = userName.textContent;
      profilePopupInputInfo.value = userInfo.textContent;
    }
  }
  if (evt.target === addBtn || evt.target === cardPopupCloseBtn || evt.target === cardPopupFormElement) {
    cardPopup.classList.toggle('popup_closed');
  }
  if (evt.target.src === placePopupImg.src || evt.target === placePopupCloseBtn) {
    placePopup.classList.toggle('place-popup_closed');
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (evt.target === profilePopupFormElement) {
    userName.textContent = profilePopupInputName.value;
    userInfo.textContent = profilePopupInputInfo.value;
    popupOpenClose(evt);
  }
  if (evt.target === cardPopupFormElement) {
    const card = cardTemplate.querySelector('.place-card').cloneNode(true);
    card.querySelector('.place-card__image').src = cardPopupInputLink.value;
    card.querySelector('.place-card__title').textContent = cardPopupInputPlace.value;
    card.querySelector('.place-card__like-btn').addEventListener('click', evt => {
      evt.target.classList.toggle('place-card__like-btn_active');
    });
    card.querySelector('.place-card__delete-btn').addEventListener('click', evt => {
      const cardItem = card.closest('.place-card');
      cardItem.remove();
    });
    card.querySelector('.place-card__image').addEventListener('click', evt => {
      placePopupImg.src = evt.target.src;
      placePopupTitle.textContent = card.querySelector('.place-card__title').textContent;
      popupOpenClose(evt);
    });
    placesContainer.prepend(card);
    cardPopupInputLink.value = '';
    cardPopupInputPlace.value = '';
    popupOpenClose(evt);
  }
}

cards.forEach(item => {
  item.querySelector('.place-card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('place-card__like-btn_active');
  });
  item.querySelector('.place-card__delete-btn').addEventListener('click', evt => {
    const cardItem = item.closest('.place-card');
    cardItem.remove();
  });
  item.querySelector('.place-card__image').addEventListener('click', evt => {
    placePopupImg.src = evt.target.src;
    placePopupTitle.textContent = item.querySelector('.place-card__title').textContent;
    popupOpenClose(evt);
  });
  placesContainer.append(item);
});
editBtn.addEventListener('click', popupOpenClose);
profilePopupCloseBtn.addEventListener('click', popupOpenClose);
profilePopupFormElement.addEventListener('submit', formSubmitHandler);
addBtn.addEventListener('click', popupOpenClose);
cardPopupCloseBtn.addEventListener('click', popupOpenClose);
cardPopupFormElement.addEventListener('submit', formSubmitHandler);
placePopupCloseBtn.addEventListener('click', popupOpenClose);