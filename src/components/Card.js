export default class Card {
  constructor(
    {
      data,
      cardTemplateSelector,
      handleCardClick,
      handleLikeButton,
      handleDeleteButton,
    },
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._id = data._id;
    this._cardLikeCounter;

    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteButton = handleDeleteButton;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _fillCardData() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeButton(this._id, this.isLiked())
    );

    if (this._userId === this._ownerId) {
      this._deleteButton.addEventListener("click", () =>
        this._handleDeleteButtonClick()
      );
    }

    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
  }

  _handleDeleteButtonClick() {
    this._handleDeleteButton();
  }

  _hideDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }

  handleDeleteCard() {
    this._deleteCard();
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    this._cardLikeCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeCounter =
      this._cardElement.querySelector(".card__likes-count");

    this._fillCardData();
    this._hideDeleteButton();
    this._renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }
}
