import './App.css';
import '../../vendor/normalize.css';
import '../../vendor/fonts.css';
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import About from '../About/About';
import Header from '../Header/Header';
import Popup from '../Popups/Popup/Popup';
import Login from '../Popups/Login/Login';
import Register from '../Popups/Register/Register';
import InfoTooltip from '../Popups/InfoTooltip/Infotooltip';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import articles from '../../utils/articles';

function App() {
  // для отображения компонентов менять стейты
  const { pathname } = useLocation();
  const [isLoggedIn] = React.useState(false);
  const [isFound] = React.useState(true);
  const [popupType, setPopupType] = React.useState(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSavedCardsOpen, setIsSavedCardsOpen] = React.useState(false);
  // const [successRegistration, setSuccessRegistration] = React.useState(null);

  // function onSuccessRegistration() {
  //   setPopupType('infoTooltip');
  // }
  React.useEffect(() => {
    if (pathname === '/saved-cards') {
      setIsSavedCardsOpen(true);
    } else if (pathname === '/') {
      setIsSavedCardsOpen(false);
    }
  });
  function openMobileMenu() {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }
  function switchPopupContent() {
    if (!popupType || popupType === 'login') {
      setPopupType('register');
    } else {
      setPopupType('login');
    }
  }
  function openPopup() {
    setIsMenuOpen(false);
    switchPopupContent();
    setIsPopupOpen(true);
  }
  function closePopup() {
    setIsPopupOpen(false);
    setPopupType(null);
  }
  function handleEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup();
      openMobileMenu();
    }
  }
  React.useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });
  function renderPopupContent() {
    switch (popupType) {
      case 'login':
        return <Login
          switchContent={switchPopupContent}
        />;
      case 'register':
        return <Register
          switchContent={switchPopupContent}
        />;
      case 'infoTooltip':
        return <InfoTooltip
          switchContent={switchPopupContent}
        />;
      default:
        return <></>;
    }
  }

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        openPopup={openPopup}
        isSavedCardsOpen={isSavedCardsOpen}
        isMenuOpen={isMenuOpen}
        openMobileMenu={openMobileMenu}
      />
      <Route exact path="/">
        <Main
          isFound={isFound}
          articles={articles}
          isSavedCardsOpen={isSavedCardsOpen}
        ></Main>
      </Route>
      <Route exact path="/saved-cards">
        <SavedNews
          articles={articles}
          isSavedCardsOpen={isSavedCardsOpen}
        />
      </Route>
      <About />
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
      >
        {renderPopupContent()}
      </Popup>
      <Footer></Footer>
    </div>
  );
}

export default App;
