import './Login.css';
import logo from '../../images/header-logo.svg';

const Login = () => {
  return (
    <div className='login__container'>
      <div className='login__header'>
        <img
          src={logo}
          alt='Логотип'
          className='login__logo'
        />
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
        <a href='#' className='login__link'>Регистрация</a>
      </div>

    </div>
  )
};

export default Login;