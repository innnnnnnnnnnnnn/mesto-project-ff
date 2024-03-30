import { addLikeCard, handleDeleteCard, removeCardLike } from "./api";


export function getCard(item, deleteCard, countingLikes, openModalImage,userId) {
  const card = document.querySelector("#card-template").content;
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const accountLike = cardElement.querySelector('.like_account')
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardId=item._id
 console.log(userId);
 console.log(item);
  const userOwner = item.owner_id;
  //удаление карточки
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', ()=>{
      deleteCard(cardElement,cardId)
    })
// Слушатель удаления карточки если пользователь является владельцем
//if (userId !== item.owner._id) {
 // cardDeleteBtn.style.display = "none";
 // console.log(userId);
  //} else {
  //cardDeleteBtn.addEventListener("click", () => {
  //  const cardId = item._id;
   // console.log(cardId);
  //  deleteCardCallback(cardElement , cardId);
 // });
//}

    likeButton.addEventListener('click',()=>{
       countingLikes(likeButton,accountLike,item)
      })
      
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", countingLikes);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openModalImage);
  return cardElement;
}

//Удаление карточки
//export function deleteCard(evt) {
  
//}



  //счет лайков
 export function countingLikes(likeButton,accountLike,item){
    if (likeButton.classList.contains("card__like-button_is-active")) {
      // операция "не нравится".
      removeCardLike(item._id)
      .then((res) => {
        console.log(item._id);
        likeButton.classList.toggle("card__like-button_is-active");
        accountLike.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log("Произошла ошибка при удалении лайка:", err);
      });
    } else {
      // понравилась карта
      addLikeCard(item._id)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        accountLike.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("ошибка при добавлении лайка:", err);
      });
    }
  }
let cards='';

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
      console.log(cardElement);
    });
}

  