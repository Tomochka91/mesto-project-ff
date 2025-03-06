import { checkResponse } from "./utils/utils.js";

// Создадим исходные данные для формирования запросов
// это нужно в constants.js переносить?
const dataConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "92cfc93b-ec92-44df-9b10-c6244e74d585",
    "Content-Type": "application/json",
  },
};

function request(endpoint, options) {
  return fetch(`${dataConfig.baseUrl}${endpoint}`, options).then(checkResponse);
}

// подключимся к серверу для получения исходных карточек
const getInitialCardsRq = () => {
  return request("/cards", {
    headers: dataConfig.headers,
  });
};

// подключимся к серверу для получения моих данных
const getUserIdRq = () => {
  return request("/users/me", {
    headers: dataConfig.headers,
  });
};

export const promises = [getInitialCardsRq(), getUserIdRq()];

// отправим на сервер данные отредактированного профиля
export const editUserDataRq = (profileName, profileDescription) => {
  return request("/users/me", {
    method: "PATCH",
    headers: dataConfig.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  });
};

// отправка на сервер данных новой карточки
export const postNewCardRq = (cardName, cardLink) => {
  return request("/cards", {
    method: "POST",
    headers: dataConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  });
};

// удаление карточки с сервера
export const deleteCardRq = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
    headers: dataConfig.headers,
  });
};

// отправка данных на сервер о поставленном лайке
export const putLikeRq = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    headers: dataConfig.headers,
  });
};

// удаление поставленного лайка с сервера
export const deleteLikeRq = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: dataConfig.headers,
  });
};

// отправка на сервер измененного аватара
export const changeAvatarRq = (profileAvatar) => {
  return request("/users/me/avatar", {
    method: "PATCH",
    headers: dataConfig.headers,
    body: JSON.stringify({
      avatar: profileAvatar,
    }),
  });
};
