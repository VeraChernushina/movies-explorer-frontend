import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import { checkSavedCard } from '../../utils/utils';

import {
  BIG_SCREEN_MOVIES_QTY,
  MIDDLE_SCREEN_MOVIES_QTY,
  SMALL_SCREEN_MOVIES_QTY,
  MORE_MOVIES_BIG_SCREEN_QTY,
  MORE_MOVIES_SMALL_SCREEN_QTY,
  BIG_SCREEN,
  SMALL_SCREEN
} from '../../utils/constants';

import './MoviesCardList.css';

const MoviesCardList = ({
  movies,
  savedMovies,
  onSave,
  onDelete,
  isSavedMoviesPage
}) => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [windowOuterWidth, setWindowOuterWidth] = useState(window.outerWidth);

  const searchedMoviesCount = movies ? movies.length : 0;
  const bigScreenLayout = (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) && searchedMoviesCount >= BIG_SCREEN_MOVIES_QTY;
  const middleScreenLayout = ((screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN) || (windowOuterWidth > SMALL_SCREEN && windowOuterWidth <= BIG_SCREEN)) && searchedMoviesCount >= MIDDLE_SCREEN_MOVIES_QTY;
  const smallScreenLayout = (screenWidth <= SMALL_SCREEN || windowOuterWidth <= SMALL_SCREEN) && searchedMoviesCount >= SMALL_SCREEN_MOVIES_QTY;

  const [showMovieList, setShowMovieList] = useState(() => {
    if (bigScreenLayout) {
      return movies.slice(0, BIG_SCREEN_MOVIES_QTY);
    } else if (middleScreenLayout) {
      return movies.slice(0, MIDDLE_SCREEN_MOVIES_QTY);
    } else if (smallScreenLayout) {
      return movies.slice(0, SMALL_SCREEN_MOVIES_QTY);
    } else {
      return movies;
    }
  });

  const traceScreenWidth = () => {
    setScreenWidth(window.screen.width);
  }

  const traceWindowOuterWidth = () => {
    setWindowOuterWidth(window.outerWidth);
  }

  const handleMoreClick = () => {
    if (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) {
      setShowMovieList(movies.slice(0, showMovieList.length + MORE_MOVIES_BIG_SCREEN_QTY))
    } else {
      setShowMovieList(movies.slice(0, showMovieList.length + MORE_MOVIES_SMALL_SCREEN_QTY))
    }
  }

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
      setShowMovieList(movies.slice(0, BIG_SCREEN_MOVIES_QTY))
    } else if (middleScreenLayout) {
      setShowMovieList(movies.slice(0, MIDDLE_SCREEN_MOVIES_QTY));
    } else if (smallScreenLayout) {
      setShowMovieList(movies.slice(0, SMALL_SCREEN_MOVIES_QTY));
    } else {
      setShowMovieList(movies);
    }
  }, [screenWidth, windowOuterWidth, movies])

  return (
    <section className='cards'>
      <ul className='cards__list'>
        {showMovieList.sort().map(movie => {
          return <MoviesCard
            key={isSavedMoviesPage ? movie.movieId : movie.id}
            movie={movie}
            isSavedMoviesPage={isSavedMoviesPage}
            onSave={onSave}
            onDelete={onDelete}
            saved={checkSavedCard(savedMovies, movie)}
          />
        })}
      </ul>
      {!isSavedMoviesPage && showMovieList && searchedMoviesCount !== showMovieList.length && (
        <button
          className="cards__button"
          onClick={handleMoreClick}
        >
          Ещё
        </button>
      )}
    </section>
  )
};

export default MoviesCardList;
