import { Form, useActionData, useNavigation } from 'react-router-dom';

import styles from './LoginForm.module.css';

function LoginForm() {
  const navigation = useNavigation();
  const error = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={styles.form}>
        <h3>Log in</h3>
        <p className={styles.formControl}>
          <label htmlFor="email" className={styles.emailLabel}>
            Email
          </label>
          <input id="email" type="email" name="email" required />
        </p>
        <p className={styles.formControl}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!!error && (
          <p className={styles.error}>Invalid Credentials. Please re-enter.</p>
        )}
        <div className={styles.actions}>
          <button disabled={isSubmitting}>
            <span>{isSubmitting ? 'Submitting...' : 'Login'}</span>
          </button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
