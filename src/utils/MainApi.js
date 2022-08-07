const BASE_API_URL = 'https://api.diploma.chernushina.nomoredomains.xyz';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_API_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      name,
      email,
      password
    }),
  }).then((res) => checkResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_API_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const getContent = () => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => checkResponse(res));
};

export const updateUserInfo = (data) => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => checkResponse(res));
};

export const getSavedMovies = () => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const saveMovie = (movie) => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co/' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
    }),
  }).then((res) => checkResponse(res));
};

export const deleteMovie = (id) => {
  return fetch(`${BASE_API_URL}/movies/${id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const logOut = () => {
  return fetch(`${BASE_API_URL}/signout`, {
    method: 'POST',
    headers,
    credentials: 'include',
  }).then((res) => {
      return checkResponse(res);
    });
}
