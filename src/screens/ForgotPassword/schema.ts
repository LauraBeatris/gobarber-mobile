import * as Yup from "yup";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required(),
});

export default forgotPasswordSchema;
