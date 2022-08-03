import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

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
  const [isMoreButton, setIsMoreButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [renderedCardsNumber, setRenderedCardsNumber] = useState(12);
  const [addedCardsNumber, setAddedCardsNumber] = useState(0);
  const [renderedMovies, setRenderedMovies] = useState(movies);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMovieFilter, setIsMovieFilter] = useState(false);

  const updateWindowWidth = () => {
    setTimeout(() => setWindowWidth(window.innerWidth), 1500);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);

    if (windowWidth >= 1280) {
      setRenderedCardsNumber(12);
      setAddedCardsNumber(3);
    } else if (windowWidth < 1280 && windowWidth > 890) {
      setRenderedCardsNumber(8);
      setAddedCardsNumber(2);
    } else {
      setRenderedCardsNumber(5);
      setAddedCardsNumber(2);
    }

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [windowWidth]);

  const handleMoreClick = () => {
    setRenderedMovies(
      movies.slice(0, renderedMovies.length + addedCardsNumber)
    );
    if (renderedMovies.length >= movies.length - addedCardsNumber) {
      setIsMoreButton(false);
    }
  };

  useEffect(() => {
    setRenderedMovies(movies.slice(0, renderedCardsNumber));
    if (movies.length <= renderedCardsNumber) {
      setIsMoreButton(false);
    } else {
      setIsMoreButton(true);
    }
  }, [movies]);

  useEffect(() => {
    setRenderedMovies(movies);
    setErrorMessage('');
  }, [])

    useEffect(() => {
    const searchedMovies = localStorage.getItem('searchedMovies') ? JSON.parse(localStorage.getItem('searchedMovies')) : null;
    if (!searchedMovies) {
      setErrorMessage('Введите ключевое слово для поиска фильма!')
    } else if (searchedMovies && searchedMovies.length === 0) {
      setErrorMessage('Ничего не найдено.');
    } else if (searchedMovies) {
      setRenderedMovies(searchedMovies);
      setErrorMessage('');
    } else {
      setRenderedMovies(movies)
    }
  }, [movies])

  return (
    <section className='movies__page'>
      <Header loggedIn={loggedIn} />
      <div className='movies__content'>
        <SearchForm
          isMovieFilter={isMovieFilter}
          onSearchMovies={onSearchMovies}
          onFilter={setIsMovieFilter}
        />
        {isLoading && (
          <Preloader />
        )}
        {(errorMessage && !isLoading) && (
          <p className='movies__message'>{errorMessage}</p>
        )}
        {(!isLoading && !errorMessage) && (
          <>
            <MoviesCardList
              isSavedMoviesPage={false}
              movies={renderedMovies}
              savedMovies={savedMovies}
              onSave={onSave}
              onDelete={onDelete}
            />
            <button
              className={isMoreButton ? 'cards__button' : 'cards__button_hidden'}
              onClick={handleMoreClick}
            >
              Ещё
            </button>
          </>
        )}
      </div>
      <Footer />
    </section>
  )
};

export default Movies;