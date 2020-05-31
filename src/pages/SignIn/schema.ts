import * as yup from "yup";

const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default signInSchema;
