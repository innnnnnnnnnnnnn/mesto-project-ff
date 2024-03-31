export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form_input-error_active",
};

// Функция, которая добавляет класс с ошибкой
const InputProfileError = (formElement, inputElement, validationConfig) => {
  const profileError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  profileError.textContent = inputElement.validationMessage;
  profileError.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const inputProfileError = (formElement, inputElement, validationConfig) => {
  const profileError = document.querySelector(`.${inputElement.id}-error`);
  profileError.textContent = "";
  inputElement.classList.remove(validationConfig.inputErrorClass);
  profileError.classList.remove(validationConfig.errorClass);
};

// Функция, которая проверяет валидность поля
const isValidProfile = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  //Браузерные сообщения об ошибке
  if (!inputElement.validity.valid) {
    InputProfileError(
      formElement,
      inputElement,
      validationConfig,
      inputElement.validationMessage
    );
  } else {
    inputProfileError(formElement, inputElement, validationConfig);
  }
};

//находим все поля формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValidProfile(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};
//setEventListeners(formElementProfile);

// Проверка наличия невалидного поля
export const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

//функция отключения и включения кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

//Поиск всех форм
export const enableValidation = (validationConfig) => {
  const formElementList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formElementList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};
//Очистка ошибок полей span
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    document.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    inputProfileError(formElement, inputElement, validationConfig);
    inputElement.textContent = "";
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
};

//Повторная валидаця при открытии
export function validity(inputElement,validationConfig) {
  const buttonElement = document.querySelector(validationConfig.submitButtonSelector)
  if (inputElement.value === validity.valid) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  } else {
  }
}
