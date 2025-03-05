// Создадим исходные данные для формирования запросов
const dataConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "92cfc93b-ec92-44df-9b10-c6244e74d585",
    "Content-Type": "application/json",
  },
};

// подключимся к серверу для получения исходных карточек
const getInitialCardsRq = () => {
  return fetch(`${dataConfig.baseUrl}/cards`, {
    headers: dataConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    //если ошибка отклоним промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// подключимся к серверу для получения моих данных
const getUserIdRq = () => {
  return fetch(`${dataConfig.baseUrl}/users/me`, {
    headers: dataConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    //если ошибка отклоним промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const promises = [getInitialCardsRq(), getUserIdRq()];

// отправим на сервер данные отредактированного профиля
export const editUserDataRq = (profileName, profileDescription) => {
  return fetch(`${dataConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: dataConfig.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// отправка на сервер данных новой карточки
export const postNewCardRq = (cardName, cardLink) => {
  return fetch(`${dataConfig.baseUrl}/cards`, {
    method: "POST",
    headers: dataConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// удаление карточки с сервера
export const deleteCardRq = (cardId) => {
  return fetch(`${dataConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: dataConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// отправка данных на сервер о поставленном лайке
export const putLikeRq = (cardId) => {
  return fetch(`${dataConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: dataConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// удаление поставленного лайка с сервера
export const deleteLikeRq = (cardId) => {
  return fetch(`${dataConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: dataConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// отправка на сервер измененного аватара
export const changeAvatarRq = (profileAvatar) => {
  return fetch(`${dataConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: dataConfig.headers,
    body: JSON.stringify({
      avatar: profileAvatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
