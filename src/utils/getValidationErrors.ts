import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string;
}

const getValidationErrors = (error: ValidationError) => {
  const errors: ValidationErrors = {};

  error.inner.forEach(fieldError => {
    errors[fieldError.path] = fieldError.message
  })

  return errors;
};

export default getValidationErrors;
