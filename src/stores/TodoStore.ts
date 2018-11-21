import { flow, getRoot, Instance, types } from "mobx-state-tree";
import Todo from "./Todo";

const TodoStore = types
    .model("TodoStore", {
        todos: types.optional(types.map(Todo), {})
    })
    .actions(self => {
        const afterCreate = () => {
            self.todos.put({
                name: "Hell"
            });
            self.todos.put({
                name: "lo"
            });
        };

        const addTodo = (name: string) => {
            self.todos.put(Todo.create({ name }));
        };

        return {
            afterCreate,
            addTodo
        };
    });

export type ITodoStore = typeof TodoStore.Type;

export default TodoStore;
