import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import white from '../../images/logout-white.svg';
import black from '../../images/logout-black.svg';

function Navigation({
  isLoggedIn, openPopup, isSavedCardsOpen, isMenuOpen, openMobileMenu,
}) {
  function containerStyleController(x) {
    if (isMenuOpen && isSavedCardsOpen) {
      return `${x} ${x}_mobile-menu ${x}_mobile-menu-white`;
    } if (isMenuOpen) {
      return `${x} ${x}_mobile-menu ${x}_mobile-menu-black`;
    } return `${x}`;
  }
  return (
    <div className={containerStyleController('nav__container')}>
      <NavLink
        className={isSavedCardsOpen ? 'nav__link nav__link-black' : 'nav__link'}
        activeClassName={isSavedCardsOpen ? 'nav__link_active nav__link_active-black' : 'nav__link_active'}
        exact to='/'
        onClick={openMobileMenu}
        value="Главная">Главная</NavLink>
      {isLoggedIn
        ? <>
          <NavLink
            className={isSavedCardsOpen ? 'nav__link nav__link-black' : 'nav__link'}
            activeClassName={isSavedCardsOpen ? 'nav__link_active nav__link_active-black' : 'nav__link_active'}
            to='/saved-cards'
            value="Сохранённые статьи"
            onClick={openMobileMenu}
          >
            Сохранённые статьи
          </NavLink>
          <button className={isSavedCardsOpen ? 'button nav__button nav__button-black' : 'button nav__button'}>
            <span className="nav__button-content-container">
              <span className="nav__button-text">Грета</span>
              <img src={isSavedCardsOpen ? black : white} />
            </span>
          </button>
        </>
        : <button className="button nav__button" onClick={openPopup}>Авторизоваться</button>}
    </div>

  );
}

export default Navigation;
