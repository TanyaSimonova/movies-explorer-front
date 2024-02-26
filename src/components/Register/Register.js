import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { useForm } from "../../hooks/useForm";

export const Register = ({ onRegister, errorRegister }) => {
  const { isValid, values, handleChange, errors } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__logo"></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <label className="register__label" htmlFor="name">
            Имя
            <input
              className="register__input"
              type="text"
              id="name"
              name="name"
              placeholder=""
              value={values.name}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              pattern="^(?:[a-zA-Zа-яёА-ЯЁ]{1,}[\s\-]?[a-zA-Zа-яёА-ЯЁ]{1,}?)$"
              required
            />
            {!isValid && <span className="register__error">{errors.name}</span>}
          </label>
          <label className="register__label" htmlFor="email">
            E-mail
            <input
              className="register__input"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder=""
              pattern="^\S+@\S+\.\S+$"
              required
            />
            {!isValid && (
              <span className="register__error">{errors.email}</span>
            )}
          </label>
          <label className="register__label" htmlFor="password">
            Пароль
            <input
              className="register__input"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder=""
              minLength={5}
              maxLength={15}
              required
            />
            {!isValid && (
              <span className="register__error">{errors.password}</span>
            )}
          </label>
          <span className="register__submit-error error">{errorRegister}</span>
          <button
            type="submit"
            className="register__submit-btn submit-btn"
            aria-label="зарегистрироваться"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <Link to="/signin" className="register__login-btn">
          Уже зарегистрированы?{" "}
        </Link>
      </div>
    </section>
  );
};
