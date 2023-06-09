import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../components';

const RootLayout: React.FC = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default RootLayout;
