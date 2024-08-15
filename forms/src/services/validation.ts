import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z].*$/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age cannot be negative')
    .integer(),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!()_+\-=\\[\]{}|;:'",.<>?]).*$/,
      'Should have 1 uppercase, 1 lowercase, 1 symbol and min 8 symbols'
    ),
  rPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  picData: yup
    .mixed<File>()
    .required('Image is required')
    .test('is-valid-type', 'Allowed formats: jpg, jpeg, png', (value) => {
      const validateExt = ['image/png', 'image/jpeg'];
      return validateExt.includes(value.type);
    })
    .test('is-valid-size', 'Size must be no more than 2MB', (value) => {
      const maxSize = 2097152;
      return value.size < maxSize;
    }),
  gender: yup
    .string()
    .required('Gender is required')
    .matches(/(male|female)/, 'Please select your gender'),
  country: yup.string().required('Country is required'),
  conditionsChecked: yup
    .boolean()
    .required('Please accept the Terms and Conditions')
    .isTrue('Please accept the Terms and Conditions'),
});

export default schema;
