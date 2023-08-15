export const initialCards = [
  {
    name: "Amalfi, Italy",
    link: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Tokyo, Japan",
    link: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Dublin, Ireland",
    link: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "New York City",
    link: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "San Francisco",
    link: "https://images.unsplash.com/photo-1526404423292-15db8c2334e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  },
  {
    name: "Minneapolis",
    link: "https://images.unsplash.com/photo-1535082049017-5a7b43f3bcef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlubmVzb3RhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
];

export const profPicButton = document.querySelector(".profile__image_edit");
export const profPicInput = document.querySelector("#change-prof-pic-url");
export const cardList = document.querySelector(".cards__list");

export const selectors = {
  cardsList: ".cards__list",
  cardTemplate: "#card-template",
  previewImageModal: "#preview-image-modal",
  changeProfPic: "#change-prof-pic-modal",
  editFormModal: "#profile-edit-modal",
  addCardModal: "#add-card-modal",
  deletCardModal: "#confirm-delete-modal",
  profileAvatar: ".profile__image",
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
