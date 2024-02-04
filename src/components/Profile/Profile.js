import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile({ currentUser, onUpdateUser, errorProfile, onLoggedIn }) {
  const [validChange, setValidChange] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(true);
  const [isShowSubmit, setIsShowSubmit] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledEditBtn, setDisabledEditBtn] = useState(true);
  const [values, setValues] = useState({
    username: currentUser.name,
    email: currentUser.email,
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    setDisabled(target.form.checkValidity());
  };

  useEffect(() => {
    if (
      values.username !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      setValidChange(true);
      console.log("Valid DATA");
    } else {
      setValidChange(false);
    }
  }, [
    values.username,
    values.email,
    validChange,
    currentUser.name,
    currentUser.email,
  ]);

  useEffect(() => {
    if (validChange && disabled) {
      setDisabledEditBtn(false);
    } else {
      setDisabledEditBtn(true);
    }
  }, [disabled, validChange]);

  function handleSubmitChange() {
    setIsShowSubmit(true);
    setIsShowEdit(false);
    setDisabledInput(true);
  }

  function handleChangeProfile(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  function handleLogOut(e) {
    localStorage.clear();
    onLoggedIn(false);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">
        Привет, {currentUser.name || currentUser.username}!
      </h2>
      <form className="profile__form" onSubmit={handleChangeProfile}>
        <label className="profile__label" htmlFor="username">
          Имя
          <input
            className="profile__input"
            type="text"
            id="username"
            name="username"
            defaultValue={currentUser.name || currentUser.username}
            value={values.username || currentUser.username}
            onChange={(e) => handleChange(e)}
            minLength={2}
            maxLength={30}
            pattern="^(?:[a-zA-Zа-яёА-ЯЁ]{2,}[\s\-]?[a-zA-Zа-яёА-ЯЁ]{1,}?)$"
            required
            disabled={disabledInput}
          />
        </label>
        {!isValid && <span className="profile__error">{errors.username}</span>}
        <label className="profile__label" htmlFor="email">
          E-mail
          <input
            className="profile__input"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={(e) => handleChange(e)}
            pattern="^\S+@\S+\.\S+$"
            required
            disabled={disabledInput}
          />
        </label>
        {!isValid && (
          <span className="profile__error validity">{errors.email}</span>
        )}
        {isShowEdit && (
          <>
            <button
              className="profile__edit-btn"
              type="button"
              aria-label="редактировать"
              disabled={disabledEditBtn}
              onClick={handleSubmitChange}
            >
              Редактировать
            </button>
            <Link
              onClick={handleLogOut}
              to="/signin"
              className="profile__exit-btn"
            >
              Выйти из аккаунта
            </Link>
          </>
        )}
        {isShowSubmit && (
          <>
            <span className="profile__submit-error error">{errorProfile}</span>
            <button
              className="profile__submit-btn submit-btn"
              type="submit"
              aria-label="сохранить изменения"
              disabled={!disabled}
            >
              Сохранить
            </button>
          </>
        )}
      </form>
    </section>
  );
}
