import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

const Movies = () => {
  return (
    <section>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  )
};

export default Movies;