import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";

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

import moviesApi from "../../utils/MovieApi";
import {
  register,
  authorize,
  getContent,
  updateUserInfo,
  saveMovie,
  deleteMovie,
  getSavedMovies,
} from "../../utils/MainApi";

import { search } from "../../utils/utils";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // movies' state
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  // popup and errors
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    handleTokenCheck()
  }, [history])

  /* --------------------- Movie cards' functions --------------------- */

  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    const film = savedMovies.find(item => item.movieId === movie.id);
    const isSaved = Boolean(film);
    const id = film ? film._id : null;
    if (isSaved) {
      setIsLoading(true);
      deleteMovie(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(item => card._id !== item.id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false);
        })
      return;
    };
    saveMovie(movie, jwt)
      .then((savedMovie) => {
        setSavedMovies(prevState => [...prevState, savedMovie]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    setIsLoading(true);
    deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        setSavedMovies(updatedSavedMovies);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // search movies by search request

  const searchMovies = (searchRequest, isMovieFilter) => {
    if (searchRequest.trim() === '') {
      setPopupMessage('Нужно ввести ключевое слово');
      setIsPopupOpen(true);
      return;
    }
    setIsLoading(true);
    if (movies.length === 0) {
      moviesApi.getMovies()
        .then((data) => {
          setMovies(data);
          const filteredMovies = search(movies, isMovieFilter, searchRequest);
          localStorage.setItem('searchRequest', searchRequest);
          localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
          localStorage.setItem('filter', isMovieFilter);
          setSearchedMovies(filteredMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      const filteredMovies = search(movies, isMovieFilter, searchRequest);
      localStorage.setItem('searchRequest', searchRequest);
      localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
      localStorage.setItem('filter', isMovieFilter);
      setSearchedMovies(filteredMovies);
      setIsLoading(false);
    }
  }

  // search saved movies by request

  const searchSavedMovies = (searchRequest, isMovieFilter) => {
    if (searchRequest.trim() === '') {
      setPopupMessage('Нужно ввести ключевое слово');
      setIsPopupOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const filteredMovies = search(savedMovies, isMovieFilter, searchRequest);
      localStorage.setItem('searchedSavedMovies', filteredMovies);
    } catch (error) {
      setPopupMessage(error);
      setIsPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  /*--------------- Popup function ------------ */

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage(null);
  };

  /*--------------------- Authorization and Log out ---------------------- */

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      localStorage.removeItem('jwt');
    }
    setIsLoading(true);
    Promise.all([getContent(jwt), getSavedMovies(jwt)])
      .then(([userInfo, userMovies]) => {
        setCurrentUser(userInfo);
        localStorage.setItem('savedMovies', userMovies)
        setSavedMovies(userMovies);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleRegistration = (data) => {
    return register(data)
      .then(() => {
        history.push('/signin');
      })
      .catch(error => {
        setPopupMessage('При регистрации пользователя произошла ошибка.');
        setIsPopupOpen(true);
      });
  };

  const handleAuthorization = (data) => {
    return authorize(data)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        handleTokenCheck();
        setIsLoggedIn(true);
        history.push('/movies');
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  /* Update user's email and name */

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    updateUserInfo(jwt, newUserInfo)
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
    localStorage.removeItem('jwt');
    localStorage.clear();
    history.push('/');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setPopupMessage(null);
    setMovies(null);
    setSavedMovies(null);
    setSearchedMovies(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={isLoggedIn} />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={isLoggedIn}
            movies={searchedMovies}
            savedMovies={savedMovies}
            onSearchMovies={searchMovies}
            isLoading={isLoading}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            movies={savedMovies}
            loggedIn={isLoggedIn}
            onSearchMovies={searchSavedMovies}
            isLoading={isLoading}
            onDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={isLoggedIn}
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleSignOut}
          />
          <Route exact path='/signup'>
            <Register onRegister={handleRegistration} />
          </Route>
          <Route exact path='/signin'>
            <Login onLogin={handleAuthorization} />
          </Route>

          <Route exact path='/movies'>
            {isLoggedIn ? <Redirect to='/movies' /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/saved-movies'>
            {isLoggedIn ? <Redirect to='/saved-movies' /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/profile'>
            {isLoggedIn ? <Redirect to='/profile' /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/signup'>
            {!isLoggedIn ? <Redirect to='/signup' /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/signin'>
            {!isLoggedIn ? <Redirect to='/signin' /> : <Redirect to='/' />}
          </Route>
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
