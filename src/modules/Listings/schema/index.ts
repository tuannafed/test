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

export const shemaValidateCreateListingStep1 = Yup.object().shape({
  images: Yup.array(),
  name: Yup.string().required(VALID.NAME_REQUIRED)
});

export const schemaValidateCreateListingStep2 = Yup.object().shape({
  category: Yup.string().required(VALID.CATEGORY_REQUIRED),
  subcategory: Yup.string().required(VALID.SUB_CATEGORY_REQUIRED),
  price: Yup.number()
    .when('has_price', {
      is: isHasPrice => {
        return isHasPrice;
      },
      then: Yup.number()
        .typeError(VALID.PRICE_REQUIRED)
        .required(VALID.PRICE_REQUIRED)
        .min(1, VALID.PRICE_MIN)
    })
    .optional(),
  has_price: Yup.boolean().required(VALID.PRICE_REQUIRED),
  unit: Yup.string().when('has_price', {
    is: isHasPrice => {
      return isHasPrice;
    },
    then: Yup.string().required(VALID.UNIT_REQUIRED)
  }),
  descripton: Yup.string().required(VALID.DESCRIPTION_REQUIRED)
});

export const schemaValidateCreateListingStep3 = Yup.object().shape({
  recursion: Yup.string().required(VALID.RECURSION_REQUIRED),
  tags: Yup.array().optional()
});
