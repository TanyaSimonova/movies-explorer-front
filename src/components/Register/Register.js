import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const [formValue, setFormValue] = useState({
    firstname: "",
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
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__logo"></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleRegister}>
          <label className="register__label" htmlFor="name">
            Имя
            <input
              className="register__input"
              type="text"
              id="name"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              placeholder=""
              minLength={2}
              maxLength={30}
              required
            />
            <span className="register__error">
              Имя не может содержать меньше двух букв
            </span>
          </label>
          <label className="register__label" htmlFor="email">
            E-mail
            <input
              className="register__input"
              type="email"
              id="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder=""
              required
            />
            <span className="register__error">Что-то пошло не так...</span>
          </label>
          <label className="register__label" htmlFor="password">
            Пароль
            <input
              className="register__input"
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
            <span className="register__error">Что-то пошло не так...</span>
          </label>
        </form>
        <button
          className="register__submit-btn"
          type="submit"
          aria-label="зарегистрироваться"
          onSubmit={handleRegister}
        >
          Зарегистрироваться
        </button>
        <Link to="/signin" className="register__login-btn">
          Уже зарегистрированы?{" "}
        </Link>
      </div>
    </section>
  );
};
