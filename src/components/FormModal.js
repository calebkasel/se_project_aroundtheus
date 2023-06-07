import Modal from "./Modal.js";
import { validationOptions } from "../utils/constants.js";

export default class FormModal extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._modalElement.querySelector(submitButtonSelector);
    this._inputList = this._modalElement.querySelectorAll(inputSelector);
  }

  _getInPutValues() {
    const inputs = {};

    this._inputList.forEach((input) => {
      inputs[input.name] = input.value;
    });

    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInPutValues());
    });
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
