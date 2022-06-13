import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
    </div>
  )
};

export default Movies;