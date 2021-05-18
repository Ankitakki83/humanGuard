import React from "react";
import Input from "./Input";
import validatorCreator from "./validatorCreator";
import Error from "./Error.js";
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
}

const EmailError = () => {
  return <Error message="Invalid email" />;
};

const NoNumbersError = () => {
  return <Error message="No numbers allowed" />;
};

export function noNumbers(value) {
  return /\d/.test(value);
}

export function isEmpty(value) {
  return value.length === 0;
}

const EmptyError = () => {
  return <Error message="Field is empty" />;
};

export const EmptyValidatedInput = validatorCreator(Input, isEmpty, EmptyError);

export const EmailValidatedInput = validatorCreator(
  Input,
  validateEmail,
  EmailError
);
export const NoNumbersValidatedInput = validatorCreator(
  Input,
  noNumbers,
  NoNumbersError
);
