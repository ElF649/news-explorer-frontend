import React from 'react';
import useValidation from '../../../utils/useValidation';
import FormInput from '../../FormInput/FormInput';

function Login({ onSubmit, switchContent, handleLogin }) {
  const {
    values, errors, handleChange, isValid,
  } = useValidation();
  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values.email, values.password);
  }
  return (
    <form onSubmit={onSubmit} className="popup__form">
        <h3 className="popup__title">Вход</h3>
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
      <button
        className="button popup__submit-button"
        onClick={handleSubmit}
        type="button"
        disabled={!isValid}
      >Войти</button>
      <span className="popup__link-holder">или <a className="popup__link" onClick={switchContent}>Зарегистрироваться</a></span>
    </form>
  );
}

export default Login;
