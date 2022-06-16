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
        />
        <button className='search__button'>Поиск</button>
      </form>

      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;