function popupOpenClose() {
  popup.classList.toggle('popup_closed');
  popupInputName.value = '';
  popupInputInfo.value = '';
}

let popup = document.querySelector('.popup');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputInfo = document.querySelector('.popup__input_type_user-info');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.popup__save-btn');

editBtn.addEventListener('click', popupOpenClose);
closeBtn.addEventListener('click', popupOpenClose);