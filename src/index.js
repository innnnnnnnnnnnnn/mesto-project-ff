import "./pages/index.css";
import { getCard } from "./components/card.js";
import { initialCards } from "./cards.js";
import { deleteCard } from "./components/card.js";
import { cardLike } from "./components/card.js";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";

const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const poputNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

function createCard(name, link) {
  const item = {
    name,
    link,
  };
  cardList.append(getCard(item, deleteCard, cardLike, OpenImageCard));
}

initialCards.forEach((item) => createCard(item.name, item.link));

//Открытие модал окно редактировать профиль
profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
});

//открытие модал окно новая карточка
poputNewCard.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//открытие картинки
function OpenImageCard(evt) {
  const popupOverviewImage = document.querySelector(".popup__image");
  const cardOverviewDesc = document.querySelector(".popup__caption");
  const image = evt.target;
  popupOverviewImage.src = image.src;
  cardOverviewDesc.textContent = image.alt;
  openPopup(popupTypeImage);
}

// Находим форму в DOM
const formElementProfile = document.querySelector("[name=edit-profile]"); // Воспользуйтесь методом querySelector()
const nameInput = document.querySelector("[name= name]"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector("[name=description]"); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Обработчик «отправки» формы
function formSubmitProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  nameInput.value;
  jobInput.value;
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formElementProfile.addEventListener("submit", formSubmitProfile);

//Форма для добавления карточки
const formElementNewplace = document.querySelector("[name=new-place]");
const inputPlaceName = document.querySelector("[name=place-name]");
const inputLink = document.querySelector("[name=link]");
const cardTitle = document.querySelector(".card__title");
const cardImageForm = document.querySelector(".card__image");

function formSubmitNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  inputPlaceName.value;
  inputLink.value;
  cardTitle.textContent = inputPlaceName.value;
  cardImageForm.src = inputLink.value;
  inputPlaceName.value = " ";
  inputLink.value = " ";
  closePopup(popupTypeNewCard);
}

formElementNewplace.addEventListener("submit", formSubmitNewPlace);

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
