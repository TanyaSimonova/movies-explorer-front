import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";

const SearchForm = ({ onSearch, onSavedSearch, onSearchListener }) => {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  //стейты для главного поиска
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

  //стейты для сохраненных фильмов
  const [searchSavedFilm, setSearchSavedFilm] = useState(null);
  const [checkedSavedShorts, setCheckedSavedShorts] = useState(false);

  //эффекты и ручки для главного поиска
  useEffect(() => {
    localStorage.setItem("filmQuery", JSON.stringify(searchFilm));
    localStorage.setItem("checkboxShorts", JSON.stringify(checked));
  }, [searchFilm, checked]);

  function handleChangeFilm(e) {
    setMessage("");
    setSearchFilm(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchFilm.length === 0) {
      setMessage("Нужно ввести ключевое слово");
    }
    onSearch();
    onSearchListener();
  };

  //сабмит для сохраненных фильмов
  const handleSavedFilmSubmit = (e) => {
    e.preventDefault();
    onSavedSearch({ searchSavedFilm, checkedSavedShorts });
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
              onChange={(e) => setSearchSavedFilm(e.target.value)}
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
              onClick={() => setCheckedSavedShorts((prev) => !prev)}
              className="search-form__checkbox_invisible"
            />
            <span className="search-form__checkbox_visible" />
            <span className="search-form__tip">Короткометражки</span>
          </label>
        </form>
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
              onClick={() => setChecked((prev) => !prev)}
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
