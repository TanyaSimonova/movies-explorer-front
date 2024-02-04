import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useForm } from "../../hooks/useForm";

export const Login = ({ onLogin, errorLogin }) => {
  const form = useForm();

  function handleRegister(e) {
    e.preventDefault();
    onLogin(form.values);
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
              value={form.values.email}
              onChange={form.handleChange}
              placeholder=""
              pattern="^\S+@\S+\.\S+$"
              required
            />
            {
              (form.isValid = "false" && (
                <span className="login__error">{form.errors.email}</span>
              ))
            }
          </label>
          <label className="login__label" htmlFor="password">
            Пароль
            <input
              className="login__input"
              type="password"
              id="password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              placeholder=""
              minLength={5}
              maxLength={15}
              required
            />
            {
              (form.isValid = "false" && (
                <span className="login__error">{form.errors.password}</span>
              ))
            }
          </label>
          <span on className="login__submit-error error">
            {errorLogin}
          </span>
          <button
            className="login__submit-btn submit-btn"
            type="submit"
            aria-label="войти"
            disabled={!form.disabled}
          >
            Войти
          </button>
        </form>
        <Link to="/signup" className="login__signup-btn">
          Ещё не зарегистрированы?{" "}
        </Link>
      </div>
    </section>
  );
};
