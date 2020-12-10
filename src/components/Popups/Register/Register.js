import React from 'react';
import useValidation from '../../../utils/useValidation';
import FormInput from '../../FormInput/FormInput';

function Register({ switchContent, isUserExist, handleRegister }) {
  const {
    values, errors, handleChange, isValid,
  } = useValidation();
  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values.name, values.email, values.password);
  }
  return (
    <form className="popup__form">
      <h3 className="popup__title">Регистрация</h3>
      <FormInput
        label='Email'
        type='email'
        name='email'
        placeholder='Введите почту'
        onChange={handleChange}
        errors={errors.email}
        value={values.email}
      />
      <FormInput
        label='Пароль'
        type='password'
        name='password'
        minLength='8'
        maxLength='30'
        placeholder='Введите пароль'
        onChange={handleChange}
        errors={errors.password}
        value={values.password}
      />
      <FormInput
        label='Имя'
        type='text'
        name='name'
        minLength='2'
        maxLength='30'
        placeholder='Введите имя'
        onChange={handleChange}
        errors={errors.name}
        value={values.name}
      />

      {isUserExist && <span className="popup__error">Такой пользователь уже есть</span>}
      <button
        className="button popup__submit-button"
        onClick={handleSubmit}
        type="submit"
        disabled={!isValid}
      >Зарегистрироваться</button>
      <span className="popup__link-holder">или <a className="popup__link" onClick={switchContent}>Войти</a></span>
    </form>
  );
}

export default Register;
