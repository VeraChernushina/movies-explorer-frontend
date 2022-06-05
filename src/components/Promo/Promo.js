import './Promo.css';
import promo from '../../images/promo-logo.svg';

const Promo = () => {
  return (
    <div className='promo'>
      <h1 className='promo__title'>
      Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className='promo__logo' src={promo} alt='Логотип Промо.' />
    </div>
  )
};

export default Promo;