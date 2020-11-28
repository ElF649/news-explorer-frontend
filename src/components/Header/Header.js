import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import './Header.css';
import burgerWhite from '../../images/menu-white.svg';
import burgerBlack from '../../images/menu-black.svg';

import Navigation from '../Navigation/Navigation';

function Header({
  isLoggedIn, openPopup, isSavedCardsOpen, isMenuOpen, openMobileMenu,
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  function containerStyleController(x) {
    if (x === 'header__container') {
      if (isMenuOpen && isSavedCardsOpen) {
        return `${x} ${x}_mobile-menu-white`;
      } if (isMenuOpen) {
        return `${x} ${x}_mobile-menu-black`;
      } return `${x}`;
    }
    if (x === 'header') {
      if (isMenuOpen) {
        return `${x} ${x}_mobile-menu`;
      } if (isMobile && isSavedCardsOpen) {
        return `${x} ${x}_mobile-menu-white`;
      } if (isMobile && !isSavedCardsOpen) {
        return `${x} ${x}_mobile-menu-black`;
      } return `${x}`;
    }
    return `${x}`;
  }

  return (
    <header className={containerStyleController('header')}>
      <div className={containerStyleController('header__container')}>
        <Link
          className={isSavedCardsOpen ? 'header__logo header__logo-black' : 'header__logo'}
          navLink={true} title="Перейти на страницу с поиском"
          to='/'
          >NewsExplorer</Link>
        {isMobile
          ? <button className="button header__button-mobile"
            onClick={openMobileMenu}>
            <img src={isSavedCardsOpen ? burgerBlack : burgerWhite} />
          </button>
          : <Navigation
            isLoggedIn={isLoggedIn}
            openPopup={openPopup}
            isSavedCardsOpen={isSavedCardsOpen}
          />
        }
      </div>
      <div className="header__separator"></div>
      {isMenuOpen && <><Navigation
        isMenuOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        openPopup={openPopup}
        isSavedCardsOpen={isSavedCardsOpen}
        openMobileMenu={openMobileMenu}
      />
        <div className="header__overlay" onClick={openMobileMenu} />
      </>
      }
    </header>
  );
}

export default Header;
