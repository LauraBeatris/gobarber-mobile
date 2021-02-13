import { PASSWORD_MIN_LENGTH } from "~/constants/authentication";

/**
 * Applies validation to the old password value
 * when updating a profile
 */
const oldPasswordTest = {
  name: "updatePasswordIsValid",
  exclusive: false,
  test: (value: string): boolean => {
    if (!value) {
      return true;
    }

    return value.length >= PASSWORD_MIN_LENGTH;
  },
  message: `The password must have at list ${PASSWORD_MIN_LENGTH} characters`,
};

export default oldPasswordTest;
