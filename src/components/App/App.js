import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";

import './App.css';

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import {
  register,
  authorize,
  getContent,
  updateUserInfo,
  saveMovie,
  deleteMovie,
  getSavedMovies
} from "../../utils/MainApi";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck()
  }, [history])

  /*--------------------- Authorization ---------------------- */

  const handleRegistration = async (data) => {
    return register(data)
      .then(() => {
        history.push('/signin');
      })
      .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
      });
  };

  const handleAuthorization = async (data) => {
    return authorize(data)
      .then((data) => {
        setIsLoading(true);
        localStorage.setItem('jwt', data.token);
        Promise.all([getContent(data.token), getSavedMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem('savedMovies', JSON.stringify(userMovies));
            setSavedMovies(userMovies);
            setIsLoggedIn(true);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          })
        history.push('/movies');
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  /* --------------------- Movie cards' functions --------------------- */

  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      saveMovie(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
    }
  }

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /*--------------- Popup function ------------ */

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  /* Update user's email and name */

  const handleUpdateUser = (newUserInfo) => {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    updateUserInfo(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage('Профиль успешно редактирован!');
        setIsPopupOpen(true);
      })
      .catch(error => {
        setPopupMessage('При обновлении профиля произошла ошибка.');
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // log out function

  const handleSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setPopupMessage('');
    setSavedMovies([]);
    setIsLoggedIn(false);
    history.push('/');
  };

  const handleTokenCheck = () => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    getContent(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data)
        history.push(path);
      })
      .catch((err) => console.log(err));
    getSavedMovies(jwt)
      .then((movies) => {
        setSavedMovies(movies)
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={isLoggedIn} />
          </Route>
          <Route exact path='/signup'>
            {!isLoggedIn ? (
              <Register onRegister={handleRegistration} />
            ) : (
              <Redirect to='/' />
            )}
          </Route>
          <Route exact path='/signin'>
            {!isLoggedIn ? (
              <Login onLogin={handleAuthorization} />
            ) : (
              <Redirect to='/' />
            )}
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={isLoggedIn}
            savedMovies={savedMovies}
            onLoading={setIsLoading}
            isLoading={isLoading}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            setPopupMessage={setPopupMessage}
            setIsPopupOpen={setIsPopupOpen}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            savedMovies={savedMovies}
            loggedIn={isLoggedIn}
            isLoading={isLoading}
            onDelete={handleDeleteMovie}
            setPopupMessage={setPopupMessage}
            setIsPopupOpen={setIsPopupOpen}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={isLoggedIn}
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleSignOut}
          />
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
