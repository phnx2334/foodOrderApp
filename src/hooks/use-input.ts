import React, { useState } from "react";

type Validate = (...args: string[]) => boolean;

const useInput = (validate: Validate) => {
  const [value, setValue] = useState("");
  const [wasFocused, setWasFocused] = useState(false);

  const isValid = validate(value);
  const hasError = !isValid && wasFocused;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setWasFocused(true);
  };

  const reset = () => {
    setValue("");
    setWasFocused(false);
  };

  return {
    value,
    isValid,
    hasError,
    blurHandler,
    changeHandler,
    reset,
  };
};

export default useInput;
