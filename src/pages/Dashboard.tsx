import React from 'react';
import { TodoList } from '../components';

const DashboardPage: React.FC = () => {
  return (
    <>
      <TodoList parentId={null} />
    </>
  );
};

export default DashboardPage;
