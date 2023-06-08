export default class UserInfo {
  constructor({ userName, userDescription }) {
    this._name = document.querySelector(userName);
    this._description = document.querySelector(userDescription);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
