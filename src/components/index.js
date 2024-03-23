import "../pages/index.css";
import { getCard } from "./card.js";
import { initialCards } from "./cards.js";
import { deleteCard } from "./card.js";
import { cardLike } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
//формы
const formElementNewplace = document.querySelector("[name=new-place]");
const formElementProfile = document.querySelector("[name=edit-profile]");
const formElement = document.querySelectorAll('.popup__form')

//input форм
const inputPlaceName = document.querySelector("[name=place-name]");
const inputLink = document.querySelector("[name=link]");
const nameInput = document.querySelector("[name= name]");
const inputElement = document.querySelectorAll('.popup__input')



const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupOverviewImage = document.querySelector(".popup__image");
const cardOverviewDesc = document.querySelector(".popup__caption");



const cardTitle = document.querySelectorAll(".card__title");
const cardImageForm = document.querySelectorAll(".card__image");
const popupInput = document.querySelector(".popup__input");
 // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector("[name=description]"); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const buttonElement = document.querySelector('.popup__button')



const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form_input-error_active",
};

function createCard(name, link) {
  const item = {
    name,
    link,
  };
  cardList.append(getCard(item, deleteCard, cardLike, openModalImage));
}

initialCards.forEach((item) => createCard(item.name, item.link));

//Открытие модал окно редактировать профиль
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupTypeEdit);
  
  
});

//открытие модал окно новая карточка
popupNewCard.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//открытие картинки
function openModalImage(evt) {
  const image = evt.target;
  popupOverviewImage.src = image.src;
  popupOverviewImage.alt = image.alt;
  cardOverviewDesc.textContent = image.alt;

  openPopup(popupTypeImage);
}

function formSubmitNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  cardImageForm.src = inputLink.value;
  cardTitle.textContent = inputPlaceName.value;
  const newCard = getCard(
    { name: inputPlaceName.value, link: inputLink.value },
    deleteCard,
    cardLike,
    openModalImage
  );
  cardList.prepend(newCard);
  formElementNewplace.reset();
  closePopup(document.querySelector(".popup_type_new-card"));
}
// Обработчик «отправки» формы
function formSubmitProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(document.querySelector(".popup_type_edit"));
}

formElementNewplace.addEventListener("submit", formSubmitNewPlace);
formElementProfile.addEventListener("submit", formSubmitProfile);





// Функция, которая добавляет класс с ошибкой
const profileInputError = (formElement, nameInput,validationConfig ,errorMessage) => {
  const profileError = formElement.querySelector(
    `.${nameInput.id}-error`
  );
  console.log(profileError)
  inputElement.classList.add(validationConfig.inputErrorClass);
  profileError.textContent = errorMessage;
  profileError.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const profileHideInputError = (formElement, inputElement,validationConfig) => {
  const profileError = formElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.remove(validationConfig.inputErrorClass);
  profileError.classList.remove(validationConfig.errorClass);
  profileError.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValidProfile = (formElement, inputElement,validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorProfile);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  //Браузерные сообщения об ошибке
  if (!inputElement.validity.valid) {
    profileInputError(
      formElement,
      inputElement,
      validationConfig,
      inputElement.validationMessage
    );
  } else {
    profileHideInputError(formElement, inputElement,validationConfig);
  }
};

//inputElement.addEventListener("input", function () {
  //isValidProfile(formElement, inputElement,validationConfig);
//});

//находим все поля формы
const setEventListeners = (formElementProfile) => {
  const inputList = Array.from(
    formElementProfile.querySelectorAll(".popup__input")
  );
  inputList.forEach((popupInput) => {
    popupInput.addEventListener("input", () => {
      isValidProfile(formElementProfile, popupInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
//setEventListeners(formElementProfile);


// Проверка наличия невалидного поля
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}; 


//функция отключения и включения кнопки 
const toggleButtonState = (inputList, buttonElement,validationConfig) => {
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
const enableValidation = (validationConfig) => {
  const formElementList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formElementList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
  
};
enableValidation(validationConfig);

