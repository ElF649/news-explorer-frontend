import React from 'react';
import './Footer.css';
import gitIcon from '../../images/git.svg';
import fbIcon from '../../images/social-fb.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
        <div className="footer__links">
          <ul className="footer__list footer__list-menu">
            <li className="footer__item footer__item_menu-link">
              <a
                title="Перейти на Главную"
                className="footer__link"
                href="/"
              >
                Главная
              </a>
            </li>
            <li className="footer__item footer__item_menu-link">
              <a
                title="Открыть сайт Яндекс.Практикума в новом окне"
                href="https://praktikum.yandex.ru"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
          </ul>
          <ul className="footer__list footer__list-social-web">
            <li className="footer__item footer__item_social-link">
              <a href="https://github.com/ElF649">
                <img src={gitIcon} alt="github" />
              </a>
            </li>
            <li className="footer__item footer__item_social-link">
              <a href="#">
                <img src={fbIcon} alt="facebook" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
