import './MoviesCard.css';
import film from '../../images/film.png';

const MoviesCard = () => {
  return (
    <div className='card'>
      <img
        src={film}
        alt='Фильм'
        className='card__image'
      />
      <div className='card__description'>
        <span className='card__name'>33 слова о дизайне</span>
        <span className='card__duration'>1ч 17м</span>
      </div>
      <button className='card__button'>Сохранить</button>
      <button className='card__button_saved' />
    </div>
  )
};

export default MoviesCard;