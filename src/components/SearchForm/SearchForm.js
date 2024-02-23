import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";

const SearchForm = ({ onSearch, onSavedSearch, onSearchListener, movies }) => {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const isMovies = location.pathname === "/movies";

  //стейты главного поиска
  const [message, setMessage] = useState("");
  const [searchFilm, setSearchFilm] = useState(() => {
    const saved = localStorage.getItem("filmQuery");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("checkboxShorts");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });

  //стейты сохраненных фильмов
  const [searchSavedFilm, setSearchSavedFilm] = useState(null);
  const [checkedSavedShorts, setCheckedSavedShorts] = useState(false);
  const [messageSaved, setMessageSaved] = useState("");

  //эффекты и ручки для главного поиска
  useEffect(() => {
    localStorage.setItem("filmQuery", JSON.stringify(searchFilm));
    localStorage.setItem("checkboxShorts", JSON.stringify(checked));
  }, [searchFilm, checked]);

  function handleChangeFilm(e) {
    setMessage("");
    setSearchFilm(e.target.value);
  }

  const handleCheckShorts = (e) => {
    setChecked((prev) => !prev);
    onSearchListener(true);
  };

  useEffect(() => {
    if (isMovies && movies.length === 0) {
      onSearch(true);
      onSearchListener(false);
    }
  }, [isMovies, movies]);

  useEffect(() => {
    if (isMovies && searchFilm.length > 0 && (checked || !checked)) {
      onSearchListener("");
    }
  }, [searchFilm, checked, onSearchListener]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchFilm.length === 0) {
      setMessage("Нужно ввести ключевое слово");
      onSearchListener(false);
    }
    if (searchFilm.length > 0) {
      onSearchListener(true);
    }
  };

  const handleSavedFilmSubmit = (e) => {
    e.preventDefault();
    if (searchSavedFilm === null || searchSavedFilm.length === 0) {
      setMessageSaved("Нужно ввести ключевое слово");
    } else {
      onSavedSearch({ searchSavedFilm, checkedSavedShorts });
      setMessageSaved("");
    }
  };

  useEffect(() => {
    if (isSavedMovies && checkedSavedShorts) {
      onSavedSearch({ searchSavedFilm, checkedSavedShorts });
    }
    if (isSavedMovies && !checkedSavedShorts) {
      onSavedSearch({ searchSavedFilm, checkedSavedShorts });
    }
  }, [checkedSavedShorts]);

  const handleCheckSavedShorts = (e) => {
    setCheckedSavedShorts((prev) => !prev);
  };

  const handleChangeSavedFilm = (e) => {
    setSearchSavedFilm(e.target.value);
  };

  return isSavedMovies ? (
    <>
      <section className="search-form">
        <form
          className="search-form__container"
          onSubmit={handleSavedFilmSubmit}
        >
          <div className="search-form__searcher">
            <input
              className="search-form__input"
              type="search"
              name="search"
              placeholder="Фильм"
              onChange={handleChangeSavedFilm}
              value={searchSavedFilm}
            />
            <button
              type="submit"
              className="search-form__button"
              aria-label="найти фильмы"
            >
              Найти
            </button>
          </div>
          <label htmlFor="shorts" className="search-form__label">
            <input
              type="checkbox"
              name="shorts"
              id="shorts"
              defaultValue={false}
              checked={checkedSavedShorts}
              onChange={handleCheckSavedShorts}
              className="search-form__checkbox_invisible"
            />
            <span className="search-form__checkbox_visible" />
            <span className="search-form__tip">Короткометражки</span>
          </label>
        </form>
        <span className="search-form__error error">{messageSaved}</span>
        <div className="search-form__underline"></div>
      </section>
    </>
  ) : (
    <>
      <section className="search-form">
        <form className="search-form__container" onSubmit={handleSubmit}>
          <div className="search-form__searcher">
            <input
              className="search-form__input"
              type="search"
              name="search"
              placeholder="Фильм"
              onChange={handleChangeFilm}
              value={searchFilm}
            />
            <button
              type="submit"
              className="search-form__button"
              aria-label="найти фильмы"
            >
              Найти
            </button>
          </div>
          <label htmlFor="shorts" className="search-form__label">
            <input
              type="checkbox"
              name="shorts"
              id="shorts"
              defaultValue={false}
              checked={checked}
              onChange={handleCheckShorts}
              className="search-form__checkbox_invisible"
            />
            <span className="search-form__checkbox_visible" />
            <span className="search-form__tip">Короткометражки</span>
          </label>
        </form>
        <span className="search-form__error error">{message}</span>
        <div className="search-form__underline"></div>
      </section>
    </>
  );
};
export default SearchForm;
