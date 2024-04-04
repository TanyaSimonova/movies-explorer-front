import React, { useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardListSaved from "../MoviesCardListSaved/MoviesCardListSaved";

const SavedMovies = ({ savedMovies, onMovieDelete }) => {
  const [value, setValue] = useState("");

  const handleMovieDelete = (movie) => {
    onMovieDelete(movie);
  };

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <section className="movies-saved">
      <SearchForm onSavedSearch={handleChange} />
      <MoviesCardListSaved
        savedMovies={savedMovies}
        value={value}
        onMovieDelete={handleMovieDelete}
      />
    </section>
  );
};
export default SavedMovies;
