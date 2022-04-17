let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputInfo = document.querySelector('.popup__input_type_user-info');
let closeBtn = document.querySelector('.popup__close-btn');
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-info');
let editBtn = document.querySelector('.profile__edit-btn');

function popupOpenClose() {
  popup.classList.toggle('popup_closed');
  if (popup.className === 'popup') {
    popupInputName.value = userName.textContent;
    popupInputInfo.value = userInfo.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = popupInputName.value;
  userInfo.textContent = popupInputInfo.value;
  popupOpenClose();
}

editBtn.addEventListener('click', popupOpenClose);
closeBtn.addEventListener('click', popupOpenClose);
formElement.addEventListener('submit', formSubmitHandler);