import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import "../pages/index.css";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
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

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  placesList.append(createCard(element, deleteCard, openImagePopup, likeCard));
});

// Открыть поп-ап Редактировать профиль
editButton.addEventListener("click", () => {
  openModal(popupEdit);
  getProfile();
});

// Открыть поп-ап добавления новой карточки
addButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

// Закрыть поп-ап
popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
    // Закрыть по крестику
    if (evt.target.classList.contains("popup__close")) {
      closeModal(item);
    }
    // Закрыть по клику на оверлей
    if (evt.currentTarget === evt.target) {
      closeModal(item);
    }
  });
});

// Обработчик клика по картинке карточки.
// Передаётся колбэком в функцию создания карточки
function openImagePopup(name, img) {
  openModal(popupImage);
  popupImgCaption.textContent = name;
  popupImgLink.src = img.src;
  popupImgLink.alt = img.alt;
}

// Заполнение формы Редактирования профиля при открытии
function getProfile() {
  profileName.value = profileInfoName.textContent;
  profileDescription.value = profileInfoDesc.textContent;
}

// Обновление профиля при закрытии формы
function setProfile() {
  profileInfoName.textContent = profileName.value;
  profileInfoDesc.textContent = profileDescription.value;
}

// Обработчик ввода данных формы Редактирование профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  setProfile();
  closeModal(popupEdit);
}

// Подтвердить ввод данных формы Редактирование профиля
formEdit.addEventListener("submit", handleEditFormSubmit);

// Обработчик ввода данных формы добавления новой карточки
function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCardContent = {};
  newCardContent.name = placeName.value;
  newCardContent.link = placeLink.value;

  placesList.prepend(
    createCard(newCardContent, deleteCard, openImagePopup, likeCard)
  );
  formNewPlace.reset();

  closeModal(popupNewCard);
}

// Подтвердить добавление новой карточки
formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);
