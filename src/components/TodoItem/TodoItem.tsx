import React, { useContext, useState } from 'react';
import { Todo as TodoType } from '../../models/todo';
import { TodosContext } from '../../store/todos-context';

import styles from './TodoItem.module.css';
import CheckBox from '../CheckBox/CheckBox';
import TodoList from '../TodoList/TodoList';
import { subtask } from '../../constants/images';

const TodoItem: React.FC<{ todo: TodoType; isSubTask: boolean }> = ({
  todo,
  isSubTask,
}) => {
  const [childrenVisible, setChildrenVisible] = useState(false);
  const { toggleTodo } = useContext(TodosContext);

  const toggleHandler = () => {
    toggleTodo(todo.id, isSubTask);
  };

  const showChildrenHandler = () => {
    setChildrenVisible((prev) => !prev);
  };

  return (
    <div
      className={`${styles.container} ${
        todo.completed ? styles.checked : null
      }`}
    >
      <div className={styles.item}>
        <CheckBox checked={todo.completed} onClick={toggleHandler} />
        <div className={styles.content} onClick={showChildrenHandler}>
          <span>{todo.title}</span>
          {!isSubTask && (
            <div
              className={styles.subtaskContainer}
              title={childrenVisible ? 'Hide Subtasks' : 'Show Subtasks'}
            >
              {todo.children ? todo.children.length : 0}
              <img src={subtask} alt="Child icon" className={styles.subtask} />
            </div>
          )}
        </div>
      </div>

      {childrenVisible && <TodoList parentId={todo.id} />}
    </div>
  );
};

export default TodoItem;
