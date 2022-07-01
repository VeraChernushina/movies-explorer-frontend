import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }

  return (
    <div className='page__container'>
      <div className='page__info-block'>
        <span className='page__status'>404</span>
        <span className='page__notfound'>Страница не найдена</span>
      </div>
      <button onClick={goBack} className='page__go-back-btn'>Назад</button>
    </div>
  )
};

export default NotFoundPage;