export default class UserInfo {
  constructor({ userName, userDescription, currentProfPic }) {
    this._name = document.querySelector(userName);
    this._about = document.querySelector(userDescription);
    this._avatar = document.querySelector(currentProfPic);
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

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
