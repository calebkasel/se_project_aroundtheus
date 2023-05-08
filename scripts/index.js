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
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardListElement = document.querySelector(".cards__list");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardButton = document.querySelector("#add-card-button");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close-button"
);
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#preview-image-modal-close-button"
);

// Form Data
const profileEditForm = profileEditModal.querySelector(
  "#edit-profile-modal-form"
);
const profileTitleInput = profileEditForm.querySelector("#edit-profile-title");
const profileDescriptionInput = profileEditForm.querySelector(
  "#edit-profile-description"
);
const addCardForm = addCardModal.querySelector("#add-card-modal-form");
const cardTitleInput = addCardForm.querySelector("#add-card-title");
const cardLinkInput = addCardForm.querySelector("#add-card-link");
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
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageElement.addEventListener("click", (evt) => {
    openModal(previewImageModal);
    modalImage.src = evt.target.src;
    modalImage.alt = evt.target.alt;
    modalCaption.textContent = evt.target.alt;
  });

  likeButton.addEventListener("click", (evt) => {
    console.log("click");
    evt.target.classList.toggle(".card__like-button_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
}

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardListElement.prepend(cardElement);
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
  renderCard({ name, link });
  evt.target.reset();
  closeModal(addCardModal);
}
/*--------------------------------------------------------------------------------*/
/*                               Event Listeners                                  */
/*--------------------------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillEditProfileForm();
});
profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});
addCardForm.addEventListener("submit", handleAddCardSubmit);

previewImageModalCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

initialCards.forEach(renderCard);
