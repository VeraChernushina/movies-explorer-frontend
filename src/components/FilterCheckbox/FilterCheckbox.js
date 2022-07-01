import './FilterCheckbox.css';

const FilterCheckbox = ({ isMovieFilter, onFilter }) => {
  const filterMovies = (event) => {
    onFilter(event.target.checked);
  };

  return (
    <section className='filter'>
      <input
        type='checkbox'
        id='checkbox'
        className='filter__checkbox'
        onInput={filterMovies}
        value={isMovieFilter}
      />
      <label htmlFor='checkbox' className='filter__label'>Короткометражки</label>
    </section>
  )
};

export default FilterCheckbox;