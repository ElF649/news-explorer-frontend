import React from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Navigation.css';
import white from '../../images/logout-white.svg';
import black from '../../images/logout-black.svg';

function Navigation({
  isLoggedIn, openPopup, isSavedCardsOpen, isMenuOpen, openMobileMenu, handleLogout,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  function containerStyleController(x) {
    if (x === 'nav__container') {
      if (isMenuOpen && isSavedCardsOpen) {
        return `${x} ${x}_mobile-menu ${x}_mobile-menu-white`;
      } if (isMenuOpen) {
        return `${x} ${x}_mobile-menu ${x}_mobile-menu-black`;
      } return `${x}`;
    }
    if (x === 'nav__link_active') {
      if (isMenuOpen) {
        return ' ';
      } if (isSavedCardsOpen) {
        return `${x} ${x}-black`;
      } return `${x}`;
    }
    return `${x}`;
  }
  return (
    <div className={containerStyleController('nav__container')}>
      <NavLink
        className={isSavedCardsOpen ? 'nav__link nav__link-black' : 'nav__link'}
        activeClassName={containerStyleController('nav__link_active')}
        exact to='/'
        onClick={openMobileMenu}
        >Главная</NavLink>
      {isLoggedIn
        ? <>
          <NavLink
            className={isSavedCardsOpen ? 'nav__link nav__link-black' : 'nav__link'}
            activeClassName={containerStyleController('nav__link_active')}
            to='/saved-news'
            onClick={openMobileMenu}
          >
            Сохранённые статьи
          </NavLink>
          <button className={isSavedCardsOpen ? 'button nav__button nav__button-black' : 'button nav__button'}>
            <span className="nav__button-content-container">
              <span className="nav__button-text">{currentUser ? currentUser.name : ''}</span>
              <img src={isSavedCardsOpen ? black : white} alt="logout" onClick={handleLogout} />
            </span>
          </button>
        </>
        : <button className="button nav__button" onClick={openPopup}>Авторизоваться</button>}
    </div>

  );
}

export default Navigation;
