import "../pages/index.css";
import { getCard } from "./card.js";
//import { initialCards } from "./cards.js";
import { deleteCard } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import {
  enableValidation,
  clearValidation,
  validity,
  validationConfig,
} from "./validation.js";

import { addNewCard, informationUser } from "./api.js";
import { getInitialCards } from "./api.js";
import { newUserData, changeAvatar } from "./api.js";
import { countingLikes } from './card.js'


//формы
const formElementNewplace = document.querySelector("[name=new-place]");
const formElementProfile = document.querySelector("[name=edit-profile]");
const formElementAvatar = document.querySelector('[name=avatar_form]')
const cardImageForm = document.querySelectorAll(".card__image");


//input форм
const inputPlaceName = document.querySelector("[name=place-name]");
const inputLink = document.querySelector("[name=link]");
const nameInput = document.querySelector("[name= name]");
//const inputAvatar = document.querySelector('[name=avatar]')
const inputElement = document.querySelectorAll(".popup__input");
const jobInput = document.querySelector("[name=description]");
//Значение полей
const profileTitle = document.querySelector(".profile__title");
const cardTitle = document.querySelectorAll(".card__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

let userId = '';

//попапы
const popupAvatar = document.querySelector('.popup_avatar')
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupOverviewImage = document.querySelector(".popup__image");

//прочее
const cardList = document.querySelector(".places__list");//ul
const profileEditButton = document.querySelector(".profile__edit-button");
//const popupButton = document.querySelector('popup__button')
const cardOverviewDesc = document.querySelector(".popup__caption");


//Открытие модал окно редактировать профиль
profileEditButton.addEventListener("click", function () {
  validity(formElementProfile,inputElement, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formElementProfile, validationConfig);
  openPopup(popupTypeEdit);
  
  
});

//откратие модального окна аватара
profileImage.addEventListener('click', function () {
  clearValidation(formElementAvatar, validationConfig)
  validity(formElementAvatar,inputElement, validationConfig)
  formElementAvatar.reset()
  openPopup(popupAvatar)
})

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
function infoUser(user) {
  nameInput.textContent = user.name;
  jobInput.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
  userId = user._id;
}


function renderCard(cards, userId) {//вывод карточек на стр 
  cards.forEach((item) => {
    const newCard = getCard(item, deleteCard, countingLikes, openModalImage, userId);
    cardList.appendChild(newCard);
  });
}
Promise.all([informationUser(), getInitialCards()])
  .then(([user, cards]) => {
    infoUser(user);
    renderCard(cards, userId);
  })
  .catch((err) => {
    console.log("ошибка", err);
  });

// Обработчик «отправки» формы профиля
function changesUserData(evt) {
  function makeRequest() {

    const name = nameInput.value;
    const about = jobInput.value;
    return newUserData({ name, about })
      .then((user) => {
        profileTitle.textContent = user.name;
        profileJob.textContent = user.about;
        closePopup(document.querySelector(".popup_type_edit"));
      })
  }
  handleSubmitLoading(makeRequest, evt)//универсальная функция
}

//обработчик формы новая карточка
function formAddNewCard(evt) {
  function makeRequest() {
    cardImageForm.src = inputLink.value;
    cardTitle.textContent = inputPlaceName.value;

    return addNewCard(inputPlaceName.value, inputLink.value)
      .then((item) => {
        const newCard = getCard(//добавление карточки в начало
          item,
          deleteCard,
          countingLikes,
          openModalImage,
          userId,

        );
        cardList.prepend(newCard);
        formElementNewplace.reset();
        closePopup(document.querySelector(".popup_type_new-card"));
      })
  }
  handleSubmitLoading(makeRequest, evt)//универсальная функция
}

//смена профиля
function formAvatar(evt) {
  function makeRequest() {
    const avatar = formElementAvatar.elements.avatar.value//достаем значение полей формы avatar-это поле input
    return changeAvatar({ avatar })
      .then((avatar) => {
        profileImage.setAttribute('style', `background-image: url('${avatar.avatar}')`);//Задаем div картинку 
        formElementAvatar.reset();
        closePopup(document.querySelector(".popup_avatar"));
      })
  }
  handleSubmitLoading(makeRequest, evt)//универсальная функция
}


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

//универсальная функция
function handleSubmitLoading(request, evt, loadingText = "Сохранение...") {//Передаем текст что бы он менялся при загрузке
  evt.preventDefault();
  const popupButton = evt.submitter;
  const initialText = popupButton.textContent;
  renderLoading(true, popupButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error('ошибка', err);
    })
    .finally(() => {
      renderLoading(false, popupButton, initialText, loadingText);
    });
}


formElementNewplace.addEventListener("submit", formAddNewCard);
formElementProfile.addEventListener("submit", changesUserData);
formElementAvatar.addEventListener('submit', formAvatar)

