export const convertMinToHours = (num) => {
  const minutes = num % 60;
  const hours = (num - minutes) / 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};

export const filterShortMovies = (movies, filterState) => {
  if (!filterState) {
    return movies;
  }
  return movies.filter(movie => movie.duration <= 40);
};

export const search = (movies, filterState, searchRequest) => {
  const lowerCaseRequest = searchRequest.toLowerCase();
  return filterShortMovies(movies, filterState).filter(movie => {
    return (searchRequest.trim() !== '') && movie.nameRU.includes(lowerCaseRequest)
  })
};

export const saveToLocalStorage = (searchedMovies, isMovieFilter, searchRequest) => {
  localStorage.setItem('searchRequest', searchRequest);
  localStorage.setItem('isMovieFilter', JSON.stringify(isMovieFilter));
  localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
}
