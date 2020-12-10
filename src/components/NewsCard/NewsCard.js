import React from 'react';
import './NewsCard.css';

function getDate(publishedAt) {
  const date = new Date(publishedAt);
  return `${date.toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
  })}, ${date.getFullYear()}`;
}

function NewsCard({
  url,
  keyword,
  urlToImage,
  publishedAt,
  title,
  content,
  source,
  isSavedCardsOpen,
  saveArticle,
  deleteArticle,
  savedArticles,
  isLoggedIn,
}) {
  const [isSaved, setIsSaved] = React.useState(null);
  const [idArticle, setIdArticle] = React.useState(null);

  React.useEffect(() => {
    const savedArticle = savedArticles.find((i) => i.title === title
      && i.date === publishedAt
      && i.source === source);
    if (savedArticle) {
      setIsSaved(true);
      setIdArticle(savedArticle._id);
    } else {
      setIsSaved(false);
    }
  });

  function handleDelete() {
    deleteArticle(idArticle);
    setIsSaved(false);
  }

  function handleSave() {
    if (isSaved) {
      handleDelete();
    } else {
      const savedArticle = savedArticles.find((i) => i._id === idArticle);
      if (savedArticle) {
        console.log('saved yet');
      } else {
        saveArticle({
          title,
          text: content,
          date: publishedAt,
          source,
          link: url,
          image: urlToImage,
        });
        setIsSaved(true);
      }
    }
  }

  return (
    <li className="news-card">
      {isSavedCardsOpen
        ? <>
          <button onClick={handleDelete} className="news-card__button news-card__button-delete"></button>
          <p className="news-card__tip news-card__tip-button news-card__tip-button-delete">Убрать из сохранённых</p>
          <div className="news-card__tip news-card__keyword-container">
            <p title="Слово" className="news-card__keyword">{keyword}</p>
          </div>
        </>
        : <>
          <button onClick={handleSave} className={isSaved ? 'news-card__button news-card__button-saved' : 'news-card__button news-card__button-save'}></button>
          {!isLoggedIn && <p className="news-card__tip news-card__tip-button news-card__tip-button-save">Войдите, чтобы сохранять
            статьи</p>}
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
        <span className="news-card__date">{getDate(publishedAt)}</span>
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
