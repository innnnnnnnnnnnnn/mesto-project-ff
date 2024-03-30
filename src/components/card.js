import { addLikeCard, handleDeleteMessage } from "./api";


export function getCard(item, deleteCard, cardLike, openModalImage,userId) {
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
  const userOwner = item.owner_id;
  //удаление карточки
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', (evt) => {
        handleDeleteMessage(cardId)
        .then(() => {
            deleteCard(evt);
        })
        .catch((err) => {
            console.log(err);
        })
    
    });

    if(!myDeleteCard(userId,userOwner)){
      cardDeleteBtn.remove()
    }

    likeButton.addEventListener('click',(evt)=>{
      addLikeCard(cardId)
      .then(()=>{
        cardLike(evt)
      })
      .catch((err)=>{
        console.log(err);
      })
    })
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", cardLike);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openModalImage);
  return cardElement;
}

//Удаление карточки
export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

//функция лайка
export function cardLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}


//реализация удаления только своей карточки 
function myDeleteCard(userId, userOwner) {{
  if (userId === userOwner) {
      return true;
  }}}


  //счет лайков
  function countingLikes(cardId){
    return addLikeCard(cardId)
    .then((res)=>{
      evt.target.classList.toggle("card__like-button_is-active");
      accountLike.textContent= res.likes.lenght
    })
    .catch((err)=>{
      console.log('ошибка лайка',err);
    })
  }
  countingLikes()