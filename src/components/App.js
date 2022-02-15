import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardContext from '../contexts/CardContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
//import register from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);

  const [cardDelete, setCardDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isSuccessSignUp, setSuccessSignUp] = React.useState(false);  
  const [userEmail, setUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData)
        console.log(userData)
        setCards(cards)
        console.log(cards)
      })
      .catch(err => { console.log(err) })
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleDeleteCardClick(card) {
    setCardDelete(card)
    setDeleteCardPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setInfoTooltipOpen(false)
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api.setProfileInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api.removeCard(cardDelete)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelete._id))
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => { console.log(err) })
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true)
    api.setNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleRegistration(data) {
    auth.register(data)
      .then((data) => {
        console.log(data)
        setSuccessSignUp(true)
        history.push("/signin")
      })
      .catch(err => {
        setSuccessSignUp(false)
        console.log(err)
      })
      .finally(() => setInfoTooltipOpen(true))
  }

  function handleLogin(data) {
    auth.authorize(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push("/main");
        setUserEmail(data.email)
        //console.log(data)
      })
      .catch(err => {
        setInfoTooltipOpen(true)
        setSuccessSignUp(false)
        console.log(err)
      })
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((data) => {
          setLoggedIn(true)
          setUserEmail(data.data.email)
         //console.log(data.data.email)
        })
        .catch((err) => console.log(err))
    }
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn, history])

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setUserEmail('')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="page">
          <Header
            email={userEmail}
            logout={logout}
            loggedIn={loggedIn} />

          <Switch>
            <ProtectedRoute path="/main" loggedIn={loggedIn} >
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleDeleteCardClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike} />
            </ProtectedRoute>
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register handleRegistration={handleRegistration} />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoadingData={isLoading} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoadingData={isLoading} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoadingData={isLoading} />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccessSignUp} />

        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App;
