import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required(),
  password: Yup
    .string()
    .required(),
});

export default signInSchema;
