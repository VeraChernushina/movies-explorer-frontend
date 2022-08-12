import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

import { search, filterShortMovies, saveToLocalStorage, } from '../../utils/utils';

import {
  BIG_SCREEN_MOVIES_QTY,
  MIDDLE_SCREEN_MOVIES_QTY,
  SMALL_SCREEN_MOVIES_QTY,
  MORE_MOVIES_BIG_SCREEN_QTY,
  MORE_MOVIES_SMALL_SCREEN_QTY,
  BIG_SCREEN,
  SMALL_SCREEN
} from '../../utils/constants';

const Movies = ({
  loggedIn,
  onSearchMovies,
  isLoading,
  savedMovies,
  onSave,
  searchCount
}) => {
  const searchedMoviesInLS = JSON.parse(localStorage.getItem('searchedMovies'));
  const isShortMoviesInLS = JSON.parse(localStorage.getItem('isMovieFilter'));

  const [searchedMovies, setSearchedMovies] = useState(searchedMoviesInLS === null ? [] : searchedMoviesInLS);
  const [isMovieFilter, setIsMovieFilter] = useState(isShortMoviesInLS ? isShortMoviesInLS : false);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [windowOuterWidth, setWindowOuterWidth] = useState(window.outerWidth);
  const [errorMessage, setErrorMessage] = useState('');

  const searchedMoviesCount = searchedMovies ? searchedMovies.length : 0;
  const bigScreenLayout = (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) && searchedMoviesCount >= BIG_SCREEN_MOVIES_QTY;
  const middleScreenLayout = ((screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN) || (windowOuterWidth > SMALL_SCREEN && windowOuterWidth <= BIG_SCREEN)) && searchedMoviesCount >= MIDDLE_SCREEN_MOVIES_QTY;
  const smallScreenLayout = (screenWidth <= SMALL_SCREEN || windowOuterWidth <= SMALL_SCREEN) && searchedMoviesCount >= SMALL_SCREEN_MOVIES_QTY;

  const [renderedMovies, setRenderedMovies] = useState(() => {
    if (bigScreenLayout) {
      return searchedMovies.slice(0, BIG_SCREEN_MOVIES_QTY);
    } else if (middleScreenLayout) {
      return searchedMovies.slice(0, MIDDLE_SCREEN_MOVIES_QTY);
    } else if (smallScreenLayout) {
      return searchedMovies.slice(0, SMALL_SCREEN_MOVIES_QTY);
    } else {
      return searchedMovies
    }
  });

  const toggleShortMoviesFilter = () => {
    setIsMovieFilter(!isMovieFilter);
    const searchInput = localStorage.getItem('searchRequest');
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (!searchInput && !movies) {
      return null
    } else if (!isMovieFilter && searchedMovies) {
      let showedShortMovies = filterShortMovies(searchedMovies);
      if (showedShortMovies === null) {
        showedShortMovies = [];
      }
      saveToLocalStorage(showedShortMovies, !isMovieFilter, searchInput);
      setSearchedMovies(showedShortMovies);
    } else {
      const showedMovies = search(movies, !isMovieFilter, searchInput);
      saveToLocalStorage(showedMovies, !isMovieFilter, searchInput);
      setSearchedMovies(showedMovies);
    }
  }

  const traceScreenWidth = () => {
    setScreenWidth(window.screen.width);
  }

  const traceWindowOuterWidth = () => {
    setWindowOuterWidth(window.outerWidth);
  }

  const handleMoreClick = () => {
    if (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) {
      setRenderedMovies(searchedMovies.slice(0, renderedMovies.length + MORE_MOVIES_BIG_SCREEN_QTY))
    } else {
      setRenderedMovies(searchedMovies.slice(0, renderedMovies.length + MORE_MOVIES_SMALL_SCREEN_QTY))
    }
  }

  useEffect(() => {
    if (!renderedMovies) {
      setErrorMessage('Введите ключевое слово для поиска фильма!')
    } else if (renderedMovies && renderedMovies.length === 0) {
      setErrorMessage('Ничего не найдено.');
    } else if (renderedMovies) {
      setRenderedMovies(searchedMovies);
      setErrorMessage('');
    } else {
      setRenderedMovies(searchedMoviesInLS)
    }
  }, [])

  useEffect(() => {
    const searchedMoviesInLS = localStorage.getItem('searchedMovies');
    const isShortMoviesInLS = localStorage.getItem('isMovieFilter');
    if (searchedMoviesInLS !== null && isShortMoviesInLS !== null) {
      setSearchedMovies(JSON.parse(searchedMoviesInLS));
      setIsMovieFilter(JSON.parse(isShortMoviesInLS));
    }
  }, [searchCount])

  useEffect(() => {
    window.addEventListener('resize', traceScreenWidth);
    return () => {
      window.removeEventListener('resize', traceScreenWidth)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', traceWindowOuterWidth)
    return () => {
      window.removeEventListener('resize', traceWindowOuterWidth)
    }
  }, [])

  useEffect(() => {
    if (bigScreenLayout) {
      setRenderedMovies(searchedMovies.slice(0, BIG_SCREEN_MOVIES_QTY))
    } else if (middleScreenLayout) {
      setRenderedMovies(searchedMovies.slice(0, MIDDLE_SCREEN_MOVIES_QTY));
    } else if (smallScreenLayout) {
      setRenderedMovies(searchedMovies.slice(0, SMALL_SCREEN_MOVIES_QTY));
    } else {
      setRenderedMovies(searchedMovies);
    }
  }, [screenWidth, windowOuterWidth, searchedMovies, isMovieFilter])

  return (
    <section className='movies__page'>
      <Header loggedIn={loggedIn} />
      <div className='movies__content'>
        <SearchForm
          isMovieFilter={isMovieFilter}
          onSearchMovies={onSearchMovies}
          onFilter={toggleShortMoviesFilter}
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
            />
            <button
              className={(renderedMovies && searchedMoviesCount !== renderedMovies.length) ? 'cards__button' : 'cards__button_hidden'}
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