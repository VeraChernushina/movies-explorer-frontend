import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

import './Movies.css';

const Movies = ({
  loggedIn,
  onSearchMovies,
  isLoading,
  movies,
  savedMovies,
  onSave,
  onDelete
}) => {
  const [renderedMovies, setRenderedMovies] = useState(movies);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMovieFilter, setIsMovieFilter] = useState(false);

  useEffect(() => {
    const searchedMovies = localStorage.getItem('searchedMovies') ? JSON.parse(localStorage.getItem('searchedMovies')) : null;
    if (!searchedMovies) {
      setErrorMessage('Для поиска фильма введите слово');
    } else if (searchedMovies && searchedMovies.length === 0) {
      setErrorMessage('Ничего не найдено');
    } else {
      setRenderedMovies(searchedMovies);
      setErrorMessage('');
    }
  }, [movies, savedMovies])

  return (
    <section>
      <Header loggedIn={loggedIn} />
      <div className='movies__content'>
        <SearchForm
          isMovieFilter={isMovieFilter}
          onSearchMovies={onSearchMovies}
          onFilter={setIsMovieFilter}
        />
        {errorMessage ? <p className='movies__message'>{errorMessage}</p> : (
          <MoviesCardList
            isLoading={isLoading}
            isSavedMoviesPage={false}
            movies={renderedMovies}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}
      </div>
      <Footer />
    </section>
  )
};

export default Movies;