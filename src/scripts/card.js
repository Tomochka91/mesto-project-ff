// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(cardContent, deleteCardCb, openImagePopupCb, likeCardCb) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardElement.querySelector(".card__title").textContent = cardContent.name;

  deleteButton.addEventListener("click", () => {
    deleteCardCb(cardElement);
  });

  cardImage.addEventListener("click", () => {
    openImagePopupCb(cardContent.name, cardContent.link);
  });

  likeButton.addEventListener("click", likeCardCb);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
