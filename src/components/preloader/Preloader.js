import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader">
    <div className="preloader__container">
      <i className="preloader__circle"/>
      <p className="preloader__title">Идет поиск новостей...</p>
    </div>
  </section>
  );
}

export default Preloader;
