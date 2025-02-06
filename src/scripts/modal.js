// Функция открытия поп-апа
function openModal(item) {
  item.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

// Функция закрытия поп-апа
function closeModal(item) {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

// Обработчик нажатия на клавишу Esc
function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal };
