import React, { useState, PropsWithChildren, createContext } from 'react';
import { Todo } from '../models/todo';
import { User } from '../models/user';

type TodosContextObj = {
  items: Todo[];
  addTodo: (title: string, parentId: number | null) => void;
  toggleTodo: (id: number, isSubTask: boolean) => void;
  loggedInUser: User;
  setLoggedInUser: (user: User) => void;
};

let emptyUser = { id: -1, name: '', email: '', isLoggedIn: false };

export const TodosContext = createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  toggleTodo: () => {},
  loggedInUser: emptyUser,
  setLoggedInUser: () => {},
});

const TodosContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User>(emptyUser);

  const addTodoHandler = (title: string, parentId: number | null) => {
    // Create new todo
    const newTodoId = Math.random();
    const newTodo = {
      id: newTodoId,
      title,
      completed: false,
    };

    // Handle nested todo
    if (parentId !== null) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === parentId) {
          if (!todo.children) {
            todo.children = [newTodo];
          } else {
            todo.children.push(newTodo);
          }
        }
        return todo;
      });
      setTodos(updatedTodos);
    } else {
      // Handle non-nested todo
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodoHandler = (todoId: number, isSubTask: boolean) => {
    let filteredTodo: Todo[] | undefined = [];
    let parent: Todo | null = null;

    // Handle toggling for nested todo
    if (isSubTask) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].children) {
          filteredTodo = todos[i].children?.filter(
            (todo) => todo.id === todoId
          );
          if (filteredTodo && filteredTodo.length > 0) {
            parent = todos[i];
            break;
          }
        }
      }

      // Toggle completed
      const updatedTodo = filteredTodo![0];
      updatedTodo.completed = !updatedTodo.completed;

      // Get index of child
      const childLocation = parent!.children!.indexOf(updatedTodo);

      // Update children array for this parent
      const updatedChlidren = parent!.children!.filter(
        (todo) => todo.id !== updatedTodo.id
      );

      // Add updated child to children array
      updatedChlidren.splice(childLocation, 0, updatedTodo);

      parent!.children = updatedChlidren;

      // Update Todos List
      const parentLocation = todos.indexOf(parent!);

      const newTodos = todos.filter((todo) => todo.id !== parent!.id);

      newTodos.splice(parentLocation, 0, parent!);

      setTodos([...newTodos]);
    } else {
      // Handle toggling for non-nested todo
      filteredTodo = todos.filter((todo) => todo.id === todoId);
      const updatedTodo = filteredTodo![0];
      const location = todos.indexOf(updatedTodo);
      updatedTodo.completed = !updatedTodo.completed;

      // If children exist, toggle them as well
      if (updatedTodo.children) {
        const updatedChildren = updatedTodo.children;
        for (let i = 0; i < updatedChildren.length; i++) {
          updatedChildren[i].completed = updatedTodo.completed;
        }

        updatedTodo.children = updatedChildren;
      }

      // Update todos list
      const newTodos = todos.filter((todo) => todo.id !== todoId);

      newTodos.splice(location, 0, updatedTodo);

      setTodos([...newTodos]);
    }
  };

  const loginUserHandler = (user: User) => {
    setUser(user);
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    toggleTodo: toggleTodoHandler,
    loggedInUser: user,
    setLoggedInUser: loginUserHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
