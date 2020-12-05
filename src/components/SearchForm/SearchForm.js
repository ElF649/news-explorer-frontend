import React from 'react';
import './SearchForm.css';

function SearchForm() {
  const [value, setValue] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    setValue('');
  }
  function handleSearchChange(evt) {
    setValue(evt.target.value);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <h1 className="search-form__title">Что творится в мире?</h1>
        <p className="search-form__subtitle">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.
         </p>

        <div className="search-form__input-container">
          <input
            title="Введите запрос"
            type="text"
            className="search-form__input"
            placeholder="Введите тему новости"
            value={value}
            onChange={handleSearchChange}
            required
          />
          <button
            value="Искать"
            className="button search-form__button"
            type="submit"
            onClick={handleSubmit}>
            Искать
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
