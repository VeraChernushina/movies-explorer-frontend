import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <section className='filter'>
      <input type='checkbox' id='checkbox' className='filter__checkbox' />
      <label htmlFor='checkbox' className='filter__label'>Короткометражки</label>
    </section>
  )
};

export default FilterCheckbox;