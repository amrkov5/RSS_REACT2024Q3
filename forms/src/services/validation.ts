import * as yup from 'yup';
import countryList from '../assets/data';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z].*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value
    )
    .integer('Age must be an integer')
    .required('Age is required')
    .positive('Age cannot be negative'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!()_+\-=\\[\]{}|;:'",.<>?]).*$/,
      'Should have 1 uppercase, 1 lowercase, 1 symbol and min 8 symbols'
    )
    .required('Password is required'),
  rPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  picData: yup
    .mixed<FileList>()
    .test('is-valid-type', 'Allowed formats: jpg, jpeg, png', (value) => {
      const validateExt = ['image/png', 'image/jpeg'];
      if (value && value.length > 0) {
        return validateExt.includes(value[0].type);
      }
    })
    .test('is-valid-size', 'Size must be less than 2MB', (value) => {
      const maxSize = 2097152;
      if (value && value.length > 0) {
        return value[0].size < maxSize;
      }
    })
    .required('Image is required'),
  gender: yup
    .string()
    .required('Gender is required')
    .matches(/(male|female)/, 'Please select your gender'),
  country: yup
    .string()
    .oneOf(countryList, 'Enter a valid country')
    .required('Country is required'),
  conditionsChecked: yup
    .boolean()
    .required('Please accept the Terms and Conditions')
    .isTrue('Please accept the Terms and Conditions'),
});

export default schema;
