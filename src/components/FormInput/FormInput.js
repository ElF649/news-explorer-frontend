import React from 'react';
import './FormInput.css';

function FormInput(
  {
    type,
    name,
    value,
    minLength,
    maxLength,
    onChange,
    placeholder,
    label,
    errors,
  },
) {
  console.log(errors);
  return (
    <>
      <label className="input">
        {label}
        <input className="input-field"
          type={type}
          name={name}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          placeholder={placeholder}
          required />
        <span className="input-error">{errors}</span>
      </label>
    </>
  );
}

export default FormInput;
