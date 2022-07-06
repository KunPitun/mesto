export default class UserInfo {
  constructor( { name, info, avatar }) {
    this._userNameElement = document.querySelector(name);
    this._userInfoElement = document.querySelector(info);
    this._userAvatarElement = document.querySelector(avatar);
  }

  getUserInfo() {
    const userData = { name: this._userNameElement.textContent, about: this._userInfoElement.textContent};
    return userData;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userInfoElement.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userAvatarElement.src = data.avatar;
  }
}