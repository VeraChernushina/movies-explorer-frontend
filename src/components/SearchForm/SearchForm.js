import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className='search'>
      <form className='search__form'>
        <input
          type='text'
          placeholder='Фильм'
          className='search__input'
          required
        />
        <button className='search__button'>Поиск</button>
      </form>

      <FilterCheckbox />

      <div className='search__line' />
    </section>
  )
};

export default SearchForm;