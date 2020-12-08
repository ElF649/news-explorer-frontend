import './App.css';
import '../../vendor/normalize.css';
import '../../vendor/fonts.css';
import React from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import About from '../About/About';
import Header from '../Header/Header';
import Popup from '../Popups/Popup/Popup';
import Login from '../Popups/Login/Login';
import Register from '../Popups/Register/Register';
import InfoTooltip from '../Popups/InfoTooltip/Infotooltip';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { getArticlesFromNewsApi } from '../../utils/NewsApi';
import {
  register, authorize, getUserInfo, getSavedArticles, postArticle, deleteArticle,
} from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  // для отображения компонентов менять стейты
  const { pathname } = useLocation();
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [receivedArticles, setReceivedArticles] = React.useState([]);
  const [rowArticles, setRowArticles] = React.useState(1);
  const [currentKeyword, setCurrentKeyword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFound, setIsFound] = React.useState(true);
  const [popupType, setPopupType] = React.useState(null);
  const [isSearchError, setIsSearchError] = React.useState(false);

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSavedCardsOpen, setIsSavedCardsOpen] = React.useState(false);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getUserInfo(jwt)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
          getSavedArticles()
            .then((data) => {
              setSavedArticles(data.articles);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    const data = localStorage.getItem('last-search');
    const keyword = localStorage.getItem('keyword-search');
    if (data && keyword) {
      if (JSON.parse(data).length) {
        setReceivedArticles(JSON.parse(data));
      }
      setCurrentKeyword(JSON.parse(keyword));
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem('last-search', JSON.stringify(receivedArticles));
    localStorage.setItem('keyword-search', JSON.stringify(currentKeyword));
  });

  function closePopup() {
    setIsPopupOpen(false);
    setPopupType(null);
  }

  function handleRegister(password, email, name) {
    register(password, email, name)
      .then(() => {
        setPopupType('infoTooltip');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then(() => {
        handleTokenCheck();
        closePopup();
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('last-search');
    localStorage.removeItem('keyword-search');
    setReceivedArticles([]);
    setSavedArticles([]);
    setCurrentKeyword('');
    setCurrentUser(null);
    history.push('/');
  }

  function findNewArticles(value) {
    setIsFound(true);
    setIsLoading(true);
    getArticlesFromNewsApi(value)
      .then((data) => {
        if (data.articles.length) {
          setReceivedArticles(data.articles);
        } else {
          setIsFound(false);
        }
      }).catch((err) => {
        console.log(err);
        setIsFound(false);
        setIsSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleFindNewArticles(value) {
    setReceivedArticles([]);
    findNewArticles(value);
    setCurrentKeyword(value);
    setRowArticles(1);
  }
  function handleDeleteArticle(id) {
    deleteArticle(id).then(() => {
      getSavedArticles()
        .then((data) => {
          setSavedArticles(data.articles);
        });
      console.log(savedArticles);
    })
      .catch((err) => {
        console.log(err);
      });
  }
  function saveArticle(article) {
    postArticle(
      currentKeyword,
      article.title,
      article.text,
      article.date,
      article.source,
      article.link,
      article.image,
    ).then(() => {
      getSavedArticles()
        .then((data) => {
          setSavedArticles(data.articles);
        });
    }).catch((err) => {
      console.log(err);
    });
  }

  function switchPopupContent() {
    if (!popupType || popupType === 'register') {
      setPopupType('login');
    } else {
      setPopupType('register');
    }
  }

  function openPopup() {
    setIsMenuOpen(false);
    switchPopupContent();
    setIsPopupOpen(true);
  }

  function handleSaveArticle(article) {
    if (!isLoggedIn) {
      openPopup();
    } else {
      saveArticle(article);
    }
  }

  function handleShowMoreArticles() {
    setRowArticles(rowArticles + 1);
  }

  React.useEffect(() => {
    if (pathname === '/saved-news') {
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
          handleLogin={handleLogin}
        />;
      case 'register':
        return <Register
          switchContent={switchPopupContent}
          handleRegister={handleRegister}
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
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          openPopup={openPopup}
          isSavedCardsOpen={isSavedCardsOpen}
          isMenuOpen={isMenuOpen}
          openMobileMenu={openMobileMenu}
          handleLogout={handleLogout}
        />
        <Route exact path="/">
          <Main
            currentKeyword={currentKeyword}
            isFound={isFound}
            articles={receivedArticles}
            savedArticles={savedArticles}
            isSavedCardsOpen={isSavedCardsOpen}
            handleFindNewArticles={handleFindNewArticles}
            saveArticle={handleSaveArticle}
            deleteArticle={handleDeleteArticle}
            isLoggedIn={isLoggedIn}
            showMoreArticles={handleShowMoreArticles}
            rowArticles={rowArticles}
            isLoading={isLoading}
            isSearchError={isSearchError}
          ></Main>
        </Route>
        <Route exact path="/saved-news">
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            component={SavedNews}
            articles={receivedArticles}
            savedArticles={savedArticles}
            isSavedCardsOpen={isSavedCardsOpen}
            saveArticle={handleSaveArticle}
            deleteArticle={handleDeleteArticle}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
