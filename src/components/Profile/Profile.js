import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

const Profile = () => {
  return (
    <div className='profile__container'>
      <Header />
      <h1 className='profile__title'>Привет, Вера!</h1>
      <form className='profile___form'>
        <div className='profile__value'>
          <label className='profile__label'>Имя</label>
          <input type='text' value='Вера' className='profile__input' />
        </div>
        <div className='profile__line'></div>
        <div className='profile__value'>
          <label className='profile__label'>
            E-mail
          </label>
          <input type='email' value='someemail@yandex.ru' className='profile__input' />
        </div>
      </form>
      <div className='profile__bottom'>
        <button className='profile__edit'>Редактировать</button>
        <button className='profile__logout'>Выйти из аккаунта</button>
      </div>
    </div>
  )
};

export default Profile;