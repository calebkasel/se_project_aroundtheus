import { openModal } from "../utils/utils.js";
import {
  previewImageModal,
  modalImage,
  modalCaption,
} from "../utils/constants.js";

export default class Card {
  constructor({ data }, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
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
    this._likeButton.addEventListener("click", () => this._handleLikeButton());

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );

    this._cardImage.addEventListener("click", () => this._handlePreviewImage());
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewImage() {
    openModal(previewImageModal);
    modalImage.src = this._cardImage.src;
    modalImage.alt = this._cardImage.alt;
    modalCaption.textContent = this._cardImage.alt;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._fillCardData();
    this._setEventListeners();

    return this._cardElement;
  }
}
