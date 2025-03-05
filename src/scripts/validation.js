// показать ошибки валидации
const showError = (formElement, inputElement, errorMessage, valConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(valConfig.inputErrorClass);
  errorElement.classList.add(valConfig.errorClass);
  errorElement.textContent = errorMessage;
};

// скрыть ошибки валидации
const hideError = (formElement, inputElement, valConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(valConfig.inputErrorClass);
  errorElement.classList.remove(valConfig.errorClass);
  errorElement.textContent = "";
};

// проверка на валидность вводимых данных
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// переключение состояния кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// проверка вводимых данных, а так же настройка кастомных ошибок
const checkInputValidity = (formElement, inputElement, valConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      valConfig
    );
  } else {
    hideError(formElement, inputElement, valConfig);
  }
};

// настройка слушателя событий форм (переключение состояния кнопки, а так же мгновенная проверка данных на валидность)
const setEventListeners = (formElement, valConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(valConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    valConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, valConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, valConfig);
      toggleButtonState(
        inputList,
        buttonElement,
        valConfig.inactiveButtonClass
      );
    });
  });
};

// функция активации валидации на всех формах
const enableValidation = (valConfig) => {
  const formList = Array.from(
    document.querySelectorAll(valConfig.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // По сабмиту выключаем кнопку
      formElement
        .querySelector(valConfig.submitButtonSelector)
        .classList.add(valConfig.inactiveButtonClass);
    });
    setEventListeners(formElement, valConfig);
  });
};

// функция очистки валидации
const clearValidation = (formElement, valConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(valConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    inputElement.value = "";
    inputElement.classList.remove(valConfig.inputErrorClass);
  });
  const errorList = Array.from(formElement.querySelectorAll(".popup__error"));
  errorList.forEach((errorElement) => {
    errorElement.classList.remove(valConfig.errorClass);
    errorElement.textContent = "";
  });
};

export { enableValidation, clearValidation };
