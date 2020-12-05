import React from 'react';
import './About.css';
import avatar from '../../images/avatar.jpg';

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__avatar-img" src={avatar} alt="Фото автора"/>
        <div className="about__description">
          <h2 className="about__description-title">Об авторе</h2>
          <p className="about__description-text">
            Это блок с описанием автора проекта.
            Здесь следует указать, как вас зовут, чем вы занимаетесь,
            какими технологиями разработки владеете.
          </p>
          <p className="about__description-text">
            Также можно рассказать о процессе обучения в Практикуме,
            чему вы тут научились, и чем можете помочь потенциальным заказчикам.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
