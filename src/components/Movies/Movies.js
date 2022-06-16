import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <div className='movies'>
      <Header />
      <SearchForm />
      <MoviesCardList />
    </div>
  )
};

export default Movies;