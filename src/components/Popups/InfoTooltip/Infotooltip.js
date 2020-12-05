import React from 'react';

function InfoTooltip({ switchContent }) {
  return (
    <>
      <h3 className="popup__title">Пользователь успешно зарегистрирован!</h3>
      <a className="popup__link" onClick={switchContent}>Войти</a>
    </>
  );
}

export default InfoTooltip;
