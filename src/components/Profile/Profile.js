import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useForm } from "../../hooks/useForm";

export default function Profile({
  currentUser,
  onUpdateUser,
  errorProfile,
  successProfile,
  onLoggedIn,
}) {
  const [validChange, setValidChange] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(true);
  const [isShowSubmit, setIsShowSubmit] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledEditBtn, setDisabledEditBtn] = useState(true);
  const [submitError, setSubmitError] = useState(errorProfile);
  const [submitSuccess, setSubmitSuccess] = useState(successProfile);
  const { isValid, values, handleChange, errors, resetForm } = useForm();

  useEffect(() => {
    if (errorProfile) {
      setSubmitError(errorProfile);
    }
    if (successProfile) {
      setSubmitSuccess(successProfile);
    }
  }, [successProfile, errorProfile]);

  useEffect(() => {
    if (
      (values.name !== undefined && values.name !== currentUser.name) ||
      (values.email !== undefined && values.email !== currentUser.email)
    ) {
      setValidChange(true);
    } else {
      setValidChange(false);
    }
  }, [
    values.name,
    values.email,
    validChange,
    currentUser.name,
    currentUser.email,
  ]);

  useEffect(() => {
    if (validChange && isValid) {
      setDisabledEditBtn(false);
    } else {
      setDisabledEditBtn(true);
    }
  }, [isValid, validChange]);

  function handleSubmitChange() {
    setIsShowSubmit(true);
    setIsShowEdit(false);
    setDisabledInput(true);
  }

  function handleChangeProfile(e) {
    e.preventDefault();
    onUpdateUser(values);
    resetForm();
  }

  function handleResetMessage(e) {
    setSubmitError(null);
    setSubmitSuccess(null);
  }

  function handleLogOut(e) {
    localStorage.clear();
    onLoggedIn(false);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleChangeProfile} noValidate>
        <label className="profile__label" htmlFor="name">
          Имя
          <input
            className="profile__input"
            type="text"
            id="name"
            name="name"
            defaultValue={currentUser.name}
            value={values?.name || currentUser.name}
            onChange={(e) => handleChange(e)}
            onInput={handleResetMessage}
            minLength={2}
            maxLength={30}
            pattern="^(?:[a-zA-Zа-яёА-ЯЁ]{1,}[\s\-]?[a-zA-Zа-яёА-ЯЁ]{1,}?)$"
          />
        </label>
        {errors.name && <span className="profile__error">{errors.name}</span>}
        <label className="profile__label" htmlFor="email">
          E-mail
          <input
            className="profile__input"
            type="email"
            id="email"
            name="email"
            value={values.email || currentUser.email}
            onChange={(e) => handleChange(e)}
            onInput={handleResetMessage}
            pattern="^\S+@\S+\.\S+$"
            required
            disabled={disabledInput}
          />
        </label>
        {errors.email && (
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
            <Link onClick={handleLogOut} to="/" className="profile__exit-btn">
              Выйти из аккаунта
            </Link>
          </>
        )}
        {isShowSubmit && (
          <>
            <span className="profile__submit-error error">{submitError}</span>
            <span className="profile__submit-success">{submitSuccess}</span>
            <button
              className="profile__submit-btn submit-btn"
              type="submit"
              aria-label="сохранить изменения"
              disabled={!isValid}
            >
              Сохранить
            </button>
          </>
        )}
      </form>
    </section>
  );
}
