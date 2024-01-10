import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

const MoviesCardList = () => {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  return (
    <section className="movies">
      <ul className="movies__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button
        className={`movies__button ${
          isSavedMovies ? "movies__button_hide" : ""
        }`}
        aria-label="добавить ещё фильмов"
      >
        Ещё
      </button>
    </section>
  );
};
export default MoviesCardList;
