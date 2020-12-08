import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function articlesToString(savedArticles) {
  if (!savedArticles.length) {
    return '0 сохранённых статей';
  }
  if (savedArticles.length === 1) {
    return '1 сохранённая статья';
  }
  if (savedArticles.length > 1 && savedArticles.length < 5) {
    return `${savedArticles.length} сохранённые статьи`;
  }
  if (savedArticles.length > 5) {
    return `${savedArticles.length} сохранённыx статей`;
  }
  return '';
}

function getKeywords(savedArticles) {
  const keywordsArr = savedArticles.map((card) => card.keyword);
  const obj = {};
  keywordsArr.forEach((value) => {
    if (obj[value]) {
      obj[value] += obj[value];
    } else {
      obj[value] = 1;
    }
  });
  return obj;
}

function sortKeywords(savedArticles) {
  const obj = getKeywords(savedArticles);

  return Object.entries(obj).sort((a, b) => {
    if (a[1] < b[1]) {
      return 1;
    }
    if (a[1] > b[1]) {
      return -1;
    }
    return 0;
  }).map((value) => value[0]);
}

function keywordsToString(savedArticles) {
  const keywords = sortKeywords(savedArticles);
  if (keywords.length === 1) {
    return `${keywords[0]}`;
  }
  if (keywords.length === 2) {
    return `${keywords[0]}, ${keywords[1]}`;
  }
  if (keywords.length === 3) {
    return `${keywords[0]}, ${keywords[1]}, ${keywords[2]}`;
  }
  if (keywords.length > 3) {
    return `${keywords[0]}, ${keywords[1]}`;
  } return '';
}

function keywordsToAmount(savedArticles) {
  const keywords = sortKeywords(savedArticles);
  if (keywords.length > 3) {
    return `и ${keywords.length - 2} другим`;
  } return '';
}

function SavedNewsHeader({ savedArticles }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <h1 className="saved-news-header__title">Сохранённые статьи</h1>
        <h2 className="saved-news-header__subtitle">{`${currentUser.name}, у вас ${articlesToString(savedArticles)}`}</h2>
        {savedArticles.length !== 0 && <p className="saved-news-header__keywords-description">По ключевым словам: <span className="saved-news-header__keywords">{keywordsToString(savedArticles)}</span><span className="saved-news-header__keywords-count">{keywordsToAmount(savedArticles)}</span></p>}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
