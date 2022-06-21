import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ isLoading=false, isSavedMoviesPage, movies }) => {
  return (
    <section className='cards'>
      {isLoading ? <Preloader /> : (
      <ul className='cards__list'>
        {movies.map((movie) => {
          return <MoviesCard key={movie.id} movie={movie} isSavedMoviesPage={isSavedMoviesPage} />
        })}
      </ul>
      )}
      <button className={!isSavedMoviesPage ? 'cards__button' : 'cards__button_hidden'}>Ещё</button>
    </section>
  )
};

export default MoviesCardList;