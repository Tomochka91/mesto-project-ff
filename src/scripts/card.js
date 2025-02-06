// const cardTemplate = document.querySelector("#card-template").content;
import { cardTemplate } from "./index.js";

// Функция создания карточки
function createCard(cardContent, deleteCardCb, openImagePopupCb, likeCardCb) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardContent.link;
  cardImage.alt = `На фото: ${cardContent.name}`;
  cardElement.querySelector(".card__title").textContent = cardContent.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCardCb);

  cardImage.addEventListener("click", () => {
    openImagePopupCb(cardContent.name, cardImage);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCardCb);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;

  eventTarget.parentElement.remove();
}

// Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
