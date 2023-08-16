import "./index.css";
import "../images/jacques-cousteau.png";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ConfirmModal from "../components/ConfirmModal.js";
import ImageModal from "../components/ImageModal.js";
import FormModal from "../components/FormModal.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  validationOptions,
  selectors,
  cardList,
  profPicButton,
} from "../utils/constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");
const formValidatorList = {};

const profileEditTitle = document.querySelector("#edit-profile-title");
const profileEditDescription = document.querySelector(
  "#edit-profile-description"
);

const imageModal = new ImageModal(selectors.previewImageModal);

const userInfo = new UserInfo({
  userName: selectors.profileTitle,
  userDescription: selectors.profileDescription,
  currentProfPic: selectors.profileAvatar,
});

const changeProfPicModal = new FormModal({
  modalSelector: selectors.changeProfPic,
  handleFormSubmit: (url) => {
    changeProfPicModal.renderLoading(true, "Saving...");
    api
      .updateProfPic(url)
      .then((data) => {
        console.log(data);
        userInfo.setUserAvatar(data.avatar);
        changeProfPicModal.close();
      })
      .catch(console.error)

      .finally(() => {
        changeProfPicModal.renderLoading(false, "Save");
      });
  },
});

const deleteCardModal = new ConfirmModal(selectors.deletCardModal);

const userInfoModal = new FormModal({
  modalSelector: selectors.editFormModal,
  handleFormSubmit: ({ name, description }) => {
    userInfoModal.renderLoading(true);
    api
      .changeUserInfo(name, description)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        userInfoModal.close();
      })
      .catch(console.error)

      .finally(() => {
        userInfoModal.renderLoading(false, "Save");
      });
  },
});

const newCardModal = new FormModal({
  modalSelector: selectors.addCardModal,
  handleFormSubmit: ({ name, link }) => {
    newCardModal.renderLoading(true);
    api
      .addCard(name, link)
      .then((data) => {
        renderCard(data, userId);
        newCardModal.close();
      })
      .catch(console.error)

      .finally(() => {
        newCardModal.renderLoading(false, "Create");
      });
  },
});

const formValidation = (validationOptions) => {
  const formList = Array.from(
    document.querySelectorAll(validationOptions.formSelector)
  );

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationOptions, formElement);

    const formName = formElement.getAttribute("name");

    formValidatorList[formName] = validator;
    validator.enableValidation();
  });
};

formValidation(validationOptions);

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "68edeb5e-81db-4ba7-85b0-f74435eb79ce",
    "Content-Type": "application/json",
  },
});

imageModal.setEventListeners();
userInfoModal.setEventListeners();
newCardModal.setEventListeners();
changeProfPicModal.setEventListeners();
deleteCardModal.setEventListeners();

// cardList.renderItems();

profileEditButton.addEventListener("click", ({ name, description }) => {
  const profileInfo = userInfo.getUserInfo();

  profileEditTitle.value = profileInfo.name;
  profileEditDescription.value = profileInfo.description;

  formValidatorList["edit-profile-form"].resetForm();
  userInfoModal.open();
});

profPicButton.addEventListener("click", () => {
  formValidatorList["change-prof-pic-form"].resetForm();
  changeProfPicModal.open();
});

addCardButton.addEventListener("click", () => {
  formValidatorList["add-card-form"].resetForm();
  newCardModal.open();
});

let userId;
let cardListSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    cardListSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          renderCard(data, userId);
        },
      },
      cardList
    );
    cardListSection.renderItems();
  })
  .catch(console.error);

// function submitCard({ title, link }) {
//   newCardModal.renderLoading(true);
//   api
//     .addCard((data) => {
//       const newCard = renderCard(data, userId);
//       cardListSection.addItem(newCard);
//       newCardModal.close();
//     })
//     .catch(console.error)

//     .finally(() => {
//       newCardModal.renderLoading(false, "Create");
//     });
// }

const renderCard = (data, userId) => {
  const card = new Card(
    {
      data,
      cardTemplateSelector: selectors.cardTemplate,
      handleCardClick: ({ name, link }) => {
        imageModal.open({ name, link });
      },
      handleLikeButton: (cardId, isLiked) => {
        api
          .changeLikeNumber(cardId, isLiked)
          .then((data) => {
            card.setLikes(data.likes);
          })
          .catch(console.error);
      },
      handleDeleteButton: () => {
        deleteCardModal.setSubmitAction(() => {
          deleteCardModal.renderLoading(true);
          api
            .deleteCard(card._id)
            .then((result) => {
              card.deleteCard(result._id);
              deleteCardModal.close();
            })
            .catch(console.error)

            .finally(() => {
              deleteCardModal.renderLoading(false, "Yes");
            });
        }),
          deleteCardModal.open();
      },
    },
    userId
  );

  cardListSection.addItem(card.getView());
};

// function handleProfPicFormSubmit(url) {
//   changeProfPicModal.renderLoading(true, "Saving...");
//   api
//     .updateProfPic(url)
//     .then((data) => {
//       userInfo.setUserAvatar(data.avatar);
//       changeProfPicModal.close();
//     })
//     .catch(console.error)

//     .finally(() => {
//       changeProfPicModal.renderLoading(false, "Save");
//     });
// }
