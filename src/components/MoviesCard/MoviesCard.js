import React, { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

const MoviesCard = () => {
  const [active, setActive] = useState(false);

  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  const toggleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <li className="movies__card">
      <img
        className="movies__image"
        alt="#"
        src={require("../../images/pic__COLOR_pic.png")}
      />
      <h2 className="movies__title">33 слова о дизайне</h2>
      {isSavedMovies ? (
        <button className="movies__delete-btn" type="button" />
      ) : (
        <button
          onClick={toggleClick}
          className={`movies__like-btn ${
            active ? "movies__like-btn_active" : ""
          }`}
          type="button"
        />
      )}
      <span className="movies__underline" />
      <div className="movies__timer">1ч 42м</div>
    </li>
  );
};
export default MoviesCard;
