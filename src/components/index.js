import "../pages/index.css";
import { getCard } from "./card.js";
import { initialCards } from "./cards.js";
import { deleteCard } from "./card.js";
import { cardLike } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import {
  enableValidation,
  clearValidation,
  validity,
  validationConfig,
} from "./validation.js";

import { addNewCard, userInformation } from "./api.js";
import { getInitialCards } from "./api.js";
import { newUserData } from "./api.js";


//формы
const formElementNewplace = document.querySelector("[name=new-place]");
const formElementProfile = document.querySelector("[name=edit-profile]");
const profileImage = document.querySelector(".profile__image");

//input форм
const inputPlaceName = document.querySelector("[name=place-name]");
const inputLink = document.querySelector("[name=link]");
const nameInput = document.querySelector("[name= name]");
const inputElement = document.querySelectorAll(".popup__input");
const jobInput = document.querySelector("[name=description]");

const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupOverviewImage = document.querySelector(".popup__image");
const cardOverviewDesc = document.querySelector(".popup__caption");
let userId;
const cardTitle = document.querySelectorAll(".card__title");
const cardImageForm = document.querySelectorAll(".card__image");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function createCard(name, link) {
  const item = {
    name,
    link,
  };
  //cardList.append(getCard(item, deleteCard, cardLike, openModalImage));
}

initialCards.forEach((item) => createCard(item.name, item.link));

//Открытие модал окно редактировать профиль
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupTypeEdit);
  clearValidation(formElementProfile, validationConfig);
  validity(inputElement);
});

//открытие модал окно новая карточка
popupNewCard.addEventListener("click", function () {
  clearValidation(formElementNewplace, validationConfig);
  formElementNewplace.reset();
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

enableValidation(validationConfig);

//Устанавливаем значения соответствующим эл.стр
function userInfo(user) {
  nameInput.textContent = user.name;
  jobInput.textContent = user.about;
  profileImage.style.backgroundImage = user.avatar;
  
  
}



Promise.all([userInformation(), getInitialCards()])
  .then(([user, cards]) => {
const userId = user._id;
    userInfo(user);
    //renderCard(cards);
cards.forEach((card) => {
    const newCard = getCard(card, deleteCard, cardLike, openModalImage,userId,);
    cardList.appendChild(newCard);
}
)})
  .catch((err) => {
    console.log("ошибка", err);
  });

// Обработчик «отправки» формы профиля
function changesUserData(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  const name = nameInput.value;
  const about = jobInput.value;
  return newUserData({ name: name, about: about })
    .then(() => {
      closePopup(document.querySelector(".popup_type_edit"));
    })
    .catch((err) => {
      console.log("ошибка", err);
    });
}

//обработчик новая карточка
function formAddNewCard(evt) {
  evt.preventDefault();
  cardImageForm.src = inputLink.value;
  cardTitle.textContent = inputPlaceName.value;
  const name = inputPlaceName.value;
  const link = inputLink.value;
  return addNewCard({ name: name, link: link })
    .then((card) => {
      const ownerId = card.owner_id;
      const newCard = getCard(//добавление карточки в начало
      { name: name, link: link },
      card,
      deleteCard,
      cardLike,
      openModalImage,
      ownerId
    );
    cardList.prepend(newCard);
      formElementNewplace.reset();
closePopup(document.querySelector(".popup_type_new-card"));
    })
    .catch((err) => {
      console.log("ошибка", err);
    });
}



formElementNewplace.addEventListener("submit", formAddNewCard);
formElementProfile.addEventListener("submit", changesUserData);

