import Modal from "./Modal.js";

export default class ImageModal extends Modal {
  open({ name, link }) {
    this._modalElement.querySelector("modal__image-caption").textContent = name;
    const image = this._modalElement.querySelector("modal__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
