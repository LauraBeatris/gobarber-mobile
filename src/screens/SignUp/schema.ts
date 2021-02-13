import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  email: Yup
    .string()
    .email()
    .required(),
  password: Yup
    .string()
    .required(),
});

export default signUpSchema;
