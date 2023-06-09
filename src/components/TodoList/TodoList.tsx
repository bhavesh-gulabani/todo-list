import React, { useContext, useRef, useState } from 'react';
import { TodosContext } from '../../store/todos-context';
import TodoItem from '../TodoItem/TodoItem';

import { Todo } from '../../models/todo';

import styles from './Todolist.module.css';
import { arrowDown } from '../../constants/images';

const TodoList: React.FC<{ parentId: number | null }> = ({ parentId }) => {
  const { items, addTodo } = useContext(TodosContext);
  const todoTitleRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  let todos: Todo[] | undefined = [];

  if (parentId !== null) {
    todos = items.filter((todo) => todo.id === parentId);
    if (todos.length > 0) {
      todos = todos[0].children;
    } else {
      return <></>;
    }
  } else {
    todos = items;
  }

  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = todoTitleRef.current!.value;

    // Check if todo already exists
    const exists = todos?.filter((todo) => todo.title === enteredText);

    if (exists && exists.length > 0) {
      setError('Todo already exists. Please re-enter');
    } else {
      addTodo(enteredText, parentId);
      todoTitleRef.current!.value = '';
      setError('');
    }
  };

  return (
    <div
      className={`${styles.container} ${
        parentId ? styles.childContainer : null
      }`}
    >
      <div className={styles.header}>
        <img src={arrowDown} alt="Arrow Down" />
        <p className={styles.title}>{parentId ? 'Subtasks' : 'My Todo'}</p>
      </div>

      <div className={styles.list}>
        {todos?.map((todo) => (
          <div key={todo.id}>
            <TodoItem todo={todo} isSubTask={parentId ? true : false} />
          </div>
        ))}
      </div>

      <form
        onSubmit={addTodoHandler}
        className={`${styles.inputContainer} ${
          todos?.length === 0 ? styles.spacer : null
        }`}
      >
        <input
          type="text"
          placeholder={parentId ? 'Add subtask...' : 'Add task...'}
          ref={todoTitleRef}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default TodoList;
