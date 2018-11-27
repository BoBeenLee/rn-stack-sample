import _ from "lodash";
import { flow, getRoot, Instance, types } from "mobx-state-tree";
import Todo, { ITodo } from "./Todo";

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
    const addTodo = (name: string) => {
      self.todos.push(
        Todo.create({
          name,
          id: _.uniqueId(PREFIX_TODO_ID),
          order: self.todos.length + 1
        })
      );
    };

    const afterCreate = () => {
      addTodo("Hell");
      addTodo("lo");
    };

    return {
      afterCreate,
      addTodo
    };
  });

export const getTodoStore = stores => stores.store.todoStore;
export type ITodoStore = typeof TodoStore.Type;
export default TodoStore;
