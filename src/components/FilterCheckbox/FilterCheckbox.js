import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div>
      <input type='checkbox' id='checkbox' className='filter__checkbox' />
      <label className='filter__label'>Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;