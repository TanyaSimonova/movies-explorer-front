import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ error }) => {
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@yandex.ru");
  const [disabledInput, setDisabledInput] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);

  function handleEditClick() {
    setDisabledInput(!disabledInput);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeProfile(e) {
    e.preventDefault();
    setDisabledBtn(true);
    //внести отправку данных актуального юзера
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form" onSubmit={handleChangeProfile}>
        <label className="profile__label" htmlFor="name">
          Имя
          <input
            className="profile__input"
            type="text"
            id="name"
            value={name}
            onChange={handleChangeName}
            disabled={disabledInput}
          />
        </label>
        <label className="profile__label" htmlFor="email">
          E-mail
          <input
            className="profile__input"
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            disabled={disabledInput}
          />
        </label>
      </form>
      {disabledInput ? (
        <>
          <button
            className="profile__edit-btn"
            type="submit"
            aria-label="редактировать"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
          <Link to="/signin" className="profile__exit-btn">
            Выйти из аккаунта
          </Link>
        </>
      ) : (
        <>
          <span className="profile__error">{error}</span>
          <button
            className="profile__submit-btn"
            type="submit"
            aria-label="сохранить изменения"
            disabled={disabledBtn}
            onClick={handleChangeProfile}
          >
            Сохранить
          </button>
        </>
      )}
    </section>
  );
};
export default Profile;
