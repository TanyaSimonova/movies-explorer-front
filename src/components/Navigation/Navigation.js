import React, { useState, useEffect, useRef } from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [active, setActive] = useState(false);
  const modalTarget = useRef();

  const toggleClick = () => {
    setActive((prev) => !prev);
  };

  const transitionClick = () => {
    setActive(false);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    if (active) {
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [active]);

  useEffect(() => {
    const handler = (event) => {
      if (!modalTarget.current) {
        return;
      }
      if (!modalTarget.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div className="navigation">
      <div
        className={`navigation__menu ${
          active ? "navigation__menu_active" : ""
        }`}
      >
        <div
          ref={modalTarget}
          className="navigation__icon"
          onClick={toggleClick}
        >
          <span
            className={`navigation__span ${
              active ? "navigation__span_active" : ""
            }`}
          />
        </div>
        <nav
          id="nav-list"
          className={`navigation__list ${
            active ? "navigation__list_active" : ""
          }`}
        >
          <NavLink
            to="/"
            className="navigation__item"
            onClick={transitionClick}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation__item"
            onClick={transitionClick}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__item"
            onClick={transitionClick}
          >
            Сохранённые фильмы
          </NavLink>
          <NavLink
            to="/profile"
            className="navigation__item navigation__account account"
            onClick={transitionClick}
          >
            <p className="account__tip">Аккаунт</p>
            <div className="account__image" />
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
export default Navigation;
