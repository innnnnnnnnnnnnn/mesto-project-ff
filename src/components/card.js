export function getCard(item, deleteCard, cardLike, openModalImage) {
  const card = document.querySelector("#card-template").content;
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener(".click", cardLike);
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", cardLike);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openModalImage);
  return cardElement;
}

//Удаление карточки
export function deleteCard(event) {
  event.target.closest(".card").remove();
}

//функция лайка
export function cardLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
