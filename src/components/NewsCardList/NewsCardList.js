import React from 'react';
import { Route } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function sliceArticles(articles, rowArticles) {
  return articles.slice(0, 3 * rowArticles);
}

function NewsCardList({
  rowArticles,
  articles,
  isSavedCardsOpen,
  savedArticles,
  saveArticle,
  deleteArticle,
  isLoggedIn,
  showMoreArticles,
}) {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {isSavedCardsOpen
          ? <Route exact path="/saved-news">
            <ul className="news-card-list__list">
              {
                savedArticles.map((card) => (
                  <NewsCard
                    key={card._id}
                    keyword={card.keyword}
                    url={card.link}
                    urlToImage={card.image}
                    publishedAt={card.date}
                    title={card.title}
                    content={card.text}
                    source={card.source}
                    isSavedCardsOpen={isSavedCardsOpen}
                    saveArticle={saveArticle}
                    deleteArticle={deleteArticle}
                    savedArticles={savedArticles}
                    isLoggedIn={isLoggedIn}
                  />
                ))
              }
            </ul>
          </Route>
          : <Route exact path="/">
            <h2 className="news-card-list__title">Результаты поиска</h2>
            <ul className="news-card-list__list">
              {
                articles && sliceArticles(articles, rowArticles).map((card, index) => (
                  <NewsCard
                    key={index}
                    url={card.url}
                    urlToImage={card.urlToImage}
                    publishedAt={card.publishedAt}
                    title={card.title}
                    content={card.content}
                    source={card.source.name}
                    isSavedCardsOpen={isSavedCardsOpen}
                    savedArticles={savedArticles}
                    saveArticle={saveArticle}
                    deleteArticle={deleteArticle}
                  />
                ))
              }
            </ul>
            {articles.length > rowArticles * 3 && <button onClick={showMoreArticles} className="button news-card-list__button">Показать ещё</button>}
          </Route>}
      </div>
    </section>
  );
}

export default NewsCardList;
