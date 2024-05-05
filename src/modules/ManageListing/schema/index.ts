import * as Yup from 'yup';
import { VALID } from 'constants/validate';

// -- schemaValidateSignIn-------------------------------------------------
export const schemaValidateSignIn = Yup.object().shape({
  email: Yup.string().required(VALID.EMAIL_REQUIRED).email(VALID.EMAIL_FORMAT),
  password: Yup.string().required(VALID.PASSWORD_REQUIRED)
});

// -- schemaValidateSignUp-------------------------------------------------
export const schemaValidateSignUp = Yup.object().shape({
  firstname: Yup.string()
    .required(VALID.FIRST_NAME_REQUIRED)
    .max(12, VALID.MAX_LENGTH_12),
  lastname: Yup.string()
    .required(VALID.LAST_NAME_REQUIRED)
    .max(12, VALID.MAX_LENGTH_12),
  email: Yup.string()
    .required(VALID.EMAIL_REQUIRED)
    .email(VALID.EMAIL_FORMAT)
    .max(40, VALID.MAX_LENGTH_40),
  password: Yup.string()
    .required(VALID.PASSWORD_REQUIRED)
    .min(8, VALID.MIN_LENGTH_8)
    .max(20, VALID.MAX_LENGTH_20)
    .matches(VALID.PASSWORD_REG, VALID.PASSWORD_FORMAT),
  passwordConfirm: Yup.string()
    .required(VALID.PASSWORD_REQUIRED)
    .test('passwords-match', VALID.PASSWORD_NOT_MATCH, function (value) {
      return this.parent.password === value;
    })
});
// -- schemaValidateForgotPassword-------------------------------------------------
export const schemaValidateForgotPassword = Yup.object().shape({
  email: Yup.string().required(VALID.EMAIL_REQUIRED).email(VALID.EMAIL_FORMAT)
});
