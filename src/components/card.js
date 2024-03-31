import { addLikeCard, handleDeleteCard, removeCardLike } from "./api";


export function getCard(item, deleteCard, countingLikes, openModalImage, userId) {
  const card = document.querySelector("#card-template").content;
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const accountLike = cardElement.querySelector('.like_account')
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardId = item._id
  accountLike.textContent = item.likes.length
  //удаление карточки

  cardDeleteBtn.addEventListener('click', () => {
    deleteCard(cardElement, cardId)
  })

  // Слушатель удаления карточки если пользователь является владельцем
  if (userId !== item.owner._id) {
    cardDeleteBtn.style.display = "none";
  } else {
    cardDeleteBtn.addEventListener("click", () => {
      const cardId = item._id;
      deleteCard(cardElement, cardId);
    });
  }

  likeButton.addEventListener('click', () => {
    countingLikes(likeButton, accountLike, cardId)
  })

  // Проверка наличия лайка пользователя в массиве likes
  const isLiked = item.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openModalImage);
  return cardElement;
}

//счет лайков
export function countingLikes(likeButton, accountLike, cardId) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    // операция "не нравится".
    removeCardLike(cardId)

      .then((json) => {
        likeButton.classList.toggle("card__like-button_is-active");
        accountLike.textContent = json.likes.length;

      })
      .catch((err) => {
        console.log("Произошла ошибка при удалении лайка:", err);

      });
  } else {
    // понравилась карта
    addLikeCard(cardId)
      .then((json) => {
        likeButton.classList.toggle("card__like-button_is-active");
        accountLike.textContent = json.likes.length;

      })
      .catch((err) => {
        console.log("ошибка при добавлении лайка:", err);

      });
  }
}


// Функция удаления карточки
export function deleteCard(cardElement, cardId) {
  // Отправляем запрос на сервер для удаления карточки
  handleDeleteCard(cardId)
    .then((res) => {
      // Удаляем карточку из DOM после успешного удаления
      cardElement.remove();

      // Закрываем попап после успешного удаления
      //closePopupDelete();
    })
    .catch((err) => {
      console.log("Произошла ошибка при удалении карточки:", err);
    });
}

