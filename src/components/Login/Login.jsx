import { useState } from 'react';
import { defaultValues, validationSchema } from './formikConfig';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { fb } from 'service';
import { FormField } from 'components/FormField/FormField';

export const Login = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const [serverError, setServerError] = useState('');

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError(
            'We are having error logging you in. Please try again',
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setServerError('Invalid Credentials');
        } else if (err.code === 'auth/user-not-found') {
          setServerError('No account for this email');
        } else {
          setServerError('Something went completely wrong');
        }
      })
      .finally(setSubmitting(false));
  };
  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <label>
              <FormField type="email" name="email" label="Email" />
              <FormField type="password" name="password" label="Password" />
            </label>
            <div className="auth-link-container">
              Don't Have An Account?{' '}
              <span
                className="auth-link"
                onClick={() => history.push('signup')}
              >
                Sign Up
              </span>
            </div>
            <button disabled={isSubmitting || !isValid} type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
