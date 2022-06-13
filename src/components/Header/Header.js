import './Header.css';
import logo from '../../images/header-logo.svg';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__left-block'>
        <img
          src={logo}
          alt='Логотип'
          className='header__logo'
        />
        <div className='header__films'>
          <a href='#' className='header__films-link'>Фильмы</a>
          <a href='#' className='header__films-link_saved'>Сохранённые фильмы</a>
        </div>
      </div>
      <div>
        <a href='/sign-up' className='header__link'>Регистрация</a>
        <button className='header__button'>Войти</button>
        <button className='header__button_account'>Аккаунт</button>
      </div>
    </header>
  )
};

export default Header;