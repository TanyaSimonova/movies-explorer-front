import React, { useEffect, useState } from "react";
import "./MoviesCardListSaved.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardListSaved = ({ savedMovies, value, onMovieDelete }) => {
  const [countMovies, setCountMovies] = useState([]);
  const searchedFilm = Object.keys(countMovies).length;

  useEffect(() => {
    if (value != null) {
      setCountMovies(handleSearchMovies(savedMovies));
    }
    if (value === null) {
      setCountMovies([]);
    }
  }, [value, savedMovies]);

  const handleMovieDelete = (movie) => {
    onMovieDelete(movie);
  };

  function handleSearchMovies(movies) {
    const query = value.searchSavedFilm ?? "";
    const shorts = value.checkedSavedShorts ?? "";

    if (query !== null && shorts === false) {
      return movies.filter(
        (item) =>
          (item.nameRU != null &&
            item.nameRU.toLowerCase().includes(query.toLowerCase())) ||
          (item.nameEN != null &&
            item.nameEN.toLowerCase().includes(query.toLowerCase())),
      );
    }
    if (query !== null && shorts === true) {
      return movies.filter(
        (item) =>
          (item.nameRU != null &&
            item.nameRU.toLowerCase().includes(query.toLowerCase()) &&
            item.duration <= 40) ||
          (item.nameEN != null &&
            item.nameEN.toLowerCase().includes(query.toLowerCase()) &&
            item.duration <= 40),
      );
    }
    if (query === "" && shorts === "") {
      return movies;
    }
  }

  return (
    <section className="movies">
      {searchedFilm === 0 && savedMovies.length > 0 && value != null ? (
        <span className="movies__empty">Ничего не найдено</span>
      ) : (
        ""
      )}
      <ul className="movies__list">
        {value === null ? (
          ""
        ) : (
          <>
            {value
              ? handleSearchMovies(savedMovies).map((movie) => (
                  <MoviesCard
                    key={movie._id}
                    movie={movie}
                    onMovieDelete={handleMovieDelete}
                  />
                ))
              : savedMovies.map((movie) => (
                  <MoviesCard
                    key={movie._id}
                    movie={movie}
                    onMovieDelete={handleMovieDelete}
                  />
                ))}{" "}
          </>
        )}
      </ul>
    </section>
  );
};
export default MoviesCardListSaved;
