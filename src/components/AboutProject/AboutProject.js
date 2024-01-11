import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="project">
      <div className="project__container container">
        <h2 className="project__title section__title">О проекте</h2>
        <ul className="project__list 	section__list">
          <li className="project__item">
            <h4 className="project__subtitle">
              Дипломный проект включал 5 этапов
            </h4>
            <p className="project__description">
              Составление плана, работу над бэкендом, верстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="project__item">
            <h4 className="project__subtitle">
              На выполнение диплома ушло 5 недель
            </h4>
            <p className="project__description">
              У кажого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="project__timeline timeline section__list">
          <li className="timeline__item">
            <div className="timeline__visualization">1 неделя</div>
            <p className="timeline__label">Back-end</p>
          </li>
          <li className="timeline__item">
            <div className="timeline__visualization">4 недели</div>
            <p className="timeline__label">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default AboutProject;
