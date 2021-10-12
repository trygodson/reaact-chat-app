import * as Yup from 'yup';

export const defaultValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('required'),
  password: Yup.string().required('required'),
});
