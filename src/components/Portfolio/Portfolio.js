import React from "react";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__container container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list section__list">
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://github.com/TanyaSimonova?tab=repositories"
              target="_blank"
              rel="noreferrer noopener"
            >
              Статичный сайт
            </a>
            <div className="portfolio__cursor" />
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://tanyasimonova.github.io/russian-travel/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Адаптивный сайт
            </a>
            <div className="portfolio__cursor" />
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://github.com/TanyaSimonova/react-mesto-api-full-gha"
              target="_blank"
              rel="noreferrer noopener"
            >
              Одностраничное приложение
            </a>
            <div className="portfolio__cursor" />
          </li>
        </ul>
      </div>
    </section>
  );
};
export default Portfolio;
