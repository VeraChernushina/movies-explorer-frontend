import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <div className='search'>
      <input
        type='text'
        placeholder='Фильм'
        className='search__input'
      />
      <button className='search__button'>Поиск</button>
      <FilterCheckbox />
    </div>
  )
};

export default SearchForm;