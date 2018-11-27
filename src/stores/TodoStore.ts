import _ from "lodash";
import { flow, getRoot, Instance, types } from "mobx-state-tree";
import Todo, { ITodo } from "./Todo";
import { delay } from "../utils/common";

const PREFIX_TODO_ID = "todo";

const TodoStore = types
  .model("TodoStore", {
    todos: types.optional(types.array(Todo), [])
  })
  .views(self => {
    return {
      get todosByOrderDESC() {
        return self.todos.reverse();
      }
    }
  })
  .actions(self => {
    const reset = () => {
      self.todos.clear();
    };

    const addTodo = (name: string) => {
      self.todos.push(
        Todo.create({
          name,
          id: _.uniqueId(PREFIX_TODO_ID),
          order: self.todos.length + 1
        })
      );
    };

    const afterAttach = () => {
      addTodo("Hell");
      addTodo("lo");
    };

    return {
      afterAttach,
      addTodo,
      reset
    };
  });

export const getTodoStore = stores => stores.store.todoStore;
export type ITodoStore = typeof TodoStore.Type;
export default TodoStore;
