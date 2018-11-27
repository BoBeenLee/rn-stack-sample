import { types } from "mobx-state-tree";

const Todo = types.model("Todo", {
  id: types.identifier,
  name: types.string,
  order: types.number
});

export type ITodo = typeof Todo.Type;

export default Todo;
