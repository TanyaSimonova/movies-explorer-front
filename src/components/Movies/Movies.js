import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({
  onSearch,
  errorLoadingMovies,
  movies,
  onMovieLike,
  savedMovies,
}) => {
  const [serchListener, setSearchListener] = useState(false);

  const handleSearchListener = (e) => {
    setSearchListener(true);
  };

  const handleSearchFilm = (e) => {
    onSearch(e);
  };

  const handleMovieLike = (movie) => {
    onMovieLike(movie);
  };

  return (
    <section className="movies-main">
      <SearchForm
        onSearch={handleSearchFilm}
        onSearchListener={handleSearchListener}
      />
      {errorLoadingMovies ? (
        <span className="movies-main__error-load">{errorLoadingMovies}</span>
      ) : (
        <MoviesCardList
          movies={movies}
          onMovieLike={handleMovieLike}
          serchListener={serchListener}
          savedMovies={savedMovies}
        />
      )}
    </section>
  );
};
export default Movies;
