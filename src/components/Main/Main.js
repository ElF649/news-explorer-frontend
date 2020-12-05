import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';
import SearchForm from '../SearchForm/SearchForm';

function Main({ articles, isSavedCardsOpen, isFound }) {
  return (
    <>
      <SearchForm />
      <NewsCardList
      articles={articles}
      isSavedCardsOpen={isSavedCardsOpen}
      />
      {!isFound && <NotFound/>}
    </>
  );
}

export default Main;
