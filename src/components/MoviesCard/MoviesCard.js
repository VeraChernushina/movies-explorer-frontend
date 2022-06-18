import './MoviesCard.css';

const MoviesCard = ({ isSavedMoviesPage, movie }) => {
  return (
    <div className='card'>
      <img
        src={movie.image}
        alt={`Обложка фильма: ${movie.name}`}
        className='card__image'
      />
      <div className='card__description'>
        <span className='card__name'>{movie.name}</span>
        <span className='card__duration'>{movie.duration}</span>
      </div>
      {movie.saved && !isSavedMoviesPage && <button className='card__button_saved' />}
      {isSavedMoviesPage ? (
        <button className='card__button_delete' />
      ) : (
        <button className='card__button'>Сохранить</button>
      )}
    </div>
  )
};

export default MoviesCard;
