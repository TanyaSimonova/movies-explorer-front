export const BASE_URL =
  "https://api.movies-explorer.pnk.nomoredomainsmonster.ru";

const chekValidity = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  }).then(chekValidity);
};

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
    .then(chekValidity)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(chekValidity);
};

export const setUserUpdate = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(chekValidity);
};

export const saveMovie = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      movieId: data.id,
    }),
  }).then(chekValidity);
};

export const getItems = () => {
  return fetch(`${BASE_URL}/movies`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(chekValidity);
};

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(chekValidity);
};

export const deleteMovie = (cardId) => {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(chekValidity);
};
