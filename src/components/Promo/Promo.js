import React from 'react';
import Header from '../Header/Header';
import './Promo.css';
import promo from '../../images/promo-logo.svg';

const Promo = () => {
  return (
    <section className='promo'>
      <Header />
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
      <img className='promo__logo' src={promo} alt='Логотип Промо.' />
      </div>
    </section>
  )
};

export default Promo;