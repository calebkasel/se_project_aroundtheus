import Modal from "./Modal.js";
import { validationOptions } from "../utils/constants.js";

export default class FormModal extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(
      validationOptions.formSelector
    );
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._modalElement.querySelector(
      validationOptions.submitButtonSelector
    );
    this._inputList = this._modalElement.querySelectorAll(
      validationOptions.inputSelector
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    const inputs = {};

    this._inputList.forEach((input) => {
      if (input.value !== "") {
        inputs[input.name] = input.value;
      }
    });

    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
