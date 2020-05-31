import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

/**
 * Returns a object with the paths and messages of
 * a Yup validation error.
 * @param {ValidationError} error ValidationError
 */
const getValidationErrors = (error: ValidationError): Errors => {
  const errors: Errors = {};

  error.inner.forEach(fieldError => {
    errors[fieldError.path] = fieldError.message;
  });

  return errors;
};

export default getValidationErrors;
