import React from 'react';
import './NotFound.css';
import notFound from '../../images/not-found.svg';

function NotFound({ isSearchError }) {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <img src={notFound} className="not-found-img"/>
        <h3 className="not-found__title">{!isSearchError ? 'Ничего не найдено' : 'Во время запроса произошла ошибка.'}</h3>
        <p className="not-found__subtitle">{!isSearchError ? 'К сожалению по вашему запросу ничего не найдено.' : 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'}
</p>
      </div>
    </section>
  );
}

export default NotFound;
