import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*--------------------------------------------------------------------------------*/
/*                               Elements                                        */
/*--------------------------------------------------------------------------------*/
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Wrappers
const modalList = document.querySelectorAll(".modal");
const cardListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

// Buttons and other DOM nodes
const closeButtons = document.querySelectorAll(".modal__close");

// Profile Edit
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Add Card
const addCardButton = document.querySelector("#add-card-button");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close-button"
);
const addCardSubmit = addCardModal.querySelector("#add-card-submit-button");
// Preview Image
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#preview-image-modal-close-button"
);

// Form Data

// Profile Edit Form
const profileEditForm = document.forms["edit-profile-form"];
const profileTitleInput = profileEditForm.querySelector("#edit-profile-title");
const profileDescriptionInput = profileEditForm.querySelector(
  "#edit-profile-description"
);

// Add Card Form
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector("#add-card-title");
const cardLinkInput = addCardForm.querySelector("#add-card-link");

// Preview Image Form
const modalImage = previewImageModal.querySelector(".modal__image");
const modalCaption = previewImageModal.querySelector(".modal__image-caption");

/*--------------------------------------------------------------------------------*/
/*                               Functions                                        */
/*--------------------------------------------------------------------------------*/

function fillEditProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", exitModalWithClick);
  document.addEventListener("keydown", exitModalWithEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", exitModalWithClick);
  document.removeEventListener("keydown", exitModalWithEscape);
}

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageElement = cardElement.querySelector(".card__image");
//   const cardTitleElement = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   cardImageElement.addEventListener("click", (evt) => {
//     openModal(previewImageModal);
//     modalImage.src = evt.target.src;
//     modalImage.alt = evt.target.alt;
//     modalCaption.textContent = evt.target.alt;
//   });

//   likeButton.addEventListener("click", (evt) => {
//     evt.target.classList.toggle("card__like-button_active");
//   });

//   deleteButton.addEventListener("click", (evt) => {
//     evt.target.closest(".card").remove();
//   });

//   cardTitleElement.textContent = data.name;
//   cardImageElement.src = data.link;
//   cardImageElement.alt = data.name;

//   return cardElement;
// }

function renderCard(card) {
  cardListElement.prepend(card);
}

function exitModalWithEscape(evt) {
  if (evt.key === "Escape") {
    const modalActive = document.querySelector(".modal_opened");
    closeModal(modalActive);
  }
}

function exitModalWithClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

/*--------------------------------------------------------------------------------*/
/*                               Event Handlers                                   */
/*--------------------------------------------------------------------------------*/
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;

  const newCard = new Card({ name, link }, "#card-template");

  renderCard(newCard.getView());
  evt.target.reset();
  closeModal(addCardModal);
}
/*--------------------------------------------------------------------------------*/
/*                               Event Listeners                                  */
/*--------------------------------------------------------------------------------*/

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(modal));
});

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillEditProfileForm();
  // resetForm(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  // resetForm(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card-template");
  cardListElement.append(card.getView());
});

const validationOptions = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationOptions, profileEditForm);
const addCardFormValidator = new FormValidator(validationOptions, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
