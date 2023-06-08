const lagoDiBraiesImage = new URL("../images/lago.jpg", import.meta.url);
const vanoiseNationalParkImage = new URL(
  "../images/vanoise.jpg",
  import.meta.url
);
const lakeLouiseImage = new URL("../images/lake-louise.jpg", import.meta.url);
const latemarImage = new URL("../images/latemar.jpg", import.meta.url);
const baldMountainsImage = new URL(
  "../images/bald-mountains.jpg",
  import.meta.url
);
const yosemiteValleyImage = new URL("../images/yosemite.jpg", import.meta.url);

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: yosemiteValleyImage,
  },
  {
    name: "Lake Louise",
    link: lakeLouiseImage,
  },
  {
    name: "Bald Mountains",
    link: baldMountainsImage,
  },
  {
    name: "Latemar",
    link: latemarImage,
  },
  {
    name: "Vanoise National Park",
    link: vanoiseNationalParkImage,
  },
  {
    name: "Lago di Braies",
    link: lagoDiBraiesImage,
  },
];

export const selectors = {
  cardsList: ".cards__list",
  cardTemplate: "#card-template",
  previewImageModal: "#preview-image-modal",
  editFormModal: "#profile-edit-modal",
  addCardModal: "#add-card-modal",
  profileTitle: "#profile-title",
  profileDescription: "#prof-description",
  profileEditName: "#edit-profile-title",
  profileEditDescription: "#edit-profile-description",
  formModalContainer: ".modal__container",
  imageModalContainer: ".modal__container-image",
};

export const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
