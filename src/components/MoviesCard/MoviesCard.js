import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { MovieDuration } from "../../utils/constants";

const MoviesCard = ({ movie, onMovieLike, onMovieDelete, savedMovies }) => {
  const [active, setActive] = useState({});
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  useEffect(() => {
    if (!isSavedMovies) {
      const isLikedCard = savedMovies.find((m) => m.movieId === movie.id);
      if (isLikedCard) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [movie, savedMovies]);

  const toggleClick = (e) => {
    const isLikedCard = savedMovies.find((m) => m.movieId === movie.id);
    if (isLikedCard) {
      onMovieLike(movie);
    }
    if (!isLikedCard) {
      onMovieLike(movie);
    }
  };

  const handleDelete = (e) => {
    onMovieDelete(movie);
  };

  return isSavedMovies ? (
    <>
      <li className="movies__card" key={movie._id}>
        <img
          className="movies__image"
          alt={movie.nameRU}
          src={movie.image}
          onClick={(e) => window.open(movie.trailerLink)}
        />
        <h2 className="movies__title">{movie.nameRU}</h2>
        <button
          className="movies__delete-btn"
          type="button"
          onClick={handleDelete}
        />
        <span className="movies__underline" />
        <div className="movies__timer">
          {Math.floor(movie.duration / 60)}ч {movie.duration % 60}м
        </div>
      </li>
    </>
  ) : (
    <>
      <li className="movies__card" key={movie._id}>
        <img
          className="movies__image"
          alt={movie.nameRU}
          src={`https://api.nomoreparties.co${movie.image.url}`}
          onClick={(e) => window.open(movie.trailerLink)}
        />
        <h2 className="movies__title">{movie.nameRU}</h2>
        <button
          onClick={toggleClick}
          className={`movies__like-btn ${active && "movies__like-btn_active"}`}
          type="button"
        />
        <span className="movies__underline" />
        <div className="movies__timer">{MovieDuration(movie)}</div>
      </li>
    </>
  );
};
export default MoviesCard;
