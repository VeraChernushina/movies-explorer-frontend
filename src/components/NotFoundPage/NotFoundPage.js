import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const history = useHistory();

  return (
    <div className='page__container'>
      <div className='page__info-block'>
        <span className='page__status'>404</span>
        <span className='page__notfound'>Страница не найдена</span>
      </div>
      <button onClick={() => history.go(-3)} className='page__go-back-btn'>Назад</button>
    </div>
  )
};

export default NotFoundPage;