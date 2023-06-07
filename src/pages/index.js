import "./index.css";
import "../images/jacques-cousteau.png";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ImageModal from "../components/ImageModal.js";
import FormModal from "../components/FormModal.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationOptions,
  selectors,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  userName: selectors.profileName,
  userDescription: selectors.profileDescription,
});

const cardList = new Section(
  {
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleCardClick: () => {
            imageModal.open(data);
          },
        },
        selectors.cardTemplate
      );

      cardList.addItem(card.getView());
    },
  },
  selectors.cardsList
);

const imageModal = new ImageModal(selectors.previewImageModal);

const userInfoModal = new FormModal({
  modalSelector: selectors.editFormModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const newCardModal = new FormModal({
  modalSelector: selectors.addCardModal,
  handleFormSubmit: (data) => {
    const card = new Card(
      {
        data,
        handleCardClick: () => {
          imageModal.open(data);
        },
      },
      selectors.cardTemplate
    );

    cardList.addItem(card.getView());
  },
});

const editFormValidator = new FormValidator(
  validationOptions,
  selectors.editFormModal
);
const addCardFormValidator = new FormValidator(
  validationOptions,
  selectors.addCardModal
);

imageModal.setEventListeners();
userInfoModal.setEventListeners();
newCardModal.setEventListeners();

cardList.renderItems(initialCards);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*--------------------------------------------------------------------------------*/
/*                               Elements                                        */
/*--------------------------------------------------------------------------------*/
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Wrappers
const placesList = document.querySelectorAll(".modal");
// const cardListElement = document.querySelector(".cards__list");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const addCardModal = document.querySelector("#add-card-modal");
// const previewImageModal = document.querySelector("#preview-image-modal");

// Buttons and other DOM nodes
const closeButtons = document.querySelectorAll(".modal__close");

// Profile Edit
const profileEditButton = document.querySelector("#profile-edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Add Card
const addCardButton = document.querySelector("#add-card-button");

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

function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template");
  return newCard;
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

export { openModal, closeModal, exitModalWithClick, exitModalWithEscape };

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

  const newCard = createCard({ name, link });

  console.log(newCard);

  cardListElement.prepend(newCard.getView());
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
  editFormValidator.resetForm();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  addCardFormValidator.resetForm();
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((initialCard) => {
  const card = createCard(initialCard);
  cardListElement.append(card.getView());
});
