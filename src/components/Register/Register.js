import './Register.css';
import logo from '../../images/header-logo.svg';

const Register = () => {
  return (
    <div className='register__container'>
      <div className='register__header'>
        <img
          src={logo}
          alt='Логотип'
          className='register__logo'
        />
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
        <a href='#' className='register__link'>Войти</a>
      </div>

    </div>
  )
};

export default Register;