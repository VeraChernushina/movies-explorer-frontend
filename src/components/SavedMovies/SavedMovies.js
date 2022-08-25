import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

import { filterMovies, filterShortMovies } from '../../utils/utils';

const SavedMovies = ({
  loggedIn,
  savedMovies,
  isLoading,
  onDelete,
  setPopupMessage,
  setIsPopupOpen
}) => {
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  const handleSearchSubmit = (inputValue) => {
    const moviesList = filterMovies(savedMovies, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNotFound(true);
      setPopupMessage('Ничего не найдено.');
      setIsPopupOpen(true);
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  const handleShortFilms = () => {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem('shortSavedMovies', true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem('shortSavedMovies', false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortSavedMovies') === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMovies));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMovies);
    }
  }, [savedMovies]);

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMovies]);

    return (
    <section className='savedMovies__page'>
      <Header loggedIn={loggedIn} />
      <div className='savedMovies__content'>
        <SearchForm
          onSearchMovies={handleSearchSubmit}
          onFilter={handleShortFilms}
          shortMovies={shortMovies}
          isSavedMoviesPage={true}
        />
        {isLoading && (
          <Preloader />
        )}
        {!isLoading && (
          <MoviesCardList
            isSavedMoviesPage={true}
            movies={showedMovies}
            savedMovies={savedMovies}
            onDelete={onDelete}
          />
        )}
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;
