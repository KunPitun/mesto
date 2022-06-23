export default class UserInfo {
  constructor( { name, info }) {
    this._userNameElement = document.querySelector(name);
    this._userInfoElement = document.querySelector(info);
  }

  getUserInfo() {
    const userData = { name: this._userNameElement.textContent, info: this._userInfoElement.textContent};
    return userData;
  }

  setUserInfo(name, info) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = info;
  }
}