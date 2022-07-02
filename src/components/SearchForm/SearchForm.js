import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  isMovieFilter,
  onSearchMovies,
  onFilter
}) => {
  const [movieRequest, setMovieRequest] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearchMovies(movieRequest, isMovieFilter);
  };

  useEffect(() => {
    const request = localStorage.getItem('searchRequest');
    if (request) {
      setMovieRequest(request)
    }
  }, [isMovieFilter, onSearchMovies]);

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleFormSubmit} noValidate>
        <input
          type='text'
          placeholder='Фильм'
          className='search__input'
          required
          value={movieRequest}
          onChange={e => setMovieRequest(e.target.value)}
        />
        <button
          type='submit'
          className='search__button'
        >
          Поиск
        </button>
      </form>

      <FilterCheckbox isMovieFilter={isMovieFilter} onFilter={onFilter} />

      <div className='search__line' />
    </section>
  )
};

export default SearchForm;