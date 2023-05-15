const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(`#${inputElement.id}-error`);
  console.log(errorElement);
  // inputElement.classList.add(inputErrorClass);
  // errorElement.textContent = inputElement.validationMessage;
  // errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  // inputElement.classList.remove(inputErrorClass);
  // errorElement.classList.remove(errorClass);
  // errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// }

function setEventListeners(
  formElement,
  { inputSelector, submitButtonSelector }
) {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  // const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      console.log(inputElement.validationMessage);
      checkInputValidity(formElement, inputElement, options);
      // toggleButtonState(inputList, buttonElement, options);
    });
  });
}

function enableValidation(options) {
  const formList = [...document.querySelectorAll(options.formSelector)];

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

enableValidation(options);
