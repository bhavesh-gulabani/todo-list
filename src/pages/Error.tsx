import React from 'react';

import { Navigation } from '../components';
import styles from './Error.module.css';

import { error } from '../constants/images';

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        <img src={error} alt="error" />
        <p>Oops. Some error occured.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
