import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({
  articles, savedArticles, isSavedCardsOpen, saveArticle,
  deleteArticle,
}) {
  return (
    <main className="saved-news">
      <SavedNewsHeader
      savedArticles={savedArticles}
      />
      {savedArticles.length !== 0 && <NewsCardList
        articles={articles}
        savedArticles={savedArticles}
        isSavedCardsOpen={isSavedCardsOpen}
        saveArticle={saveArticle}
        deleteArticle={deleteArticle}
      />}
    </main>
  );
}

export default SavedNews;
