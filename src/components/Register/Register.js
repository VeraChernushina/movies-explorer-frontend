import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/header-logo.svg';

const Register = () => {
  return (
    <section className='register__container'>
      <div className='register__header'>
        <Link to='/'>
          <img
            src={logo}
            alt='Логотип'
            className='register__logo'
          />
        </Link>

        <h1 className='register__title'>Добро пожаловать!</h1>
      </div>

      <form className='register__form'>
        <label className='register__label'>Имя</label>
        <input className='register__input' type='text' />
        <label className='register__label'>E-mail</label>
        <input className='register__input' type='email' />
        <label className='register__label'>Пароль</label>
        <input className='register__input' type='password' />
        <button className='register__button' type='submit'>Зарегистрироваться</button>
      </form>
      <div className='register__bottom'>
        <span>Уже зарегистрированы?</span>
        <Link to='/signin' className='register__link'>Войти</Link>
      </div>

    </section>
  )
};

export default Register;