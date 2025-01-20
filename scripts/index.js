// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardContent, deleteCardCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".card__image").src = cardContent.link;
  cardElement.querySelector(
    ".card__image"
  ).alt = `На фото: ${cardContent.name}`;
  cardElement.querySelector(".card__title").textContent = cardContent.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCardCallback);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;

  eventTarget.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  placesList.append(createCard(element, deleteCard));
});
