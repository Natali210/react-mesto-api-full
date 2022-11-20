import Header from './Header';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import { api } from "../utils/Api";
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import * as auth from "../utils/mestoAuth";
import InfoTooltip from "./InfoTooltip";

const App = () => {
  //Создаем переменные, отвечающие за видимость попапов, чтобы изменять их значения при клике
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  
  //Переменные для карточек и пользователя
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  //Эффект, который вызывает Api для обновления значений пользователя и получения карточек
  useEffect(() => {
    if (!loggedIn) return;

    api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });

    api.getCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }, [loggedIn]);

  //Обработчик для открытия попапа с изображением
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImageOpen(true);
  }

  //Обработчик для обновления лайков
  function handleCardLike(card) {
    console.log(card);
    // Проверяем наличие лайка на карточке
    const isLiked = card.likes.includes(currentUser._id);
    api.changeLikeCardStatus(card, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => 
      (c._id === card._id ? newCard : c)));
      console.log(newCard);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  //Обработчик, обновляющий стейт cards - создается копия массива без удаленой карточки
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  
  //Обработчик, обновляющий стейт по пользователю после завершения api-запроса
  function handleUpdateUser(data) {
    api.setProfileInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
  }

  //Обработчик, обновляющий стейт по аватару после завершения api-запроса
  function handleUpdateAvatar(currentUser) {
    api.addNewAvatar(currentUser)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });     
  }

  //Обработчик, обновляющий стейт карточек после завершения api-запроса
  function handleAddPlace(card) {
    api.addCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
    setIsInfoTooltip(false);
  }

  //Регистрация
  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(() => {
        setIsConfirmed(true);
        setIsInfoTooltip(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsConfirmed(false);
        setIsInfoTooltip(true);
      });
  }
  
  //Авторизация
  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then((token) => {
        if (!token) return;
        setLoggedIn(true);
        setUserEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltip(true);
        setIsConfirmed(false);
      });
  }

  //Разлогин
  function logout() {
    auth.logout();
    setLoggedIn(false);
    history.push("/sign-in");
  }

  //Сохранение пользователя, зашедшего в систему
  useEffect(() => {
    function tokenCheck() {
      return auth.getContent()
      .then((data) => {
        setUserEmail(data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }

    tokenCheck();
  // eslint-disable-next-line
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header 
          loggedIn={loggedIn}
          userEmail={userEmail} 
          logout={logout}/>

          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Main
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onCardClick={handleCardClick}
              closePopup={closeAllPopups}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          </Switch>            

          <Footer />         

          <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonTitle="Да">
          </PopupWithForm>

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlace}/>

          <ImagePopup 
            name="imagePopup"
            card={selectedCard} 
            isImageOpen={isImageOpen} 
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltip} onClose={closeAllPopups} isConfirmed={isConfirmed}
            successInfo="Вы успешно зарегистрировались!" unsuccessInfo="Что-то пошло не так! Попробуйте ещё раз."
          />
        </div>
      </div>
    </CurrentUserContext.Provider>     
  );
}

export default App;