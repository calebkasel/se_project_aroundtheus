import Modal from "./Modal.js";

export default class ConfirmModal extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._confirmButton = this._modalElement.querySelector(".modal__button");

    this._submitForm = this._submitForm.bind(this);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  renderLoading(isLoading, submitSave) {
    if (isLoading) {
      this._confirmButton.textContent = "Deleting...";
    } else {
      this._confirmButton.textContent = submitSave;
    }
  }

  _submitForm() {
    this._handleFormSubmit();
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitForm();
  };

  open() {
    super.open();
    this.setEventListeners();
  }

  close() {
    super.close();
    this._modalForm.removeEventListener("submit", this._handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this._handleSubmit);
  }
}
