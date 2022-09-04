import './FilterCheckbox.css';

const FilterCheckbox = ({ isMovieFilter, onFilter }) => {
  return (
    <section className='filter'>
      <input
        type='checkbox'
        id='checkbox'
        className='filter__checkbox'
        onChange={onFilter}
        checked={isMovieFilter}
      />
      <label htmlFor='checkbox' className='filter__label'>Короткометражки</label>
    </section>
  )
};

export default FilterCheckbox;