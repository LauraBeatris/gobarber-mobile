import * as Yup from "yup";

const updateProfileSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  email: Yup
    .string()
    .email()
    .required(),
});

export default updateProfileSchema;
