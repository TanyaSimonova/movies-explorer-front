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
  loading,
}) => {
  const [serchListener, setSearchListener] = useState(false);

  const handleSearchListener = (boolean) => {
    setSearchListener(boolean);
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
        movies={movies}
      />
      {errorLoadingMovies ? (
        <span className="movies-main__error-load">{errorLoadingMovies}</span>
      ) : (
        <MoviesCardList
          loading={loading}
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
