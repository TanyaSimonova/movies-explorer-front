import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { useForm } from "../../hooks/useForm";
import { Tooltip } from "react-tooltip";

export const Register = ({ onRegister, errorRegister }) => {
  const form = useForm();
  const [openTooltip, setOpenTooltip] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(form.values);
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__logo"></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__label" htmlFor="username">
            Имя
            <input
              className="register__input"
              type="text"
              id="username"
              name="username"
              placeholder=""
              value={form.values.username}
              onChange={form.handleChange}
              minLength={2}
              maxLength={30}
              pattern="^(?:[a-zA-Zа-яёА-ЯЁ]{2,}[\s\-]?[a-zA-Zа-яёА-ЯЁ]{1,}?)$"
              //title="имя может содержать кириллицу и латиницу, допускается дефис и пробел"
              required
              onInput={() => setOpenTooltip(true)}
            />
            {
              (form.isValid = "false" && (
                <span className="register__error">{form.errors.username}</span>
              ))
            }
            <Tooltip
              offset="15"
              hidden={openTooltip}
              anchorSelect="#username"
              place="top"
            >
              Имя может содержать кириллицу и латиницу, допускается дефис и
              пробел
            </Tooltip>
          </label>
          <label className="register__label" htmlFor="email">
            E-mail
            <input
              className="register__input"
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
                <span className="register__error">{form.errors.email}</span>
              ))
            }
          </label>
          <label className="register__label" htmlFor="password">
            Пароль
            <input
              className="register__input"
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
                <span className="register__error">{form.errors.password}</span>
              ))
            }
          </label>
          <span className="register__submit-error error">{errorRegister}</span>
          <button
            type="submit"
            className="register__submit-btn submit-btn"
            aria-label="зарегистрироваться"
            disabled={!form.disabled}
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
