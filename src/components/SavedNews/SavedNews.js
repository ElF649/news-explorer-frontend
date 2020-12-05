import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ articles, isSavedCardsOpen }) {
  return (
    <main className="saved-news">
      <SavedNewsHeader/>
      <NewsCardList
        articles={articles}
        isSavedCardsOpen={isSavedCardsOpen}
      />
    </main>
  );
}

export default SavedNews;
