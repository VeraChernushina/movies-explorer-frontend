import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

import { search, filterShortMovies } from '../../utils/utils';

const SavedMovies = ({
  loggedIn,
  savedMovies,
  isLoading,
  onDelete
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isShortMoviesInSM, setIsShortMoviesInSM] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState(savedMovies);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setErrorMessage('Вы еще ничего не сохранили')
    } else {
      setRenderedMovies(savedMovies);
      setErrorMessage('');
    }
  }, [savedMovies])


  const handleSearchMovies = (searchInput, isShortMovies, reset) => {
    const searchedFilms = search(savedMovies, isShortMovies, searchInput);
    if (searchedFilms.length === 0) {
      setErrorMessage('Ничего не найдено.')
      setRenderedMovies([]);
      reset();
    } else {
      setRenderedMovies(searchedFilms);
    }
  }

  const toggleShortMoviesFilter = () => {
    setIsShortMoviesInSM(!isShortMoviesInSM)
    if (!isShortMoviesInSM && savedMovies) {
      const showedShortMovies = filterShortMovies(savedMovies);
      if (showedShortMovies.length === 0) {
        setErrorMessage('Ничего не найдено');
        setRenderedMovies([]);
      } else {
        setRenderedMovies(showedShortMovies);
      }
    } else if (isShortMoviesInSM && savedMovies) {
      setErrorMessage('');
      setRenderedMovies(savedMovies);
    }
  }

  return (
    <section className='savedMovies__page'>
      <Header loggedIn={loggedIn} />
      <div className='savedMovies__content'>
        <SearchForm
          isMovieFilter={isShortMoviesInSM}
          onSearchMovies={handleSearchMovies}
          onFilter={toggleShortMoviesFilter}
          disabled={!savedMovies.length}
          isSavedMoviesPage={true}
        />
        {isLoading && (
          <Preloader />
        )}
        {(errorMessage && !isLoading) && (
          <p className='savedMovies__message'>{errorMessage}</p>
        )}
        {(!isLoading && !errorMessage) && (
          <MoviesCardList
            isSavedMoviesPage={true}
            movies={renderedMovies}
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
