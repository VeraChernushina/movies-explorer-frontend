import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/header-logo.svg';

const Login = () => {
  return (
    <div className='login__container'>
      <div className='login__header'>
        <Link to='/'>
          <img
            src={logo}
            alt='Логотип'
            className='login__logo'
          />
        </Link>

        <h1 className='login__title'>Рады видеть!</h1>
      </div>

      <form className='login__form'>
        <label className='login__label'>E-mail</label>
        <input className='login__input' type='email' />
        <label className='login__label'>Пароль</label>
        <input className='login__input' type='password' />
        <button className='login__button' type='submit'>Зарегистрироваться</button>
      </form>
      <div className='login__bottom'>
        <span>Ещё не зарегистрированы?</span>
        <Link to='signup' className='login__link'>Регистрация</Link>
      </div>

    </div>
  )
};

export default Login;