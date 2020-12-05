import React from 'react';
import './NewsCard.css';

function NewsCard({
  url,
  urlToImage,
  publishedAt,
  title,
  content,
  source,
  isSavedCardsOpen,
}) {
  return (
    <li className="news-card">
      {isSavedCardsOpen
        ? <>
          <button className="news-card__button news-card__button-delete"></button>
          <p className="news-card__tip news-card__tip-button news-card__tip-button-delete">Убрать из сохранённых</p>
          <div className="news-card__tip news-card__keyword-container">
            <p title="Слово" className="news-card__keyword">Слово</p>
          </div>
        </>
        : <>
          <button className="news-card__button news-card__button-save"></button>
          <p className="news-card__tip news-card__tip-button news-card__tip-button-save">Войдите, чтобы сохранять
            статьи</p>
        </>
      }
      <a className="news-card__img-link" href={url}>
        <img
          className="news-card__img"
          src={urlToImage}
          alt={title}
        />
      </a>
      <div className="news-card__text-container">
        <span className="news-card__date">{publishedAt}</span>
        <a className="news-card__title-link" href={url}>
          <h3 className="news-card__title">{title}</h3>
        </a>
        <p className="news-card__text">{content}</p>
        <span className="news-card__origin">{source}</span>
      </div>

    </li>
  );
}

export default NewsCard;
