import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

const movies = [
  {
    id: '1',
    name: '33 слова о дизайне',
    image: 'images/first-movie.png',
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '2',
    name: 'Киноальманах «100 лет дизайна»',
    image: 'images/second-movie.png',
    duration: '1ч 17м',
    saved: true
  },
  {
    id: '3',
    name: 'В погоне за Бенкси',
    image: 'images/third-movie.png',
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '4',
    name: '33 слова о дизайне',
    image: 'images/first-movie.png',
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '5',
    name: 'Киноальманах «100 лет дизайна»',
    image: 'images/second-movie.png',
    duration: '1ч 17м',
    saved: false
  },
];

const Movies = ({ loggedIn }) => {
  return (
    <section>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={false} movies={movies} />
      <Footer />
    </section>
  )
};

export default Movies;