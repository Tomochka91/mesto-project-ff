// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(
  cardContent,
  myId,
  deleteCardCb,
  openImagePopupCb,
  putLikeRq,
  deleteLikeRq,
  deleteRq
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".like-counter");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardElement.querySelector(".card__title").textContent = cardContent.name;

  if (myId === cardContent.owner._id) {
    // Если карточка моя, то я могу её удалить
    deleteButton.addEventListener("click", () => {
      deleteRq(cardContent._id)
        .then(() => {
          deleteCardCb(cardElement);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    // если карточка не моя, убираем кнопку удаления
    deleteButton.remove();
  }

  cardImage.addEventListener("click", () => {
    openImagePopupCb(cardContent.name, cardContent.link);
  });

  // Если мы уже лайкали эту карточку, то это нужно отобразить при прорисовке
  if (isMyLike(myId, cardContent.likes)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  // Обновим кол-во лайков
  likeCounter.textContent = cardContent.likes.length;

  likeButton.addEventListener("click", () => {
    // если мой лайк на карточке, добавляем возможность убрать лайк
    if (isMyLike(myId, cardContent.likes)) {
      deleteLikeRq(cardContent._id)
        // можно объединить повторяющиеся шаги в вызов одной функции
        .then((cardContentFb) => {
          // обновляем контент карточки включая лайки
          cardContent = cardContentFb;
        })
        .then(() => {
          likeCounter.textContent = cardContent.likes.length;
        })
        .then(() => {
          likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // добавляем возможность лайкать карточки
      putLikeRq(cardContent._id)
        .then((cardContentFb) => {
          cardContent = cardContentFb;
        })
        .then(() => {
          likeCounter.textContent = cardContent.likes.length;
        })
        .then(() => {
          likeButton.classList.add("card__like-button_is-active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// функция проверки на мой лайк
function isMyLike(myId, likes) {
  return likes
    .map((liker) => {
      return liker._id;
    })
    .includes(myId);
}

export { createCard, deleteCard };
