import React, { useState, useCallback, useEffect } from "react";

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = (values) => {
    let errors = {};
    const regexEmail = /^\S+@\S+\.\S+$/;
    const regexUsername = /^(?:[a-zA-Zа-яёА-ЯЁ]{1,}[\s\-]?[a-zA-Zа-яёА-ЯЁ]{1,}?)$/;
    const userEmail = values.email;
    const username = values.name;
    const userPassword = values.password;

    if (!regexUsername.test(username)) {
      errors.name = "Имя может содержать кириллицу и латиницу, допускается дефис и пробел";
    } if (username !== undefined && Object.keys(username).length < 2) {
      errors.name = "Имя может содержать от 2 до 30 символов";
    } if(username === undefined) {
      errors.name = "";
    } if(!regexEmail.test(userEmail)) {
      errors.email= "Неправильный формат почты, необходимо ввести значение формата: example@example.com";
    } if(userEmail === undefined) {
      errors.email= "";
    } if(userPassword !== undefined && Object.keys(userPassword).length < 5) {
      errors.password= "Длина пароля не может быть меньше 5 и длинее 15 символов";
    } if(userPassword === undefined) {
      errors.password= "";
    }
    return errors;
  }

  useEffect(() => {
    if(values) {
      setErrors(validate(values));
    }
  }, [values])

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false,
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm };
}
