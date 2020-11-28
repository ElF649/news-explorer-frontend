import React from 'react';
import './NotFound.css';
import notFound from '../../images/not-found.svg';

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <img src={notFound} className="not-found-img"/>
        <h3 className="not-found__title">Ничего не найдено</h3>
        <p className="not-found__subtitle">К сожалению по вашему запросу
ничего не найдено.</p>
      </div>
    </section>
  );
}

export default NotFound;
