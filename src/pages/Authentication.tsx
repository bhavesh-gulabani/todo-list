import React from 'react';
import { LoginForm } from '../components';
import { redirect } from 'react-router-dom';
import usersData from '../constants/users.json';
import { User } from '../models/user';

const AuthenticationPage: React.FC = () => {
  return <LoginForm />;
};

export default AuthenticationPage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const { email, password } = {
    email: data.get('email'),
    password: data.get('password'),
  };

  // Get user data from JSON file
  const user = usersData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // Get JWT token for this user
    const token = user.token;

    // Store the token in localStorage
    localStorage.setItem('token', token);

    // Store logged in user details in localStorage
    const loggedInUserInfo: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      isLoggedIn: true,
    };

    localStorage.setItem('userDetails', JSON.stringify(loggedInUserInfo));
  } else {
    return { message: 'Invalid Credentials' };
  }

  return redirect('/');
}
