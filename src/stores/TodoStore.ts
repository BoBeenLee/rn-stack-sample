import _ from "lodash";
import { flow, getRoot, Instance, types } from "mobx-state-tree";
import { TimeTraveller } from "mst-middlewares";

import Todo from "./Todo";

const PREFIX_TODO_ID = "todo";

const TodoStore = types
  .model("TodoStore", {
    todos: types.optional(types.array(Todo), []),
    history: types.optional(TimeTraveller, { targetPath: "../todos" })
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

    const undo = () => {
      if (self.history.canUndo) { self.history.undo(); }
    }

    const redo = () => {
      if (self.history.canRedo) { self.history.redo(); }
    }

    const afterAttach = () => {
      self.history.canRedo;
      self.history.canUndo;
    };

    return {
      afterAttach,
      addTodo,
      redo,
      undo,
      reset
    };
  });

export const getTodoStore = stores => stores.store.todoStore;
export type ITodoStore = typeof TodoStore.Type;
export default TodoStore;
