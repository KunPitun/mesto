const profilePopup = document.querySelector('.popup_type_profile-popup');
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
const cardPopupInputPlace = cardPopup.querySelector('.popup__input_type_place');
const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_link');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-btn');
const placePopup = document.querySelector('.popup_type_place-popup');
const placePopupImg = placePopup.querySelector('.popup__image');
const placePopupTitle = placePopup.querySelector('.popup__title');
const placePopupCloseBtn = placePopup.querySelector('.popup__close-btn');

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

function createCard(place, link) {
  const card = cardTemplate.querySelector('.place-card').cloneNode(true);
  const cardImage = card.querySelector('.place-card__image');
  const cardTitle = card.querySelector('.place-card__title');
  cardImage.src = link;
  cardImage.alt = place;
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
    preparationOfPopupForOpening(placePopup);
  });
  return card;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  placesContainer.prepend(createCard(cardPopupInputPlace.value, cardPopupInputLink.value));
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
    if (inputElement.value) {
      checkInputValidity(popup.querySelector('.popup__form'), inputElement, set.inputErrorClass, set.errorClass);
    }
  });
  toggleButtonState(inputList, popup.querySelector('.popup__save-btn'), set.inactiveButtonClass);
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
  placesContainer.append(createCard(item.name, item.link));
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