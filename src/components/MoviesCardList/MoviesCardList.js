import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useResize } from "../../hooks/useResize";

const MoviesCardList = ({
  movies,
  onMovieLike,
  serchListener,
  savedMovies,
}) => {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const size = useResize();
  const [numberMovies, setNumberMovies] = useState(null);
  const [isVisibleBtn, setIsVisibleBtn] = useState(true);
  //счетчик фильмов
  const [countMovies, setCountMovies] = useState([]);
  //стейт для сохранения фильмов в локальной памяти
  const [searchFilmData, setSearchFilmData] = useState(() => {
    const saved = localStorage.getItem("filmData");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const loadStorageFilm = Object.keys(searchFilmData).length;
  const searchedFilm = Object.keys(countMovies).length;

  useEffect(() => {
    localStorage.setItem("filmData", JSON.stringify(searchFilmData));
  }, [searchFilmData]);

  //проброшенный пропс лайка
  const handleMovieLike = (movie) => {
    onMovieLike(movie);
  };


  function handleSearchMovies(movies) {
    const query = JSON.parse(localStorage.getItem("filmQuery"));
    const shorts = JSON.parse(localStorage.getItem("checkboxShorts"));

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

  //запись результатов поиска в локальное хранилище
  useEffect(() => {
    if (serchListener) {
      setCountMovies(handleSearchMovies(movies));
      setSearchFilmData(handleSearchMovies(movies));
    }
  }, [serchListener, movies]);

  useEffect(() => {
    if (
      loadStorageFilm === 0 ||
      (loadStorageFilm !== 0 && loadStorageFilm <= numberMovies) ||
      (searchedFilm !== 0 && searchedFilm <= numberMovies)
    ) {
      setIsVisibleBtn(false);
    } else if (loadStorageFilm > numberMovies || searchedFilm > numberMovies) {
      setIsVisibleBtn(true);
    }
  }, [
    numberMovies,
    isVisibleBtn,
    serchListener,
    loadStorageFilm,
    searchedFilm,
  ]);

  //рендер массива из локальной памяти
  const mapMoviesLoad = (numberMovies) => (
    <ul className="movies__list">
      {searchFilmData.slice(0, numberMovies).map((movie) => (
        <MoviesCard
          key={movie._id}
          movie={movie}
          savedMovies={savedMovies}
          onMovieLike={handleMovieLike}
        />
      ))}
    </ul>
  );

  //рендер запроса
  const mapMoviesSearch = (numberMovies) => (
    <ul className="movies__list">
      {movies === undefined || movies.length === 0 ? (
        <span></span>
      ) : (
        handleSearchMovies(movies)
          .slice(0, numberMovies)
          .map((movie) => (
            <MoviesCard
              key={movie._id}
              movie={movie}
              onMovieLike={handleMovieLike}
              savedMovies={savedMovies}
            />
          ))
      )}
    </ul>
  );

  //отрисовываем кол-во фильмов на странице
  useEffect(() => {
    if (size.isScreenXl) {
      setNumberMovies(16);
    }
    if (!size.isScreenXl && size.isScreenL) {
      setNumberMovies(12);
    }
    if (!size.isScreenL && size.isScreenM) {
      setNumberMovies(8);
    }
    if (!size.isScreenM) {
      setNumberMovies(5);
    }
  }, [size.isScreenXl, size.isScreenL, size.isScreenM]);

  //добавляем фильмы по клику на кнопку
  const handleClick = (e) => {
    if (size.isScreenXl) {
      setNumberMovies((prev) => prev + 4);
    }
    if (!size.isScreenXl && size.isScreenL) {
      setNumberMovies((prev) => prev + 3);
    }
    if (!size.isScreenL && size.isScreenM) {
      setNumberMovies((prev) => prev + 2);
    }
    if (!size.isScreenM) {
      setNumberMovies((prev) => prev + 2);
    }
  };

  return (
    <section className="movies">
      {serchListener && searchedFilm === 0 ? (
        <span className="movies__empty">Ничего не найдено</span>
      ) : (
        <>
          {searchFilmData
            ? mapMoviesLoad(numberMovies)
            : mapMoviesSearch(numberMovies)}
          {isVisibleBtn && (
            <button
              className={`movies__button ${
                isSavedMovies ? "movies__button_hide" : ""
              }`}
              aria-label="добавить ещё фильмов"
              type="button"
              onClick={() => handleClick()}
            >
              Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
};
export default MoviesCardList;

