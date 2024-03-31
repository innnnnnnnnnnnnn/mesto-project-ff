const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "e5f1c402-f498-41b6-a1fb-de0c968d7a0e",
    "Content-Type": "application/json",
  },
};

function checkResponse(res){

    if (!res.ok) {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  
}

//Получение карточек страницы
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(res =>checkResponse(res))
    .catch((err) => {
      console.log(err);
    });
};

//Получение данных о пользователе
export const informationUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
  .then(res =>checkResponse(res))

    .catch((err) => {
      console.log(err);
    });
};
//Отредактированные данные пользователя
export const newUserData = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,

    }),
  })
  .then(res =>checkResponse(res))

    .catch((err) => {
      console.log("ошибка запроса", err);
    });
};
//создать карточку
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
  .then(res =>checkResponse(res))
    .catch((err) => {
      console.log("ошибка запроса", err);
    });
};

//поставить лайк карточки
export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(res =>checkResponse(res))
    .catch((err) => {
      console.log("ошибка запроса", err)
    });
}
//удаление лайка скарточки
export const removeCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(res =>checkResponse(res))
    .catch((err) => {
      console.log("ошибка запроса", err)

    });
}

//удаление карточки
export const handleDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(res =>checkResponse(res))
    .catch((err) => {
      console.log("ошибка удаления карточки", err);
    })
}

//Получение аватара
export const changeAvatar = ({ avatar }) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,

    }),
  })
  .then(res =>checkResponse(res))
    .catch((err) => {

      console.log(avatar, err);
    });
};


