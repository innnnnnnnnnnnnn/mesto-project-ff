import "../pages/index.css";
import { getCard } from "./card.js";
import { initialCards } from "./cards.js";
import { deleteCard } from "./card.js";
import { cardLike } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";

const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupOverviewImage = document.querySelector(".popup__image");
const cardOverviewDesc = document.querySelector(".popup__caption");
const formElementNewplace = document.querySelector("[name=new-place]");
const inputPlaceName = document.querySelector("[name=place-name]");
const inputLink = document.querySelector("[name=link]");
const cardTitle = document.querySelectorAll(".card__title");
const cardImageForm = document.querySelectorAll(".card__image");
const formElementProfile = document.querySelector("[name=edit-profile]"); // Воспользуйтесь методом querySelector()
const popupInput = document.querySelector(".popup__input");
const nameInput = document.querySelector("[name= name]"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector("[name=description]"); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

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

//добавляем атрибуты
nameInput.setAttribute("minlength", 2);
nameInput.setAttribute("maxlength", 40);
jobInput.setAttribute("minlength", 2);
jobInput.setAttribute("maxlength", 200);

formElementProfile.setAttribute("novalidate", "");

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElementProfile, popupInput, errorMessage) => {
  const profileError = formElementProfile.querySelector(
    `.${popupInput.id}-error`
  );
  console.log(profileError);
  popupInput.classList.add("form__input_type_error");
  profileError.textContent = errorMessage;
  profileError.classList.add("profile_input-error_active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElementProfile, popupInput) => {
  const profileError = formElementProfile.querySelector(
    `.${popupInput.id}-error`
  );
  popupInput.classList.remove("form__input_type_error");
  profileError.classList.remove("profile_input-error_active");
  profileError.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElementProfile, popupInput) => {
  if (popupInput.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    popupInput.setCustomValidity(popupInput.dataset.errorProfile);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    popupInput.setCustomValidity("");
  }
  //Браузерные сообщения об ошибке
  if (!popupInput.validity.valid) {
    showInputError(
      formElementProfile,
      popupInput,
      popupInput.validationMessage
    );
  } else {
    hideInputError(formElementProfile, popupInput);
  }
};

popupInput.addEventListener("input", function () {
  isValid(formElementProfile, popupInput);
});

//находим все поля формы
const setEventListeners = (formElementProfile) => {
  const inputList = Array.from(
    formElementProfile.querySelectorAll(".popup__input")
  );
  console.log(inputList);
  inputList.forEach((popupInput) => {
    popupInput.addEventListener("input", () => {
      isValid(formElementProfile, popupInput);
    });
  });
};
setEventListeners(formElementProfile);
