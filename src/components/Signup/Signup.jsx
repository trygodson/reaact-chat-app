import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormField } from 'components/FormField/FormField';
import { Form, Formik } from 'formik';
import { defaultValues, validationSchema } from './formikConfig';
import { fb } from 'service';

export const Signup = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const [serverError, setServerError] = useState('');
  // eslint-disable-next-line
  const signUp = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: userName,
              userId: res.user.uid,
            }),
          }).then(apiRes => {
            fb.firestore.collection('chatUsers').doc(res.user.uid).set({
              userName,
              avatar: '',
            });
          });
        } else {
          setServerError('We are having problem signing you up');
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('An Account with this email already exist');
        } else {
          setServerError("We're having trouble signing you up, try again");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="auth-form">
      <h1>SignUp</h1>
      <Formik
        onSubmit={signUp}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="userName" label="Username" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />
            <FormField
              name="verifyPassword"
              label="Verify Password"
              type="password"
            />
            <div className="auth-link-container">
              Already Have An Account?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log In
              </span>
            </div>
            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
