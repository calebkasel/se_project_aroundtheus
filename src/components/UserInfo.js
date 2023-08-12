export default class UserInfo {
  constructor({ userName, userDescription, currentAvatar }) {
    this._name = document.querySelector(userName);
    this._description = document.querySelector(userDescription);
    this._avatar = document.querySelector(currentAvatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
