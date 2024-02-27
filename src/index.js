import './pages/index.css';
import {initialCards} from './cards.js';




const cardList = document.querySelector(".places__list");
const card = document.querySelector("#card-template").content;


function getCard(item, deleteCard) {
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return cardElement;
}

function createCard(name, link) {
  item = {
    name,
    link,
  };
  cardList.append(getCard(item, deleteCard));
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

initialCards.forEach((item) => createCard(item.name, item.link));

initialCards.forEach(function(item){
  
})
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
  

