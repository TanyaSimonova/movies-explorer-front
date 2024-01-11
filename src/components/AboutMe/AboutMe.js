import React from "react";
import "./AboutMe.css";
import photo from "../../images/my_photo.jpg";
import { aboutMe, aboutVitaliy } from "../../utils/constants";

const AboutMe = () => {
  //чтобы проверить текст макета
  //{aboutVitaliy}

  return (
    <section className="about-me">
      <div className="about-me__container container">
        <h2 className="about-me__title section__title">Студент</h2>
        <div className="about-me__cover">
          <div className="about-me__description">
            <h3 className="about-me__subtitle">Татьяна</h3>
            <p className="about-me__text">Фронтенд-разработчик</p>
            <p className="about-me__text">{aboutMe}</p>
            <a
              className="about-me__link"
              href="https://github.com/TanyaSimonova"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a>
          </div>
          <img className="about-me__image" alt="фото автора" src={photo} />
        </div>
      </div>
    </section>
  );
};
export default AboutMe;
