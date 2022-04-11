function popupOpenClose() {
  popup.classList.toggle('popup_closed');
  popupInputName.value = '';
  popupInputInfo.value = '';
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  popupInputName = document.querySelector('.popup__input_type_name');
  popupInputInfo = document.querySelector('.popup__input_type_user-info');
  userName.textContent = popupInputName.value;
  userInfo.textContent = popupInputInfo.value;
  popupInputName.setAttribute('placeholder', popupInputName.value);
  popupInputInfo.setAttribute('placeholder', popupInputInfo.value);
  popupOpenClose();
}

let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputInfo = document.querySelector('.popup__input_type_user-info');
let saveBtn = document.querySelector('.popup__save-btn');
let closeBtn = document.querySelector('.popup__close-btn');
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-info');
let editBtn = document.querySelector('.profile__edit-btn');

editBtn.addEventListener('click', popupOpenClose);
closeBtn.addEventListener('click', popupOpenClose);
formElement.addEventListener('submit', formSubmitHandler);