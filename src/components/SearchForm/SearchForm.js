import React from "react";
import "./SearchForm.css";

const SearchForm = () => {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__searcher">
          <input
            className="search-form__input"
            type="search"
            placeholder="Фильм"
          ></input>
          <button
            type="submit"
            className="search-form__button"
            aria-label="найти фильмы"
          >
            Найти
          </button>
        </form>
        <label htmlFor="shorts" className="search-form__label">
          <input
            type="checkbox"
            name="shorts"
            id="shorts"
            className="search-form__checkbox_invisible"
          />
          <span className="search-form__checkbox_visible" />
          <span className="search-form__tip">Короткометражки</span>
        </label>
      </div>
      <div className="search-form__underline"></div>
    </section>
  );
};
export default SearchForm;
