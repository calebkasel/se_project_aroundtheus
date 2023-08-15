export default class UserInfo {
  constructor({ userName, userDescription, currentAvatar }) {
    this._name = document.querySelector(userName);
    this._about = document.querySelector(userDescription);
    this._avatar = document.querySelector(currentAvatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._about.textContent,
      avatar: this._avatar,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._about.textContent = description;
  }

  setUserAvatar(data) {
    console.log(data);
    this._avatar = data;
  }
}
