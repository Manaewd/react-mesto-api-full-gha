import React, { useState, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../utils/Api";
import auth from "../utils/Auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [RegSuccess, setRegSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [emailHeader, setEmailHeader] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((result) => {
          const [userData, cardsData] = result;
          setCurrentUser(userData);
          setCards(cardsData);
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
        setRegSuccess(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setRegSuccess(false);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }
  

  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then(() => {
        setLoggedIn(true);
        setEmailHeader(email);
      })
      .catch((err) => {
        setRegSuccess(false);
        setIsInfoTooltipOpen(true)
        console.log(err);
      });
  }

  function handleTokenCheck() {
      auth
        .checkToken()
        .then((user) => {
          setLoggedIn(true);
          setEmailHeader(user.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
        state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((newCard) => newCard.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }


  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in');
      })
      .catch((err) => console.log(err));
  }

  function handleClickMenuOpen() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          emailHeader={emailHeader}
          onLogOut={handleLogout}
          menuOpen={handleClickMenuOpen}
          isOpen={isMobileMenuOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} /> } />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} /> } />
          <Route path="/" element={ loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" /> } />
          <Route path="*" element={ !loggedIn ? ( <Navigate to="/sign-up" /> ) : ( <Navigate to="/sign-in" /> ) } />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          textButton="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          RegSuccess={RegSuccess}
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          textRegistrationSuccess={"Вы успешно зарегистрировались!"}
          textRegistrationSuccessFalse={"Что-то пошло не так! Попробуйте ещё раз."}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;