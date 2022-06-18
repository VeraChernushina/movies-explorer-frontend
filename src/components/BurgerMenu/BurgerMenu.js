import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = ({ onClose }) => {
  const routeMatch = useRouteMatch();

  return (
    <div className='burger'>
      <div className='burger__backdrop'>
        <div className='burger__container'>
          <button type='button' className='burger__close-btn' onClick={() => onClose()} />
          <div className='burger__menu'>
            <Link to='/' className={routeMatch.path === '/' ? 'burger-link_active' : 'burger-link'}>
              Главная
            </Link>
            <Link to='/movies' className={routeMatch.path === '/movies' ? 'burger-link_active' : 'burger-link'}>
              Фильмы
            </Link>
            <Link to='/saved-movies' className={routeMatch.path === '/saved-movies' ? 'burger-link_active' : 'burger-link'}>
              Сохранённые фильмы
            </Link>
          </div>
            <Link to='/profile'>
              <button className='burger__button_account'>Аккаунт</button>
            </Link>
        </div>
      </div>
    </div>
  )
};

export default BurgerMenu;
