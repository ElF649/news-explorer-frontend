import React from 'react';
import { Route } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ articles, isSavedCardsOpen }) {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        <Route exact path="/">
          <h2 className="news-card-list__title">Результаты поиска</h2>
          <ul className="news-card-list__list">
            {
              articles.map((card) => (
                <NewsCard
                  key={card.source.id}
                  url={card.url}
                  urlToImage={card.urlToImage}
                  publishedAt={card.publishedAt}
                  title={card.title}
                  content={card.content}
                  source={card.source.name}
                  isSavedCardsOpen={isSavedCardsOpen}
                />
              ))
            }
          </ul>
          <button className="button news-card-list__button">Показать ещё</button>
        </Route>
        <Route exact path="/saved-cards">
          <ul className="news-card-list__list">
            {
              articles.map((card) => (
                <NewsCard
                  key={card.source.id}
                  url={card.url}
                  urlToImage={card.urlToImage}
                  publishedAt={card.publishedAt}
                  title={card.title}
                  content={card.content}
                  source={card.source.name}
                  isSavedCardsOpen={isSavedCardsOpen}
                />
              ))
            }
          </ul>
        </Route>

      </div>
    </section>
  );
}

export default NewsCardList;
