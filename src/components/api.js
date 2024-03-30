const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "e5f1c402-f498-41b6-a1fb-de0c968d7a0e",
    "Content-Type": "application/json",
  },
};

//Получение карточек страницы
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Получение данных о пользователе
export const userInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })

    .catch((err) => {
      console.log(err);
    });
};

export const newUserData = ( {name, about} ) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
      
    }),
  })
    .then((res) => {
      res.json();
    })

    .catch((err) => {
      console.log("ошибка запроса", err);
    });
};

export const addNewCard = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((res) => {
      return res.json;
    })
    .catch((err) => {
      console.log("ошибка запроса", err);
    });
};


export const addLikeCard = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method:"PUT",
    headers: config.headers,
  })
  .then((res) => {
    return res.json;
    
  })
  .catch((err) => {
    console.log("ошибка запроса", err)
    
  });
}


export const handleDeleteMessage = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: "DELETE",
    headers: config.headers,
  })
  .then((res)=>{
    return res.json
  })
  .catch((err)=>{
   console.log("ошибка удаления карточки",err);
  })
}



