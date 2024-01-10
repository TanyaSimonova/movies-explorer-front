import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

const Header = ({ loggedIn }) => {
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      {loggedIn ? (
        <Navigation />
      ) : (
        <>
          <Link to="/signup" className="header__register">
            Регистрация
          </Link>
          <Link to="/signin" className="header__login">
            Войти
          </Link>
        </>
      )}
    </header>
  );
};
export default Header;
