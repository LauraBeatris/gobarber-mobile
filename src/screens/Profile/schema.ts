import * as Yup from "yup";

import { PASSWORD_MIN_LENGTH } from "~/constants/authentication";
import oldPasswordTest from "~/yup/tests/oldPasswordTest";

const passwordValidation: Yup.WhenOptions<string> = {
  is: (value: string) => value && value.length > 0,
  then: Yup
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .required(),
  otherwise: Yup
    .string()
    .notRequired(),
};

const updateProfileSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  email: Yup
    .string()
    .email()
    .required(),
  old_password: Yup
    .string()
    .test(oldPasswordTest)
    .nullable()
    .default(null),
  password: Yup
    .string()
    .nullable()
    .when("old_password", passwordValidation)
    .default(null),
  password_confirmation: Yup
    .string()
    .nullable()
    .oneOf([null, Yup.ref("password")])
    .when("password", passwordValidation)
    .default(null),
});

export default updateProfileSchema;
