import { types } from "mobx-state-tree";

const Todo = types
    .model("Todo", {
        name: types.identifier
    });

export type ITodo = typeof Todo.Type;

export default Todo;
