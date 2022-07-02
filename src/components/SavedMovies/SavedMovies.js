import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

const SavedMovies = ({
  loggedIn,
  movies,
  onSearchMovies,
  isLoading,
  onDelete
}) => {
  const [renderedMovies, setRenderedMovies] = useState(movies);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMovieFilter, setIsMovieFilter] = useState(false);

  useEffect(() => {
    const searchedMovies = localStorage.getItem('searchedSavedMovies') ? JSON.parse(localStorage.getItem('searchedSavedMovies')) : null;
    if (movies.length === 0) {
      setErrorMessage('Вы еще ничего не сохранили')
    } else if (searchedMovies && searchedMovies.length === 0) {
      setErrorMessage('Ничего не найдено');
    } else if (searchedMovies) {
      setRenderedMovies(searchedMovies);
      setErrorMessage('');
    } else {
      setRenderedMovies(movies)
    }
  }, [movies])

  return (
    <section>
      <Header loggedIn={loggedIn} />
      <div className='savedMovies__content'>
        <SearchForm
          isMovieFilter={isMovieFilter}
          onSearchMovies={onSearchMovies}
          onFilter={setIsMovieFilter}
        />
        {errorMessage ? <p className='savedMovies__message'>{errorMessage}</p> : (
          <MoviesCardList
            isSavedMoviesPage={true}
            movies={renderedMovies}
            savedMovies={movies}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        )}
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;