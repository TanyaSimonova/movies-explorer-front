import React from "react";
import "./Footer.css";

const date = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__date">{date}</p>
        <a
          className="footer__link"
          href="https://practicum.yandex.ru"
          target="_blank"
          rel="noreferrer noopener"
        >
          Яндекс.Практикум
        </a>
        <a
          className="footer__link"
          href="https://github.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Github
        </a>
      </div>
    </footer>
  );
};
export default Footer;
