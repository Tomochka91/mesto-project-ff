// универсальный обработчик ответа сервера
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// функция изменения текста лоадера на кнопке
function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// универсальная функция обработчик сабмитов форм
export function handleFormSubmit(
  request,
  evt,
  closeModalCb,
  loadingText = "Сохранение..."
) {
  // console.log(evt.target.closest(".popup"));
  evt.preventDefault();
  // получаем источник сабмита из evt
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // меняем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // любую форму нужно очищать после успешного ответа от сервера
      // а также `reset` может запустить деактивацию кнопки сабмита (в `validate.js`)
      evt.target.reset();
    })
    .then(() => {
      // закрываем форму
      closeModalCb(evt.target.closest(".popup"));
    })
    .catch((err) => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      // возвращаем начальный текст кнопки
      renderLoading(false, submitButton, initialText);
    });
}
