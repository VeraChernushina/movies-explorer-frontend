import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/header-logo.svg';

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <img
          src={logo}
          alt='Логотип'
          className='header__logo'
        />
      </Link>
      <Navigation />
    </header>
  )
};

export default Header;
