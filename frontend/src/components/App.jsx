import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import { api } from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";

function App() {
  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const[registrationPopupOpen, setRegistrationPopupOpen] = React.useState(false);
  const[loggedIn, setLoggedIn] = React.useState(false);
  const[regStatus, setRegStatus] = React.useState(true);
  const[usersMail, setUsersMail] = React.useState('');
  const[selectedCard, setSelectedCard] = React.useState({})
  const[currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if(loggedIn) {
      api.getInitialCards()
      .then((result) => {
          setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[loggedIn]);

  React.useEffect(() => {
    if(loggedIn) {
      api.getProfileInfo ()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((authData) => {
          setUsersMail(authData.email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        })
        .catch(err => console.log(err));
    }
  },[navigate]);


  function handleEditProfileClick() {setIsEditProfilePopupOpen(true)};
  function handleAddPlaceClick() {setIsAddPlacePopupOpen(true)};
  function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true)};
  function handleCardClick(card) {setSelectedCard(card)};

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setRegistrationPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => console.error(error))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(error => console.error(error))
  } 

  function handleUpdateUser(data) {
    api.setProfileInfo(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  function handleRegister(data) {
    const { email, password } = data;
    auth.register(email, password)
    .then(() => {
      setRegStatus(true);
      setRegistrationPopupOpen(true);
      navigate('/sign-in', {replace: true});
    })
    .catch(() => {
      setRegistrationPopupOpen(true);
      setRegStatus(false);
    })
  }

  function handleLogin(data) {
    const { email, password } = data;
    auth.login(email, password)
    .then((res) => {
      setLoggedIn(true);
      setUsersMail(email);
      localStorage.setItem('jwt', res.token);
      navigate('/', {replace: true});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function handleSignout() {
    setUsersMail('');
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in', {replace: true});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={usersMail} handleSignout={handleSignout}/>
        
        <Routes>
          <Route path="/" 
            element={
              <ProtectedRouteElement 
                loggedIn={loggedIn} 
                element={Main} 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike ={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            } 
          />
          <Route path="/sign-up" 
            element={
              <Register handleRegister={handleRegister}/>
            }
          />
          <Route path="/sign-in" 
            element={
              <Login handleLogin={handleLogin}/>
            } 
          />
        </Routes>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

        <PopupWithForm name='delete-image' title='Вы уверены?' buttonText='Да'/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <InfoTooltip 
          status={regStatus}
          isOpen={registrationPopupOpen}
          onClose={closeAllPopups}
        />
      
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
