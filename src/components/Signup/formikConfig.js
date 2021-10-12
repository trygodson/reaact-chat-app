import * as Yup from 'yup';

export const defaultValues = {
  email: '',
  password: '',
  userName: '',
  verifyPassword: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email Address').required('required'),
  password: Yup.string()
    .required('required')
    .min(6, 'must be at least 6 characters long'),
  verifyPassword: Yup.string()
    .required('required')
    .oneOf([Yup.ref('password'), null], 'password must match'),
  userName: Yup.string()
    .required('required')
    .matches(/^\S*$/, 'No Spaces')
    .min(3, 'must be three characters long'),
});
