import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

import { search, filter } from '../../utils/utils';

const SavedMovies = ({
  loggedIn,
  movies,
  isLoading,
  onDelete
}) => {
  const [renderedMovies, setRenderedMovies] = useState(movies);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMovieFilter, setIsMovieFilter] = useState(false);

  useEffect(() => {
    if (movies.length === 0) {
      setErrorMessage('Вы еще ничего не сохранили')
    } else {
      setRenderedMovies(movies);
      setErrorMessage(null);
    }
  }, [movies])


  function handleSearchSavedMovies(searchRequest, isMovieFilter) {
    const searchedFilms = search(movies, isMovieFilter, searchRequest);
    if (searchedFilms.length === 0) {
      setErrorMessage('Ничего не найдено.')
      setRenderedMovies([]);
    } else {
      setRenderedMovies(searchedFilms);
    }
  }

  function toggleShortMoviesFilter() {
    setIsMovieFilter(!isMovieFilter)
    if (!isMovieFilter && movies) {
      const showedShortMovies = filter(movies, isMovieFilter);
      if (showedShortMovies.length === 0) {
        setErrorMessage('Ничего не найдено');
        setRenderedMovies([]);
      } else {
        setRenderedMovies(showedShortMovies);
      }
    } else if (isMovieFilter && movies) {
      setErrorMessage(null);
      setRenderedMovies(movies);
    }
  }

  return (
    <section className='savedMovies__page'>
      <Header loggedIn={loggedIn} />
      <div className='savedMovies__content'>
        <SearchForm
          isMovieFilter={isMovieFilter}
          onSearchMovies={handleSearchSavedMovies}
          onFilter={toggleShortMoviesFilter}
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
            savedMovies={movies}
            onDelete={onDelete}
          />
        )}
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;
