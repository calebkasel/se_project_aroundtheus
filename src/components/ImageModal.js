import Modal from "./Modal.js";

export default class ImageModal extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._image = this._modalElement.querySelector(".modal__image");
    this._imageCaption = this._modalElement.querySelector(
      ".modal__image-caption"
    );
  }

  open(data) {
    this._imageCaption.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
  }

  setEventListeners() {
    super._setEventListeners();
  }
}
