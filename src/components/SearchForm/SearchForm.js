import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useForm from '../../hooks/useForm';

const SearchForm = ({
  isMovieFilter,
  onSearchMovies,
  onFilter,
  disabled,
  isSavedMoviesPage
}) => {
  const { enteredValues, handleChange, resetForm, isFormValid } = useForm();

  function handleFormSubmit(e) {
    e.preventDefault();
    onSearchMovies(enteredValues.searchRequest, isFormValid, isMovieFilter);
  }

  function handleSavedMoviesFormSubmit(e) {
    e.preventDefault()
    onSearchMovies(enteredValues.searchRequest, isMovieFilter, resetForm);
  }

  return (
    <section className='search'>
      {isSavedMoviesPage ? (
        <>
          <form className='search__form form' name='search-saved-movie-form' onSubmit={handleSavedMoviesFormSubmit} noValidate>
            <input
              type='text'
              placeholder='Фильм'
              className='search__input'
              required
              name='searchRequest'
              disabled={disabled}
              value={enteredValues.searchRequest || ''}
              onChange={handleChange}
            />
            <button
              type='submit'
              className='search__button'
              disabled={disabled}
            >
              Поиск
            </button>
          </form>

          <FilterCheckbox isMovieFilter={isMovieFilter} onFilter={onFilter} disabled={disabled} />
        </>
      ) : (
        <>
          <form className='search__form form' name='search-movie-form' onSubmit={handleFormSubmit} noValidate>
            <input
              type='text'
              placeholder='Фильм'
              className='search__input'
              required
              name='searchRequest'
              disabled={disabled}
              value={enteredValues.searchRequest || ''}
              onChange={handleChange}
            />
            <button
              type='submit'
              className='search__button'
              disabled={disabled}
            >
              Поиск
            </button>
          </form>

          <FilterCheckbox isMovieFilter={isMovieFilter} onFilter={onFilter} disabled={disabled} />
        </>
      )}

      <div className='search__line' />
    </section>
  )
};

export default SearchForm;