import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useResize } from "../../hooks/useResize";
import {
  NumberMoviesForXL,
  NumberMoviesForL,
  NumberMoviesForM,
  NumberMoviesForS,
  AddNumberMoviesForXL,
  AddNumberMoviesForL,
  AddNumberMoviesForM,
  AddNumberMoviesForS,
} from "../../utils/constants";

const MoviesCardList = ({
  movies,
  onMovieLike,
  serchListener,
  savedMovies,
  loading,
}) => {
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
    if (query === "") {
      return movies;
    }
  }

  useEffect(() => {
    if (serchListener === true) {
      setCountMovies(handleSearchMovies(movies));
      setSearchFilmData(handleSearchMovies(movies));
    }
    if (serchListener === false) {
      setCountMovies([]);
      setNumberMovies(0);
    }
  }, [serchListener, movies]);

  useEffect(() => {
    if (
      loadStorageFilm === 0 ||
      (loadStorageFilm !== 0 && loadStorageFilm <= numberMovies) ||
      (searchedFilm !== 0 && searchedFilm <= numberMovies) ||
      serchListener === false
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
      {serchListener === false || serchListener === ""
        ? ""
        : handleSearchMovies(movies)
            .slice(0, numberMovies)
            .map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                onMovieLike={handleMovieLike}
                savedMovies={savedMovies}
              />
            ))}
    </ul>
  );

  //отрисовываем кол-во фильмов на странице
  useEffect(() => {
    if (size.isScreenXl) {
      setNumberMovies(NumberMoviesForXL);
    }
    if (!size.isScreenXl && size.isScreenL) {
      setNumberMovies(NumberMoviesForL);
    }
    if (!size.isScreenL && size.isScreenM) {
      setNumberMovies(NumberMoviesForM);
    }
    if (!size.isScreenM) {
      setNumberMovies(NumberMoviesForS);
    }
  }, [size.isScreenXl, size.isScreenL, size.isScreenM, serchListener]);

  //добавляем фильмы по клику на кнопку
  const handleClick = (e) => {
    if (size.isScreenXl) {
      setNumberMovies((prev) => prev + AddNumberMoviesForXL);
    }
    if (!size.isScreenXl && size.isScreenL) {
      setNumberMovies((prev) => prev + AddNumberMoviesForL);
    }
    if (!size.isScreenL && size.isScreenM) {
      setNumberMovies((prev) => prev + AddNumberMoviesForM);
    }
    if (!size.isScreenM) {
      setNumberMovies((prev) => prev + AddNumberMoviesForS);
    }
  };

  return (
    <section className="movies">
      {!loading && serchListener === true && searchedFilm === 0 ? (
        <span className="movies__empty">Ничего не найдено</span>
      ) : (
        <>
          {searchFilmData.length > 0
            ? mapMoviesLoad(numberMovies)
            : mapMoviesSearch(numberMovies)}
          {isVisibleBtn && (
            <button
              className="movies__button"
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
