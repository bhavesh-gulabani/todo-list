import React from 'react';
import { Form, Link, NavLink, useRouteLoaderData } from 'react-router-dom';

import styles from './Navigation.module.css';
import { logo } from '../../constants/images';

const Navigation: React.FC = () => {
  const token = useRouteLoaderData('root');

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Dashboard
            </NavLink>
          </li>

          {!token && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}
          {!!token && (
            <li>
              <Form action="/logout" method="post">
                <button className={styles.logout}>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
