import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleRegister(e) {
    e.preventDefault();

    setFormValue({ email: "", password: "" });
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__logo"></Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" onSubmit={handleRegister}>
          <label className="login__label" htmlFor="email">
            E-mail
            <input
              className="login__input"
              type="email"
              id="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder=""
              required
            />
            <span className="login__error">Что-то пошло не так...</span>
          </label>
          <label className="login__label" htmlFor="password">
            Пароль
            <input
              className="login__input"
              type="password"
              id="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              placeholder=""
              minLength={5}
              maxLength={15}
              required
            />
            <span className="login__error">Что-то пошло не так...</span>
          </label>
        </form>
        <button
          className="login__submit-btn"
          type="submit"
          aria-label="войти"
          onSubmit={handleRegister}
        >
          Войти
        </button>
        <Link to="/signup" className="login__signup-btn">
          Ещё не зарегистрированы?{" "}
        </Link>
      </div>
    </section>
  );
};
