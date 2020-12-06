import * as yup from "yup";

const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default signUpSchema;
