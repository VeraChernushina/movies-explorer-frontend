import '../Movies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = () => {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
    </div>
  )
};

export default SavedMovies;