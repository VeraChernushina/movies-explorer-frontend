import React from 'react';
import '../Movies/Movies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = () => {
  return (
    <div className='movies'>
      <Header />
      <SearchForm />
      <MoviesCardList />
    </div>
  )
};

export default SavedMovies;