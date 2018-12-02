import { flow, getRoot, Instance, types } from "mobx-state-tree";

import TodoStore from "./TodoStore";
import SwapiStore from "./SwapiStore";

const RootStore = types.model("RootStore", {
  todoStore: types.optional(TodoStore, {}),
  swapiStore: types.optional(SwapiStore, {})
}).actions(self => {
  const sendError = () => {
    throw new Error("Hello World");
  };

  return {
    sendError
  }
});

export type IRootStore = typeof RootStore.Type;
export interface IStores {
  store: IRootStore;
}

export default RootStore;
