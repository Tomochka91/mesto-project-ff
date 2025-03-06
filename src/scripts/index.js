import { createCard, deleteCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  promises,
  editUserDataRq,
  postNewCardRq,
  putLikeRq,
  deleteLikeRq,
  deleteCardRq,
  changeAvatarRq,
} from "./api.js";
import { handleFormSubmit } from "./utils/utils.js";
import { valConfig } from "./utils/constants.js";
import "../pages/index.css";

// Создадим объект колбэков
// Могу ли я импортировать Реквесты из api.js в card.js?
const cardCbOptions = {
  deleteCardCb: deleteCard,
  openImagePopupCb: openImagePopup,
  putLikeRq: putLikeRq,
  deleteLikeRq: deleteLikeRq,
  deleteCardRq: deleteCardRq,
};

// DOM узлы
const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatarEdit = document.querySelector(".popup_type_avatar-edit");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__image-edit");
const popups = document.querySelectorAll(".popup");
const popupImgCaption = popupImage.querySelector(".popup__caption");
const popupImgLink = popupImage.querySelector(".popup__image");
const formEdit = document.forms["edit-profile"];
const profileName = formEdit.elements.name;
const profileDescription = formEdit.elements.description;
const profileInfoName = document.querySelector(".profile__title");
const profileInfoDesc = document.querySelector(".profile__description");
const formNewPlace = document.forms["new-place"];
const placeName = formNewPlace.elements["place-name"];
const placeLink = formNewPlace.elements["link"];
const formAvatarEdit = document.forms["avatar-edit"];
const profileImage = document.querySelector(".profile__image");
const formAvatarEditlink = formAvatarEdit.elements.link;

// после успешного ответа от сервера прорисовываем карточки на страницу
Promise.all(promises)
  .then((result) => {
    const [cards, myProfile] = result;
    profileImage.style = `background-image: url('${myProfile.avatar}')`;

    // при загрузке страницы отрисуем данные моего профиля на странице
    setProfile(myProfile.name, myProfile.about);

    // отрисовка карточек
    cards.forEach((element) => {
      renderCard(element, myProfile._id);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// создадим функцию, которая позволит определить метод вставки карточки
function renderCard(cardContent, myId, method = "append") {
  placesList[method](createCard(cardContent, myId, cardCbOptions));
}

// Открыть поп-ап Редактировать профиль
editButton.addEventListener("click", () => {
  clearValidation(popupEdit, valConfig);
  openModal(popupEdit);
  getProfile();
});

// Открыть поп-ап добавления новой карточки
addButton.addEventListener("click", () => {
  clearValidation(popupNewCard, valConfig);
  openModal(popupNewCard);
});

// Открыть поп-ап изменения аватара
editAvatarButton.addEventListener("click", () => {
  clearValidation(popupAvatarEdit, valConfig);
  openModal(popupAvatarEdit);
});

// Открыть поп-ап с картинкой
// Передаётся колбэком в функцию создания карточки
function openImagePopup(name, link) {
  openModal(popupImage);
  popupImgCaption.textContent = name;
  popupImgLink.alt = name;
  popupImgLink.src = link;
}

// Закрыть поп-ап
popups.forEach((item) => {
  // Закрыть по крестику
  item.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(item);
  });

  // Закрыть по клику на оверлей
  item.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(item);
    }
  });
});

// Заполнение формы Редактирования профиля при открытии
function getProfile() {
  profileName.value = profileInfoName.textContent;
  profileDescription.value = profileInfoDesc.textContent;
}

// Обновление профиля при закрытии формы
function setProfile(name, description) {
  profileInfoName.textContent = name;
  profileInfoDesc.textContent = description;
}

// вызов проверки валидности данных форм
enableValidation(valConfig);

// Обработчик ввода данных формы Редактирование профиля
function handleEditFormSubmit(evt) {
  function makeRequest() {
    return editUserDataRq(profileName.value, profileDescription.value).then(
      (myProfile) => {
        setProfile(myProfile.name, myProfile.about);
      }
    );
  }
  handleFormSubmit(makeRequest, evt, closeModal);
}

// Подтвердить ввод данных формы Редактирование профиля
formEdit.addEventListener("submit", handleEditFormSubmit);

// Обработчик ввода данных формы добавления новой карточки
function handleNewPlaceFormSubmit(evt) {
  function makeRequest() {
    const newCardContent = {
      name: placeName.value,
      link: placeLink.value,
    };
    return postNewCardRq(newCardContent.name, newCardContent.link).then(
      (cardContent) => {
        renderCard(cardContent, cardContent.owner._id, "prepend");
      }
    );
  }
  handleFormSubmit(makeRequest, evt, closeModal);
}

// Подтвердить добавление новой карточки
formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);

// Обработчик отправки аватара на сервер и отрисовки на странице
function handleAvatarEditSubmit(evt) {
  function makeRequest() {
    return changeAvatarRq(formAvatarEditlink.value).then((avatar) => {
      profileImage.style = `background-image: url('${avatar.avatar}')`;
    });
  }
  handleFormSubmit(makeRequest, evt, closeModal);
}

// подтвердить замену аватара
formAvatarEdit.addEventListener("submit", handleAvatarEditSubmit);
