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

const profileEditForm = document.forms["edit-profile-form"];
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardForm = document.forms["add-card-form"];
const addCardButton = document.querySelector("#add-card-button");

const profileEditTitle = document.querySelector("#edit-profile-title");
const profileEditDescription = document.querySelector(
  "#edit-profile-description"
);

const editFormValidator = new FormValidator(validationOptions, profileEditForm);
const addCardFormValidator = new FormValidator(validationOptions, addCardForm);

const imageModal = new ImageModal(selectors.previewImageModal);

const renderCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: (data) => {
        imageModal.open(data);
      },
    },
    selectors.cardTemplate
  );

  cardList.addItem(card.getView());
};

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const userInfo = new UserInfo({
  userName: selectors.profileTitle,
  userDescription: selectors.profileDescription,
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  selectors.cardsList
);

const userInfoModal = new FormModal({
  modalSelector: selectors.editFormModal,
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values.name, values.description);

    userInfoModal.close();
  },
});

const newCardModal = new FormModal({
  modalSelector: selectors.addCardModal,
  handleFormSubmit: (data) => {
    renderCard(data);

    newCardModal.close();
  },
});

imageModal.setEventListeners();
userInfoModal.setEventListeners();
newCardModal.setEventListeners();

cardList.renderItems();

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();

  profileEditTitle.value = profileInfo.name;
  profileEditDescription.value = profileInfo.description;

  editFormValidator.resetForm();
  userInfoModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetForm();
  newCardModal.open();
});
