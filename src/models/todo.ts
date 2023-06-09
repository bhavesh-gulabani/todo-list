export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  children?: Todo[] | undefined; // This will allow for nesting of todos
};
