import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({
  isLoading,
  isSavedMoviesPage,
  movies,
  savedMovies,
  onSave,
  onDelete
}) => {
  const [isMoreButton, setIsMoreButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [renderedCardsNumber, setRenderedCardsNumber] = useState(12);
  const [addedCardsNumber, setAddedCardsNumber] = useState(0);

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
    if (!isSavedMoviesPage) {
      setRenderedMovies(movies.slice(0, renderedCardsNumber));
      if (movies.length <= renderedCardsNumber) {
        setIsMoreButton(false);
      } else {
        setIsMoreButton(true);
      }
    } else {
      setRenderedMovies(movies);
      setIsMoreButton(false);
    }
  }, [movies]);

  return (
    <section className='cards'>
      <ul className='cards__list'>
        {isLoading ? <Preloader /> : (
          renderedMovies.map(movie => {
            return <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              isSavedMoviesPage={isSavedMoviesPage}
              onSave={onSave}
              onDelete={onDelete}
              savedMovies={savedMovies}
            />
          })
        )}
      </ul>
      <button
        className={isMoreButton ? 'cards__button' : 'cards__button_hidden'}
        onClick={handleMoreClick}
      >
        Ещё
      </button>
    </section>
  )
};

export default MoviesCardList;