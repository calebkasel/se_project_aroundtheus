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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#edit-profile-title");
const profileDescriptionInput = document.querySelector(
  "#edit-profile-description"
);
const profileEditForm = profileEditModal.querySelector(
  "#edit-profile-modal-form"
);
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = addCardModal.querySelector("#add-card-modal-form");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close-button"
);

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

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
}

function appendCard(data) {
  const cardElement = getCardElement(data);
  cardListElement.append(cardElement);
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
  getCardElement(addCardModalForm);
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
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(appendCard);

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle(".card__like-button_active");
  });
});
