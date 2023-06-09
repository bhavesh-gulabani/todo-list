import React, { useContext, useEffect } from 'react';

import styles from './Home.module.css';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { TodosContext } from '../store/todos-context';

let emptyUser = { id: -1, name: '', email: '', isLoggedIn: false };

const HomePage: React.FC = () => {
  const { setLoggedInUser, loggedInUser } = useContext(TodosContext);
  const token = useRouteLoaderData('root');

  useEffect(() => {
    // Store user profile details in context
    if (token) {
      let user = localStorage.getItem('userDetails')!;
      if (JSON.stringify(loggedInUser) !== user) {
        const userObj = JSON.parse(user);
        setLoggedInUser(userObj);
      }
    } else {
      setLoggedInUser(emptyUser);
    }
  }, [loggedInUser, setLoggedInUser, token]);

  return (
    <div className={styles.container}>
      <p className={`${styles.text} ${styles.intro}`}>
        Hey {token ? loggedInUser.name + ',' : 'there!'}
      </p>
      <p className={styles.text}>
        {token
          ? 'Please click below to proceed to your dashboard.'
          : 'Please login to view your dashboard.'}
      </p>

      <Link className={styles.button} to={token ? '/dashboard' : '/login'}>
        {token ? 'My Dashboard' : 'Login'}
      </Link>
    </div>
  );
};

export default HomePage;
