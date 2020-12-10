import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';
import Preloader from '../preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function Main({
  articles,
  savedArticles,
  isSavedCardsOpen,
  isFound,
  handleFindNewArticles,
  saveArticle,
  deleteArticle,
  isLoggedIn,
  currentKeyword,
  showMoreArticles,
  rowArticles,
  isLoading,
  isSearchError,
}) {
  return (
    <>
      <SearchForm
        handleFindNewArticles={handleFindNewArticles}
        currentKeyword={currentKeyword}
      />
      {isLoading && <Preloader/>}
      {articles.length !== 0 && <NewsCardList
        articles={articles}
        savedArticles={savedArticles}
        isSavedCardsOpen={isSavedCardsOpen}
        saveArticle={saveArticle}
        deleteArticle={deleteArticle}
        isLoggedIn={isLoggedIn}
        showMoreArticles={showMoreArticles}
        rowArticles={rowArticles}
      />}
      {!isFound && <NotFound
      isSearchError={isSearchError} />}
    </>
  );
}

export default Main;
