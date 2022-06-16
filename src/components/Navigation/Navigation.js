import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isLoggedIn=false }) => {
  return (
    <nav className='navigation'>
      {isLoggedIn ? (
        <>
          <div className='navigation__movies'>
            <Link to='/movies' className='navigation__movies-link'>Фильмы</Link>
            <Link to='/saved-movies' className='navigation__movies-link_saved'>Сохранённые фильмы</Link>
          </div>
          <div>
            <Link to='/profile'>
              <button className='navigation__button_account'>
                Аккаунт
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className='navigation__auth'>
          <Link to='/signup' className='navigation__link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='navigation__button'>
              Войти
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
};

export default Navigation;
