import React from 'react';

function useValidation() {
  const [formValues, setFormValues] = React.useState({
    values: {
      email: '',
      name: '',
      password: '',
    },
    errors: {
      email: '',
      name: '',
      password: '',
    },
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value, validationMessage } = e.target;
    setFormValues({
      values: {
        ...formValues.values,
        [name]: value,
      },
      errors: {
        ...formValues.errors,
        [name]: validationMessage,
      },
      isValid: e.target.closest('form').checkValidity(),
    });
  }

  return {
    ...formValues, handleChange,
  };
}

export default useValidation;
