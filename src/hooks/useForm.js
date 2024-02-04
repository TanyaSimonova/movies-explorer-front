import React, { useState, useCallback } from "react";

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [disabled, setIsDisabled] = useState(true);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    setIsDisabled(target.form.checkValidity());
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false,
      newDisabled = false,
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsDisabled(newDisabled);
    },
    [setValues, setErrors, setIsValid, setIsDisabled],
  );

  return { values, handleChange, errors, isValid, disabled, resetForm };
}
