import React from "react";
import useInput from "../../hooks/use-input";
import styles from "./Checkout.module.css";

export interface formData {
  name: string;
  street: string;
  city: string;
  postalCode: string;
}

interface ICheckoutProps {
  onCancel: () => void;
  onConfirm: (enteredData: formData) => void;
}

const isEmpty = (value: string) => {
  if (value.trim().length === 0) {
    return false;
  } else return true;
};
const isNotFiveChars = (value: string) => {
  if (value.trim().length !== 5) {
    return false;
  } else return true;
};

const Checkout: React.FC<ICheckoutProps> = (props) => {
  //NAME
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    blurHandler: nameBlurHandler,
    changeHandler: nameChangeHandler,
    reset: nameReset,
  } = useInput(isEmpty);

  //STREET
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    blurHandler: streetBlurHandler,
    changeHandler: streetChangeHandler,
    reset: streetReset,
  } = useInput(isEmpty);

  //POSTAL
  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    blurHandler: postalBlurHandler,
    changeHandler: postalChangeHandler,
    reset: postalReset,
  } = useInput(isNotFiveChars);

  //CITY
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    blurHandler: cityBlurHandler,
    changeHandler: cityChangeHandler,
    reset: cityReset,
  } = useInput(isEmpty);

  //FORM
  let validForm = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid)
    validForm = true;

  const confirmHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postalCode: postalValue,
    });

    nameReset();
    streetReset();
    postalReset();
    cityReset();
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={`${styles.control} ${nameHasError && styles.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Plase enter a valid name</p>}
      </div>
      <div className={`${styles.control} ${streetHasError && styles.invalid}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Plase enter a valid street</p>}
      </div>
      <div className={`${styles.control} ${postalHasError && styles.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && <p>Plase enter a valid postal code</p>}
      </div>
      <div className={`${styles.control} ${cityHasError && styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>Plase enter a valid city name</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!validForm}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
